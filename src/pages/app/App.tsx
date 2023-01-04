import { EditorView } from '../../layouts/editor-view/editor-view';
import { ExplorerView } from '../../layouts/explorer-view/explorer-view';
import { PreviewView } from '../../layouts/preview-view/preview-view';
import { Container, Splitter } from './styles';

export function App() {
  return (
    <Container className="container">
      <Splitter
        className="splitter"
        minSize={0}
        sizes={[20, 40, 40]}
      >
        <ExplorerView />
        <EditorView />
        <PreviewView />
      </Splitter>
    </Container>
  );
}
