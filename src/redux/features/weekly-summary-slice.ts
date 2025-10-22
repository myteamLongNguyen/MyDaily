import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { onPost, onPatch } from "../../core/api-service";
import paths from "../../navigation/paths";
import { ResponseState, ErrorState } from "../common-state";
import { AppState } from "../store";
import { setErrorState } from "./common-slice";
import { UserResponse } from "./user-slice";

export interface SummaryReason {
  type: { id: string; title: string };
  detail: string;
  discuss: WeeklySummaryComment[];
}

export interface SummaryChallenge {
  type: { id: string; title: string };
  explain: string;
  action: string;
  discuss: WeeklySummaryComment[];
}

export interface SummaryIssueIdentify {
  type: { id: string; title: string };
  quantity: number | null;
  jobNumber: string | null;
  reason: string;
  action: string;
  discuss: WeeklySummaryComment[];
}

export interface SummarySupportResource {
  type: { id: string; title: string };
  explain: string;
  discuss: WeeklySummaryComment[];
}

export interface SummaryAction {
  type: string;
  detail: string;
}

export interface SummaryGoal {
  goal: string;
  discuss: WeeklySummaryComment[];
}

export interface CreateWeeklySummaryRequest {
  metGoals: boolean;
  reasons: SummaryReason[];
  challenges: SummaryChallenge[];
  issueIdentifies: SummaryIssueIdentify[];
  goals: SummaryGoal[];
  supportResources: SummarySupportResource[];
  comments: WeeklySummaryComment[];
  startDate: Date;
  endDate: Date;
}

export interface UpdateWeeklySummaryRequest {
  id: string;
  metGoals: boolean;
  reasons: SummaryReason[];
  challenges: SummaryChallenge[];
  issueIdentifies: SummaryIssueIdentify[];
  goals: SummaryGoal[];
  supportResources: SummarySupportResource[];
}

export interface GetUserWeeklySummaryRequest {
  userId: string;
  start: string;
  end: string;
}

export interface WeeklySummaryComment {
  user: UserResponse;
  message: string;
  timestamp: Date;
}

export interface CommentWeeklySummaryRequest {
  id: string;
  comments: WeeklySummaryComment[];
}

export interface DiscussPropertyRequest {
  summaryId: string;
  type: "reason" | "challenge" | "issue" | "goal" | "resource";
  propertyId: string;
  discusses: WeeklySummaryComment[];
}

export interface WeeklySummaryActionsRequest {
  summaryId: string;
  actions: SummaryAction[];
}

export interface WeeklySummaryResponse {
  id: string;
  metGoals: boolean;
  reasons: SummaryReason[];
  challenges: SummaryChallenge[];
  issueIdentifies: SummaryIssueIdentify[];
  goals: SummaryGoal[];
  supportResources: SummarySupportResource[];
  actions: SummaryAction[];
  comments: WeeklySummaryComment[];
  startDate: Date;
  endDate: Date;
  user: UserResponse;
}

interface WeeklySummaryState {
  weeklySummary: { data: WeeklySummaryResponse | null; loading: boolean };
  newWeeklySummary: {
    data: ResponseState<WeeklySummaryResponse> | null;
    loading: boolean;
  };
  updateWeeklySummary: {
    data: ResponseState<void> | null;
    loading: boolean;
  };
  commentWeeklySummary: {
    data: ResponseState<void> | null;
    loading: boolean;
  };
  discussProperty: {
    data: ResponseState<void> | null;
    loading: boolean;
  };
  weeklySummaryActions: {
    data: ResponseState<void> | null;
    loading: boolean;
  };
}

