import { AppState } from "../../store";

export const selectUI = (state: AppState) => state.ui;
export const selectMenu = (state: AppState) => state.ui.menu;
