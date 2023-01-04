import { createStitches } from '@stitches/react';

export const { styled, globalCss: globalCssBase } = createStitches({
  theme: {
    colors: {
      background: '#21222c',
      hover: '#313241',
      text: 'white',
      secondary: '#6272a4',
      'context-menu-background': '#343746',
      'context-menu-box-shadow': '#252526',
      'context-menu-item-disabled': '#61636E',
      'context-menu-item-separator': '#606060',
      'tab-active-background': '#282A36',
      'tab-active-border': '#94517E',
      'tabs-background': '#191a21',
      'tree-node-selected': '#44475A',
      'tree-node-selected-border': '$secondary',
    },
    fonts: {
      apple:
        '-apple-system,BlinkMacSystemFont,Segoe WPC,Segoe UI,HelveticaNeue-dark,Ubuntu,Droid Sans,sans-serif',
      normal: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    shadows: {
      'context-menu-box-shadow': '0px 0px 10px 0px #252526',
    },
  },
});

export const globalCss = globalCssBase({
  'html, body, #root': {
    backgroundColor: '$background',
    color: '$text',
    fontFamily: '$normal',
    height: '100%',
    margin: '0',
    padding: '0',
  },

  '*': { scrollbarWidth: 'auto', scrollbarColor: '$hover $background' },
  '*::-webkit-scrollbar': { width: '8px', height: '8px' },
  '*::-webkit-scrollbar-track': { background: '$background' },
  '*::-webkit-scrollbar-thumb': {
    backgroundColor: '$hover',
    borderRadius: '0px',
    border: '0',
  },
});
