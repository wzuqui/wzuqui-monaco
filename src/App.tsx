import { useEffect, useRef, useState } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { emmetHTML, emmetCSS, emmetJSX } from 'emmet-monaco-es';

import styles from './App.module.css';
import { convertSCSS } from './convert-scss';
import {
  converteParaHTMLScriptElement,
  convertTypeScript,
} from './convert-typescript';
import { useDebounce } from './hooks/useDebounce';
import { useKeyboardShortcut } from './hooks/useKeyboardShortcut';

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
    html: '<div id="app"></div>',
    scss: '#app {}',
    typescript: `const app = document.querySelector('#app');\nconsole.log(app)`,
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
  function appendHTML(text: string) {
    if (iframeRef.current) {
      if (iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.document.open();
        iframeRef.current.contentWindow.document.write(text ?? '');
        iframeRef.current.contentWindow.document.close();
      }
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
        iframeRef.current.contentWindow.document.close();
      }
    }
    appendHTML(html);
    appendStyle(scss);
    appendTypeScript(typescript);
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
      noImplicitAny: false,
      strictNullChecks: false,
      strictFunctionTypes: false,
      strictPropertyInitialization: false,
      noImplicitReturns: false,
      noImplicitThis: false,
      removeComments: false,
      experimentalDecorators: false,
      emitDecoratorMetadata: false,
      allowNonTsExtensions: true,
      target: monaco.languages.typescript.ScriptTarget.ES2020,
    });

    setTypeScriptEditor(true);
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
            />
          </div>
          <div hidden={!(tabActive === 'typescript')}>
            <Editor
              height="100%"
              defaultLanguage="typescript"
              defaultValue={typescript}
              beforeMount={handleTypeScriptEditor}
              theme={'vs-dark'}
              onChange={handleTypeScriptChange}
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
