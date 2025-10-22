import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setErrorState } from "./common-slice";
import { TaskGroupResponse } from "./task-slice";
import { UserResponse } from "./user-slice";
import { onPost, onPatch, onDelete } from "../../core/api-service";
import paths from "../../navigation/paths";
import { ResponseState, ErrorState } from "../common-state";
import { AppState } from "../store";

export enum ReportProgress {
  Completed = "completed",
  Inprogress = "in progress",
  Pending = "pending",
  None = "none",
}

export const reportTagOption = [
  { value: "#FF0000", label: "Red" },
  { value: "#0000FF", label: "Blue" },
  { value: "#008000", label: "Green" },
  { value: "#FFA500", label: "Orange" },
  { value: "#800080", label: "Purple" },
  { value: "#00FFFF", label: "Cyan" },
];

export interface ReportResponse {
  id: string;
  detail: string;
  startTime: Date | null;
  endTime: Date | null;
  duration: number;
  quantity: number;
  progress: ReportProgress;
  comments: string;
  notes: string;
  tag: string | null;
  date: Date;
  overtime: boolean;
  taskGroup: TaskGroupResponse;
  user: UserResponse;
}

export interface CreateReportRequest {
  taskGroupId: string;
  detail: string;
  startTime: Date | null;
  endTime: Date | null;
  duration: number;
  quantity: number;
  progress: ReportProgress;
  comments: string;
  notes: string;
  tag: string | null;
  overtime: boolean;
  date: Date;
}

export interface CreateMultiReportsRequest {
  reports: CreateReportRequest[];
}

export interface UpdateReportRequest {
  id: string;
  taskGroupId: string;
  detail: string;
  startTime: Date | null;
  endTime: Date | null;
  duration: number;
  quantity: number;
  progress: ReportProgress;
  comments: string;
  notes: string;
  overtime: boolean;
  tag: string | null;
}

export interface DeleteReportRequest {
  id: string;
}

export interface DeleteReportsByDate {
  date: string;
}

export interface GetUserDailyReportsRequest {
  userId: string;
  start: string;
  end: string;
}

export interface GetUserWeeklyReportsRequest {
  start: string;
  end: string;
}

export interface GetTeamMemberWeeklyReportsRequest {
  userId: string;
  start: string;
  end: string;
}

export interface GetTeamMemberMonthlyReportsRequest {
  userId: string;
  months: number[];
}

export interface UserDailyReportsResponse {
  [key: string]: (ReportResponse | any)[];
}

export interface UserWeeklyReportsResponse {
  taskGroup: TaskGroupResponse;
  progress: {
    [key: string]: {
      totalDuration: number;
      totalQuantity: number;
      reports: ReportResponse[];
    };
  };
}

export interface TeamMemberWeeklyTaskReports {
  taskGroup: TaskGroupResponse;
  totalDuration: number;
  totalQuantity: number;
  reports: ReportResponse[];
}

export interface TeamMemberWeeklyDateReports {
  date: string;
  totalDuration: number;
  totalQuantity: number;
}

export interface TeamMemberWeeklyReportsResponse {
  taskGroups: TeamMemberWeeklyTaskReports[];
  dates: TeamMemberWeeklyDateReports[];
}

export interface TeamMemberMonthlyReportsResponse {
  taskGroup: TaskGroupResponse;
  totalDuration: number;
  totalQuantity: number;
  reports: ReportResponse[];
}

interface ReportState {
  createReportState: {
    data: ResponseState<ReportResponse> | null;
    loading: boolean;
  };
  updateReportState: {
    data: ResponseState<void> | null;
    loading: boolean;
  };
  deleteReportState: {
    data: ResponseState<void> | null;
    loading: boolean;
  };
  deleteReportsByDateState: {
    data: ResponseState<void> | null;
    loading: boolean;
  };
  userDailyReportsState: {
    data: UserDailyReportsResponse | null;
    loading: boolean;
  };
  userWeeklyReportsState: {
    data: UserWeeklyReportsResponse[];
    loading: boolean;
  };
  teamMemberWeeklyReportsState: {
    data: TeamMemberWeeklyReportsResponse | null;
    loading: boolean;
  };
  teamMemberMonthlyReportsState: {
    data: TeamMemberMonthlyReportsResponse[];
    loading: boolean;
  };
  createMultiReportsState: {
    data: ResponseState<void> | null;
    loading: boolean;
  };
}

