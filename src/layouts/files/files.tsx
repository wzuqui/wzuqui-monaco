import React, { useEffect } from 'react';

import { BreadCrumbs } from '../../components/bread-crumbs/bread-crumbs';
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
import { EditorFile } from '../editor-file/editor-file';
import { BreadCrumbsContainer, Container, EditorContainer, Header, Tab, Tabs, TabsContainer } from './styles';

export function Files() {
  const useRef = React.useRef<HTMLDivElement>(null);
  const activatedTabRef = React.useRef<HTMLDivElement>(null);
  const dispatch = useRootDispatch();
  const filesOpen = useRootSelector(selectFilesOpen);
  const fileActive = useRootSelector(selectFileActive);

  useEffect(() => {
    console.log('useEffect Files');
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

  function handleMiddleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>, treeNode: ITreeNode) {
    if (event.button === 1) {
      event.preventDefault();
      const current_full_name = treeNode.full_name;
      const activeFile = fileActive.full_name;
      const firstFile = filesOpen[0].full_name;
      const lastFile = filesOpen[filesOpen.length - 1].full_name;

      const fileIsActive = current_full_name == activeFile;
      const filesIsFirst = current_full_name == firstFile;
      const filesIsLast = current_full_name === lastFile;
      const prevFile = filesOpen[filesOpen.findIndex(p => p.full_name === current_full_name) - 1];
      const nextFile = filesOpen[filesOpen.findIndex(p => p.full_name === current_full_name) + 1];

      let newActiveFile = {} as ITreeNode;
      if (fileIsActive) {
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
      }

      dispatch(setSelectedNode(newActiveFile));
      dispatch(removeFileOpen({ treeNode, newActiveFile }));
    }
  }

  return (
    <Container className="files">
      <Header>
        <TabsContainer
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
        </TabsContainer>
        {fileActive.full_name && (
          <BreadCrumbsContainer>
            <BreadCrumbs treeNode={fileActive} />
          </BreadCrumbsContainer>
        )}
      </Header>
      <EditorContainer className="editor-container">
        {fileActive.content && (
          <EditorFile
            key={fileActive.full_name}
            full_name={fileActive.full_name}
            treeNode={fileActive}
          />
        )}
      </EditorContainer>
    </Container>
  );
}
