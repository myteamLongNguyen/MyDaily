import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setErrorState } from "./common-slice";
import { onGet, onPost, onPatch, onDelete } from "../../core/api-service";
import paths from "../../navigation/paths";
import { ResponseState, ErrorState } from "../common-state";
import { AppState } from "../store";

export interface TaskTypeGroupTypeRelation {
  id: string;
  mandatory: boolean;
  taskType: {
    id: string;
    name: string;
  };
  groupType: {
    id: string;
    name: string;
  };
}

export interface TaskGroupTypeResponse {
  id: string;
  name: string;
  created: Date;
  lastUpdated: Date;
  taskTypeRelations: TaskTypeGroupTypeRelation[];
}

export interface CreateTaskGroupTypeRequest {
  name: string;
}

export interface UpdateTaskGroupTypeRequest {
  name?: string;
}

export interface AddTaskTypeToGroupRequest {
  taskTypeId: string;
  mandatory?: boolean;
}

export interface UpdateTaskTypeInGroupRequest {
  mandatory: boolean;
}

interface TaskGroupTypeState {
  allTaskGroupTypesState: { data: TaskGroupTypeResponse[]; loading: boolean };
  taskGroupTypeByIdState: {
    data: TaskGroupTypeResponse | null;
    loading: boolean;
  };
  createTaskGroupTypeState: {
    data: ResponseState<TaskGroupTypeResponse> | null;
    loading: boolean;
  };
  updateTaskGroupTypeState: {
    data: ResponseState<TaskGroupTypeResponse> | null;
    loading: boolean;
  };
  deleteTaskGroupTypeState: {
    data: ResponseState<void> | null;
    loading: boolean;
  };
  addTaskTypeToGroupState: {
    data: ResponseState<TaskTypeGroupTypeRelation> | null;
    loading: boolean;
  };
  removeTaskTypeFromGroupState: {
    data: ResponseState<void> | null;
    loading: boolean;
  };
  updateTaskTypeInGroupState: {
    data: ResponseState<{id:string, mandatory: boolean}> | null;
    loading: boolean;
  };
}

// Async Thunks
export const getAllTaskGroupTypesAction = createAsyncThunk(
  "taskGroupTypes/all",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onGet("/task-group-types");
      return response.data;
    } catch (error: any) {
      const errorState: ErrorState = {
        message:
          error.response?.data?.message ?? "Error occurred! Please try again.",
        redirect:
          error.response?.status === 401
            ? { destination: paths.UNAUTHORIZED, permanent: true }
            : undefined,
      };
      dispatch(setErrorState(errorState));
      return rejectWithValue(errorState);
    }
  }
);

export const getTaskGroupTypeByIdAction = createAsyncThunk(
  "taskGroupTypes/id",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onGet(`/task-group-types/${id}`);
      return response.data;
    } catch (error: any) {
      const errorState: ErrorState = {
        message:
          error.response?.data?.message ?? "Error occurred! Please try again.",
        redirect:
          error.response?.status === 401
            ? { destination: paths.UNAUTHORIZED, permanent: true }
            : undefined,
      };
      dispatch(setErrorState(errorState));
      return rejectWithValue(errorState);
    }
  }
);

export const createTaskGroupTypeAction = createAsyncThunk(
  "taskGroupTypes/create",
  async (params: CreateTaskGroupTypeRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/task-group-types", params);
      return response;
    } catch (error: any) {
      const errorState: ErrorState = {
        message:
          error.response?.data?.message ?? "Error occurred! Please try again.",
        redirect:
          error.response?.status === 401
            ? { destination: paths.UNAUTHORIZED, permanent: true }
            : undefined,
      };
      dispatch(setErrorState(errorState));
      return rejectWithValue(errorState);
    }
  }
);

export const updateTaskGroupTypeAction = createAsyncThunk(
  "taskGroupTypes/update",
  async (
    { id, ...params }: { id: string } & UpdateTaskGroupTypeRequest,
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(`/task-group-types/${id}`, params);
      return response;
    } catch (error: any) {
      const errorState: ErrorState = {
        message:
          error.response?.data?.message ?? "Error occurred! Please try again.",
        redirect:
          error.response?.status === 401
            ? { destination: paths.UNAUTHORIZED, permanent: true }
            : undefined,
      };
      dispatch(setErrorState(errorState));
      return rejectWithValue(errorState);
    }
  }
);

export const deleteTaskGroupTypeAction = createAsyncThunk(
  "taskGroupTypes/delete",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      await onDelete(`/task-group-types/${id}`);
      return id;
    } catch (error: any) {
      const errorState: ErrorState = {
        message:
          error.response?.data?.message ?? "Error occurred! Please try again.",
        redirect:
          error.response?.status === 401
            ? { destination: paths.UNAUTHORIZED, permanent: true }
            : undefined,
      };
      dispatch(setErrorState(errorState));
      return rejectWithValue(errorState);
    }
  }
);

