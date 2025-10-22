import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { setErrorState } from "./common-slice";
import { UserRole, UserResponse, UserWorkingTime } from "./user-slice";
import { onPost, onGet, onDelete } from "../../core/api-service";
import { cookieName } from "../../core/utils/constants";
import paths from "../../navigation/paths";
import { ResponseState, ErrorState } from "../common-state";
import { AppState } from "../store";

export interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
  teamId: string;
  groupTeamId: string | null;
  positionId: string;
  experienceId: string;
  customerId: string | null;
  categoryId: string | null;
  misaCode: string;
  role: UserRole;
  workingTimes: UserWorkingTime[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

interface AuthState {
  registerState: { data: ResponseState<UserResponse> | null; loading: boolean };
  loginState: { data: UserResponse | null; loading: boolean };
  userState: { data: UserResponse | null; loading: boolean };
}

export const registerStateAction = createAsyncThunk(
  "auth/register",
  async (params: RegisterUserRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/auth/register-user", params);
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

export const loginStateAction = createAsyncThunk(
  "auth/login",
  async (params: LoginRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/auth/login", params);
      if (response.success && response.data) {
        Cookies.set(cookieName, response.data.accessToken, { expires: 30 });
        return response.data.user;
      }
      return null;
    } catch (error: any) {
      const errorState: ErrorState = {
        message:
          error.response.data?.message ?? "Error occured! Please try again.",
      };
      dispatch(setErrorState(errorState));
      return rejectWithValue(errorState);
    }
  }
);

export const getUserStateAction = createAsyncThunk(
  "users/me",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onGet("users/me");
      return response.data;
    } catch (error: any) {
      const statusCode = error.response.status;
      if (statusCode === 401) {
        setLogout();
      }
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

export const logoutStateAction = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await onDelete("/auth/logout"); 
      dispatch(setLogout()); 
    } catch (error: any) {
      const errorState: ErrorState = {
        message:
          error.response.data?.message ?? "Error occurred! Please try again.",
      };
      dispatch(setErrorState(errorState));
      return rejectWithValue(errorState);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    registerState: { data: null, loading: false },
    loginState: { data: null, loading: false },
    userState: { data: null, loading: false },
  } as AuthState,
  reducers: {
    setLogout(state, _: PayloadAction) {
      state.userState.data = null;
      Cookies.remove(cookieName);
    },
    clearRegisterUserState(state, _: PayloadAction) {
      state.registerState = { data: null, loading: false };
    },
    clearAuthStates(state, _: PayloadAction) {
      state.registerState = { data: null, loading: false };
      state.loginState = { data: null, loading: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerStateAction.pending, (state: AuthState, _) => {
        state.registerState.loading = true;
        state.registerState.data = null;
      })
      .addCase(registerStateAction.fulfilled, (state: AuthState, action) => {
        state.registerState.loading = false;
        state.registerState.data =
          action.payload as ResponseState<UserResponse>;
      })
      .addCase(registerStateAction.rejected, (state: AuthState, _) => {
        state.registerState.loading = false;
      })
      .addCase(loginStateAction.pending, (state: AuthState, _) => {
        state.loginState.loading = true;
        state.loginState.data = null;
      })
      .addCase(loginStateAction.fulfilled, (state: AuthState, action) => {
        state.loginState.loading = false;
        state.loginState.data = action.payload as UserResponse;
        state.userState.data = action.payload as UserResponse;
      })
      .addCase(loginStateAction.rejected, (state: AuthState, _) => {
        state.loginState.loading = false;
      })
      .addCase(getUserStateAction.pending, (state: AuthState, _) => {
        state.userState.loading = true;
      })
      .addCase(getUserStateAction.fulfilled, (state: AuthState, action) => {
        state.userState.loading = false;
        state.userState.data = action.payload as UserResponse;
      })
      .addCase(getUserStateAction.rejected, (state: AuthState, _) => {
        state.userState.loading = false;
      })
      .addCase(logoutStateAction.pending, (state) => {
        state.userState.loading = true; 
      })
      .addCase(logoutStateAction.fulfilled, (state) => {
        state.userState.data = null; 
        state.userState.loading = false; 
      })
      .addCase(logoutStateAction.rejected, (state) => {
        state.userState.loading = false;
      })
      ;
  },
});

export const { setLogout, clearRegisterUserState, clearAuthStates } =
  authSlice.actions;

export const getRegisterState = (state: AppState) => state.auth.registerState;
export const getLoginState = (state: AppState) => state.auth.loginState;
export const getUserState = (state: AppState) => state.auth.userState;

export default authSlice.reducer;
