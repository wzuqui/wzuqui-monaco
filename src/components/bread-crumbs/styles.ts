import { ChevronIconSvg } from '../../icons/ChevronIconSvg';
import { styled } from '../../styled';

export const Container = styled('div', {
  alignItems: 'center',
  color: '$secondary',
  display: 'flex',
  flexDirection: 'row',
  fill: '$secondary',
  gap: '.25rem',
  paddingLeft: '1rem',
  userSelect: 'none',
});

export const Item = styled('div', {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  gap: '.25rem',

  '&:hover': {
    color: '$text',
    fill: '$text',
  },
});

export const Icon = styled('img', {
  height: '16px',
  width: '16px',
});

export const ChevronIcon = styled(ChevronIconSvg, {
  height: '16px',
  width: '16px',
});
