import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setErrorState } from "./common-slice";
import { UserResponse } from "./user-slice";
import { JobTypeResponse, RelationshipStatusResponse } from "./other-slice";
import { TaskGroupResponse } from "./task-slice";
import { onPost, onPatch, onDelete } from "../../core/api-service";
import paths from "../../navigation/paths";
import { ResponseState, ErrorState } from "../common-state";
import { AppState } from "../store";

export enum DReportProgress {
  Completed = "completed",
  Inprogress = "in progress",
  Pending = "pending",
  None = "none",
}

export interface DReportResponse {
  id: string;
  jobNumber: string;
  jobType: JobTypeResponse | null;
  jobRequestType: DReportRequestType[];
  relationshipStatus: RelationshipStatusResponse | null;
  taskGroup: TaskGroupResponse | null;
  units: number;
  aquareMeters: number;
  levels: number;
  detail: string;
  startTime: Date | null;
  endTime: Date | null;
  duration: number;
  progress: DReportProgress;
  overtime: boolean;
  comments: string;
  notes: string;
  date: Date;
  user: UserResponse;
}

export interface DReportRequestType {
  id: string;
  title: string;
}

export interface CreateDReportRequest {
  jobNumber: string;
  jobTypeId: string | null;
  jobRequestType: DReportRequestType[];
  relationshipStatusId: string | null;
  taskGroupId: string | null;
  units: number;
  aquareMeters: number;
  levels: number;
  detail: string;
  startTime: Date | null;
  endTime: Date | null;
  duration: number;
  progress: DReportProgress;
  overtime: boolean;
  comments: string;
  notes: string;
  date: Date;
}

export interface CreateMultiDReportsRequest {
  reports: CreateDReportRequest[];
}

export interface UpdateDReportRequest {
  id: string;
  jobTypeId: string | null;
  jobRequestType: DReportRequestType[];
  relationshipStatusId: string | null;
  taskGroupId: string | null;
  units: number;
  aquareMeters: number;
  levels: number;
  detail: string;
  startTime: Date | null;
  endTime: Date | null;
  duration: number;
  progress: DReportProgress;
  overtime: boolean;
  comments: string;
  notes: string;
}

export interface DeleteDReportRequest {
  id: string;
}

export interface DeleteDReportsByDate {
  date: string;
}

export interface GetDailyDReportsRequest {
  userId: string;
  start: string;
  end: string;
}

export interface GetWeeklyDReportsRequest {
  start: string;
  end: string;
}

export interface WeeklyDReportsResponse {
  key: string;
  progress: {
    [key: string]: {
      totalDuration: number;
      reports: DReportResponse[];
    };
  };
}

export interface DailyDReportsResponse {
  [key: string]: (DReportResponse | any)[];
}

export interface GetTeamMemberWeeklyDReportsRequest {
  userId: string;
  start: string;
  end: string;
}

export interface TeamMemberWeeklyJobDReports {
  key: string;
  totalDuration: number;
  reports: DReportResponse[];
}

export interface TeamMemberWeeklyDateDReports {
  date: string;
  totalDuration: number;
}

export interface TeamMemberWeeklyDReportsResponse {
  jobs: TeamMemberWeeklyJobDReports[];
  dates: TeamMemberWeeklyDateDReports[];
}

export interface GetTeamMemberMonthlyDReportsRequest {
  userId: string;
  months: number[];
}

export interface TeamMemberMonthlyDReportsResponse {
  key: string;
  totalDuration: number;
  reports: DReportResponse[];
}

interface DReportState {
  createDReportState: {
    data: ResponseState<DReportResponse> | null;
    loading: boolean;
  };
  createMultiDReportsState: {
    data: ResponseState<void> | null;
    loading: boolean;
  };
  updateDReportState: {
    data: ResponseState<void> | null;
    loading: boolean;
  };
  deleteDReportState: {
    data: ResponseState<void> | null;
    loading: boolean;
  };
  deleteDReportsByDateState: {
    data: ResponseState<void> | null;
    loading: boolean;
  };
  dailyDReportsState: {
    data: DailyDReportsResponse | null;
    loading: boolean;
  };
  weeklyDReportsState: {
    data: WeeklyDReportsResponse[];
    loading: boolean;
  };
  teamMemberWeeklyDReportsState: {
    data: TeamMemberWeeklyDReportsResponse | null;
    loading: boolean;
  };
  teamMemberMonthlyDReportsState: {
    data: TeamMemberMonthlyDReportsResponse[];
    loading: boolean;
  };
}

