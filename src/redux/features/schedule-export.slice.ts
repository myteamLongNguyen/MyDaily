import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { onPost, onPatch, onGet } from "../../core/api-service";
import paths from "../../navigation/paths";
import { ResponseState, ErrorState } from "../common-state";
import { AppState } from "../store";
import { setErrorState } from "./common-slice";
import { UserResponse } from "./user-slice";


export enum ScheduleExportType {
  // TaskReport = "tasks report",
  OneOnOne = "1 on 1",
}

export enum ExportFormat {
  Excel = "excel",
}

export enum ScheduleExportPeriod {
  PastWeek = "past week",
  PastMonth = "past month",
  Past3Months = "past 3 months",
  Past6Months = "past 6 months",
}
export interface ScheduleExportResponse {
  id: string;
  reportName: string;
  frequency: string;
  period: string;
  reportType: string;
  users: UserResponse[];
  owner: UserResponse;
  isActive: boolean;
}

export interface ScheduleExportRequest {
  userIds: (string|undefined)[];
  reportName: string;
  frequency: string;
  period: string;
  reportType: string;
}

export interface UpdateScheduleRequest {
  id: string;
  reportName: string;
  frequency: string;
  period: string;
  reportType: string;
  userIds: (string | undefined)[];
}

export interface ToggleScheduleStatusRequest{
  id: string;
  isActive: boolean
}

interface ScheduleExportState {
  createScheduleState : {data: ResponseState<ScheduleExportResponse> | null ; loading: boolean};
  allScheduleReportsState: {data: ScheduleExportResponse[] ; loading: boolean};
  fetchScheduleByIdState: { data: ScheduleExportResponse | null; loading: boolean };
  updateScheduleState: { data: ResponseState<ScheduleExportResponse> | null; loading: boolean };
  toggleScheduleStatusState: { loading: boolean; success: boolean | null };
} 

