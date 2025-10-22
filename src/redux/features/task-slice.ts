import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  BranchResponse,
  OrganizationResponse,
  RecurrenceResponse,
  TeamResponse,
} from "./other-slice";
import { setErrorState } from "./common-slice";
import { onPost, onPatch } from "../../core/api-service";
import paths from "../../navigation/paths";
import { ResponseState, ErrorState } from "../common-state";
import { AppState } from "../store";

export enum TaskStatus {
  Active = "active",
  Inactive = "inactive",
}

export interface TaskGroupResponse {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  created: Date;
  lock: boolean;
  taskFunctionId: string;
  organizationId: string;
  teamId: string;
  taskFunction: TaskFunctionResponse;
  branch: BranchResponse | null;
  recurrence: RecurrenceResponse;
}

export interface TaskFunctionResponse {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  team: TeamResponse;
  lock: boolean;
  temporary: boolean;
  organization: OrganizationResponse;
  taskGroups: TaskGroupResponse[];
}

export interface CreateTaskFunctionRequest {
  title: string;
  description: string;
  teamId: string;
  organizationId: string;
}

export interface CopyTaskFunctionRequest {
  title: string;
  description: string;
  teamId: string;
  organizationId: string;
  taskGroups: CreateTaskGroupRequest[];
}

export interface UpdateTaskFunctionRequest {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  teamId: string;
  organizationId: string;
}

export interface GetTaskFunctionsByTeamRequest {
  teamId: string;
}

export interface TaskFunctionsByOrgResponse {
  organizationId: string;
  organizationName: string;
  taskFunctions: TaskFunctionResponse[];
}

export interface GetTaskFunctionsForMemberRequest {
  teamId: string;
  organizationId: string;
  branchId?: string;
}

export interface CreateTaskGroupRequest {
  title: string;
  description: string;
  taskFunctionId: string;
  branchId?: string;
  recurrenceId: string;
}

export interface UpdateTaskGroupRequest {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  taskFunctionId: string;
  branchId?: string;
  recurrenceId: string;
}

interface TaskState {
  createTaskFunctionState: {
    data: ResponseState<TaskFunctionResponse> | null;
    loading: boolean;
  };
  copyTaskFunctionState: {
    data: ResponseState<TaskFunctionResponse> | null;
    loading: boolean;
  };
  updateTaskFunctionState: {
    data: ResponseState<void> | null;
    loading: boolean;
  };
  taskFunctionsByTeamState: {
    data: TaskFunctionsByOrgResponse[];
    loading: boolean;
  };
  taskFunctionsForMemberState: {
    data: TaskFunctionResponse[];
    loading: boolean;
  };
  createTaskGroupState: {
    data: ResponseState<TaskGroupResponse> | null;
    loading: boolean;
  };
  updateTaskGroupState: { data: ResponseState<void> | null; loading: boolean };
}

