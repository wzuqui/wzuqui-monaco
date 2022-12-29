import Editor, { Monaco } from '@monaco-editor/react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { useState } from 'react';

import { setFileContent } from '../../features/filesOpen/filesOpenSlice';
import { setTreeNodeContent } from '../../features/workspace/workspaceSlice';
import { useDebounce } from '../../hooks/useDebounce';
import { useRootDispatch } from '../../hooks/useRootDispatch';
import { useVsCodeSettings } from '../../hooks/useVsCodeSettings';
import { ITreeNode } from '../../interfaces/tree-node';
import { Container } from './styles';

interface EditorFileProps {
  full_name: string;
  treeNode: ITreeNode;
}

export function EditorFile({ full_name, treeNode }: EditorFileProps): React.ReactElement {
  const dispatch = useRootDispatch();
  const [value, setValue] = useState<string>('');
  const [setDebounce] = useDebounce(() => {
    dispatch(setFileContent(value));
    dispatch(setTreeNodeContent({ treeNode, value }));
  }, 100);

  function handleMount(editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) {
    const value = `${treeNode.content}`;
    const file_name = `file:///${full_name}`;
    console.log(file_name);
    const file = monaco.Uri.parse(file_name);

    const model = monaco.editor.getModel(file) ?? monaco.editor.createModel(value, undefined, file);
    editor.setModel(model);
  }

  function handleChange(value: string | undefined, event: monaco.editor.IModelContentChangedEvent) {
    if (!value) return;
    setValue(value);
    setDebounce(true);
  }

  return (
    <Container>
      <Editor
        height="100%"
        width="100%"
        theme={useVsCodeSettings()['workbench.colorTheme'] ?? 'vs-dark'}
        onMount={handleMount}
        onChange={handleChange}
        options={getEditorOptions()}
      />
    </Container>
  );

  function getEditorOptions() {
    const result = transformDeepProperties(useVsCodeSettings());
    return result.editor;
  }
}

function transformDeepProperties(obj: any): any {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const keys = key.split('.');
    let current = acc;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    if (typeof value === 'object') {
      current[keys[keys.length - 1]] = transformDeepProperties(value);
    } else {
      current[keys[keys.length - 1]] = value;
    }
    return acc;
  }, {});
}