export const createDReportStateAction = createAsyncThunk(
  "design-reports",
  async (params: CreateDReportRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/design-reports", params);
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

export const createMultiDReportsStateAction = createAsyncThunk(
  "design-reports/multiple",
  async (params: CreateMultiDReportsRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/design-reports/multiple", params);
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

export const updateDReportStateAction = createAsyncThunk(
  "design-reports/update",
  async (params: UpdateDReportRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(`/design-reports/${params.id}`, {
        ...params,
        id: undefined,
      });
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

export const deleteDReportStateAction = createAsyncThunk(
  "design-reports/delete",
  async (params: DeleteDReportRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onDelete(`/design-reports/${params.id}`);
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

export const deleteDReportsByDateStateAction = createAsyncThunk(
  "design-reports/delete-by-date",
  async (params: DeleteDReportsByDate, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/design-reports/delete-by-date", params);
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

export const getDailyDReportsStateAction = createAsyncThunk(
  "design-reports/daily-d-reports",
  async (params: GetDailyDReportsRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/design-reports/daily-d-reports", params);
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

export const getWeeklyDReportsStateAction = createAsyncThunk(
  "design-reports/weekly-d-reports",
  async (params: GetWeeklyDReportsRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/design-reports/weekly-d-reports", params);
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

export const getTeamMemberWeeklyDReportsStateAction = createAsyncThunk(
  "design-reports/team-member-weekly-d-reports",
  async (
    params: GetTeamMemberWeeklyDReportsRequest,
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost(
        "/design-reports/team-member-weekly-d-reports",
        params
      );
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

export const getTeamMemberMonthlyDReportsStateAction = createAsyncThunk(
  "design-reports/team-member-monthly-d-reports",
  async (
    params: GetTeamMemberMonthlyDReportsRequest,
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost(
        "/design-reports/team-member-monthly-d-reports",
        params
      );
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

export const dReportSlice = createSlice({
  name: "designReport",
  initialState: {
    createDReportState: { data: null, loading: false },
    createMultiDReportsState: { data: null, loading: false },
    updateDReportState: { data: null, loading: false },
    deleteDReportState: { data: null, loading: false },
    deleteDReportsByDateState: { data: null, loading: false },
    dailyDReportsState: { data: null, loading: false },
    weeklyDReportsState: { data: [], loading: false },
    teamMemberWeeklyDReportsState: { data: null, loading: false },
    teamMemberMonthlyDReportsState: { data: [], loading: false },
  } as DReportState,
  reducers: {
    clearNewDReportState(state, _: PayloadAction) {
      state.createDReportState.data = null;
    },
    clearCreateMultiDReportsState(state, _: PayloadAction) {
      state.createMultiDReportsState.data = null;
    },
    clearUpdateDReportState(state, _: PayloadAction) {
      state.updateDReportState.data = null;
    },
    clearDeleteDReportState(state, _: PayloadAction) {
      state.deleteDReportState.data = null;
    },
    clearDeleteDReportsByDateState(state, _: PayloadAction) {
      state.deleteDReportsByDateState.data = null;
    },
    clearDReportStates(state, _: PayloadAction) {
      state.createDReportState = { data: null, loading: false };
      state.createMultiDReportsState = { data: null, loading: false };
      state.updateDReportState = { data: null, loading: false };
      state.deleteDReportState = { data: null, loading: false };
      state.deleteDReportsByDateState = { data: null, loading: false };
      state.dailyDReportsState = { data: null, loading: false };
      state.weeklyDReportsState = { data: [], loading: false };
      state.teamMemberWeeklyDReportsState = { data: null, loading: false };
      state.teamMemberMonthlyDReportsState = { data: [], loading: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDReportStateAction.pending, (state, _) => {
        state.createDReportState.loading = true;
        state.createDReportState.data = null;
      })
      .addCase(createDReportStateAction.fulfilled, (state, action) => {
        state.createDReportState.loading = false;
        state.createDReportState.data =
          action.payload as ResponseState<DReportResponse>;
      })
      .addCase(createDReportStateAction.rejected, (state, _) => {
        state.createDReportState.loading = false;
      })
      .addCase(createMultiDReportsStateAction.pending, (state, _) => {
        state.createMultiDReportsState.loading = true;
        state.createMultiDReportsState.data = null;
      })
      .addCase(createMultiDReportsStateAction.fulfilled, (state, action) => {
        state.createMultiDReportsState.loading = false;
        state.createMultiDReportsState.data =
          action.payload as ResponseState<void>;
      })
      .addCase(createMultiDReportsStateAction.rejected, (state, _) => {
        state.createMultiDReportsState.loading = false;
      })
      .addCase(updateDReportStateAction.pending, (state, _) => {
        state.updateDReportState.loading = true;
        state.updateDReportState.data = null;
      })
      .addCase(updateDReportStateAction.fulfilled, (state, action) => {
        state.updateDReportState.loading = false;
        state.updateDReportState.data = action.payload as ResponseState<void>;
      })
      .addCase(updateDReportStateAction.rejected, (state, _) => {
        state.updateDReportState.loading = false;
      })
      .addCase(deleteDReportStateAction.pending, (state, _) => {
        state.deleteDReportState.loading = true;
        state.deleteDReportState.data = null;
      })
      .addCase(deleteDReportStateAction.fulfilled, (state, action) => {
        state.deleteDReportState.loading = false;
        state.deleteDReportState.data = action.payload as ResponseState<void>;
      })
      .addCase(deleteDReportStateAction.rejected, (state, _) => {
        state.deleteDReportState.loading = false;
      })
      .addCase(deleteDReportsByDateStateAction.pending, (state, _) => {
        state.deleteDReportsByDateState.loading = true;
        state.deleteDReportsByDateState.data = null;
      })
      .addCase(deleteDReportsByDateStateAction.fulfilled, (state, action) => {
        state.deleteDReportsByDateState.loading = false;
        state.deleteDReportsByDateState.data =
          action.payload as ResponseState<void>;
      })
      .addCase(deleteDReportsByDateStateAction.rejected, (state, _) => {
        state.deleteDReportsByDateState.loading = false;
      })
      .addCase(getDailyDReportsStateAction.pending, (state, _) => {
        state.dailyDReportsState.loading = true;
      })
      .addCase(getDailyDReportsStateAction.fulfilled, (state, action) => {
        state.dailyDReportsState.loading = false;
        state.dailyDReportsState.data = action.payload as DailyDReportsResponse;
      })
      .addCase(getDailyDReportsStateAction.rejected, (state, _) => {
        state.dailyDReportsState.loading = false;
      })
      .addCase(getWeeklyDReportsStateAction.pending, (state, _) => {
        state.weeklyDReportsState.loading = true;
      })
      .addCase(getWeeklyDReportsStateAction.fulfilled, (state, action) => {
        state.weeklyDReportsState.loading = false;
        state.weeklyDReportsState.data =
          action.payload as WeeklyDReportsResponse[];
      })
      .addCase(getWeeklyDReportsStateAction.rejected, (state, _) => {
        state.weeklyDReportsState.loading = false;
      })
      .addCase(getTeamMemberWeeklyDReportsStateAction.pending, (state, _) => {
        state.teamMemberWeeklyDReportsState.loading = true;
      })
      .addCase(
        getTeamMemberWeeklyDReportsStateAction.fulfilled,
        (state, action) => {
          state.teamMemberWeeklyDReportsState.loading = false;
          state.teamMemberWeeklyDReportsState.data =
            action.payload as TeamMemberWeeklyDReportsResponse;
        }
      )
      .addCase(getTeamMemberWeeklyDReportsStateAction.rejected, (state, _) => {
        state.teamMemberWeeklyDReportsState.loading = false;
      })
      .addCase(getTeamMemberMonthlyDReportsStateAction.pending, (state, _) => {
        state.teamMemberMonthlyDReportsState.loading = true;
      })
      .addCase(
        getTeamMemberMonthlyDReportsStateAction.fulfilled,
        (state, action) => {
          state.teamMemberMonthlyDReportsState.loading = false;
          state.teamMemberMonthlyDReportsState.data =
            action.payload as TeamMemberMonthlyDReportsResponse[];
        }
      )
      .addCase(getTeamMemberMonthlyDReportsStateAction.rejected, (state, _) => {
        state.teamMemberMonthlyDReportsState.loading = false;
      });
  },
});

export const {
  clearNewDReportState,
  clearCreateMultiDReportsState,
  clearUpdateDReportState,
  clearDeleteDReportState,
  clearDeleteDReportsByDateState,
  clearDReportStates,
} = dReportSlice.actions;

export const getNewDReportState = (state: AppState) =>
  state.designReport.createDReportState;
export const getCreateMultiDReportsState = (state: AppState) =>
  state.designReport.createMultiDReportsState;
export const getUpdateDReportState = (state: AppState) =>
  state.designReport.updateDReportState;
export const getDeleteDReportState = (state: AppState) =>
  state.designReport.deleteDReportState;
export const getDeleteDReportsByDateState = (state: AppState) =>
  state.designReport.deleteDReportsByDateState;
export const getDailyDReportsState = (state: AppState) =>
  state.designReport.dailyDReportsState;
export const getWeeklyDReportsState = (state: AppState) =>
  state.designReport.weeklyDReportsState;
export const getTeamMemberWeeklyDReportsState = (state: AppState) =>
  state.designReport.teamMemberWeeklyDReportsState;
export const getTeamMemberMonthlyDReportsState = (state: AppState) =>
  state.designReport.teamMemberMonthlyDReportsState;

export default dReportSlice.reducer;