export const createTaskFunctionStateAction = createAsyncThunk(
  "tasks/task-function",
  async (params: CreateTaskFunctionRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/tasks/task-function", params);
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

export const copyTaskFunctionStateAction = createAsyncThunk(
  "tasks/copy-task-function",
  async (params: CopyTaskFunctionRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/tasks/copy-task-function", params);
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

export const updateTaskFunctionStateAction = createAsyncThunk(
  "tasks/task-function/update",
  async (params: UpdateTaskFunctionRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(`/tasks/task-function/${params.id}`, {
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

export const taskFunctionsByTeamStateAction = createAsyncThunk(
  "tasks/task-functions",
  async (
    params: GetTaskFunctionsByTeamRequest,
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/tasks/task-functions-by-team", {
        teamId: params.teamId,
      });
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

export const taskFunctionsForMemberStateAction = createAsyncThunk(
  "tasks/task-functions-for-member",
  async (
    params: GetTaskFunctionsForMemberRequest,
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/tasks/task-functions-for-member", params);
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

export const createTaskGroupStateAction = createAsyncThunk(
  "tasks/task-group",
  async (params: CreateTaskGroupRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/tasks/task-group", params);
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

export const updateTaskGroupStateAction = createAsyncThunk(
  "tasks/task-group/update",
  async (params: UpdateTaskGroupRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(`/tasks/task-group/${params.id}`, {
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

export const taskSlice = createSlice({
  name: "task",
  initialState: {
    createTaskFunctionState: { data: null, loading: false },
    copyTaskFunctionState: { data: null, loading: false },
    updateTaskFunctionState: { data: null, loading: false },
    taskFunctionsByTeamState: { data: [], loading: false },
    taskFunctionsForMemberState: { data: [], loading: false },
    createTaskGroupState: { data: null, loading: false },
    updateTaskGroupState: { data: null, loading: false },
  } as TaskState,
  reducers: {
    clearNewTaskFunctionState(state, _: PayloadAction) {
      state.createTaskFunctionState.data = null;
    },
    clearCopyTaskFunctionState(state, _: PayloadAction) {
      state.copyTaskFunctionState.data = null;
    },
    clearUpdateTaskFunctionState(state, _: PayloadAction) {
      state.updateTaskFunctionState.data = null;
    },
    clearNewTaskGroupState(state, _: PayloadAction) {
      state.createTaskGroupState.data = null;
    },
    clearUpdateTaskGroupState(state, _: PayloadAction) {
      state.updateTaskGroupState.data = null;
    },
    clearTaskStates(state, _: PayloadAction) {
      state.createTaskFunctionState = { data: null, loading: false };
      state.copyTaskFunctionState = { data: null, loading: false };
      state.updateTaskFunctionState = { data: null, loading: false };
      state.taskFunctionsByTeamState = { data: [], loading: false };
      state.taskFunctionsForMemberState = { data: [], loading: false };
      state.createTaskGroupState = { data: null, loading: false };
      state.updateTaskGroupState = { data: null, loading: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTaskFunctionStateAction.pending, (state, _) => {
        state.createTaskFunctionState.loading = true;
        state.createTaskFunctionState.data = null;
      })
      .addCase(createTaskFunctionStateAction.fulfilled, (state, action) => {
        state.createTaskFunctionState.loading = false;
        state.createTaskFunctionState.data =
          action.payload as ResponseState<TaskFunctionResponse>;
      })
      .addCase(
        createTaskFunctionStateAction.rejected,
        (state: TaskState, _) => {
          state.createTaskFunctionState.loading = false;
        }
      )
      .addCase(copyTaskFunctionStateAction.pending, (state, _) => {
        state.copyTaskFunctionState.loading = true;
        state.copyTaskFunctionState.data = null;
      })
      .addCase(copyTaskFunctionStateAction.fulfilled, (state, action) => {
        state.copyTaskFunctionState.loading = false;
        state.copyTaskFunctionState.data =
          action.payload as ResponseState<TaskFunctionResponse>;
      })
      .addCase(copyTaskFunctionStateAction.rejected, (state: TaskState, _) => {
        state.copyTaskFunctionState.loading = false;
      })
      .addCase(updateTaskFunctionStateAction.pending, (state, _) => {
        state.updateTaskFunctionState.loading = true;
        state.updateTaskFunctionState.data = null;
      })
      .addCase(updateTaskFunctionStateAction.fulfilled, (state, action) => {
        state.updateTaskFunctionState.loading = false;
        state.updateTaskFunctionState.data =
          action.payload as ResponseState<void>;
      })
      .addCase(
        updateTaskFunctionStateAction.rejected,
        (state: TaskState, _) => {
          state.updateTaskFunctionState.loading = false;
        }
      )
      .addCase(
        taskFunctionsByTeamStateAction.pending,
        (state: TaskState, _) => {
          state.taskFunctionsByTeamState.loading = true;
        }
      )
      .addCase(
        taskFunctionsByTeamStateAction.fulfilled,
        (state: TaskState, action) => {
          state.taskFunctionsByTeamState.loading = false;
          state.taskFunctionsByTeamState.data =
            action.payload as TaskFunctionsByOrgResponse[];
        }
      )
      .addCase(
        taskFunctionsByTeamStateAction.rejected,
        (state: TaskState, _) => {
          state.taskFunctionsByTeamState.loading = false;
        }
      )
      .addCase(
        taskFunctionsForMemberStateAction.pending,
        (state: TaskState, _) => {
          state.taskFunctionsForMemberState.loading = true;
        }
      )
      .addCase(
        taskFunctionsForMemberStateAction.fulfilled,
        (state: TaskState, action) => {
          state.taskFunctionsForMemberState.loading = false;
          state.taskFunctionsForMemberState.data =
            action.payload as TaskFunctionResponse[];
        }
      )
      .addCase(
        taskFunctionsForMemberStateAction.rejected,
        (state: TaskState, _) => {
          state.taskFunctionsForMemberState.loading = false;
        }
      )
      .addCase(createTaskGroupStateAction.pending, (state, _) => {
        state.createTaskGroupState.loading = true;
        state.createTaskGroupState.data = null;
      })
      .addCase(createTaskGroupStateAction.fulfilled, (state, action) => {
        state.createTaskGroupState.loading = false;
        state.createTaskGroupState.data =
          action.payload as ResponseState<TaskGroupResponse>;
      })
      .addCase(createTaskGroupStateAction.rejected, (state: TaskState, _) => {
        state.createTaskGroupState.loading = false;
      })
      .addCase(updateTaskGroupStateAction.pending, (state, _) => {
        state.updateTaskGroupState.loading = true;
        state.updateTaskGroupState.data = null;
      })
      .addCase(updateTaskGroupStateAction.fulfilled, (state, action) => {
        state.updateTaskGroupState.loading = false;
        state.updateTaskGroupState.data = action.payload as ResponseState<void>;
      })
      .addCase(updateTaskGroupStateAction.rejected, (state: TaskState, _) => {
        state.updateTaskGroupState.loading = false;
      });
  },
});

export const {
  clearNewTaskGroupState,
  clearCopyTaskFunctionState,
  clearNewTaskFunctionState,
  clearUpdateTaskFunctionState,
  clearUpdateTaskGroupState,
  clearTaskStates,
} = taskSlice.actions;

export const getNewTaskFunctionState = (state: AppState) =>
  state.task.createTaskFunctionState;
export const getCopyTaskFunctionState = (state: AppState) =>
  state.task.copyTaskFunctionState;
export const getUpdateTaskFunctionState = (state: AppState) =>
  state.task.updateTaskFunctionState;
export const getTaskFunctionsByTeamState = (state: AppState) =>
  state.task.taskFunctionsByTeamState;
export const getTaskFunctionsForMemberState = (state: AppState) =>
  state.task.taskFunctionsForMemberState;
export const getNewTaskGroupState = (state: AppState) =>
  state.task.createTaskGroupState;
export const getUpdateTaskGroupState = (state: AppState) =>
  state.task.updateTaskGroupState;

export default taskSlice.reducer;
