import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setErrorState } from "./common-slice";
import { onGet, onPost, onPatch, onDelete } from "../../core/api-service";
import paths from "../../navigation/paths";
import { ResponseState, ErrorState } from "../common-state";
import { AppState } from "../store";

export enum TaskImplementation {
  GENERAL = 'FuzzyFlow.Core.Task.General',
  CHECK = 'FuzzyFlow.Extension.ModMsq.Task.Check',
  GENERIC = 'FuzzyFlow.Extension.ModMsq.Task.Generic',
}

export enum AssignToOption {
  SAME_USER = 'Assigned to the same user as the previous task',
  JOB_OWNER = 'Assigned to the job owner',
  SPECIFIED_USER = 'Assigned to a user as specified by the person rejecting the check',
}

export enum UnitsSpecificationOption {
  NO = 'no',
  YES_OPTIONAL = "yes but it's not required",
  YES_REQUIRED = "yes it's required",
}

export interface TaskTypeResponse {
  id: string;
  name: string;
  defaultInstructions: string | null;
  defaultPriority: number;
  statusFlowOnStart: string | null;
  statusFlowOnCompletion: string | null;
  statusFlowOnRejection: string | null;
  autoCompleteJob: boolean;
  autoCancelJob: boolean;
  keepFutureTasksOnReject: boolean;
  requireRejectReason: boolean;
  prefillRejectReasons: string[] | null;
  logRejectReason: boolean;
  requirePauseReason: boolean;
  prefillPauseReasons: string[] | null;
  provideNotesField: boolean;
  notesFieldRequired: boolean;
  unitsSpecificationOption: UnitsSpecificationOption;
  taskImplementation: TaskImplementation;
  
  // Check implementation specific
  createTaskOnRejectType: string | null;
  createTaskOnRejectPriority: number | null;
  useRejectReasonAsInstructions: boolean;
  assignTo: AssignToOption | null;
  createChildTaskOnReject: boolean;
  
  // Generic implementation specific
  requiredCompletedJobTypes: string[] | null;
}

export interface CreateTaskTypeRequest {
  name: string;
  defaultInstructions?: string | null;
  defaultPriority?: number;
  statusFlowOnStart?: string | null;
  statusFlowOnCompletion?: string | null;
  statusFlowOnRejection?: string | null;
  autoCompleteJob: boolean;
  autoCancelJob: boolean;
  keepFutureTasksOnReject: boolean;
  requireRejectReason: boolean;
  prefillRejectReasons?: string[] | null;
  logRejectReason: boolean;
  requirePauseReason: boolean;
  prefillPauseReasons?: string[] | null;
  provideNotesField: boolean;
  notesFieldRequired: boolean;
  unitsSpecificationOption: UnitsSpecificationOption | null;
  taskImplementation: TaskImplementation | null;
  
  // Check implementation specific
  createTaskOnRejectType?: string | null;
  createTaskOnRejectPriority?: number | null;
  useRejectReasonAsInstructions?: boolean;
  assignTo?: AssignToOption | null;
  createChildTaskOnReject?: boolean;
  
  // Generic implementation specific
  requiredCompletedJobTypes?: string | null;
}

export interface UpdateTaskTypeRequest extends CreateTaskTypeRequest {
  id: string;
}

interface TaskTypeState {
  allTaskTypesState: { data: TaskTypeResponse[]; loading: boolean };
  taskTypeByIdState: { data: TaskTypeResponse | null; loading: boolean };
  createTaskTypeState: {
    data: ResponseState<TaskTypeResponse> | null;
    loading: boolean;
  };
  updateTaskTypeState: {
    data: ResponseState<TaskTypeResponse> | null;
    loading: boolean;
  };
  deleteTaskTypeState: { data: ResponseState<void> | null; loading: boolean };
}