export const createScheduleStateAction = createAsyncThunk(
  "/scheduled-exports/schedule",
  async (params: ScheduleExportRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/scheduled-exports/schedule", params);
      return response;
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

export const updateScheduleStateAction = createAsyncThunk(
  "/scheduled-exports/schedule/:id",
  async (params: UpdateScheduleRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(`/scheduled-exports/schedules/${params.id}`, params);
      return response;
    } catch (error: any) {
      const errorState: ErrorState = {
        message: error.response.data?.message ?? "Error occurred! Please try again.",
        redirect: error.response.status === 401
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

export const fetchAllScheduleReportsAction = createAsyncThunk(
  "scheduled-exports/schedules",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onGet("/scheduled-exports/schedules"); 
      console.log('run',response)
      return response.data;
    } catch (error: any) {
      const errorState: ErrorState = {
        message: error.response?.data?.message ?? "Error occurred! Please try again.",
        redirect: error.response?.status === 401
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

export const fetchScheduleByIdAction = createAsyncThunk(
  "scheduled-exports/schedules/:id",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onGet(`/scheduled-exports/schedules/${id}`);
      return response.data;
    } catch (error: any) {
      const errorState: ErrorState = {
        message: error.response?.data?.message ?? "Error occurred! Please try again.",
        redirect: error.response?.status === 401
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

export const toggleScheduleStatusStateAction = createAsyncThunk(
  "scheduled-exports/schedules/toggle-status",
  async (params: ToggleScheduleStatusRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(`/scheduled-exports/schedules/${params.id}/status`, { isActive: params.isActive });
      return response;
    } catch (error: any) {
      const errorState: ErrorState = {
        message: error.response?.data?.message ?? "Error occurred! Please try again.",
        redirect: error.response?.status === 401
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

export const scheduleExportSlice = createSlice({
  name: "scheduleExport",
  initialState: {
    createScheduleState : {data: null, loading: false},
    allScheduleReportsState: { data: [], loading: false },
    fetchScheduleByIdState: { data: null, loading: false },
    updateScheduleState: { data: null, loading: false },
    toggleScheduleStatusState: {success: false, loading: false}
  } as ScheduleExportState,
  reducers: {
    clearCreateScheduleState(state, _: PayloadAction) {
      state.createScheduleState = { data: null, loading: false };
    },
    clearAllScheduleReportsState(state) {
      state.allScheduleReportsState = { data: [], loading: false }; 
    },
    clearFetchScheduleByIdState(state) { 
      state.fetchScheduleByIdState = { data: null, loading: false };
    },
    clearUpdateScheduleState(state) { 
      state.updateScheduleState = { data: null, loading: false };
    },
    clearToggleScheduleStatusState(state) { 
      state.toggleScheduleStatusState = { success: false, loading: false };
    },
  },
  extraReducers: (builder) => {
      builder
        .addCase(createScheduleStateAction.pending, (state: ScheduleExportState, _) => {
          state.createScheduleState.loading = true;
          state.createScheduleState.data = null;
        })
        .addCase(createScheduleStateAction.fulfilled, (state: ScheduleExportState, action) => {
          state.createScheduleState.loading = false;
          state.createScheduleState.data = action.payload as ResponseState<ScheduleExportResponse>
        })
        .addCase(createScheduleStateAction.rejected, (state: ScheduleExportState, _) => {
          state.createScheduleState.loading = false;
        })
        .addCase(fetchAllScheduleReportsAction.pending, (state) => {
          state.allScheduleReportsState.loading = true;
          state.allScheduleReportsState.data = [];
        })
        .addCase(fetchAllScheduleReportsAction.fulfilled, (state, action) => {
          state.allScheduleReportsState.loading = false;
          state.allScheduleReportsState.data = action.payload as ScheduleExportResponse[];
        })
        .addCase(fetchAllScheduleReportsAction.rejected, (state) => {
          state.allScheduleReportsState.loading = false;
        })
        .addCase(fetchScheduleByIdAction.pending, (state) => {
          state.fetchScheduleByIdState.loading = true;
          state.fetchScheduleByIdState.data = null;
        })
        .addCase(fetchScheduleByIdAction.fulfilled, (state, action) => {
          state.fetchScheduleByIdState.loading = false;
          state.fetchScheduleByIdState.data = action.payload as ScheduleExportResponse;
        })
        .addCase(fetchScheduleByIdAction.rejected, (state) => {
          state.fetchScheduleByIdState.loading = false;
        })
        .addCase(updateScheduleStateAction.pending, (state) => { 
          state.updateScheduleState.loading = true;
          state.updateScheduleState.data = null;
        })
        .addCase(updateScheduleStateAction.fulfilled, (state, action) => { 
          state.updateScheduleState.loading = false;
          state.updateScheduleState.data = action.payload as ResponseState<ScheduleExportResponse>;
        })
        .addCase(updateScheduleStateAction.rejected, (state) => {
          state.updateScheduleState.loading = false;
        }).addCase(toggleScheduleStatusStateAction.pending, (state) => {
          state.toggleScheduleStatusState.loading = true;
          state.toggleScheduleStatusState.success = null;
        })
        .addCase(toggleScheduleStatusStateAction.fulfilled, (state, action) => {
          state.toggleScheduleStatusState.loading = false;
          state.toggleScheduleStatusState.success = true; 
        })
        .addCase(toggleScheduleStatusStateAction.rejected, (state) => {
          state.toggleScheduleStatusState.loading = false;
          state.toggleScheduleStatusState.success = false;
        });;
      }
});

export interface ScheduleReportsRequest {
  frequency: ScheduleExportFrequency;
  reportName: string;
  userIds: string[];
  groupTeamIds: string[];
  reportType: ScheduleExportType;
  period: ScheduleExportPeriod;
}
export enum ScheduleExportFrequency {
  Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly",
  Annually = "annually",
}

export const { clearCreateScheduleState, clearAllScheduleReportsState, clearFetchScheduleByIdState,clearUpdateScheduleState, clearToggleScheduleStatusState } =
scheduleExportSlice.actions;
export const getcreateScheduleState = (state: AppState) => state.scheduleExport.createScheduleState;
export const getAllScheduleReportsState = (state: AppState) => state.scheduleExport.allScheduleReportsState;
export const getFetchScheduleByIdState = (state: AppState) => state.scheduleExport.fetchScheduleByIdState;
export const getUpdateScheduleState = (state: AppState) => state.scheduleExport.updateScheduleState;
export const getToggleScheduleStatusState = (state: AppState) => state.scheduleExport.toggleScheduleStatusState;
export default scheduleExportSlice.reducer;