export const createReportStateAction = createAsyncThunk(
  "reports",
  async (params: CreateReportRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/reports", params);
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

export const createMultiReportsStateAction = createAsyncThunk(
  "reports/multiple",
  async (params: CreateMultiReportsRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/reports/multiple", params);
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

export const updateReportStateAction = createAsyncThunk(
  "reports/update",
  async (params: UpdateReportRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(`/reports/${params.id}`, params);
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

export const deleteReportStateAction = createAsyncThunk(
  "reports/delete",
  async (params: DeleteReportRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onDelete(`/reports/${params.id}`);
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

export const deleteReportsByDateStateAction = createAsyncThunk(
  "reports/delete-by-date",
  async (params: DeleteReportsByDate, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/reports/delete-by-date", params);
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

export const getUserDailyReportsStateAction = createAsyncThunk(
  "reports/user-daily-reports",
  async (params: GetUserDailyReportsRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/reports/user-daily-reports", params);
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

export const getUserWeeklyReportsStateAction = createAsyncThunk(
  "reports/user-weekly-reports",
  async (
    params: GetUserWeeklyReportsRequest,
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/reports/user-weekly-reports", params);
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

export const getTeamMemberWeeklyReportsStateAction = createAsyncThunk(
  "reports/team-member-weekly-reports",
  async (
    params: GetTeamMemberWeeklyReportsRequest,
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost(
        "/reports/team-member-weekly-reports",
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

export const getTeamMemberMonthlyReportsStateAction = createAsyncThunk(
  "reports/team-member-monthly-reports",
  async (
    params: GetTeamMemberMonthlyReportsRequest,
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost(
        "/reports/team-member-monthly-reports",
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

export const reportSlice = createSlice({
  name: "report",
  initialState: {
    createReportState: { data: null, loading: false },
    updateReportState: { data: null, loading: false },
    deleteReportState: { data: null, loading: false },
    deleteReportsByDateState: { data: null, loading: false },
    userDailyReportsState: { data: null, loading: false },
    userWeeklyReportsState: { data: [], loading: false },
    teamMemberWeeklyReportsState: { data: null, loading: false },
    teamMemberMonthlyReportsState: { data: [], loading: false },
    createMultiReportsState: { data: null, loading: false },
  } as ReportState,
  reducers: {
    clearNewReportState(state, _: PayloadAction) {
      state.createReportState.data = null;
    },
    clearUpdateReportState(state, _: PayloadAction) {
      state.updateReportState.data = null;
    },
    clearDeleteReportState(state, _: PayloadAction) {
      state.deleteReportState.data = null;
    },
    clearDeleteReportsByDateState(state, _: PayloadAction) {
      state.deleteReportsByDateState.data = null;
    },
    clearCreateMultiReportsState(state, _: PayloadAction) {
      state.createMultiReportsState.data = null;
    },
    clearReportStates(state, _: PayloadAction) {
      state.createReportState = { data: null, loading: false };
      state.updateReportState = { data: null, loading: false };
      state.deleteReportState = { data: null, loading: false };
      state.deleteReportsByDateState = { data: null, loading: false };
      state.userDailyReportsState = { data: null, loading: false };
      state.userWeeklyReportsState = { data: [], loading: false };
      state.teamMemberWeeklyReportsState = { data: null, loading: false };
      state.teamMemberMonthlyReportsState = { data: [], loading: false };
      state.createMultiReportsState = {
        data: null,
        loading: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReportStateAction.pending, (state, _) => {
        state.createReportState.loading = true;
        state.createReportState.data = null;
      })
      .addCase(createReportStateAction.fulfilled, (state, action) => {
        state.createReportState.loading = false;
        state.createReportState.data =
          action.payload as ResponseState<ReportResponse>;
      })
      .addCase(createReportStateAction.rejected, (state, _) => {
        state.createReportState.loading = false;
      })
      .addCase(createMultiReportsStateAction.pending, (state, _) => {
        state.createMultiReportsState.loading = true;
        state.createMultiReportsState.data = null;
      })
      .addCase(createMultiReportsStateAction.fulfilled, (state, action) => {
        state.createMultiReportsState.loading = false;
        state.createMultiReportsState.data =
          action.payload as ResponseState<void>;
      })
      .addCase(createMultiReportsStateAction.rejected, (state, _) => {
        state.createMultiReportsState.loading = false;
      })
      .addCase(updateReportStateAction.pending, (state, _) => {
        state.updateReportState.loading = true;
        state.updateReportState.data = null;
      })
      .addCase(updateReportStateAction.fulfilled, (state, action) => {
        state.updateReportState.loading = false;
        state.updateReportState.data = action.payload as ResponseState<void>;
      })
      .addCase(updateReportStateAction.rejected, (state, _) => {
        state.updateReportState.loading = false;
      })
      .addCase(deleteReportStateAction.pending, (state, _) => {
        state.deleteReportState.loading = true;
        state.deleteReportState.data = null;
      })
      .addCase(deleteReportStateAction.fulfilled, (state, action) => {
        state.deleteReportState.loading = false;
        state.deleteReportState.data = action.payload as ResponseState<void>;
      })
      .addCase(deleteReportStateAction.rejected, (state, _) => {
        state.deleteReportState.loading = false;
      })
      .addCase(deleteReportsByDateStateAction.pending, (state, _) => {
        state.deleteReportsByDateState.loading = true;
        state.deleteReportsByDateState.data = null;
      })
      .addCase(deleteReportsByDateStateAction.fulfilled, (state, action) => {
        state.deleteReportsByDateState.loading = false;
        state.deleteReportsByDateState.data =
          action.payload as ResponseState<void>;
      })
      .addCase(deleteReportsByDateStateAction.rejected, (state, _) => {
        state.deleteReportsByDateState.loading = false;
      })
      .addCase(getUserDailyReportsStateAction.pending, (state, _) => {
        state.userDailyReportsState.loading = true;
      })
      .addCase(getUserDailyReportsStateAction.fulfilled, (state, action) => {
        state.userDailyReportsState.loading = false;
        state.userDailyReportsState.data =
          action.payload as UserDailyReportsResponse;
      })
      .addCase(getUserDailyReportsStateAction.rejected, (state, _) => {
        state.userDailyReportsState.loading = false;
      })
      .addCase(getUserWeeklyReportsStateAction.pending, (state, _) => {
        state.userWeeklyReportsState.loading = true;
      })
      .addCase(getUserWeeklyReportsStateAction.fulfilled, (state, action) => {
        state.userWeeklyReportsState.loading = false;
        state.userWeeklyReportsState.data =
          action.payload as UserWeeklyReportsResponse[];
      })
      .addCase(getUserWeeklyReportsStateAction.rejected, (state, _) => {
        state.userWeeklyReportsState.loading = false;
      })
      .addCase(getTeamMemberWeeklyReportsStateAction.pending, (state, _) => {
        state.teamMemberWeeklyReportsState.loading = true;
      })
      .addCase(
        getTeamMemberWeeklyReportsStateAction.fulfilled,
        (state, action) => {
          state.teamMemberWeeklyReportsState.loading = false;
          state.teamMemberWeeklyReportsState.data =
            action.payload as TeamMemberWeeklyReportsResponse;
        }
      )
      .addCase(getTeamMemberWeeklyReportsStateAction.rejected, (state, _) => {
        state.teamMemberWeeklyReportsState.loading = false;
      })
      .addCase(getTeamMemberMonthlyReportsStateAction.pending, (state, _) => {
        state.teamMemberMonthlyReportsState.loading = true;
      })
      .addCase(
        getTeamMemberMonthlyReportsStateAction.fulfilled,
        (state, action) => {
          state.teamMemberMonthlyReportsState.loading = false;
          state.teamMemberMonthlyReportsState.data =
            action.payload as TeamMemberMonthlyReportsResponse[];
        }
      )
      .addCase(getTeamMemberMonthlyReportsStateAction.rejected, (state, _) => {
        state.teamMemberMonthlyReportsState.loading = false;
      });
  },
});

export const {
  clearNewReportState,
  clearUpdateReportState,
  clearDeleteReportState,
  clearDeleteReportsByDateState,
  clearCreateMultiReportsState,
  clearReportStates,
} = reportSlice.actions;

export const getNewReportState = (state: AppState) =>
  state.report.createReportState;
export const getCreateMultiReportsState = (state: AppState) =>
  state.report.createMultiReportsState;
export const getUpdateReportState = (state: AppState) =>
  state.report.updateReportState;
export const getDeleteReportState = (state: AppState) =>
  state.report.deleteReportState;
export const getDeleteReportsByDateState = (state: AppState) =>
  state.report.deleteReportsByDateState;
export const getUserDailyReportsState = (state: AppState) =>
  state.report.userDailyReportsState;
export const getUserWeeklyReportsState = (state: AppState) =>
  state.report.userWeeklyReportsState;
export const getTeamMemberWeeklyReportsState = (state: AppState) =>
  state.report.teamMemberWeeklyReportsState;
export const getTeamMemberMonthlyReportsState = (state: AppState) =>
  state.report.teamMemberMonthlyReportsState;

export default reportSlice.reducer;
