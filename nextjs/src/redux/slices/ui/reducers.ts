import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { UIState } from "../../types/ui";

export const initialState: UIState = {};

// Reducers
export const setUI: CaseReducer<UIState, PayloadAction<UIState>> = (
  state,
  action
) => ({
  ...state,
  ...action.payload,
});

export const setActiveMenuItem: CaseReducer<
  UIState,
  PayloadAction<string | undefined>
> = (state, action) => ({
  ...state,
  menu: {
    ...state.menu,
    activeItem: action.payload,
  },
});

export const toggleMenu: CaseReducer<UIState, PayloadAction<boolean>> = (
  state,
  action
) => ({
  ...state,
  menu: {
    // ...state.menu,
    isOpen: action.payload,
  },
});
