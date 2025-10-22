import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setErrorState } from "./common-slice";
import { onGet, onPost, onPatch, onDelete } from "../../core/api-service";
import paths from "../../navigation/paths";
import { ResponseState, ErrorState } from "../common-state";
import { AppState } from "../store";

export interface SubJobCategoryResponse {
  id: string;
  name: string;
  created: string;
  lastUpdated: string;
}

export interface CreateSubJobCategoryRequest {
  name: string;
}

export interface UpdateSubJobCategoryRequest extends CreateSubJobCategoryRequest {
  id: string;
}

interface SubJobCategoryState {
  allSubJobCategoriesState: { data: SubJobCategoryResponse[]; loading: boolean };
  subJobCategoryByIdState: { data: SubJobCategoryResponse | null; loading: boolean };
  createSubJobCategoryState: {
    data: ResponseState<SubJobCategoryResponse> | null;
    loading: boolean;
  };
  updateSubJobCategoryState: {
    data: ResponseState<SubJobCategoryResponse> | null;
    loading: boolean;
  };
  deleteSubJobCategoryState: { data: ResponseState<void> | null; loading: boolean };
}

export const getAllSubJobCategoriesAction = createAsyncThunk(
  "subJobCategories/all",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onGet("/sub-job-categories");
      return response;
    } catch (error: any) {
      const errorState: ErrorState = {
        message:
          error.response.data?.message ?? "Error occurred! Please try again.",
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

export const getSubJobCategoryByIdAction = createAsyncThunk(
  "subJobCategories/id",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onGet(`/sub-job-categories/${id}`);
      return response.data;
    } catch (error: any) {
      const errorState: ErrorState = {
        message:
          error.response.data?.message ?? "Error occurred! Please try again.",
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

export const createSubJobCategoryAction = createAsyncThunk(
  "subJobCategories/create",
  async (params: CreateSubJobCategoryRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/sub-job-categories", params);
      return response;
    } catch (error: any) {
      const errorState: ErrorState = {
        message:
          error.response.data?.message ?? "Error occurred! Please try again.",
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

export const updateSubJobCategoryAction = createAsyncThunk(
  "subJobCategories/update",
  async (params: UpdateSubJobCategoryRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(`/sub-job-categories/${params.id}`, params);
      return response;
    } catch (error: any) {
      const errorState: ErrorState = {
        message:
          error.response.data?.message ?? "Error occurred! Please try again.",
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

export const deleteSubJobCategoryAction = createAsyncThunk(
  "subJobCategories/delete",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onDelete(`/sub-job-categories/${id}`);
      return response;
    } catch (error: any) {
      const errorState: ErrorState = {
        message:
          error.response.data?.message ?? "Error occurred! Please try again.",
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

export const subJobCategorySlice = createSlice({
  name: "subJobCategories",
  initialState: {
    allSubJobCategoriesState: { data: [], loading: false },
    subJobCategoryByIdState: { data: null, loading: false },
    createSubJobCategoryState: { data: null, loading: false },
    updateSubJobCategoryState: { data: null, loading: false },
    deleteSubJobCategoryState: { data: null, loading: false },
  } as SubJobCategoryState,
  reducers: {
    clearSubJobCategoryStates(state, _: PayloadAction) {
      state.allSubJobCategoriesState = { data: [], loading: false };
      state.subJobCategoryByIdState = { data: null, loading: false };
      state.createSubJobCategoryState = { data: null, loading: false };
      state.updateSubJobCategoryState = { data: null, loading: false };
      state.deleteSubJobCategoryState = { data: null, loading: false };
    },
    clearCreateSubJobCategoryState(state, _: PayloadAction) {
      state.createSubJobCategoryState = { data: null, loading: false };
    },
    clearUpdateSubJobCategoryState(state, _: PayloadAction) {
      state.updateSubJobCategoryState = { data: null, loading: false };
    },
    clearDeleteSubJobCategoryState(state, _: PayloadAction) {
      state.deleteSubJobCategoryState = { data: null, loading: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllSubJobCategoriesAction.pending, (state: SubJobCategoryState) => {
        state.allSubJobCategoriesState.loading = true;
      })
      .addCase(
        getAllSubJobCategoriesAction.fulfilled,
        (state: SubJobCategoryState, action) => {
          state.allSubJobCategoriesState.loading = false;
          state.allSubJobCategoriesState.data = action.payload.data;
        }
      )
      .addCase(getAllSubJobCategoriesAction.rejected, (state: SubJobCategoryState) => {
        state.allSubJobCategoriesState.loading = false;
      })
      .addCase(getSubJobCategoryByIdAction.pending, (state: SubJobCategoryState) => {
        state.subJobCategoryByIdState.loading = true;
        state.subJobCategoryByIdState.data = null;
      })
      .addCase(
        getSubJobCategoryByIdAction.fulfilled,
        (state: SubJobCategoryState, action) => {
          state.subJobCategoryByIdState.loading = false;
          state.subJobCategoryByIdState.data = action.payload;
        }
      )
      .addCase(getSubJobCategoryByIdAction.rejected, (state: SubJobCategoryState) => {
        state.subJobCategoryByIdState.loading = false;
      })
      .addCase(createSubJobCategoryAction.pending, (state: SubJobCategoryState) => {
        state.createSubJobCategoryState.loading = true;
        state.createSubJobCategoryState.data = null;
      })
      .addCase(
        createSubJobCategoryAction.fulfilled,
        (state: SubJobCategoryState, action) => {
          state.createSubJobCategoryState.loading = false;
          state.createSubJobCategoryState.data = action.payload;
        }
      )
      .addCase(createSubJobCategoryAction.rejected, (state: SubJobCategoryState) => {
        state.createSubJobCategoryState.loading = false;
      })
      .addCase(updateSubJobCategoryAction.pending, (state: SubJobCategoryState) => {
        state.updateSubJobCategoryState.loading = true;
        state.updateSubJobCategoryState.data = null;
      })
      .addCase(
        updateSubJobCategoryAction.fulfilled,
        (state: SubJobCategoryState, action) => {
          state.updateSubJobCategoryState.loading = false;
          state.updateSubJobCategoryState.data = action.payload;
        }
      )
      .addCase(updateSubJobCategoryAction.rejected, (state: SubJobCategoryState) => {
        state.updateSubJobCategoryState.loading = false;
      })
      .addCase(deleteSubJobCategoryAction.pending, (state: SubJobCategoryState) => {
        state.deleteSubJobCategoryState.loading = true;
        state.deleteSubJobCategoryState.data = null;
      })
      .addCase(
        deleteSubJobCategoryAction.fulfilled,
        (state: SubJobCategoryState, action) => {
          state.deleteSubJobCategoryState.loading = false;
          state.deleteSubJobCategoryState.data = action.payload;
        }
      )
      .addCase(deleteSubJobCategoryAction.rejected, (state: SubJobCategoryState) => {
        state.deleteSubJobCategoryState.loading = false;
      });
  },
});

export const {
  clearSubJobCategoryStates,
  clearCreateSubJobCategoryState,
  clearUpdateSubJobCategoryState,
  clearDeleteSubJobCategoryState,
} = subJobCategorySlice.actions;

export const getAllSubJobCategoriesState = (state: AppState) =>
  state.subJobCategories.allSubJobCategoriesState;
export const getSubJobCategoryByIdState = (state: AppState) =>
  state.subJobCategories.subJobCategoryByIdState;
export const getCreateSubJobCategoryState = (state: AppState) =>
  state.subJobCategories.createSubJobCategoryState;
export const getUpdateSubJobCategoryState = (state: AppState) =>
  state.subJobCategories.updateSubJobCategoryState;
export const getDeleteSubJobCategoryState = (state: AppState) =>
  state.subJobCategories.deleteSubJobCategoryState;

export default subJobCategorySlice.reducer;