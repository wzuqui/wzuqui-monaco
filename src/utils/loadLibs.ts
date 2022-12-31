import { Monaco } from '@monaco-editor/react';
import { emmetCSS, emmetHTML, emmetJSX } from 'emmet-monaco-es';
import { defaultRoot } from '../features/workspace/initialState';

export function loadLibs(monaco: Monaco) {
  emmetJSX(monaco);
  emmetCSS(monaco);
  emmetHTML(monaco);

  const libs = import.meta.glob(
    [
      '../../node_modules/@types/react/*.d.ts',
      '../../node_modules/@types/react-dom/*.d.ts',
      '../../node_modules/@types/react-dom/*.d.ts',
      '../../node_modules/react/umd/react.development.js',
      '../../node_modules/react-dom/umd/react-dom.development.js',
    ],
    { as: 'raw' }
  );

  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `declare module ReactDOM {
      export function createRoot(container: Element | DocumentFragment, options?: RootOptions): Root;
    }`,
    defaultRoot + 'react-dom.d.ts'
  );

  Object.entries(libs).forEach(([key, promise]) => {
    const keySanitize = key.replace('../../node_modules/', defaultRoot + 'node_modules/');

    promise().then(value => {
      console.log('loaded lib', keySanitize);
      monaco.languages.typescript.typescriptDefaults.addExtraLib(value, keySanitize);
    });
  });

  monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
}
