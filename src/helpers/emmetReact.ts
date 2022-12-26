import { Monaco } from '@monaco-editor/react';
import { emmetJSX } from 'emmet-monaco-es';
import { JsxEmit } from 'typescript';

export function emmetReact(monaco: Monaco) {
  emmetJSX(monaco);
  configuraTypescript(monaco);
  carregaLibs(monaco);
}

function configuraTypescript(monaco: Monaco) {
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    allowNonTsExtensions: true,
    emitDecoratorMetadata: false,
    esModuleInterop: true,
    experimentalDecorators: false,
    jsx: JsxEmit.React,
    noImplicitAny: false,
    noImplicitReturns: false,
    noImplicitThis: false,
    noSemanticValidation: true,
    noSyntaxValidation: true,
    removeComments: false,
    strictFunctionTypes: false,
    strictNullChecks: false,
    strictPropertyInitialization: false,
    target: monaco.languages.typescript.ScriptTarget.ES2020,
    typeRoots: ['node_modules/@types'],
  });
}

function carregaLibs(monaco: Monaco) {
  const libs = import.meta.glob(
    [
      '../../node_modules/@types/react/*.d.ts',
      '../../node_modules/@types/react-dom/*.d.ts',
    ],
    { as: 'raw' }
  );

  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `declare module ReactDOM {
      export function createRoot(container: Element | DocumentFragment, options?: RootOptions): Root;
    }`,
    'file:///./react-dom.d.ts'
  );

  Object.entries(libs).forEach(([key, promise]) => {
    const keySanitizado = key.replace(
      '../../node_modules/',
      'file:///./node_modules/'
    );

    promise().then((value) => {
      console.log('carregado lib', keySanitizado);
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        value,
        keySanitizado
      );
    });
  });

  monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
}