// The async thunks remain the same as they are implementation-agnostic
export const getAllTaskTypesAction = createAsyncThunk(
  "taskTypes/all",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onGet("/task-types");
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

export const getTaskTypeByIdAction = createAsyncThunk(
  "taskTypes/id",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onGet(`/task-types/${id}`);
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

export const createTaskTypeAction = createAsyncThunk(
  "taskTypes/create",
  async (params: CreateTaskTypeRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/task-types", params);
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

export const updateTaskTypeAction = createAsyncThunk(
  "taskTypes/update",
  async (params: UpdateTaskTypeRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(`/task-types/${params.id}`, params);
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

export const deleteTaskTypeAction = createAsyncThunk(
  "taskTypes/delete",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onDelete(`/task-types/${id}`);
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

// The slice definition remains the same as it's implementation-agnostic
export const taskTypeSlice = createSlice({
  name: "taskTypes",
  initialState: {
    allTaskTypesState: { data: [], loading: false },
    taskTypeByIdState: { data: null, loading: false },
    createTaskTypeState: { data: null, loading: false },
    updateTaskTypeState: { data: null, loading: false },
    deleteTaskTypeState: { data: null, loading: false },
  } as TaskTypeState,
  reducers: {
    clearTaskTypeStates(state, _: PayloadAction) {
      state.allTaskTypesState = { data: [], loading: false };
      state.taskTypeByIdState = { data: null, loading: false };
      state.createTaskTypeState = { data: null, loading: false };
      state.updateTaskTypeState = { data: null, loading: false };
      state.deleteTaskTypeState = { data: null, loading: false };
    },
    clearCreateTaskTypeState(state, _: PayloadAction) {
      state.createTaskTypeState = { data: null, loading: false };
    },
    clearUpdateTaskTypeState(state, _: PayloadAction) {
      state.updateTaskTypeState = { data: null, loading: false };
    },
    clearDeleteTaskTypeState(state, _: PayloadAction) {
      state.deleteTaskTypeState = { data: null, loading: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTaskTypesAction.pending, (state: TaskTypeState) => {
        state.allTaskTypesState.loading = true;
      })
      .addCase(
        getAllTaskTypesAction.fulfilled,
        (state: TaskTypeState, action) => {
          state.allTaskTypesState.loading = false;
          state.allTaskTypesState.data = action.payload.data;
        }
      )
      .addCase(getAllTaskTypesAction.rejected, (state: TaskTypeState) => {
        state.allTaskTypesState.loading = false;
      })
      .addCase(getTaskTypeByIdAction.pending, (state: TaskTypeState) => {
        state.taskTypeByIdState.loading = true;
        state.taskTypeByIdState.data = null;
      })
      .addCase(
        getTaskTypeByIdAction.fulfilled,
        (state: TaskTypeState, action) => {
          state.taskTypeByIdState.loading = false;
          state.taskTypeByIdState.data = action.payload;
        }
      )
      .addCase(getTaskTypeByIdAction.rejected, (state: TaskTypeState) => {
        state.taskTypeByIdState.loading = false;
      })
      .addCase(createTaskTypeAction.pending, (state: TaskTypeState) => {
        state.createTaskTypeState.loading = true;
        state.createTaskTypeState.data = null;
      })
      .addCase(
        createTaskTypeAction.fulfilled,
        (state: TaskTypeState, action) => {
          state.createTaskTypeState.loading = false;
          state.createTaskTypeState.data = action.payload;
        }
      )
      .addCase(createTaskTypeAction.rejected, (state: TaskTypeState) => {
        state.createTaskTypeState.loading = false;
      })
      .addCase(updateTaskTypeAction.pending, (state: TaskTypeState) => {
        state.updateTaskTypeState.loading = true;
        state.updateTaskTypeState.data = null;
      })
      .addCase(
        updateTaskTypeAction.fulfilled,
        (state: TaskTypeState, action) => {
          state.updateTaskTypeState.loading = false;
          state.updateTaskTypeState.data = action.payload;
        }
      )
      .addCase(updateTaskTypeAction.rejected, (state: TaskTypeState) => {
        state.updateTaskTypeState.loading = false;
      })
      .addCase(deleteTaskTypeAction.pending, (state: TaskTypeState) => {
        state.deleteTaskTypeState.loading = true;
        state.deleteTaskTypeState.data = null;
      })
      .addCase(
        deleteTaskTypeAction.fulfilled,
        (state: TaskTypeState, action) => {
          state.deleteTaskTypeState.loading = false;
          state.deleteTaskTypeState.data = action.payload;
        }
      )
      .addCase(deleteTaskTypeAction.rejected, (state: TaskTypeState) => {
        state.deleteTaskTypeState.loading = false;
      });
  },
});

// The selectors remain the same
export const {
  clearTaskTypeStates,
  clearCreateTaskTypeState,
  clearUpdateTaskTypeState,
  clearDeleteTaskTypeState,
} = taskTypeSlice.actions;

export const getAllTaskTypesState = (state: AppState) =>
  state.taskTypes.allTaskTypesState;
export const getTaskTypeByIdState = (state: AppState) =>
  state.taskTypes.taskTypeByIdState;
export const getCreateTaskTypeState = (state: AppState) =>
  state.taskTypes.createTaskTypeState;
export const getUpdateTaskTypeState = (state: AppState) =>
  state.taskTypes.updateTaskTypeState;
export const getDeleteTaskTypeState = (state: AppState) =>
  state.taskTypes.deleteTaskTypeState;

export default taskTypeSlice.reducer;