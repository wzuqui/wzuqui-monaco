import { styled } from '../styled';
import { MonacoTreeFile } from './monaco-tree-file/monaco-tree-file.component';
import { ContextMenuAction } from './monaco-tree-file/monaco-tree-file.type';
import { MonacoTreeElement } from './monaco-tree.type';

interface MonacoTreeProps {
  theme?: 'vs-dark' | 'vs-light';
  tree?: MonacoTreeElement[];
  width?: number;
  height?: number;
  clickFile?: (file: string) => void;
  clickContextMenu?: (event: ContextMenuAction) => void;
}

export function MonacoTree({ theme = 'vs-dark', tree = [], width = 300, height = 500, ...props }: MonacoTreeProps) {
  function handleClickContextMenu() {}
  function handleClickFile() {}

  return (
    <Container
      className="monaco-tree"
      theme={theme}
      style={{
        width,
        height,
      }}
    >
      {tree.map((p, index) => (
        <MonacoTreeFile
          key={index}
          clickFile={handleClickFile}
          content={p.content}
          contextMenuClick={handleClickContextMenu}
          depth={0}
          hide={false}
          name={p.name}
          theme={theme}
        />
      ))}
    </Container>
  );
}

const Container = styled('div', {
  fontFamily: '$apple',
  userSelect: 'none',

  variants: {
    theme: {
      'vs-dark': {
        backgroundColor: '#1d1d1d',
        color: 'white',
      },
      'vs-light': {
        backgroundColor: 'rgb(243, 243, 243)',
        color: 'rgb(97, 97, 97)',
      },
    },
  },
});
