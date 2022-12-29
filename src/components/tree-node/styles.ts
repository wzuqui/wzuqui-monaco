import { ChevronIconSvg } from '../../icons/ChevronIconSvg';
import { styled } from '../../styled';
import { ContextMenu } from '../context-menu/context-menu';

export const ChevronIcon = styled(ChevronIconSvg, {
  variants: {
    isFile: {
      true: {
        fill: 'transparent',
      },
    },
    isOpen: {
      true: {
        transform: 'rotate(90deg)',
      },
    },
  },
});

export const Container = styled('ul', {
  fontFamily: '$apple',
  fontSize: 'small',
  margin: '0',
  padding: '0',
  userSelect: 'none',
});

export const TreeNodeItem = styled(ContextMenu, {
  alignItems: 'center',
  border: '1px solid transparent',
  boxSizing: 'border-box',
  display: 'flex',
  gap: '.1rem',
  height: '20px',
  padding: '.3rem',
  position: 'relative',

  '&::before': {
    content: '',
    display: 'block',
  },

  '&:hover': {
    backgroundColor: '$hover',
  },

  '> img': {
    width: '14px',
    height: '15px',
  },

  '> span.name': {
    marginLeft: '.3rem',
  },

  variants: {
    selected: {
      true: {
        backgroundColor: '$tree-node-selected',
        borderColor: '$tree-node-selected-border',

        '&:hover': {
          backgroundColor: '$tree-node-selected',
        },
      },
    },
  },
});

export const TreeNodeItemContent = styled('li', {
  variants: {
    isOpen: {
      true: {
        display: 'block',
      },
    },
    isClosed: {
      true: {
        display: 'none',
      },
    },
  },
});
