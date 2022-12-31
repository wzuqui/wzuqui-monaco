import { EditorView } from '../layouts/editor-view/editor-view';
import { ExplorerView } from '../layouts/explorer-view/explorer-view';
import { Container, Splitter } from './styles';

export function App() {
  return (
    <Container className="container">
      <Splitter
        className="splitter"
        minSize={190}
        sizes={[20, 80]}
      >
        <ExplorerView />
        <EditorView />
      </Splitter>
    </Container>
  );
}
