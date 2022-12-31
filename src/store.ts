import type { TypedAddListener, TypedStartListening } from '@reduxjs/toolkit';
import { Action, addListener, configureStore, createListenerMiddleware, ThunkAction } from '@reduxjs/toolkit';

import filesOpenReducer from './features/filesOpen/filesOpenSlice';
import workspaceReducer from './features/workspace/workspaceSlice';

export const listenerMiddleware = createListenerMiddleware();
export const startRootListening = listenerMiddleware.startListening as RootStartListening;
export const addRootListener = addListener as TypedAddListener<RootState, RootDispatch>;

export const store = configureStore({
  reducer: {
    filesOpen: filesOpenReducer,
    workspace: workspaceReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type RootThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export type RootStartListening = TypedStartListening<RootState, RootDispatch>;
