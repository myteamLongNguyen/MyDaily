import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setErrorState } from "./common-slice";
import { onGet, onPost, onPatch, onDelete } from "../../core/api-service";
import paths from "../../navigation/paths";
import { ResponseState, ErrorState } from "../common-state";
import { AppState } from "../store";

export enum SubJobTypeStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  ARCHIVED = "Archived",
}

export enum JobStatus {
  InProgress = 'InProgress',
  Paused = 'Paused',
  Complete = 'Complete',
}

export enum StateType {
  FLOW = "Flow",
  OUTCOME = "Outcome",
}

export interface DependencySubJobType {
  id: string;
  title: string;
}

export interface DependencyTaskType {
  id: string;
  title: string;
}

export interface DefaultTaskGroupType {
  id: string;
  name: string;
}

export interface SubJobTypeStateResponse {
  id: string;
  stateType: StateType;
  name: string;
  color: string;
  created: Date;
  lastUpdated: Date;
}

export interface SubJobTypeResponse {
  id: string;
  title: string;
  status?: SubJobTypeStatus;
  dependencyConditionToStart?: JobStatus;
  defaultTaskGroupType?: DefaultTaskGroupType | null;
  inheritDependencyChain?: boolean;
  dependencySubJobTypesToStart?: DependencySubJobType[];
  dependencyTaskTypesToStart?: DependencyTaskType[];
  dependencySubJobTypesToComplete?: DependencySubJobType[];
  states?: SubJobTypeStateResponse[];
}

export interface CreateSubJobTypeRequest {
  title: string;
  status?: SubJobTypeStatus;
  dependencyConditionToStart?: JobStatus;
  defaultTaskGroupTypeId?: string;
  inheritDependencyChain?: boolean;
  dependencySubJobTypeIdsToStart?: string[];
  dependencyTaskTypeIdsToStart?: string[];
  dependencySubJobTypeIdsToComplete?: string[];
}

export interface UpdateSubJobTypeRequest extends CreateSubJobTypeRequest {
  id: string;
}

export interface CreateSubJobTypeStateRequest {
  subJobTypeId: string;
  stateType: StateType;
  name: string;
  color: string;
}

export interface UpdateSubJobTypeStateRequest {
  id: string;
  subJobTypeId: string;
  stateType?: StateType;
  name?: string;
  color?: string;
}

interface SubJobTypeState {
  allSubJobTypesState: { data: SubJobTypeResponse[]; loading: boolean };
  subJobTypeByIdState: { data: SubJobTypeResponse | null; loading: boolean };
  createSubJobTypeState: {
    data: ResponseState<SubJobTypeResponse> | null;
    loading: boolean;
  };
  updateSubJobTypeState: {
    data: ResponseState<SubJobTypeResponse> | null;
    loading: boolean;
  };
  deleteSubJobTypeState: { data: ResponseState<void> | null; loading: boolean };
  subJobTypeStatesState: {
    data: SubJobTypeStateResponse[];
    loading: boolean;
  };
  createSubJobTypeStateState: {
    data: ResponseState<SubJobTypeStateResponse> | null;
    loading: boolean;
  };
  updateSubJobTypeStateState: {
    data: ResponseState<SubJobTypeStateResponse> | null;
    loading: boolean;
  };
  deleteSubJobTypeStateState: {
    data: ResponseState<void> | null;
    loading: boolean;
  };
}

const initialState: SubJobTypeState = {
  allSubJobTypesState: { data: [], loading: false },
  subJobTypeByIdState: { data: null, loading: false },
  createSubJobTypeState: { data: null, loading: false },
  updateSubJobTypeState: { data: null, loading: false },
  deleteSubJobTypeState: { data: null, loading: false },
  subJobTypeStatesState: { data: [], loading: false },
  createSubJobTypeStateState: { data: null, loading: false },
  updateSubJobTypeStateState: { data: null, loading: false },
  deleteSubJobTypeStateState: { data: null, loading: false },
};

export const getAllSubJobTypesAction = createAsyncThunk(
  "subJobTypes/all",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onGet("/sub-job-types");
      return response.data;
    } catch (error: any) {
      const errorState: ErrorState = {
        message:
          error.response?.data?.message ?? "Error occurred! Please try again.",
        redirect:
          error.response?.status === 401
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

export const getSubJobTypeByIdAction = createAsyncThunk(
  "subJobTypes/id",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onGet(`/sub-job-types/${id}`);
      return response.data;
    } catch (error: any) {
      const errorState: ErrorState = {
        message:
          error.response?.data?.message ?? "Error occurred! Please try again.",
        redirect:
          error.response?.status === 401
            ? {
                destination: paths.UNAUTHORIZED,
                permanent: true,
              }
            : error.response?.status === 404
            ? {
                destination: paths.NOT_FOUND,
                permanent: true,
              }
            : undefined,
      };
      dispatch(setErrorState(errorState));
      return rejectWithValue(errorState);
    }
  }
);

