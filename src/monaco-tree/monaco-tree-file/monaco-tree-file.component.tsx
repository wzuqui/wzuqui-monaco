import { useRef, useState } from 'react';
import { VscChevronDown } from 'react-icons/vsc';
import { useClickOutside } from '../../hooks/useClickOutside';

import { styled } from '../../styled';
import { MonacoTreeContextMenu } from '../monaco-tree-context-menu/monaco-tree-context-menu.component';
import {
  ContextMenuElementSeparator,
  ContextMenuElementText,
} from '../monaco-tree-context-menu/monaco-tree-context-menu.type';
import { MonacoTreeElement } from '../monaco-tree.type';
import { extensions } from '../utils/extension-icon';
import { files } from '../utils/file-icon';
import { folders } from '../utils/folder-icon';
import { ContextMenuAction } from './monaco-tree-file.type';

interface MonacoTreeFileProps {
  content?: MonacoTreeElement[] | undefined | null;
  depth?: number;
  hide?: boolean;
  name?: string;
  theme?: 'vs-dark' | 'vs-light';
  clickFile?: (name: string) => void;
  contextMenuClick?: (event: ContextMenuAction) => void;
}

export function MonacoTreeFile({
  content = undefined,
  depth = 0,
  hide = false,
  name = '',
  theme = 'vs-dark',
  ...props
}: MonacoTreeFileProps) {
  const ref = useRef(null);
  const [contextMenuIsOpen, setContextMenuIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<[number, number] | undefined>([-1000, -1000]);
  const contextMenuClick = (event: ContextMenuAction) => {
    props.contextMenuClick && props.contextMenuClick(event);
  };
  const contextMenu: Array<ContextMenuElementSeparator | ContextMenuElementText> = [
    {
      type: 'element',
      name: 'New File',
      action: () => {
        contextMenuClick(['new_file', name]);
        setPosition([-1000, -1000]);
      },
    },
    {
      type: 'element',
      name: 'New Directory',
      action: () => {
        contextMenuClick(['new_directory', name]);
        setPosition([-1000, -1000]);
      },
    },
    { type: 'separator' },
    {
      type: 'element',
      name: 'Rename',
      action: () => {
        contextMenuClick(['rename_file', name]);
        setPosition([-1000, -1000]);
      },
    },
    {
      type: 'element',
      name: 'Delete',
      action: () => {
        contextMenuClick(['delete_file', name]);
        setPosition([-1000, -1000]);
      },
    },
  ];
  const isFolder = content !== null && content !== undefined;
  const icon = getIcon(isFolder, name, open);

  function toggle() {
    setOpen(!open);
    props.clickFile && props.clickFile(name);
  }

  function handleRightClick() {}
  function handleClickFile() {}
  function handleRightClickFile(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    const pos = getAbsolutePosition(event.target);
    setContextMenuIsOpen(true);
    setPosition(p => [pos.x, pos.y]);
  }

  useClickOutside(
    ref,
    () => {
      setContextMenuIsOpen(false);
      setPosition([-1000, -1000]);
    },
    contextMenuIsOpen
  );

  return (
    <Container
      ref={ref}
      className="monaco-tree-container"
    >
      <Row
        className="monaco-tree-row"
        hide={hide}
        onClick={toggle}
        onContextMenu={handleRightClickFile}
        theme={theme}
      >
        <span style={{ marginLeft: 10 * depth }}></span>
        {isFolder && (
          <Arrow
            className="monaco-tree-arrow"
            open={open}
          >
            <VscChevronDown />
          </Arrow>
        )}
        <Icon src={'assets/icons/' + icon + '.svg'} />
        <Name>
          {name} |{position}
        </Name>
      </Row>
      <MonacoTreeContextMenu
        elements={contextMenu}
        left={position ? position[0] : undefined}
        top={position ? position[1] : undefined}
      />
      {content?.map((p, index) => (
        <MonacoTreeFile
          key={index}
          content={p.content}
          depth={depth + 1}
          hide={!open || hide}
          name={p.name}
          theme={theme}
          contextMenuClick={handleRightClick}
          clickFile={handleClickFile}
        />
      ))}
    </Container>
  );
}

function getIcon(folder: boolean, name: string, open: boolean) {
  if (folder) {
    if (Object.keys(folders).includes(name)) {
      const icon = folders[name as keyof typeof folders];
      if (open) return icon + '-open';
      else return icon;
    } else {
      if (open) return 'folder-open';
      else return 'folder';
    }
  } else {
    if (Object.keys(files).includes(name)) {
      return files[name as keyof typeof files];
    } else {
      let splited = name.split('.');
      while (splited.length > 0) {
        splited = splited.slice(1);
        const ext = splited.join('.');
        if (ext && Object.keys(extensions).includes(ext)) {
          return extensions[ext as keyof typeof extensions];
        }
      }
      return 'file';
    }
  }
}

const Container = styled('div', {});

const Row = styled('div', {
  fontSize: '14px',
  lineHeight: '24px',
  display: 'flex',
  gap: '6px',
  cursor: 'pointer',
  paddingLeft: '32px',

  variants: {
    theme: {
      'vs-dark': {
        '&:hover': {
          background: '#2a2d2e',
        },
        '&:active': {
          background: 'rgb(63, 63, 70)',
        },
      },
      'vs-light': {
        '&:hover': {
          background: '#e8e8e8',
        },
        '&:active': {
          background: '#e4e6f1',
        },
      },
    },
    hide: {
      true: {
        display: 'none',
      },
    },
  },
});

const Icon = styled('img', { width: '16px', height: '22px' });

const Arrow = styled('i', {
  marginLeft: '-18px',
  width: '12px',
  height: '22px',
  lineHeight: '22px',
  position: 'relative',
  top: '2px',
  transform: 'rotate(-90deg)',

  variants: {
    open: {
      true: {
        transform: 'rotate(0deg)',
        left: '-2px',
      },
    },
  },
});

const Name = styled('div', {});

function getAbsolutePosition(element: any) {
  const r = { x: element.offsetLeft, y: element.offsetTop };
  if (element.offsetParent) {
    const tmp = getAbsolutePosition(element.offsetParent);
    r.x += tmp.x;
    r.y += tmp.y;
  }
  return r;
}
