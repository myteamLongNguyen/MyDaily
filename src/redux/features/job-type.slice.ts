import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setErrorState } from "./common-slice";
import { onGet, onPost, onPatch, onDelete } from "../../core/api-service";
import paths from "../../navigation/paths";
import { ResponseState, ErrorState } from "../common-state";
import { AppState } from "../store";

// Enums
export enum JobTypeStatus {
  Active = "Active",
  Inactive = "Inactive",
}

export enum DayType {
  Business = "Business Day",
  Calendar = "Calendar Day",
}

// Interfaces for related entities
export interface SubJobTypeResponse {
  id: string;
  title: string;
}

// Interface for JobTypeSubJobTypeRelation
export interface JobTypeSubJobTypeRelationResponse {
  id: string;
  subJobType: SubJobTypeResponse;
  mandatory: boolean;
}

// Response and Request Interfaces
export interface JobTypeResponse {
  id: string;
  name: string;
  status?: JobTypeStatus;
  dueDateOffset?: number;
  dueDateOffsetType?: DayType;
  allowJobCreationOnParentJobTypeId?: string | null;
  jobTypeIdCreatedIfConversationStarts?: string | null;
  preventDuplication?: boolean;
  autoCompleteOnAllJobsComplete?: boolean;
  broadcastMessagesToJobs?: boolean;
  broadcastFilesToJobs?: boolean;
  allowedParentJobType?: { id: string; title: string };
  jobTypeCreatedIfConversationStarts?: { id: string; title: string };
  associatedJobTypes?: JobTypeSubJobTypeRelationResponse[];
}

export interface JobTypeBaseRequest {
  name: string;
  status?: JobTypeStatus;
  dueDateOffset?: number;
  dueDateOffsetType?: DayType;
  allowJobCreationOnParentJobTypeId?: string | null;
  jobTypeIdCreatedIfConversationStarts?: string | null;
  preventDuplication?: boolean;
  autoCompleteOnAllJobsComplete?: boolean;
  broadcastMessagesToJobs?: boolean;
  broadcastFilesToJobs?: boolean;
}

export interface CreateJobTypeRequest extends JobTypeBaseRequest {
  associatedSubJobTypes?: { subJobTypeId: string; mandatory: boolean }[];
}

export interface UpdateJobTypeRequest extends JobTypeBaseRequest {
  id: string;
  associatedSubJobTypes?: { subJobTypeId: string; mandatory: boolean }[];
}
// State Interface
export interface JobTypeState {
  allJobTypesState: { data: JobTypeResponse[]; loading: boolean };
  jobTypeByIdState: { data: JobTypeResponse | null; loading: boolean };
  createJobTypeState: {
    data: ResponseState<JobTypeResponse> | null;
    loading: boolean;
  };
  updateJobTypeState: {
    data: ResponseState<JobTypeResponse> | null;
    loading: boolean;
  };
  deleteJobTypeState: { data: ResponseState<void> | null; loading: boolean };
}

