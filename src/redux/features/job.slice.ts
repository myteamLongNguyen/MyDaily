import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setErrorState } from "./common-slice";
import { JobTypeResponse } from "./job-type.slice";
import { AddressResponse } from "./address-slice";
import { CompanyResponse } from "./company-slice";
import { onGet, onPost, onPatch, onDelete } from "../../core/api-service";
import paths from "../../navigation/paths";
import { ResponseState, ErrorState } from "../common-state";
import { AppState } from "../store";

export enum JobStatus {
  Complete = "Complete",
  InProgress = "In Progress",
  Pending = "Pending",
}

// Interfaces (aligned with DTOs)
export interface JobResponse {
  id: string;
  name: string;
  description?: string;
  parentJobId?: string;
  type?: JobTypeResponse;
  houseType?: string;
  facade?: string;
  reference?: string;
  contactIds?: string[];
  address?: AddressResponse;
  company?: CompanyResponse;
  dwellingQty?: number;
  complexity?: number;
  status?: JobStatus;
  progress?: string;
  createdBy?: string;
  creationDate?: Date;
  dueDate?: Date;
  startTime?: Date;
  created?: Date;
  lastUpdated?: Date;
}

export interface CreateJobRequest {
  description?: string;
  parentJobId?: string;
  typeId?: string;
  houseType?: string;
  facade?: string;
  reference?: string;
  companyId?: string;
  addressId?: string;
  dwellingQty?: number;
  complexity?: number;
}

export interface UpdateJobRequest {
  id: string;
  name?: string;
  description?: string;
  parentJobId?: string;
  typeId?: string;
  houseType?: string;
  facade?: string;
  reference?: string;
  companyId?: string;
  addressId?: string;
  dwellingQty?: number;
  complexity?: number;
  status?: JobStatus;
  dueDate?: Date;
  startTime?: Date;
}

// State Interface
export interface JobState {
  allJobsState: { data: JobResponse[]; loading: boolean };
  jobByIdState: { data: JobResponse | null; loading: boolean };
  createJobState: { data: ResponseState<JobResponse> | null; loading: boolean };
  updateJobState: { data: ResponseState<JobResponse> | null; loading: boolean };
  deleteJobState: { data: ResponseState<void> | null; loading: boolean };
}

// Async Thunks
export const getAllJobsAction = createAsyncThunk(
  "jobs/all",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onGet("/jobs");
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

export const getJobByIdAction = createAsyncThunk(
  "jobs/id",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onGet(`/jobs/${id}`);
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

export const createJobAction = createAsyncThunk(
  "jobs/create",
  async (params: CreateJobRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/jobs", params);
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

export const updateJobAction = createAsyncThunk(
  "jobs/update",
  async (params: UpdateJobRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(`/jobs/${params.id}`, params);
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

export const deleteJobAction = createAsyncThunk(
  "jobs/delete",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onDelete(`/jobs/${id}`);
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
export const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    allJobsState: { data: [], loading: false },
    jobByIdState: { data: null, loading: false },
    createJobState: { data: null, loading: false },
    updateJobState: { data: null, loading: false },
    deleteJobState: { data: null, loading: false },
  } as JobState,
  reducers: {
    clearJobStates(state, _: PayloadAction) {
      state.allJobsState = { data: [], loading: false };
      state.jobByIdState = { data: null, loading: false };
      state.createJobState = { data: null, loading: false };
      state.updateJobState = { data: null, loading: false };
      state.deleteJobState = { data: null, loading: false };
    },
    clearCreateJobState(state, _: PayloadAction) {
      state.createJobState = { data: null, loading: false };
    },
    clearUpdateJobState(state, _: PayloadAction) {
      state.updateJobState = { data: null, loading: false };
    },
    clearDeleteJobState(state, _: PayloadAction) {
      state.deleteJobState = { data: null, loading: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobsAction.pending, (state: JobState) => {
        state.allJobsState.loading = true;
      })
      .addCase(getAllJobsAction.fulfilled, (state: JobState, action) => {
        state.allJobsState.loading = false;
        state.allJobsState.data = action.payload;
      })
      .addCase(getAllJobsAction.rejected, (state: JobState) => {
        state.allJobsState.loading = false;
      })
      .addCase(getJobByIdAction.pending, (state: JobState) => {
        state.jobByIdState.loading = true;
        state.jobByIdState.data = null;
      })
      .addCase(getJobByIdAction.fulfilled, (state: JobState, action) => {
        state.jobByIdState.loading = false;
        state.jobByIdState.data = action.payload;
      })
      .addCase(getJobByIdAction.rejected, (state: JobState) => {
        state.jobByIdState.loading = false;
      })
      .addCase(createJobAction.pending, (state: JobState) => {
        state.createJobState.loading = true;
        state.createJobState.data = null;
      })
      .addCase(createJobAction.fulfilled, (state: JobState, action) => {
        state.createJobState.loading = false;
        state.createJobState.data = action.payload;
      })
      .addCase(createJobAction.rejected, (state: JobState) => {
        state.createJobState.loading = false;
      })
      .addCase(updateJobAction.pending, (state: JobState) => {
        state.updateJobState.loading = true;
        state.updateJobState.data = null;
      })
      .addCase(updateJobAction.fulfilled, (state: JobState, action) => {
        state.updateJobState.loading = false;
        state.updateJobState.data = action.payload;
      })
      .addCase(updateJobAction.rejected, (state: JobState) => {
        state.updateJobState.loading = false;
      })
      .addCase(deleteJobAction.pending, (state: JobState) => {
        state.deleteJobState.loading = true;
        state.deleteJobState.data = null;
      })
      .addCase(deleteJobAction.fulfilled, (state: JobState, action) => {
        state.deleteJobState.loading = false;
        state.deleteJobState.data = action.payload;
      })
      .addCase(deleteJobAction.rejected, (state: JobState) => {
        state.deleteJobState.loading = false;
      });
  },
});

// Actions and Selectors
export const {
  clearJobStates,
  clearCreateJobState,
  clearUpdateJobState,
  clearDeleteJobState,
} = jobSlice.actions;

export const getAllJobsState = (state: AppState) => state.jobs.allJobsState;
export const getJobByIdState = (state: AppState) => state.jobs.jobByIdState;
export const getCreateJobState = (state: AppState) => state.jobs.createJobState;
export const getUpdateJobState = (state: AppState) => state.jobs.updateJobState;
export const getDeleteJobState = (state: AppState) => state.jobs.deleteJobState;

export default jobSlice.reducer;
