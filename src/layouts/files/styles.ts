import { styled } from '../../styled';

export const Container = styled('div', {
  display: 'flex',
  height: '100vw',
  flexDirection: 'column',
});

export const EditorContainer = styled('div', {
  height: '100%',
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

export const TabsContainer = styled('div', {
  flexShrink: 0,
  overflowX: 'auto',
  overflowY: 'hidden',
});

export const Header = styled('div', {
  flexShrink: 0,
});

export const BreadCrumbsContainer = styled('div', {
  backgroundColor: '$tab-active-background',
});
