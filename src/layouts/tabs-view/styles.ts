import { styled } from '../../styled';

export const Container = styled('div', {
  flexShrink: 0,
  overflowX: 'auto',
  overflowY: 'hidden',
});

export const Tab = styled('div', {
  alignItems: 'center',
  backgroundColor: '$background',
  borderTop: '1px solid transparent',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  gap: '0.5rem',
  height: '35px',
  padding: '0 1rem',
  userSelect: 'none',

  variants: {
    active: {
      true: {
        backgroundColor: '$tab-active-background',
        borderColor: '$tab-active-border',
      },
    },
  },
});

export const Tabs = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  flexShrink: 0,
  fontFamily: '$apple',
  fontSize: 'small',
});
