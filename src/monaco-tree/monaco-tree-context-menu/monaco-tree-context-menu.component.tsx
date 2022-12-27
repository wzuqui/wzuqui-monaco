import { useRef, useState } from 'react';

import { useClickOutside } from '../../hooks/useClickOutside';
import { styled } from '../../styled';
import { ContextMenuElementSeparator, ContextMenuElementText } from './monaco-tree-context-menu.type';

interface MonacoTreeContextMenuProps {
  top?: number | undefined;
  left?: number | undefined;
  elements: Array<ContextMenuElementSeparator | ContextMenuElementText>;
}

export function MonacoTreeContextMenu(props: MonacoTreeContextMenuProps) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  useClickOutside(ref, () => setIsOpen(false), isOpen);

  return (
    <Container
      className="monaco-tree-context-menu"
      isOpen={isOpen}
      ref={ref}
      style={{ top: props.top, left: props.left }}
    >
      <Menu className="monaco-tree-context-menu__menu">
        {props.elements.map((p, index) => (
          <Item key={index}>{p.type === 'element' ? <a>{p.name}</a> : null}</Item>
        ))}
      </Menu>
    </Container>
  );
}

const Container = styled('div', {
  position: 'absolute',
  color: 'rgb(240, 240, 240)',
  backgroundColor: 'rgb(60, 60, 60)',
  fontFamily: 'Roboto, sans-serif',
  fontSize: '0.8em',
  fontWeight: 200,

  variants: {
    isOpen: {
      false: {
        top: -1000,
        left: -1000,
      },
    },
  },
});

const Menu = styled('ul', {
  padding: '0',
  margin: '0',
  listStyleType: 'none',
  minWidth: '150px',
});

const Item = styled('li', {
  display: 'flex',
  alignItems: 'center',
  height: '2em',
  margin: '10px 0',

  variants: {
    type: {
      element: {
        padding: '0 12px',
        cursor: 'pointer',

        '&:hover': {
          background: 'rgb(9, 71, 133)',
        },
      },
      separator: {
        width: '80%',
        margin: '10px auto',
        height: '1px',
        background: 'rgb(240, 240, 240)',
      },
    },
  },
});