// Async Thunks
export const getAllJobTypesAction = createAsyncThunk(
  "jobTypes/all",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onGet("/job-types");
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

export const getJobTypeByIdAction = createAsyncThunk(
  "jobTypes/id",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onGet(`/job-types/${id}`);
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

export const createJobTypeAction = createAsyncThunk(
  "jobTypes/create",
  async (params: CreateJobTypeRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/job-types", params);
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

export const updateJobTypeAction = createAsyncThunk(
  "jobTypes/update",
  async (params: UpdateJobTypeRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(`/job-types/${params.id}`, params);
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

export const deleteJobTypeAction = createAsyncThunk(
  "jobTypes/delete",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onDelete(`/job-types/${id}`);
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

// Slice Definition
export const jobTypeSlice = createSlice({
  name: "jobTypes",
  initialState: {
    allJobTypesState: { data: [], loading: false },
    jobTypeByIdState: { data: null, loading: false },
    createJobTypeState: { data: null, loading: false },
    updateJobTypeState: { data: null, loading: false },
    deleteJobTypeState: { data: null, loading: false },
  } as JobTypeState,
  reducers: {
    clearJobTypeStates(state, _: PayloadAction) {
      state.allJobTypesState = { data: [], loading: false };
      state.jobTypeByIdState = { data: null, loading: false };
      state.createJobTypeState = { data: null, loading: false };
      state.updateJobTypeState = { data: null, loading: false };
      state.deleteJobTypeState = { data: null, loading: false };
    },
    clearCreateJobTypeState(state, _: PayloadAction) {
      state.createJobTypeState = { data: null, loading: false };
    },
    clearUpdateJobTypeState(state, _: PayloadAction) {
      state.updateJobTypeState = { data: null, loading: false };
    },
    clearDeleteJobTypeState(state, _: PayloadAction) {
      state.deleteJobTypeState = { data: null, loading: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobTypesAction.pending, (state: JobTypeState) => {
        state.allJobTypesState.loading = true;
      })
      .addCase(
        getAllJobTypesAction.fulfilled,
        (state: JobTypeState, action) => {
          state.allJobTypesState.loading = false;
          state.allJobTypesState.data = action.payload.data;
        }
      )
      .addCase(getAllJobTypesAction.rejected, (state: JobTypeState) => {
        state.allJobTypesState.loading = false;
      })
      .addCase(getJobTypeByIdAction.pending, (state: JobTypeState) => {
        state.jobTypeByIdState.loading = true;
        state.jobTypeByIdState.data = null;
      })
      .addCase(
        getJobTypeByIdAction.fulfilled,
        (state: JobTypeState, action) => {
          state.jobTypeByIdState.loading = false;
          state.jobTypeByIdState.data = action.payload;
        }
      )
      .addCase(getJobTypeByIdAction.rejected, (state: JobTypeState) => {
        state.jobTypeByIdState.loading = false;
      })
      .addCase(createJobTypeAction.pending, (state: JobTypeState) => {
        state.createJobTypeState.loading = true;
        state.createJobTypeState.data = null;
      })
      .addCase(createJobTypeAction.fulfilled, (state: JobTypeState, action) => {
        state.createJobTypeState.loading = false;
        state.createJobTypeState.data = action.payload;
      })
      .addCase(createJobTypeAction.rejected, (state: JobTypeState) => {
        state.createJobTypeState.loading = false;
      })
      .addCase(updateJobTypeAction.pending, (state: JobTypeState) => {
        state.updateJobTypeState.loading = true;
        state.updateJobTypeState.data = null;
      })
      .addCase(updateJobTypeAction.fulfilled, (state: JobTypeState, action) => {
        state.updateJobTypeState.loading = false;
        state.updateJobTypeState.data = action.payload;
      })
      .addCase(updateJobTypeAction.rejected, (state: JobTypeState) => {
        state.updateJobTypeState.loading = false;
      })
      .addCase(deleteJobTypeAction.pending, (state: JobTypeState) => {
        state.deleteJobTypeState.loading = true;
        state.deleteJobTypeState.data = null;
      })
      .addCase(deleteJobTypeAction.fulfilled, (state: JobTypeState, action) => {
        state.deleteJobTypeState.loading = false;
        state.deleteJobTypeState.data = action.payload;
      })
      .addCase(deleteJobTypeAction.rejected, (state: JobTypeState) => {
        state.deleteJobTypeState.loading = false;
      });
  },
});

// Actions and Selectors
export const {
  clearJobTypeStates,
  clearCreateJobTypeState,
  clearUpdateJobTypeState,
  clearDeleteJobTypeState,
} = jobTypeSlice.actions;

export const getAllJobTypesState = (state: AppState) =>
  state.jobTypes.allJobTypesState;
export const getJobTypeByIdState = (state: AppState) =>
  state.jobTypes.jobTypeByIdState;
export const getCreateJobTypeState = (state: AppState) =>
  state.jobTypes.createJobTypeState;
export const getUpdateJobTypeState = (state: AppState) =>
  state.jobTypes.updateJobTypeState;
export const getDeleteJobTypeState = (state: AppState) =>
  state.jobTypes.deleteJobTypeState;

export default jobTypeSlice.reducer;