export const createSubJobTypeAction = createAsyncThunk(
  "subJobTypes/create",
  async (params: CreateSubJobTypeRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/sub-job-types", params);
      return response;
    } catch (error: any) {
      const errorState: ErrorState = {
        message:
          error.response?.data?.message ?? "Error occurred! Please try again.",
        redirect:
          error.response?.status === 401
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

export const updateSubJobTypeAction = createAsyncThunk(
  "subJobTypes/update",
  async (params: UpdateSubJobTypeRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(`/sub-job-types/${params.id}`, params);
      return response;
    } catch (error: any) {
      const errorState: ErrorState = {
        message:
          error.response?.data?.message ?? "Error occurred! Please try again.",
        redirect:
          error.response?.status === 401
            ? {
                destination: paths.UNAUTHORIZED,
                permanent: true,
              }
            : error.response?.status === 404
            ? {
                destination: paths.NOT_FOUND,
                permanent: true,
              }
            : undefined,
      };
      dispatch(setErrorState(errorState));
      return rejectWithValue(errorState);
    }
  }
);

export const deleteSubJobTypeAction = createAsyncThunk(
  "subJobTypes/delete",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onDelete(`/sub-job-types/${id}`);
      return response;
    } catch (error: any) {
      const errorState: ErrorState = {
        message:
          error.response?.data?.message ?? "Error occurred! Please try again.",
        redirect:
          error.response?.status === 401
            ? {
                destination: paths.UNAUTHORIZED,
                permanent: true,
              }
            : error.response?.status === 404
            ? {
                destination: paths.NOT_FOUND,
                permanent: true,
              }
            : undefined,
      };
      dispatch(setErrorState(errorState));
      return rejectWithValue(errorState);
    }
  }
);

export const getSubJobTypeStatesAction = createAsyncThunk(
  "subJobTypes/states",
  async (subJobTypeId: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onGet(`/sub-job-types/${subJobTypeId}/states`);
      return response.data;
    } catch (error: any) {
      const errorState: ErrorState = {
        message:
          error.response?.data?.message ?? "Error occurred! Please try again.",
        redirect:
          error.response?.status === 401
            ? {
                destination: paths.UNAUTHORIZED,
                permanent: true,
              }
            : error.response?.status === 404
            ? {
                destination: paths.NOT_FOUND,
                permanent: true,
              }
            : undefined,
      };
      dispatch(setErrorState(errorState));
      return rejectWithValue(errorState);
    }
  }
);

