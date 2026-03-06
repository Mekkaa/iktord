import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import * as slices from './slices';
import { createSliceReducers } from './util';

const store = configureStore({
  reducer: { ...createSliceReducers(slices) },
  devTools: Boolean(process.env.NEXT_PUBLIC_DEV_TOOLS),
});

export type AppStore = typeof store;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export { store };
