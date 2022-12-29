import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ITreeNode } from '../../interfaces/tree-node';
import { RootState } from '../../store';
import { initialState } from './initialState';

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    setSelectedNode: (state, action: PayloadAction<ITreeNode>) => {
      action.type = 'setSelectedNode';

      setSelectedNode(state.treeNode);

      function setSelectedNode(node: ITreeNode) {
        if (node.items) {
          node.items.forEach(item => {
            item.isSelected = false;
            if (action.payload.full_name === item.full_name) {
              item.isSelected = true;

              if (item.isFolder) {
                item.isFolderOpen = !item.isFolderOpen;
              }
            }
            setSelectedNode(item);
          });
        }
      }
    },
    setTreeNodeContent: (state, action: PayloadAction<{ treeNode: ITreeNode; value: string }>) => {
      action.type = 'setTreeNodeContent';

      setTreeNodeContent(state.treeNode);

      function setTreeNodeContent(node: ITreeNode) {
        if (node.items) {
          node.items.forEach(item => {
            if (action.payload.treeNode.full_name === item.full_name) {
              item.content = action.payload.value;
            }
            setTreeNodeContent(item);
          });
        }
      }
    },
  },
});

export const { setSelectedNode, setTreeNodeContent } = workspaceSlice.actions;

export const selectWorkspace = (state: RootState) => state.workspace;
export const selectVscodeSettingsJson = (state: RootState) =>
  findNode(state.workspace.treeNode, './.vscode/settings.json');

export default workspaceSlice.reducer;

function findNode(node: ITreeNode, full_name: string): ITreeNode | undefined {
  if (node.items) {
    for (const item of node.items) {
      if (item.full_name === full_name) {
        return item;
      }
      const found = findNode(item, full_name);
      if (found) {
        return found;
      }
    }
  }
}
