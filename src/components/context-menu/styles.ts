import { styled } from '../../styled';

export const Container = styled('div', {});

export const ContextMenuContainer = styled('div', {
  backgroundColor: '$context-menu-background',
  borderRadius: '4px',
  boxShadow: '$context-menu-box-shadow',
  fontSize: '12px',
  left: '0',
  padding: '0.2rem',
  position: 'fixed',
  top: '0',
  zIndex: 1,
});

export const Items = styled('ul', {
  listStyle: 'none',
  padding: '0',
  margin: '0',
});

export const Item = styled('li', {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0.5em 1em',
  borderRadius: '4px',

  '&:hover': {
    backgroundColor: '$hover',
  },

  '> span.shortcut': {
    paddingLeft: '50px',
  },

  variants: {
    disabled: {
      true: {
        color: '$context-menu-item-disabled',

        '&:hover': {
          backgroundColor: '$context-menu-background',
        },
      },
    },
    separator: {
      true: {
        height: '1px',
        backgroundColor: '$context-menu-item-separator',
        padding: '0',

        '> span': {
          display: 'none',
        },

        '&:hover': {
          backgroundColor: '$context-menu-item-separator',
        },
      },
    },
  },
});