export const addTaskTypeToGroupAction = createAsyncThunk(
  "taskGroupTypes/addTaskType",
  async (
    { groupId, ...params }: { groupId: string } & AddTaskTypeToGroupRequest,
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost(
        `/task-group-types/${groupId}/task-types`,
        params
      );
      return response;
    } catch (error: any) {
      const errorState: ErrorState = {
        message:
          error.response?.data?.message ?? "Error occurred! Please try again.",
        redirect:
          error.response?.status === 401
            ? { destination: paths.UNAUTHORIZED, permanent: true }
            : undefined,
      };
      dispatch(setErrorState(errorState));
      return rejectWithValue(errorState);
    }
  }
);

export const removeTaskTypeFromGroupAction = createAsyncThunk(
  "taskGroupTypes/removeTaskType",
  async (
    { groupId, taskTypeId }: { groupId: string; taskTypeId: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setErrorState(null));
      await onDelete(`/task-group-types/${groupId}/task-types/${taskTypeId}`);
      return { groupId, taskTypeId };
    } catch (error: any) {
      const errorState: ErrorState = {
        message:
          error.response?.data?.message ?? "Error occurred! Please try again.",
        redirect:
          error.response?.status === 401
            ? { destination: paths.UNAUTHORIZED, permanent: true }
            : undefined,
      };
      dispatch(setErrorState(errorState));
      return rejectWithValue(errorState);
    }
  }
);

export const updateTaskTypeInGroupAction = createAsyncThunk(
  "taskGroupTypes/updateTaskTypeInGroup",
  async (
    {
      groupId,
      taskTypeId,
      mandatory,
    }: { groupId: string; taskTypeId: string } & UpdateTaskTypeInGroupRequest,
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(
        `/task-group-types/${groupId}/task-types/${taskTypeId}`,
        { mandatory }
      );
      return {
        relation: response,
        groupId,
        taskTypeId,
      };
    } catch (error: any) {
      const errorState: ErrorState = {
        message:
          error.response?.data?.message ?? "Error occurred! Please try again.",
        redirect:
          error.response?.status === 401
            ? { destination: paths.UNAUTHORIZED, permanent: true }
            : undefined,
      };
      dispatch(setErrorState(errorState));
      return rejectWithValue(errorState);
    }
  }
);

