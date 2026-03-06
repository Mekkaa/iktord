import { Reducer } from '@reduxjs/toolkit';

export const createSliceReducers = (sliceImport: Record<string, any>) => {
  const sliceReducers: Record<string, Reducer> = {};

  Object.values(sliceImport).forEach((item) => {
    if (
      typeof item === 'object' &&
      item.name &&
      item.reducerPath &&
      item.reducer
    ) {
      sliceReducers[item.name] = item.reducer;
    }
  });

  return sliceReducers;
};
