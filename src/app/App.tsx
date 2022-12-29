import { useMonaco } from '@monaco-editor/react';
import { useEffect } from 'react';

import { Explorer } from '../layouts/explorer/explorer';
import { Files } from '../layouts/files/files';
import { defineDraculaTheme } from '../themes/defineDraculaTheme';
import { Container, Splitter } from './styles';

export function App() {
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      defineDraculaTheme(monaco);
    }
  }, [monaco]);

  return (
    <Container className="container">
      <Splitter
        className="splitter"
        minSize={190}
        sizes={[20, 80]}
      >
        <Explorer />
        <Files />
      </Splitter>
    </Container>
  );
}
