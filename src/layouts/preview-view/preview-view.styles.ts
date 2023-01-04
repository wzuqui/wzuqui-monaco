import { styled } from '../../styled';

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '$tab-active-background',
});

export const Content = styled('div', {
  display: 'flex',
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto',
  width: '100%',
});

export const Header = styled('div', {
  color: '$text',
  display: 'flex',
  height: '24px',
  backgroundColor: '$background',

  a: {
    color: '$text',
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'underline',
    },

    '&:active': {
      color: '$text',
    },
  },
});

export const Iframe = styled('iframe', {
  backgroundColor: 'white',
  border: 'none',
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto',
  width: '100%',
});
