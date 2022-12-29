import Split from 'react-split';

import { styled } from '../styled';

export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  overflow: 'hidden',
});

export const Splitter = styled(Split, {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',

  '.gutter-horizontal': {
    cursor: 'col-resize',
  },
});
