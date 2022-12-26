import Split from 'react-split';
import { useEffect, useRef, useState } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import { emmetHTML, emmetCSS } from 'emmet-monaco-es';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

import { useDebounce } from './hooks/useDebounce';
import { useKeyboardShortcut } from './hooks/useKeyboardShortcut';
import { GitHubLogin } from './github/GitHubLogin';
import { obterUrlEstado } from './helpers/obterUrlEstado';
import { repaint } from './helpers/repaint';
import { emmetReact } from './helpers/emmetReact';
import { salvarUrlEstado } from './helpers/salvarUrlEstado';
import { styled } from './styled';
import { ReactIcon } from './icons/ReactIcon';
import { TypeScriptIcon } from './icons/TypeScriptIcon';
import { SassIcon } from './icons/Sass';
import { HtmlIcon } from './icons/HtmlIcon';

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
    <Container className="container">
      <Splitter className="splitter">
        <Editors className="editors">
          <Header>
            <Abas className="abas">
              <Aba
                ativa={abaAtiva === 'html'}
                onClick={() => setAbaAtiva('html')}
              >
                <HtmlIcon />
                <span>index.html</span>
              </Aba>
              <Aba
                ativa={abaAtiva === 'typescript'}
                onClick={() => setAbaAtiva('typescript')}
              >
                <ReactIcon />
                <span>index.tsx</span>
              </Aba>
              <Aba
                ativa={abaAtiva === 'scss'}
                onClick={() => setAbaAtiva('scss')}
              >
                <SassIcon />
                <span>index.scss</span>
              </Aba>
            </Abas>
            <div>
              <button onClick={() => acaoSalvar()}>Salvar</button>
              <GitHubLogin />
            </div>
          </Header>
          <EditorItens className="editor-itens">
            <EditorItem hidden={!(abaAtiva === 'html')}>
              <Editor
                height="100%"
                defaultLanguage="html"
                defaultValue={html}
                beforeMount={acaoHtmlBeforeMount}
                theme={'vs-dark'}
                onChange={acaoHtml}
                options={{ minimap: { enabled: false } }}
              />
            </EditorItem>
            <EditorItem hidden={!(abaAtiva === 'typescript')}>
              <Editor
                height="100%"
                defaultLanguage="typescript"
                beforeMount={acaoTypescriptBeforeMount}
                theme={'vs-dark'}
                onChange={acaoTypescript}
                onMount={acaoTypescriptMount}
                options={{ minimap: { enabled: false } }}
              />
            </EditorItem>
            <EditorItem hidden={!(abaAtiva === 'scss')}>
              <Editor
                height="100%"
                defaultLanguage="scss"
                defaultValue={scss}
                beforeMount={acaoScssBeforeMount}
                theme={'vs-dark'}
                onChange={acaoScss}
                options={{ minimap: { enabled: false } }}
              />
            </EditorItem>
          </EditorItens>
        </Editors>
        <Preview>
          <PreviewItem ref={iframeRef}></PreviewItem>
        </Preview>
      </Splitter>
    </Container>
  );
}

const Container = styled('div', {
  display: 'flex',
  height: '100%',
  overflow: 'hidden',
});

const Splitter = styled(Split, {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
});

const Preview = styled('div', {
  width: '100%',
  height: '100%',
  flex: '1 1 auto',
  overflow: 'auto',
});

const Editors = styled('div', {
  width: '100%',
  height: '100%',
  flex: '1 1 auto',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
});

const EditorItens = styled('div', {
  flex: '1 1 auto',
  display: 'flex',
  flexDirection: 'column',
});

const EditorItem = styled('div', {
  flex: '1 1 auto',
  width: '100%',
});

const Header = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '#202327',
});

const Abas = styled('div', 'Abas', {
  display: 'flex',
});

const Aba = styled('div', {
  height: '38px',
  border: 'none',
  borderRight: '1px solid #15181e',
  backgroundColor: '#26292e',
  padding: '0 12px',
  fontSize: 'small',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  cursor: 'pointer',
  gap: '8px',

  variants: {
    ativa: {
      true: {
        backgroundColor: '#15181e',
      },
    },
  },

  '> svg': {
    width: '16px',
    height: '16px',
  },
});

const PreviewItem = styled('iframe', {
  width: '100%',
  height: '100%',
  border: 'none',
});
