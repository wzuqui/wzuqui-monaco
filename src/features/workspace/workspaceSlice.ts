import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ITreeNode } from '../../interfaces/tree-node';
import { RootState } from '../../store';
import { helpers } from './helpers';
import {
  defaultRoot,
  defaultVscodeSettingsJsonFullName,
  initialState,
  InitialState,
} from './initialState';

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<{ parent: ITreeNode; node: ITreeNode }>) => {
      action.type = 'addNode';

      helpers.addNodeRecursive(
        state.treeNode,
        action.payload.parent,
        action.payload.node
      );
    },
    setSelectedNode: (state, action: PayloadAction<ITreeNode>) => {
      action.type = 'setSelectedNode';

      const full_name = action.payload.full_name ?? defaultRoot;
      helpers.setSelectedNodeRecursive(state.treeNode, full_name);
    },
    setTreeNodeContent: setTreeNodeContentFunction,
  },
});

export function setTreeNodeContentFunction(
  state: InitialState,
  action: PayloadAction<{ treeNode: ITreeNode; value: string }>
) {
  action.type = 'setTreeNodeContent';

  helpers.setTreeNodeContentRecursive(
    state.treeNode,
    action.payload.treeNode.full_name,
    action.payload.value
  );
}

export const { addNode, setSelectedNode, setTreeNodeContent } = workspaceSlice.actions;
export const selectWorkspace = (state: RootState) => state.workspace;
export const selectVscodeSettingsJson = (state: RootState) =>
  helpers.findNodeRecursive(state.workspace.treeNode, defaultVscodeSettingsJsonFullName);

export default workspaceSlice.reducer;
