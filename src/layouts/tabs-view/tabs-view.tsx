import React, { useEffect } from 'react';

import {
  addFileOpen,
  removeFileOpen,
  selectFileActive,
  selectFilesOpen,
} from '../../features/filesOpen/filesOpenSlice';
import { setSelectedNode } from '../../features/workspace/workspaceSlice';
import { useRootDispatch } from '../../hooks/useRootDispatch';
import { useRootSelector } from '../../hooks/useRootSelector';
import { ITreeNode } from '../../interfaces/tree-node';
import { Container, Tab, Tabs } from './styles';

export function TabsView() {
  const useRef = React.useRef<HTMLDivElement>(null);
  const activatedTabRef = React.useRef<HTMLDivElement>(null);
  const dispatch = useRootDispatch();
  const filesOpen = useRootSelector(selectFilesOpen);
  const fileActive = useRootSelector(selectFileActive);

  useEffect(() => {
    if (useRef.current) {
      const current = useRef.current;

      function handleWheel(event: WheelEvent) {
        if (event.deltaY > 0) {
          current.scrollLeft += 100;
        } else {
          current.scrollLeft -= 100;
        }
        event.preventDefault();
      }

      current.addEventListener('wheel', handleWheel);
      return () => current.removeEventListener('wheel', handleWheel);
    }
  }, []);

  useEffect(() => {
    if (activatedTabRef.current) {
      activatedTabRef.current.scrollIntoView();
    }
  }, [fileActive]);

  function handleClick(treeNode: ITreeNode) {
    if (treeNode.isFile) {
      dispatch(addFileOpen(treeNode));
    }
    dispatch(setSelectedNode(treeNode));
  }

  function handleMiddleClick(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    treeNode: ITreeNode
  ) {
    if (event.button === 1) {
      event.preventDefault();
      const current_full_name = treeNode.full_name;
      const activeFile = fileActive.full_name;
      const firstFile = filesOpen[0].full_name;
      const lastFile = filesOpen[filesOpen.length - 1].full_name;

      const fileIsActive = current_full_name == activeFile;
      const filesIsFirst = current_full_name == firstFile;
      const filesIsLast = current_full_name === lastFile;
      const index = filesOpen.findIndex(p => p.full_name === current_full_name);
      const prevFile = filesOpen[index - 1];
      const nextFile = filesOpen[index + 1];
      const fileIsOnly = filesOpen.length === 1;

      if (fileIsActive && !fileIsOnly) {
        let newActiveFile = {} as ITreeNode;
        if (filesIsFirst) {
          if (nextFile) {
            newActiveFile = filesOpen[1];
          }
        }
        if (filesIsLast) {
          if (prevFile) {
            newActiveFile = prevFile;
          }
        }
        if (!filesIsFirst && !filesIsLast) {
          newActiveFile = nextFile;
        }
        dispatch(setSelectedNode(newActiveFile));
        dispatch(removeFileOpen({ treeNode, newActiveFile: newActiveFile }));
      } else {
        if (fileIsOnly) {
          let newActiveFile = {} as ITreeNode;
          dispatch(setSelectedNode(newActiveFile));
          dispatch(removeFileOpen({ treeNode, newActiveFile }));
        } else {
          dispatch(removeFileOpen({ treeNode, newActiveFile: fileActive }));
        }
      }
    }
  }

  return (
    <Container
      className="tabs-container"
      ref={useRef}
    >
      <Tabs className="tabs">
        {filesOpen.map(p => (
          <Tab
            key={p.full_name}
            active={p.isFileActive}
            className="tab"
            onClick={() => handleClick(p)}
            onMouseDown={e => handleMiddleClick(e, p)}
            ref={p.isFileActive ? activatedTabRef : undefined}
          >
            <img
              src={p.icon}
              alt={p.name}
              height="16"
              width="16"
            />
            <span>{p.name}</span>
          </Tab>
        ))}
      </Tabs>
    </Container>
  );
}
