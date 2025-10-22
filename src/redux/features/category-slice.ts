import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setErrorState } from "./common-slice";
import { CommonStatus } from "./other-slice";
import { onPost } from "../../core/api-service";
import paths from "../../navigation/paths";
import { ErrorState } from "../common-state";
import { AppState } from "../store";

export interface CategoryResponse {
  id: string;
  title: string;
  status: CommonStatus;
}

export interface GetAllCategoriesRequest {
  status: CommonStatus[];
}

interface CategoryState {
  categoriesState: { data: CategoryResponse[]; loading: boolean };
}

export const categoriesStateAction = createAsyncThunk(
  "others/categories",
  async (params: GetAllCategoriesRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/others/categories", params);
      return response.data;
    } catch (error: any) {
      const errorState: ErrorState = {
        message:
          error.response.data?.message ?? "Error occured! Please try again.",
        redirect:
          error.response.status === 401
            ? {
                destination: paths.UNAUTHORIZED,
                permanent: true,
              }
            : undefined,
      };
      dispatch(setErrorState(errorState));
      return rejectWithValue(errorState);
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoriesState: { data: [], loading: false },
  } as CategoryState,
  reducers: {
    clearCategoryState(state, _: PayloadAction) {
      state.categoriesState = { data: [], loading: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(categoriesStateAction.pending, (state: CategoryState, _) => {
        state.categoriesState.loading = true;
        state.categoriesState.data = [];
      })
      .addCase(
        categoriesStateAction.fulfilled,
        (state: CategoryState, action) => {
          state.categoriesState.loading = false;
          state.categoriesState.data = action.payload as CategoryResponse[];
        }
      )
      .addCase(categoriesStateAction.rejected, (state: CategoryState, _) => {
        state.categoriesState.loading = false;
      });
  },
});

export const { clearCategoryState } = categorySlice.actions;

export const getCategoriesState = (state: AppState) =>
  state.category.categoriesState;

export default categorySlice.reducer;
