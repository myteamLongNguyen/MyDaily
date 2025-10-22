import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorState } from "../common-state";
import { AppState } from "../store";

export interface BreadcrumbItem {
  id: string;
  path: string | number | null;
  title: string;
}

interface CommonState {
  errorState: ErrorState | null;
  breadcrumbState: BreadcrumbItem[];
}

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    errorState: null,
    breadcrumbState: [],
  } as CommonState,
  reducers: {
    setErrorState(state, action: PayloadAction<ErrorState | null>) {
      state.errorState = action.payload;
    },
    setBreadcrumbState(state, action: PayloadAction<BreadcrumbItem[]>) {
      state.breadcrumbState = [...action.payload];
    },
    clearCommonStates(state) {
      state.breadcrumbState = [];
      state.errorState = null;
    },
  },
});

export const { setErrorState, setBreadcrumbState, clearCommonStates } =
  commonSlice.actions;

export const getErrorState = (state: AppState) => state.common.errorState;
export const getBreadcrumbState = (state: AppState) =>
  state.common.breadcrumbState;

export default commonSlice.reducer;
