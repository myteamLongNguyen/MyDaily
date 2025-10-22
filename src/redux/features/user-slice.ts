import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setErrorState } from "./common-slice";
import {
  GroupTeamResponse,
  PositionResponse,
  TeamResponse,
} from "./other-slice";
import { ExperienceResponse } from "./experience-slice";
import { CustomerResponse } from "./customer-slice";
import { CategoryResponse } from "./category-slice";
import { onGet, onPost, onPatch } from "../../core/api-service";
import paths from "../../navigation/paths";
import { ResponseState, ErrorState } from "../common-state";
import { AppState } from "../store";

export enum UserStatus {
  Active = "active",
  Inactive = "inactive",
}

export enum UserRole {
  Admin = "administrator",
  Manager = "manager",
  Supervisor = "supervisor",
  Leader = "leader",
  Contributor = "contributor",
  Member = "member",
  CustomerSupport = "customersupport"
}

export interface GetUsersByTeamRequest {
  teamId: string;
}

export interface GetUsersByGroupTeamRequest {
  groupTeamId: string;
}

export interface GetUserByIdRequest {
  id: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateUserRequest {
  id: string;
  name: string;
  email: string;
  positionId: string;
  experienceId: string;
  customerId: string | null;
  categoryId: string | null;
  teamId: string;
  groupTeamId: string | null;
  role: UserRole;
  workingTimes: UserWorkingTime[];
}

export interface ToggleUserStatusRequest {
  id: string;
  status: UserStatus;
}

export interface GetAllUsersRequest {
  teamIds: string[];
  roles: UserRole[];
}

export interface UserWorkingTime {
  startTime: string;
  endTime: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  team: TeamResponse;
  groupTeam: GroupTeamResponse | null;
  leadGroupTeam: string[];
  position: PositionResponse;
  experience: ExperienceResponse;
  customer: CustomerResponse | null;
  category: CategoryResponse;
  misaCode: string;
  workingTimes: UserWorkingTime[];
  technicalUnitIds: string[];
}

interface UserState {
  usersByTeamState: { data: UserResponse[]; loading: boolean };
  usersByGroupTeamState: { data: UserResponse[]; loading: boolean };
  allUsersState: { data: UserResponse[]; loading: boolean };
  userByIdState: { data: UserResponse | null; loading: boolean };
  updateUserState: { data: ResponseState<void> | null; loading: boolean };
  toggleUserStatusState: { data: ResponseState<void> | null; loading: boolean };
  changePasswordState: { data: ResponseState<void> | null; loading: boolean };
}

export const usersByTeamStateAction = createAsyncThunk(
  "users/users-by-team",
  async (params: GetUsersByTeamRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onGet(`/users/users-by-team/${params.teamId}`);
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

export const usersByGroupTeamStateAction = createAsyncThunk(
  "users/users-by-group-team",
  async (params: GetUsersByGroupTeamRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onGet(
        `/users/users-by-group-team/${params.groupTeamId}`
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

export const allUsersStateAction = createAsyncThunk(
  "users/all",
  async (params: GetAllUsersRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/users/all", params);
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

export const userByIdStateAction = createAsyncThunk(
  "users/id",
  async (params: GetUserByIdRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onGet(`/users/${params.id}`);
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

export const updateUserStateAction = createAsyncThunk(
  "users/update",
  async (params: UpdateUserRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(`/users/${params.id}`, params);
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

export const toggleUserStatusStateAction = createAsyncThunk(
  "users/toggle-user-status",
  async (params: ToggleUserStatusRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(
        `/users/${params.id}/toggle-account-status`,
        { status: params.status }
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

export const changePasswordStateAction = createAsyncThunk(
  "users/change-password",
  async (params: ChangePasswordRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch("/users/change-password", params);
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

export const userSlice = createSlice({
  name: "users",
  initialState: {
    usersByTeamState: { data: [], loading: false },
    usersByGroupTeamState: { data: [], loading: false },
    allUsersState: { data: [], loading: false },
    registerUserState: { data: null, loading: false },
    userByIdState: { data: null, loading: false },
    updateUserState: { data: null, loading: false },
    toggleUserStatusState: { data: null, loading: false },
    changePasswordState: { data: null, loading: false },
  } as UserState,
  reducers: {
    clearUserStates(state, _: PayloadAction) {
      state.usersByTeamState = { data: [], loading: false };
      state.usersByGroupTeamState = { data: [], loading: false };
      state.allUsersState = { data: [], loading: false };
      state.userByIdState = { data: null, loading: false };
      state.updateUserState = { data: null, loading: false };
      state.toggleUserStatusState = { data: null, loading: false };
      state.changePasswordState = { data: null, loading: false };
    },
    clearUpdateUserState(state, _: PayloadAction) {
      state.updateUserState = { data: null, loading: false };
    },
    clearToggleUserStatusState(state, _: PayloadAction) {
      state.toggleUserStatusState = { data: null, loading: false };
    },
    clearChangePasswordState(state, _: PayloadAction) {
      state.changePasswordState = { data: null, loading: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(usersByTeamStateAction.pending, (state: UserState, _) => {
        state.usersByTeamState.loading = true;
      })
      .addCase(usersByTeamStateAction.fulfilled, (state: UserState, action) => {
        state.usersByTeamState.loading = false;
        state.usersByTeamState.data = action.payload as UserResponse[];
      })
      .addCase(usersByTeamStateAction.rejected, (state: UserState, _) => {
        state.usersByTeamState.loading = false;
      })
      .addCase(usersByGroupTeamStateAction.pending, (state: UserState, _) => {
        state.usersByGroupTeamState.loading = true;
      })
      .addCase(
        usersByGroupTeamStateAction.fulfilled,
        (state: UserState, action) => {
          state.usersByGroupTeamState.loading = false;
          state.usersByGroupTeamState.data = action.payload as UserResponse[];
        }
      )
      .addCase(usersByGroupTeamStateAction.rejected, (state: UserState, _) => {
        state.usersByGroupTeamState.loading = false;
      })
      .addCase(allUsersStateAction.pending, (state: UserState, _) => {
        state.allUsersState.loading = true;
      })
      .addCase(allUsersStateAction.fulfilled, (state: UserState, action) => {
        state.allUsersState.loading = false;
        state.allUsersState.data = action.payload as UserResponse[];
      })
      .addCase(allUsersStateAction.rejected, (state: UserState, _) => {
        state.allUsersState.loading = false;
      })
      .addCase(userByIdStateAction.pending, (state: UserState, _) => {
        state.userByIdState.loading = true;
        state.userByIdState.data = null;
      })
      .addCase(userByIdStateAction.fulfilled, (state: UserState, action) => {
        state.userByIdState.loading = false;
        state.userByIdState.data = action.payload as UserResponse;
      })
      .addCase(userByIdStateAction.rejected, (state: UserState, _) => {
        state.userByIdState.loading = false;
      })
      .addCase(changePasswordStateAction.pending, (state: UserState, _) => {
        state.changePasswordState.loading = true;
        state.changePasswordState.data = null;
      })
      .addCase(
        changePasswordStateAction.fulfilled,
        (state: UserState, action) => {
          state.changePasswordState.loading = false;
          state.changePasswordState.data =
            action.payload as ResponseState<void>;
        }
      )
      .addCase(changePasswordStateAction.rejected, (state: UserState, _) => {
        state.changePasswordState.loading = false;
      })
      .addCase(updateUserStateAction.pending, (state: UserState, _) => {
        state.updateUserState.loading = true;
        state.updateUserState.data = null;
      })
      .addCase(updateUserStateAction.fulfilled, (state: UserState, action) => {
        state.updateUserState.loading = false;
        state.updateUserState.data = action.payload as ResponseState<void>;
      })
      .addCase(updateUserStateAction.rejected, (state: UserState, _) => {
        state.updateUserState.loading = false;
      })
      .addCase(toggleUserStatusStateAction.pending, (state: UserState, _) => {
        state.toggleUserStatusState.loading = true;
        state.toggleUserStatusState.data = null;
      })
      .addCase(
        toggleUserStatusStateAction.fulfilled,
        (state: UserState, action) => {
          state.toggleUserStatusState.loading = false;
          state.toggleUserStatusState.data =
            action.payload as ResponseState<void>;
        }
      )
      .addCase(toggleUserStatusStateAction.rejected, (state: UserState, _) => {
        state.toggleUserStatusState.loading = false;
      });
  },
});

export const {
  clearUserStates,
  clearChangePasswordState,
  clearUpdateUserState,
  clearToggleUserStatusState,
} = userSlice.actions;

export const getUsersByTeamState = (state: AppState) =>
  state.users.usersByTeamState;
export const getUsersByGroupTeamState = (state: AppState) =>
  state.users.usersByGroupTeamState;
export const getAllUsersState = (state: AppState) => state.users.allUsersState;
export const getUserByIdState = (state: AppState) => state.users.userByIdState;
export const getChangePasswordState = (state: AppState) =>
  state.users.changePasswordState;
export const getUpdateUserState = (state: AppState) =>
  state.users.updateUserState;
export const getToggleUserStatusState = (state: AppState) =>
  state.users.toggleUserStatusState;

export default userSlice.reducer;
