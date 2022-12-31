import { EditorFileView } from '../editor-file-view/editor-file-view';
import { TabsView } from '../tabs-view/tabs-view';
import { Container } from './styles';

export function EditorView() {
  return (
    <Container className="editor-view">
      <TabsView />
      <EditorFileView />
    </Container>
  );
}