export const userWeeklySummaryStateAction = createAsyncThunk(
  "weekly-summary/user-weekly-summary",
  async (
    params: GetUserWeeklySummaryRequest,
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost(
        "/weekly-summary/user-weekly-summary",
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

export const createWeeklySummaryStateAction = createAsyncThunk(
  "weekly-summary",
  async (params: CreateWeeklySummaryRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/weekly-summary", params);
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

export const updateWeeklySummaryStateAction = createAsyncThunk(
  "update-weekly-summary",
  async (params: UpdateWeeklySummaryRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(`/weekly-summary/${params.id}`, params);
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

export const weeklySummaryActionsStateAction = createAsyncThunk(
  "update-weekly-summary/actions",
  async (
    params: WeeklySummaryActionsRequest,
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(`/weekly-summary/${params.summaryId}`, {
        actions: params.actions,
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

export const commentWeeklySummaryStateAction = createAsyncThunk(
  "weekly-summary/comment",
  async (
    params: CommentWeeklySummaryRequest,
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(`/weekly-summary/${params.id}/comments`, {
        comments: params.comments,
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

export const discussPropertyStateAction = createAsyncThunk(
  "weekly-summary/discuss-property",
  async (params: DiscussPropertyRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(
        `/weekly-summary/${params.summaryId}/discuss-property`,
        {
          type: params.type,
          propertyId: params.propertyId,
          discusses: params.discusses,
        }
      );
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

export const weeklySummarySlice = createSlice({
  name: "weeklySummary",
  initialState: {
    weeklySummary: { data: null, loading: false },
    newWeeklySummary: { data: null, loading: false },
    updateWeeklySummary: { data: null, loading: false },
    commentWeeklySummary: { data: null, loading: false },
    discussProperty: { data: null, loading: false },
    weeklySummaryActions: { data: null, loading: false },
  } as WeeklySummaryState,
  reducers: {
    clearNewWeeklySummaryState(state, _: PayloadAction) {
      state.newWeeklySummary.data = null;
    },
    clearUpdateWeeklySummaryState(state, _: PayloadAction) {
      state.updateWeeklySummary.data = null;
    },
    clearWeeklySummaryActionsState(state, _: PayloadAction) {
      state.weeklySummaryActions.data = null;
    },
    clearWeeklySummaryStates(state, _: PayloadAction) {
      state.weeklySummary = { data: null, loading: false };
      state.newWeeklySummary = { data: null, loading: false };
      state.updateWeeklySummary = { data: null, loading: false };
      state.weeklySummaryActions = { data: null, loading: false };
    },
    clearCommentWeeklySummaryState(state, _: PayloadAction) {
      state.commentWeeklySummary = { data: null, loading: false };
    },
    clearDiscussPropertyState(state, _: PayloadAction) {
      state.discussProperty = { data: null, loading: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userWeeklySummaryStateAction.pending, (state, _) => {
        state.weeklySummary.loading = true;
        state.weeklySummary.data = null;
      })
      .addCase(userWeeklySummaryStateAction.fulfilled, (state, action) => {
        state.weeklySummary.loading = false;
        state.weeklySummary.data = action.payload as WeeklySummaryResponse;
      })
      .addCase(userWeeklySummaryStateAction.rejected, (state, _) => {
        state.weeklySummary.loading = false;
      })
      .addCase(createWeeklySummaryStateAction.pending, (state, _) => {
        state.newWeeklySummary.loading = true;
        state.newWeeklySummary.data = null;
      })
      .addCase(createWeeklySummaryStateAction.fulfilled, (state, action) => {
        state.newWeeklySummary.loading = false;
        state.newWeeklySummary.data =
          action.payload as ResponseState<WeeklySummaryResponse>;
      })
      .addCase(createWeeklySummaryStateAction.rejected, (state, _) => {
        state.newWeeklySummary.loading = false;
      })
      .addCase(updateWeeklySummaryStateAction.pending, (state, _) => {
        state.updateWeeklySummary.loading = true;
        state.updateWeeklySummary.data = null;
      })
      .addCase(updateWeeklySummaryStateAction.fulfilled, (state, action) => {
        state.updateWeeklySummary.loading = false;
        state.updateWeeklySummary.data = action.payload as ResponseState<void>;
      })
      .addCase(updateWeeklySummaryStateAction.rejected, (state, _) => {
        state.updateWeeklySummary.loading = false;
      })
      .addCase(weeklySummaryActionsStateAction.pending, (state, _) => {
        state.weeklySummaryActions.loading = true;
        state.weeklySummaryActions.data = null;
      })
      .addCase(weeklySummaryActionsStateAction.fulfilled, (state, action) => {
        state.weeklySummaryActions.loading = false;
        state.weeklySummaryActions.data = action.payload as ResponseState<void>;
      })
      .addCase(weeklySummaryActionsStateAction.rejected, (state, _) => {
        state.weeklySummaryActions.loading = false;
      })
      .addCase(commentWeeklySummaryStateAction.pending, (state, _) => {
        state.commentWeeklySummary.loading = true;
        state.commentWeeklySummary.data = null;
      })
      .addCase(commentWeeklySummaryStateAction.fulfilled, (state, action) => {
        state.commentWeeklySummary.loading = false;
        state.commentWeeklySummary.data = action.payload as ResponseState<void>;
      })
      .addCase(commentWeeklySummaryStateAction.rejected, (state, _) => {
        state.commentWeeklySummary.loading = false;
      })
      .addCase(discussPropertyStateAction.pending, (state, _) => {
        state.discussProperty.loading = true;
        state.discussProperty.data = null;
      })
      .addCase(discussPropertyStateAction.fulfilled, (state, action) => {
        state.discussProperty.loading = false;
        state.discussProperty.data = action.payload as ResponseState<void>;
      })
      .addCase(discussPropertyStateAction.rejected, (state, _) => {
        state.discussProperty.loading = false;
      });
  },
});

export const {
  clearNewWeeklySummaryState,
  clearUpdateWeeklySummaryState,
  clearCommentWeeklySummaryState,
  clearWeeklySummaryStates,
  clearDiscussPropertyState,
  clearWeeklySummaryActionsState,
} = weeklySummarySlice.actions;

export const getNewWeeklySummaryState = (state: AppState) =>
  state.weeklySummary.newWeeklySummary;
export const getUpdateWeeklySummaryState = (state: AppState) =>
  state.weeklySummary.updateWeeklySummary;
export const getWeeklySummaryActionsState = (state: AppState) =>
  state.weeklySummary.weeklySummaryActions;
export const getCommentWeeklySummaryState = (state: AppState) =>
  state.weeklySummary.commentWeeklySummary;
export const getWeeklySummaryState = (state: AppState) =>
  state.weeklySummary.weeklySummary;
export const getDiscussPropertyState = (state: AppState) =>
  state.weeklySummary.discussProperty;

export default weeklySummarySlice.reducer;
