import { createSlice } from '@reduxjs/toolkit';
import * as reduce from './reducers';

const { initialState, ...reducers } = reduce;

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers,
});

export * from './selectors';
export const { setUI, setActiveMenuItem, toggleMenu } = uiSlice.actions;
