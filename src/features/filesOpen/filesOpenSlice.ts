import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ITreeNode } from '../../interfaces/tree-node';
import { RootState } from '../../store';

interface InitialState {
  active: ITreeNode;
  items: ITreeNode[];
}

export const filesOpenSlice = createSlice({
  name: 'filesOpen',
  initialState: {
    active: {} as ITreeNode,
    items: [] as ITreeNode[],
  } as InitialState,
  reducers: {
    addFileOpen: (state, action: PayloadAction<ITreeNode>) => {
      action.type = 'addFileOpen';

      state.active = action.payload;
      state.items.forEach(p => (p.isFileActive = false));

      if (!state.items.some(p => p.full_name === action.payload.full_name)) {
        state.items.push({ ...action.payload, isFileOpen: true, isFileActive: true });
      } else {
        state.items.forEach(p => {
          if (p.full_name === action.payload.full_name) {
            p.isFileOpen = true;
            p.isFileActive = true;
          }
        });
      }
    },
    setFileContent: (state, action: PayloadAction<string>) => {
      action.type = 'setFileContent';

      state.items.forEach(p => {
        if (p.isFileActive) {
          p.content = action.payload;
        }
      });
      state.active.content = action.payload;
    },
    removeFileOpen: (
      state,
      action: PayloadAction<{ treeNode: ITreeNode; newActiveFile: ITreeNode }>
    ) => {
      action.type = 'removeFileOpen';

      const newActiveFile = action.payload.newActiveFile;

      state.items = state.items
        .filter(p => p.full_name !== action.payload.treeNode.full_name)
        .map(p => ({
          ...p,
          isFileActive: p.full_name === newActiveFile.full_name,
        }));

      state.active = action.payload.newActiveFile;
    },
  },
});

export const { addFileOpen, removeFileOpen, setFileContent } = filesOpenSlice.actions;

export const selectFilesOpen = (state: RootState) => state.filesOpen.items;
export const selectFileActive = (state: RootState) => state.filesOpen.active;

export default filesOpenSlice.reducer;
