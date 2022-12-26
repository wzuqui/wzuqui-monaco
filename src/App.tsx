import Split from 'react-split';
import { useEffect, useRef, useState } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { emmetHTML, emmetCSS } from 'emmet-monaco-es';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

import styles from './App.module.css';
import { useDebounce } from './hooks/useDebounce';
import { useKeyboardShortcut } from './hooks/useKeyboardShortcut';
import { GitHubLogin } from './github/GitHubLogin';
import { obterUrlEstado } from './helpers/obterUrlEstado';
import { repaint } from './helpers/repaint';
import { emmetReact } from './helpers/emmetReact';
import { salvarUrlEstado } from './helpers/salvarUrlEstado';

type Abas = 'html' | 'typescript' | 'scss';
enum Carregado {
  nenhum = 0,
  html = 1,
  typescript = 2,
  scss = 4,
  todos = 7,
}

export function App() {
  const urlEstado = obterUrlEstado();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [abaAtiva, setAbaAtiva] = useState<Abas>('html');
  const [html, setHtml] = useState(urlEstado.html);
  const [scss, setScss] = useState(urlEstado.scss);
  const [typescript, setTypescript] = useState(urlEstado.typescript);
  const [carregado, setCarregado] = useState(Carregado.nenhum);
  const [setDebouncing] = useDebounce(() => {
    repaint(iframeRef, html, scss, typescript);
  }, 2000);

  useEffect(() => {
    repaint(iframeRef, html, scss, typescript);
  }, [iframeRef, carregado]);

  useKeyboardShortcut(
    (p) => p.ctrlKey && p.key == 's',
    (p) => {
      p.preventDefault();
      const resposta = confirm(
        'Salvar irá substituir a url acima, deseja continuar?'
      );
      if (resposta) {
        acaoSalvar();
      }
    }
  );

  function acaoTypescriptMount(
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) {
    const model = monaco.editor.createModel(
      typescript,
      'typescript',
      monaco.Uri.parse('file:///index.tsx')
    );
    editor.setModel(model);
  }
  function acaoHtmlBeforeMount(monaco: Monaco) {
    emmetHTML(monaco);
    setCarregado((p) => p | Carregado.html);
  }
  function acaoScssBeforeMount(monaco: Monaco) {
    emmetCSS(monaco);
    setCarregado((p) => p | Carregado.scss);
  }
  function acaoTypescriptBeforeMount(monaco: Monaco) {
    emmetReact(monaco);
    setCarregado((p) => p | Carregado.typescript);
  }
  function acaoHtml(value?: string) {
    setHtml(value ?? '');
    setDebouncing(true);
  }
  function acaoScss(value?: string) {
    setScss(value ?? '');
    setDebouncing(true);
  }
  function acaoTypescript(value?: string) {
    setTypescript(value ?? '');
    setDebouncing(true);
  }
  function acaoSalvar() {
    salvarUrlEstado(html, scss, typescript);
  }

  return (
    <div className={styles.app}>
      <Split direction="horizontal" className={styles.split}>
        <div className={styles.editors}>
          <div className={styles.editorTabs}>
            <button onClick={() => setAbaAtiva('html')}>HTML</button>
            <button onClick={() => setAbaAtiva('typescript')}>
              TypeScript
            </button>
            <button onClick={() => setAbaAtiva('scss')}>SCSS</button>
            <div>|</div>
            <button onClick={() => acaoSalvar()}>Salvar</button>
            <GitHubLogin />
          </div>
          <div className={styles.editorItem}>
            <div hidden={!(abaAtiva === 'html')}>
              <Editor
                height="100%"
                defaultLanguage="html"
                defaultValue={html}
                beforeMount={acaoHtmlBeforeMount}
                theme={'vs-dark'}
                onChange={acaoHtml}
                options={{ minimap: { enabled: false } }}
              />
            </div>
            <div hidden={!(abaAtiva === 'typescript')}>
              <Editor
                height="100%"
                defaultLanguage="typescript"
                beforeMount={acaoTypescriptBeforeMount}
                theme={'vs-dark'}
                onChange={acaoTypescript}
                onMount={acaoTypescriptMount}
                options={{ minimap: { enabled: false } }}
              />
            </div>
            <div hidden={!(abaAtiva === 'scss')}>
              <Editor
                height="100%"
                defaultLanguage="scss"
                defaultValue={scss}
                beforeMount={acaoScssBeforeMount}
                theme={'vs-dark'}
                onChange={acaoScss}
                options={{ minimap: { enabled: false } }}
              />
            </div>
          </div>
        </div>
        <div className={styles.preview}>
          <iframe ref={iframeRef}></iframe>
        </div>
      </Split>
    </div>
  );
}
