import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import filesOpenReducer from './features/filesOpen/filesOpenSlice';
import workspaceReducer from './features/workspace/workspaceSlice';

export const store = configureStore({
  reducer: {
    workspace: workspaceReducer,
    filesOpen: filesOpenReducer,
  },
});

export type RootDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type RootThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
