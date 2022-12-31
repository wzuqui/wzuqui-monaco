import { Monaco } from '@monaco-editor/react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { useEffect, useRef, useState } from 'react';

import {
  defaultTsConfigJsonFullName,
  defaultVscodeSettingsJsonFullName,
} from '../../features/workspace/initialState';
import { useVsCodeSettings } from '../../hooks/useVsCodeSettings';
import { ITreeNode } from '../../interfaces/tree-node';
import { startRootListening } from '../../store';
import { defineDraculaTheme } from '../../themes/defineDraculaTheme';
import { loadLibs } from '../../utils/loadLibs';
import { setCompilerOptions } from '../../utils/setCompilerOptions';
import { transformDeepProperties } from '../../utils/transformDeepProperties';
import { BreadCrumbsView } from '../bread-crumbs-view/bread-crumbs-view';
import { Container } from './styles';

interface HandleChangeParams {
  active: ITreeNode;
  editor: monaco.editor.IStandaloneCodeEditor;
  event: monaco.editor.IModelContentChangedEvent;
  value: string | undefined;
}

export function EditorFileView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const vsCodeSettings = transformDeepProperties(useVsCodeSettings());

  useEffect(() => {
    if (containerRef && !editor) {
      handleBeforeMount(monaco);
      const theme = vsCodeSettings.workbench.colorTheme ?? 'vs-dark';
      const options = vsCodeSettings.editor;
      const editor = monaco.editor.create(containerRef.current!, {
        automaticLayout: true,
        language: 'typescript',
        theme,
        ...options,
      });
      handleMount(containerRef.current!, editor, monaco);
      setEditor(editor);
    }

    return () => editor?.dispose();
  }, [containerRef.current]);

  return (
    <>
      <BreadCrumbsView />
      <Container
        className="editor-file-view-container"
        ref={containerRef}
        style={{ visibility: 'hidden' }}
      ></Container>
    </>
  );
}

function handleBeforeMount(monaco: Monaco) {
  defineDraculaTheme(monaco);
  setCompilerOptions(monaco);
  loadLibs(monaco);
}

function handleChange({ active, editor, value }: HandleChangeParams) {
  if (!value) return;
  activeIsSettings() && setNewSettings(value);
  activeIsTsConfig() && setCompilerOptions(monaco, value);

  function activeIsSettings() {
    return active.full_name === defaultVscodeSettingsJsonFullName;
  }
  function activeIsTsConfig() {
    return active.full_name === defaultTsConfigJsonFullName;
  }
  function setNewSettings(value: string) {
    const newSettings = transformDeepProperties(JSON.parse(value));
    editor?.updateOptions({
      ...newSettings.editor,
      theme: newSettings.workbench?.colorTheme ?? 'vs-dark',
    });
  }
}

function currentActiveIsUndefined(
  containerElement: HTMLDivElement,
  currentActive: ITreeNode | undefined
) {
  const result = currentActive?.full_name === undefined;
  if (result) {
    containerElement.style.visibility = 'hidden';
  } else {
    containerElement.style.visibility = 'visible';
  }
  return result;
}

function handleMount(
  containerElement: HTMLDivElement,
  editor: monaco.editor.IStandaloneCodeEditor,
  monaco: Monaco
) {
  let observableChange: monaco.IDisposable | undefined;
  let active: ITreeNode;
  startRootListening({
    type: 'removeFileOpen',
    effect: (_, currentState) => {
      const state = currentState.getState();
      const currentActive = state.filesOpen.active;
      if (currentActiveIsUndefined(containerElement, currentActive)) return;
    },
  });
  startRootListening({
    type: 'setSelectedNode',
    effect: (_, currentState) => {
      const state = currentState.getState();
      const currentActive = state.filesOpen.active;

      if (currentActiveIsUndefined(containerElement, currentActive)) return;
      if (containerRefCurrentIsNull()) return;
      if (activeIsEqualCurrentActive()) return;

      active = currentActive;
      setModel();

      function activeIsEqualCurrentActive() {
        return active?.full_name === currentActive.full_name;
      }
      function containerRefCurrentIsNull() {
        const result = containerElement === null;
        if (!result) {
          containerElement.style.visibility = 'visible';
        }
        return result;
      }
      function registerChanges(model: monaco.editor.ITextModel) {
        observableChange?.dispose();
        observableChange = model.onDidChangeContent(event => {
          if (!active) return;
          handleChange({
            active,
            editor,
            event,
            value: model.getValue(),
          });
        });
      }
      function setModel() {
        const content = `${active.content}`;
        const fullName = `${active.full_name}`;
        console.log(fullName);

        const uri = monaco.Uri.parse(fullName);
        const model =
          monaco.editor.getModel(uri) ??
          monaco.editor.createModel(content, undefined, uri);

        editor.setModel(model);
        registerChanges(model);
      }
    },
  });
}
