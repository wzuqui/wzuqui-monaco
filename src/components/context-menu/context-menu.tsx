import { HTMLAttributes, PropsWithChildren, useEffect, useRef, useState } from 'react';

import { Container, ContextMenuContainer, Item, Items } from './styles';

export interface IContextMenuItem {
  action:
    | 'new-file'
    | 'new-folder'
    | 'separator'
    | 'cut'
    | 'copy'
    | 'paste'
    | 'separator'
    | 'copy-path'
    | 'copy-relative-path'
    | 'separator'
    | 'rename'
    | 'delete';
  key: string;
  name?: string;
  type?: 'separator';
  shortcut?: string;
  disabled?: boolean;
}

interface ContextMenuProps extends PropsWithChildren<HTMLAttributes<HTMLElement>> {
  onContextMenuItem?: (item: IContextMenuItem) => void;
}

export function ContextMenu({ children, onContextMenuItem, ...props }: ContextMenuProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function handleClick(
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    item: IContextMenuItem
  ) {
    event.stopPropagation();
    if (item.disabled) return;
    if (item.type === 'separator') return;

    setShowMenu(p => false);
    onContextMenuItem && onContextMenuItem(item);
  }

  function handleContextMenu(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    setShowMenu(p => true);
    setPosition({ x: event.clientX, y: event.clientY });
  }

  function handleClickOutside(event: MouseEvent) {
    if (menuRef.current && !menuRef.current.contains(event.target as any)) {
      setShowMenu(p => false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('contextmenu', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('contextmenu', handleClickOutside);
    };
  }, []);

  const items: IContextMenuItem[] = [
    {
      action: 'new-file',
      key: 'new-file',
      name: 'New File...',
    },
    {
      action: 'new-folder',
      key: 'new-folder',
      name: 'New Folder...',
    },
    {
      action: 'separator',
      key: 'separator-1',
      type: 'separator',
    },
    {
      action: 'cut',
      key: 'cut',
      name: 'Cut',
      shortcut: 'Ctrl+X',
    },
    {
      action: 'copy',
      key: 'copy',
      name: 'Copy',
      shortcut: 'Ctrl+C',
    },
    {
      action: 'paste',
      key: 'paste',
      name: 'Paste',
      shortcut: 'Ctrl+V',
      disabled: true,
    },
    {
      action: 'separator',
      key: 'separator-2',
      type: 'separator',
    },
    {
      action: 'copy-path',
      key: 'copy-path',
      name: 'Copy Path',
      shortcut: 'Shift+Alt+C',
    },
    {
      action: 'copy-relative-path',
      key: 'copy-relative-path',
      name: 'Copy Relative Path',
      shortcut: 'CTRL+K Ctrl+Shift+C',
    },
    {
      action: 'separator',
      key: 'separator-3',
      type: 'separator',
    },
    {
      action: 'rename',
      key: 'rename',
      name: 'Rename...',
      shortcut: 'F2',
    },
    {
      action: 'delete',
      key: 'delete',
      name: 'Delete',
      shortcut: 'Delete',
    },
  ];

  function ContextMenuItem({ item }: { item: IContextMenuItem }) {
    return (
      <Item
        className="item"
        disabled={item.disabled}
        onClick={e => handleClick(e, item)}
        separator={item.type === 'separator'}
      >
        <span className="name">{item.name}</span>
        <span className="shortcut">{item.shortcut}</span>
      </Item>
    );
  }

  return (
    <Container
      {...props}
      onContextMenu={handleContextMenu}
      ref={menuRef}
    >
      {children}
      {showMenu && (
        <ContextMenuContainer
          className="context-menu"
          style={{
            left: position.x,
            top: position.y,
          }}
        >
          <Items className="items">
            {items.map(p => (
              <ContextMenuItem
                key={p.key}
                item={p}
              />
            ))}
          </Items>
        </ContextMenuContainer>
      )}
    </Container>
  );
}