export const createSubJobTypeStateAction = createAsyncThunk(
  "subJobTypes/states/create",
  async (
    params: CreateSubJobTypeStateRequest,
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost(
        `/sub-job-types/${params.subJobTypeId}/states`,
        params
      );
      return response;
    } catch (error: any) {
      const errorState: ErrorState = {
        message:
          error.response?.data?.message ?? "Error occurred! Please try again.",
        redirect:
          error.response?.status === 401
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

export const updateSubJobTypeStateAction = createAsyncThunk(
  "subJobTypes/states/update",
  async (
    params: UpdateSubJobTypeStateRequest,
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(
        `/sub-job-types/${params.subJobTypeId}/states/${params.id}`,
        params
      );
      return response;
    } catch (error: any) {
      const errorState: ErrorState = {
        message:
          error.response?.data?.message ?? "Error occurred! Please try again.",
        redirect:
          error.response?.status === 401
            ? {
                destination: paths.UNAUTHORIZED,
                permanent: true,
              }
            : error.response?.status === 404
            ? {
                destination: paths.NOT_FOUND,
                permanent: true,
              }
            : undefined,
      };
      dispatch(setErrorState(errorState));
      return rejectWithValue(errorState);
    }
  }
);

export const deleteSubJobTypeStateAction = createAsyncThunk(
  "subJobTypes/states/delete",
  async (
    { subJobTypeId, stateId }: { subJobTypeId: string; stateId: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setErrorState(null));
      const response = await onDelete(
        `/sub-job-types/${subJobTypeId}/states/${stateId}`
      );
      return response;
    } catch (error: any) {
      const errorState: ErrorState = {
        message:
          error.response?.data?.message ?? "Error occurred! Please try again.",
        redirect:
          error.response?.status === 401
            ? {
                destination: paths.UNAUTHORIZED,
                permanent: true,
              }
            : error.response?.status === 404
            ? {
                destination: paths.NOT_FOUND,
                permanent: true,
              }
            : undefined,
      };
      dispatch(setErrorState(errorState));
      return rejectWithValue(errorState);
    }
  }
);

export const subJobTypeSlice = createSlice({
  name: "subJobTypes",
  initialState,
  reducers: {
    clearSubJobTypeStates(state, _: PayloadAction) {
      state.allSubJobTypesState = { data: [], loading: false };
      state.subJobTypeByIdState = { data: null, loading: false };
      state.createSubJobTypeState = { data: null, loading: false };
      state.updateSubJobTypeState = { data: null, loading: false };
      state.deleteSubJobTypeState = { data: null, loading: false };
      state.subJobTypeStatesState = { data: [], loading: false };
      state.createSubJobTypeStateState = { data: null, loading: false };
      state.updateSubJobTypeStateState = { data: null, loading: false };
      state.deleteSubJobTypeStateState = { data: null, loading: false };
    },
    clearCreateSubJobTypeState(state, _: PayloadAction) {
      state.createSubJobTypeState = { data: null, loading: false };
    },
    clearUpdateSubJobTypeState(state, _: PayloadAction) {
      state.updateSubJobTypeState = { data: null, loading: false };
    },
    clearDeleteSubJobTypeState(state, _: PayloadAction) {
      state.deleteSubJobTypeState = { data: null, loading: false };
    },
    clearSubJobTypeStatesState(state, _: PayloadAction) {
      state.subJobTypeStatesState = { data: [], loading: false };
    },
    clearCreateSubJobTypeStateState(state, _: PayloadAction) {
      state.createSubJobTypeStateState = { data: null, loading: false };
    },
    clearUpdateSubJobTypeStateState(state, _: PayloadAction) {
      state.updateSubJobTypeStateState = { data: null, loading: false };
    },
    clearDeleteSubJobTypeStateState(state, _: PayloadAction) {
      state.deleteSubJobTypeStateState = { data: null, loading: false };
    },
  },
  extraReducers: (builder) => {
    builder
          .addCase(getAllSubJobTypesAction.pending, (state) => {
        state.allSubJobTypesState.loading = true;
        state.allSubJobTypesState.data = [];
      })
      .addCase(getAllSubJobTypesAction.fulfilled, (state, action) => {
        state.allSubJobTypesState.loading = false;
        state.allSubJobTypesState.data = action.payload;
      })
      .addCase(getAllSubJobTypesAction.rejected, (state) => {
        state.allSubJobTypesState.loading = false;
      })
      .addCase(getSubJobTypeByIdAction.pending, (state) => {
        state.subJobTypeByIdState.loading = true;
        state.subJobTypeByIdState.data = null;
      })
      .addCase(getSubJobTypeByIdAction.fulfilled, (state, action) => {
        state.subJobTypeByIdState.loading = false;
        state.subJobTypeByIdState.data = action.payload;
      })
      .addCase(getSubJobTypeByIdAction.rejected, (state) => {
        state.subJobTypeByIdState.loading = false;
      })
      .addCase(createSubJobTypeAction.pending, (state) => {
        state.createSubJobTypeState.loading = true;
        state.createSubJobTypeState.data = null;
      })
      .addCase(createSubJobTypeAction.fulfilled, (state, action) => {
        state.createSubJobTypeState.loading = false;
        state.createSubJobTypeState.data = action.payload;
        // Add the new sub job type to the allSubJobTypesState.data array
        if (action.payload.data) {
          state.allSubJobTypesState.data = [
            ...state.allSubJobTypesState.data,
            action.payload.data,
          ];
        }
      })
      .addCase(createSubJobTypeAction.rejected, (state) => {
        state.createSubJobTypeState.loading = false;
      })
      .addCase(updateSubJobTypeAction.pending, (state) => {
        state.updateSubJobTypeState.loading = true;
        state.updateSubJobTypeState.data = null;
      })
      .addCase(updateSubJobTypeAction.fulfilled, (state, action) => {
        state.updateSubJobTypeState.loading = false;
        state.updateSubJobTypeState.data = action.payload;
        // Update the sub job type in the allSubJobTypesState.data array
        if (action.payload.data) {
          state.allSubJobTypesState.data = 
            state.allSubJobTypesState.data.map((subJobType) =>
              subJobType.id === action.payload.data?.id
                ? action.payload.data
                : subJobType
            );
        }
      })
      .addCase(updateSubJobTypeAction.rejected, (state) => {
        state.updateSubJobTypeState.loading = false;
      })
      .addCase(deleteSubJobTypeAction.pending, (state) => {
        state.deleteSubJobTypeState.loading = true;
        state.deleteSubJobTypeState.data = null;
      })
      .addCase(deleteSubJobTypeAction.fulfilled, (state, action) => {
        state.deleteSubJobTypeState.loading = false;
        state.deleteSubJobTypeState.data = action.payload;
        // Remove the deleted sub job type from the allSubJobTypesState.data array
        if (action.meta.arg) {
          state.allSubJobTypesState.data = 
            state.allSubJobTypesState.data.filter(
              (subJobType) => subJobType.id !== action.meta.arg
            );
        }
      })
      .addCase(deleteSubJobTypeAction.rejected, (state) => {
        state.deleteSubJobTypeState.loading = false;
      })
      .addCase(getSubJobTypeStatesAction.pending, (state) => {
        state.subJobTypeStatesState.loading = true;
        state.subJobTypeStatesState.data = [];
      })
      .addCase(getSubJobTypeStatesAction.fulfilled, (state, action) => {
        state.subJobTypeStatesState.loading = false;
        state.subJobTypeStatesState.data = action.payload;
      })
      .addCase(getSubJobTypeStatesAction.rejected, (state) => {
        state.subJobTypeStatesState.loading = false;
      })
      .addCase(createSubJobTypeStateAction.pending, (state) => {
        state.createSubJobTypeStateState.loading = true;
        state.createSubJobTypeStateState.data = null;
      })
      .addCase(createSubJobTypeStateAction.fulfilled, (state, action) => {
        state.createSubJobTypeStateState.loading = false;
        state.createSubJobTypeStateState.data = action.payload;
        // Add the new state to the states list
        if (action.payload.data) {
          state.subJobTypeStatesState.data = [
            ...state.subJobTypeStatesState.data,
            action.payload.data,
          ];
        }
      })
      .addCase(createSubJobTypeStateAction.rejected, (state) => {
        state.createSubJobTypeStateState.loading = false;
      })
      .addCase(updateSubJobTypeStateAction.pending, (state) => {
        state.updateSubJobTypeStateState.loading = true;
        state.updateSubJobTypeStateState.data = null;
      })
      .addCase(updateSubJobTypeStateAction.fulfilled, (state, action) => {
        state.updateSubJobTypeStateState.loading = false;
        state.updateSubJobTypeStateState.data = action.payload;
        // Update the state in the states list
        if (action.payload.data) {
          state.subJobTypeStatesState.data =
            state.subJobTypeStatesState.data.map((stateItem) =>
              stateItem.id === action.payload.data?.id
                ? action.payload.data
                : stateItem
            );
        }
      })
      .addCase(updateSubJobTypeStateAction.rejected, (state) => {
        state.updateSubJobTypeStateState.loading = false;
      })
      .addCase(deleteSubJobTypeStateAction.pending, (state) => {
        state.deleteSubJobTypeStateState.loading = true;
        state.deleteSubJobTypeStateState.data = null;
      })
      .addCase(deleteSubJobTypeStateAction.fulfilled, (state, action) => {
        state.deleteSubJobTypeStateState.loading = false;
        state.deleteSubJobTypeStateState.data = action.payload;
        // Remove the deleted state from the states list
        if (action.meta.arg) {
          state.subJobTypeStatesState.data =
            state.subJobTypeStatesState.data.filter(
              (stateItem) => stateItem.id !== action.meta.arg.stateId
            );
        }
      })
      .addCase(deleteSubJobTypeStateAction.rejected, (state) => {
        state.deleteSubJobTypeStateState.loading = false;
      });
  },
});

export const {
  clearSubJobTypeStates,
  clearCreateSubJobTypeState,
  clearUpdateSubJobTypeState,
  clearDeleteSubJobTypeState,
  clearSubJobTypeStatesState,
  clearCreateSubJobTypeStateState,
  clearUpdateSubJobTypeStateState,
  clearDeleteSubJobTypeStateState,
} = subJobTypeSlice.actions;

// Export all selectors
export const getAllSubJobTypesState = (state: AppState) =>
  state.subJobTypes.allSubJobTypesState;
export const getSubJobTypeByIdState = (state: AppState) =>
  state.subJobTypes.subJobTypeByIdState;
export const getCreateSubJobTypeState = (state: AppState) =>
  state.subJobTypes.createSubJobTypeState;
export const getUpdateSubJobTypeState = (state: AppState) =>
  state.subJobTypes.updateSubJobTypeState;
export const getDeleteSubJobTypeState = (state: AppState) =>
  state.subJobTypes.deleteSubJobTypeState;
export const getSubJobTypeStatesState = (state: AppState) =>
  state.subJobTypes.subJobTypeStatesState;
export const getCreateSubJobTypeStateState = (state: AppState) =>
  state.subJobTypes.createSubJobTypeStateState;
export const getUpdateSubJobTypeStateState = (state: AppState) =>
  state.subJobTypes.updateSubJobTypeStateState;
export const getDeleteSubJobTypeStateState = (state: AppState) =>
  state.subJobTypes.deleteSubJobTypeStateState;

export default subJobTypeSlice.reducer;
