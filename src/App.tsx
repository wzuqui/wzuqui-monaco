import { useRef, useState } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { emmetHTML, emmetCSS, emmetJSX } from 'emmet-monaco-es';

import styles from './App.module.css';

type Tabs = 'html' | 'typescript' | 'scss';

export function App() {
  const [tabActive, setTabActive] = useState<Tabs>('html');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  function handleHTMLEditorWillMount(monaco: Monaco) {
    emmetHTML(monaco);
  }
  function handleTypeScriptEditorWillMount(monaco: Monaco) {
    emmetJSX(monaco);
  }
  function handleSCSSEditorWillMount(monaco: Monaco) {
    emmetCSS(monaco);
  }
  function handleHTMLChange(value?: string) {
    if (iframeRef.current) {
      if (iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.document.open();
        iframeRef.current.contentWindow.document.write(value ?? '');
        iframeRef.current.contentWindow.document.close();
      }
    }
  }
  function handleSCSSChange(value?: string) {
    if (value) {
      try {
        (window as any).Sass.compile(
          value,
          null,
          (result: { text: string }) => {
            const cssLink = document.createElement('style');
            cssLink.textContent = result.text;

            if (iframeRef.current) {
              if (iframeRef.current.contentWindow) {
                iframeRef.current.contentWindow.document.head.appendChild(
                  cssLink
                );
              }
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className={styles.app}>
      <div className={styles.editors}>
        <div className={styles.editorTabs}>
          <button onClick={() => setTabActive('html')}>HTML</button>
          <button onClick={() => setTabActive('typescript')}>TypeScript</button>
          <button onClick={() => setTabActive('scss')}>SCSS</button>
        </div>
        <div className={styles.editorItem}>
          <div hidden={!(tabActive === 'html')}>
            <Editor
              height="100%"
              defaultLanguage="html"
              defaultValue="// html"
              beforeMount={handleHTMLEditorWillMount}
              theme={'vs-dark'}
              onChange={handleHTMLChange}
            />
          </div>
          <div hidden={!(tabActive === 'typescript')}>
            <Editor
              height="100%"
              defaultLanguage="typescript"
              defaultValue="// typescript"
              beforeMount={handleTypeScriptEditorWillMount}
              theme={'vs-dark'}
            />
          </div>
          <div hidden={!(tabActive === 'scss')}>
            <Editor
              height="100%"
              defaultLanguage="scss"
              defaultValue="// scss"
              beforeMount={handleSCSSEditorWillMount}
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
