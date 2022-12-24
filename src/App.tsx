import { useEffect, useRef, useState } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { emmetHTML, emmetCSS } from 'emmet-monaco-es';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { JsxEmit } from 'typescript';

import styles from './App.module.css';
import { convertSCSS } from './convert-scss';
import {
  converteParaHTMLScriptElement,
  convertTypeScript,
} from './convert-typescript';
import { useDebounce } from './hooks/useDebounce';
import { useKeyboardShortcut } from './hooks/useKeyboardShortcut';
import { defaultHTML } from './defaults/html';
import { defaultTypeScript } from './defaults/typescript';
import { defaultScss } from './defaults/scss';

type Tabs = 'html' | 'typescript' | 'scss';

function getURLState(): { html: string; scss: string; typescript: string } {
  if (location.hash.includes('#')) {
    try {
      const { html, scss, typescript } = JSON.parse(
        atob(location.hash.replace(/^#/g, ''))
      );
      return {
        html,
        scss,
        typescript,
      };
    } catch (error) {
      console.log('não conseguiu obter state', error);
    }
  }
  return {
    html: defaultHTML,
    scss: defaultScss,
    typescript: defaultTypeScript,
  };
}

export function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [tabActive, setTabActive] = useState<Tabs>('html');
  const [html, setHTML] = useState(getURLState().html);
  const [scss, setSCSS] = useState(getURLState().scss);
  const [typescript, setTypescript] = useState(getURLState().typescript);

  const [HTMLEditor, setHTMLEditor] = useState(false);
  const [TypeScriptEditor, setTypeScriptEditor] = useState(false);
  const [SCSSEditor, setSCSSEditor] = useState(false);

  const [_, setDebouncing] = useDebounce(() => {
    repaint();
  }, 2000);

  function appendStyle(text: string) {
    try {
      convertSCSS(text, (element: HTMLStyleElement) => {
        if (iframeRef.current) {
          if (iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.document.head.appendChild(element);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  function appendTypeScript(text: string) {
    if (iframeRef.current) {
      if (iframeRef.current.contentWindow) {
        try {
          const javascript = convertTypeScript(text);
          const element = converteParaHTMLScriptElement(javascript);
          iframeRef.current.contentWindow.document.body.appendChild(element);
        } catch {
          // ignored
        }
      }
    }
  }
  function repaint() {
    if (iframeRef.current) {
      if (iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.document.open();
        iframeRef.current.contentWindow.document.write(html);
        iframeRef.current.contentWindow.document.write(
          `<script src="//cdn.jsdelivr.net/npm/eruda"></script><script>eruda.init();eruda.show();</script>`
        );
        iframeRef.current.contentWindow.document.close();
        appendStyle(scss);
        appendTypeScript(typescript);
      }
    }
  }

  function handleHTMLEditor(monaco: Monaco) {
    emmetHTML(monaco);
    setHTMLEditor(true);
  }
  function handleSCSSEditor(monaco: Monaco) {
    emmetCSS(monaco);
    setSCSSEditor(true);
  }
  function handleTypeScriptEditor(monaco: Monaco) {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      allowNonTsExtensions: true,
      emitDecoratorMetadata: false,
      esModuleInterop: true,
      experimentalDecorators: false,
      jsx: JsxEmit.React,
      noImplicitAny: false,
      noImplicitReturns: false,
      noImplicitThis: false,
      noSemanticValidation: false,
      noSyntaxValidation: false,
      removeComments: false,
      strictFunctionTypes: false,
      strictNullChecks: false,
      strictPropertyInitialization: false,
      target: monaco.languages.typescript.ScriptTarget.ES2020,
    });

    const libs = import.meta.glob(
      [
        '../node_modules/@types/react/*.d.ts',
        '../node_modules/@types/react-dom/*.d.ts',
      ],
      { as: 'raw' }
    );

    Object.entries(libs).forEach(([key, promise]) => {
      const keySanitizado = key.replace('../node_modules/', '');

      promise().then((value) => {
        console.log('carregado lib', keySanitizado);
        monaco.languages.typescript.typescriptDefaults.addExtraLib(
          value,
          keySanitizado
        );
      });
    });

    monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);

    setTypeScriptEditor(true);
  }
  function handleTypeScriptDidMount(
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) {
    const model = monaco.editor.createModel(
      typescript,
      'typescript',
      monaco.Uri.parse('index.tsx')
    );

    editor.setModel(model);
  }

  function handleHTMLChange(value?: string) {
    setHTML(value ?? '');
    setDebouncing(true);
  }
  function handleSCSSChange(value?: string) {
    setSCSS(value ?? '');
    setDebouncing(true);
  }
  function handleTypeScriptChange(value?: string) {
    setTypescript(value ?? '');
    setDebouncing(true);
  }

  function handleSalvar() {
    window.location.hash =
      '#' +
      btoa(
        JSON.stringify({
          html,
          scss,
          typescript,
        })
      );
  }

  useKeyboardShortcut(
    (p) => p.ctrlKey && p.key == 's',
    (p) => {
      p.preventDefault();
      const resposta = confirm(
        'Salvar irá substituir a url acima, deseja continuar?'
      );
      if (resposta) {
        handleSalvar();
      }
    }
  );

  useEffect(
    function () {
      repaint();
    },
    [HTMLEditor, SCSSEditor, TypeScriptEditor]
  );
  return (
    <div className={styles.app}>
      <div className={styles.editors}>
        <div className={styles.editorTabs}>
          <button onClick={() => setTabActive('html')}>HTML</button>
          <button onClick={() => setTabActive('typescript')}>TypeScript</button>
          <button onClick={() => setTabActive('scss')}>SCSS</button>
          <div>|</div>
          <button onClick={() => handleSalvar()}>Salvar</button>
        </div>
        <div className={styles.editorItem}>
          <div hidden={!(tabActive === 'html')}>
            <Editor
              height="100%"
              defaultLanguage="html"
              defaultValue={html}
              beforeMount={handleHTMLEditor}
              theme={'vs-dark'}
              onChange={handleHTMLChange}
              options={{ minimap: { enabled: false } }}
            />
          </div>
          <div hidden={!(tabActive === 'typescript')}>
            <Editor
              height="100%"
              defaultLanguage="typescript"
              beforeMount={handleTypeScriptEditor}
              theme={'vs-dark'}
              onChange={handleTypeScriptChange}
              onMount={handleTypeScriptDidMount}
              options={{ minimap: { enabled: false } }}
            />
          </div>
          <div hidden={!(tabActive === 'scss')}>
            <Editor
              height="100%"
              defaultLanguage="scss"
              defaultValue={scss}
              beforeMount={handleSCSSEditor}
              theme={'vs-dark'}
              onChange={handleSCSSChange}
              options={{ minimap: { enabled: false } }}
            />
          </div>
        </div>
      </div>
      <div className={styles.preview}>
        <iframe ref={iframeRef}></iframe>
      </div>
    </div>
  );
}