// Slice
export const taskGroupTypeSlice = createSlice({
  name: "taskGroupTypes",
  initialState: {
    allTaskGroupTypesState: { data: [], loading: false },
    taskGroupTypeByIdState: { data: null, loading: false },
    createTaskGroupTypeState: { data: null, loading: false },
    updateTaskGroupTypeState: { data: null, loading: false },
    deleteTaskGroupTypeState: { data: null, loading: false },
    addTaskTypeToGroupState: { data: null, loading: false },
    removeTaskTypeFromGroupState: { data: null, loading: false },
    updateTaskTypeInGroupState: { data: null, loading: false },
  } as TaskGroupTypeState,
  reducers: {
    clearTaskGroupTypeStates(state) {
      state.allTaskGroupTypesState = { data: [], loading: false };
      state.taskGroupTypeByIdState = { data: null, loading: false };
      state.createTaskGroupTypeState = { data: null, loading: false };
      state.updateTaskGroupTypeState = { data: null, loading: false };
      state.deleteTaskGroupTypeState = { data: null, loading: false };
      state.addTaskTypeToGroupState = { data: null, loading: false };
      state.removeTaskTypeFromGroupState = { data: null, loading: false };
      state.updateTaskTypeInGroupState = { data: null, loading: false };
    },
    clearCreateTaskGroupTypeState(state) {
      state.createTaskGroupTypeState = { data: null, loading: false };
    },
    clearUpdateTaskGroupTypeState(state) {
      state.updateTaskGroupTypeState = { data: null, loading: false };
    },
    clearDeleteTaskGroupTypeState(state) {
      state.deleteTaskGroupTypeState = { data: null, loading: false };
    },
    clearAddTaskTypeToGroupState(state) {
      state.addTaskTypeToGroupState = { data: null, loading: false };
    },
    clearRemoveTaskTypeFromGroupState(state) {
      state.removeTaskTypeFromGroupState = { data: null, loading: false };
    },
    clearUpdateTaskTypeInGroupState(state) {
      state.updateTaskTypeInGroupState = { data: null, loading: false };
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All
      .addCase(getAllTaskGroupTypesAction.pending, (state) => {
        state.allTaskGroupTypesState.loading = true;
      })
      .addCase(getAllTaskGroupTypesAction.fulfilled, (state, action) => {
        state.allTaskGroupTypesState.loading = false;
        state.allTaskGroupTypesState.data = action.payload;
      })
      .addCase(getAllTaskGroupTypesAction.rejected, (state) => {
        state.allTaskGroupTypesState.loading = false;
      })

      // Get By ID
      .addCase(getTaskGroupTypeByIdAction.pending, (state) => {
        state.taskGroupTypeByIdState.loading = true;
        state.taskGroupTypeByIdState.data = null;
      })
      .addCase(getTaskGroupTypeByIdAction.fulfilled, (state, action) => {
        state.taskGroupTypeByIdState.loading = false;
        state.taskGroupTypeByIdState.data = action.payload;
      })
      .addCase(getTaskGroupTypeByIdAction.rejected, (state) => {
        state.taskGroupTypeByIdState.loading = false;
      })

      // Create
      .addCase(createTaskGroupTypeAction.pending, (state) => {
        state.createTaskGroupTypeState.loading = true;
        state.createTaskGroupTypeState.data = null;
      })
      .addCase(createTaskGroupTypeAction.fulfilled, (state, action) => {
        state.createTaskGroupTypeState.loading = false;
        state.createTaskGroupTypeState.data = action.payload;
        state.allTaskGroupTypesState.data.push(action.payload);
      })
      .addCase(createTaskGroupTypeAction.rejected, (state) => {
        state.createTaskGroupTypeState.loading = false;
      })

      // Update
      .addCase(updateTaskGroupTypeAction.pending, (state) => {
        state.updateTaskGroupTypeState.loading = true;
        state.updateTaskGroupTypeState.data = null;
      })
      .addCase(updateTaskGroupTypeAction.fulfilled, (state, action) => {
        state.updateTaskGroupTypeState.loading = false;
        state.updateTaskGroupTypeState.data = action.payload;

        // Update in allTaskGroupTypesState
        const index = state.allTaskGroupTypesState.data.findIndex(
          (t) => t.id === action.payload.id
        );
        if (index !== -1) {
          state.allTaskGroupTypesState.data[index] = action.payload;
        }

        // Update in taskGroupTypeByIdState if it's the same task group
        if (state.taskGroupTypeByIdState.data?.id === action.payload.id) {
          state.taskGroupTypeByIdState.data = action.payload;
        }
      })
      .addCase(updateTaskGroupTypeAction.rejected, (state) => {
        state.updateTaskGroupTypeState.loading = false;
      })

      // Delete
      .addCase(deleteTaskGroupTypeAction.pending, (state) => {
        state.deleteTaskGroupTypeState.loading = true;
        state.deleteTaskGroupTypeState.data = null;
      })
      .addCase(deleteTaskGroupTypeAction.fulfilled, (state, action) => {
        state.deleteTaskGroupTypeState.loading = false;
        state.allTaskGroupTypesState.data =
          state.allTaskGroupTypesState.data.filter(
            (t) => t.id !== action.payload
          );

        if (state.taskGroupTypeByIdState.data?.id === action.payload) {
          state.taskGroupTypeByIdState.data = null;
        }
      })
      .addCase(deleteTaskGroupTypeAction.rejected, (state) => {
        state.deleteTaskGroupTypeState.loading = false;
      })

      // Add Task Type to Group
      .addCase(addTaskTypeToGroupAction.pending, (state) => {
        state.addTaskTypeToGroupState.loading = true;
        state.addTaskTypeToGroupState.data = null;
      })
      .addCase(addTaskTypeToGroupAction.fulfilled, (state, action) => {
        state.addTaskTypeToGroupState.loading = false;
        state.addTaskTypeToGroupState.data = action.payload;

        // Create the relation object from the response
        const newRelation: TaskTypeGroupTypeRelation = {
          id: action.payload.data.id,
          mandatory: action.payload.data.mandatory,
          taskType: {
            id: action.payload.data.taskType.id,
            name: action.payload.data.taskType.name,
          },
          groupType: {
            id: action.payload.data.groupType.id,
            name: action.payload.data.groupType.name,
          },
        };

        // Update the task group type in state if it exists
        if (
          state.taskGroupTypeByIdState.data?.id ===
          action.payload.data.groupType.id
        ) {
          state.taskGroupTypeByIdState.data?.taskTypeRelations.push(
            newRelation
          );
        }

        // Update in allTaskGroupTypesState
        const groupIndex = state.allTaskGroupTypesState.data.findIndex(
          (t) => t.id === action.payload.data.groupType.id
        );
        if (groupIndex !== -1) {
          state.allTaskGroupTypesState.data[groupIndex].taskTypeRelations.push(
            newRelation
          );
        }
      })
      .addCase(addTaskTypeToGroupAction.rejected, (state) => {
        state.addTaskTypeToGroupState.loading = false;
      })

      // Remove Task Type from Group
      .addCase(removeTaskTypeFromGroupAction.pending, (state) => {
        state.removeTaskTypeFromGroupState.loading = true;
        state.removeTaskTypeFromGroupState.data = null;
      })
      .addCase(removeTaskTypeFromGroupAction.fulfilled, (state, action) => {
        state.removeTaskTypeFromGroupState.loading = false;

        // Update the task group type in state if it exists
        if (state.taskGroupTypeByIdState.data?.id === action.payload.groupId) {
          state.taskGroupTypeByIdState.data.taskTypeRelations =
            state.taskGroupTypeByIdState.data.taskTypeRelations.filter(
              (r) => r.taskType.id !== action.payload.taskTypeId
            );
        }

        // Update in allTaskGroupTypesState
        const groupIndex = state.allTaskGroupTypesState.data.findIndex(
          (t) => t.id === action.payload.groupId
        );
        if (groupIndex !== -1) {
          state.allTaskGroupTypesState.data[groupIndex].taskTypeRelations =
            state.allTaskGroupTypesState.data[
              groupIndex
            ].taskTypeRelations.filter(
              (r) => r.taskType.id !== action.payload.taskTypeId
            );
        }
        22;
      })
      .addCase(removeTaskTypeFromGroupAction.rejected, (state) => {
        state.removeTaskTypeFromGroupState.loading = false;
      })

      // Update Task Type in Group
      .addCase(updateTaskTypeInGroupAction.pending, (state) => {
        state.updateTaskTypeInGroupState.loading = true;
        state.updateTaskTypeInGroupState.data = null;
      })
      .addCase(updateTaskTypeInGroupAction.fulfilled, (state, action) => {
        state.updateTaskTypeInGroupState.loading = false;
        state.updateTaskTypeInGroupState.data = action.payload.relation;

        // Update the task group type in state if it exists
        if (state.taskGroupTypeByIdState.data?.id === action.payload.groupId) {
          const relationIndex =
            state.taskGroupTypeByIdState.data.taskTypeRelations.findIndex(
              (r) => r.taskType.id === action.payload.taskTypeId
            );
          if (relationIndex !== -1) {
            state.taskGroupTypeByIdState.data.taskTypeRelations[relationIndex] =
              action.payload.relation;
          }
        }

        // Update in allTaskGroupTypesState
        const groupIndex = state.allTaskGroupTypesState.data.findIndex(
          (t) => t.id === action.payload.groupId
        );
        if (groupIndex !== -1) {
          const relationIndex = state.allTaskGroupTypesState.data[
            groupIndex
          ].taskTypeRelations.findIndex(
            (r) => r.taskType.id === action.payload.taskTypeId
          );
          if (relationIndex !== -1) {
            state.allTaskGroupTypesState.data[groupIndex].taskTypeRelations[
              relationIndex
            ] = action.payload.relation;
          }
        }
      })
      .addCase(updateTaskTypeInGroupAction.rejected, (state) => {
        state.updateTaskTypeInGroupState.loading = false;
      });
  },
});

export const {
  clearTaskGroupTypeStates,
  clearCreateTaskGroupTypeState,
  clearUpdateTaskGroupTypeState,
  clearDeleteTaskGroupTypeState,
  clearAddTaskTypeToGroupState,
  clearRemoveTaskTypeFromGroupState,
  clearUpdateTaskTypeInGroupState,
} = taskGroupTypeSlice.actions;

export const getAllTaskGroupTypesState = (state: AppState) =>
  state.taskGroupTypes.allTaskGroupTypesState;
export const getTaskGroupTypeByIdState = (state: AppState) =>
  state.taskGroupTypes.taskGroupTypeByIdState;
export const getCreateTaskGroupTypeState = (state: AppState) =>
  state.taskGroupTypes.createTaskGroupTypeState;
export const getUpdateTaskGroupTypeState = (state: AppState) =>
  state.taskGroupTypes.updateTaskGroupTypeState;
export const getDeleteTaskGroupTypeState = (state: AppState) =>
  state.taskGroupTypes.deleteTaskGroupTypeState;
export const getAddTaskTypeToGroupState = (state: AppState) =>
  state.taskGroupTypes.addTaskTypeToGroupState;
export const getRemoveTaskTypeFromGroupState = (state: AppState) =>
  state.taskGroupTypes.removeTaskTypeFromGroupState;
export const getUpdateTaskTypeInGroupState = (state: AppState) =>
  state.taskGroupTypes.updateTaskTypeInGroupState;

export default taskGroupTypeSlice.reducer;
