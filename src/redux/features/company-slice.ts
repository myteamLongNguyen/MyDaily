import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setErrorState } from "./common-slice";
import { onGet, onPost, onPatch, onDelete } from "../../core/api-service";
import paths from "../../navigation/paths";
import { ResponseState, ErrorState } from "../common-state";
import { AppState } from "../store";

export enum DayType {
  Business = 'Business Day',
  Calendar = 'Calendar Day',
}

// Interfaces (aligned with DTOs)
export interface CompanyResponse {
  id: string;
  name: string;
  reference?: string;
  primaryContactId?: string;
  contactIds?: string[];
  turnaroundConfigIds?: string[];
  created?: Date;
  lastUpdated?: Date;
}

export interface CreateCompanyRequest {
  name: string;
  reference?: string;
  primaryContactId?: string;
}

export interface UpdateCompanyRequest {
  id: string;
  name?: string;
  reference?: string;
  primaryContactId?: string;
}

export interface CompanyTurnaroundConfigResponse {
  id: string;
  companyId: string;
  projectTypeId: string;
  turnaroundDays: number;
  turnaroundDaysMode: DayType;
}

export interface CreateCompanyTurnaroundConfigRequest {
  companyId: string;
  projectTypeId: string;
  turnaroundDays: number;
  turnaroundDaysMode: DayType;
}

export interface UpdateCompanyTurnaroundConfigRequest {
  id: string;
  companyId?: string;
  projectTypeId?: string;
  turnaroundDays?: number;
  turnaroundDaysMode?: DayType;
}

// State Interface
export interface CompanyState {
  allCompaniesState: { data: CompanyResponse[]; loading: boolean };
  companyByIdState: { data: CompanyResponse | null; loading: boolean };
  createCompanyState: { data: ResponseState<CompanyResponse> | null; loading: boolean };
  updateCompanyState: { data: ResponseState<CompanyResponse> | null; loading: boolean };
  deleteCompanyState: { data: ResponseState<void> | null; loading: boolean };
  createTurnaroundConfigState: { data: ResponseState<CompanyTurnaroundConfigResponse> | null; loading: boolean };
  updateTurnaroundConfigState: { data: ResponseState<CompanyTurnaroundConfigResponse> | null; loading: boolean };
  deleteTurnaroundConfigState: { data: ResponseState<void> | null; loading: boolean };
}

// Async Thunks
export const getAllCompaniesAction = createAsyncThunk(
  "companies/all",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onGet("/companies");
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

export const getCompanyByIdAction = createAsyncThunk(
  "companies/id",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onGet(`/companies/${id}`);
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

export const createCompanyAction = createAsyncThunk(
  "companies/create",
  async (params: CreateCompanyRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/companies", params);
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

export const updateCompanyAction = createAsyncThunk(
  "companies/update",
  async (params: UpdateCompanyRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(`/companies/${params.id}`, params);
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

export const deleteCompanyAction = createAsyncThunk(
  "companies/delete",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onDelete(`/companies/${id}`);
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

export const createTurnaroundConfigAction = createAsyncThunk(
  "companies/turnaround-configs/create",
  async (
    params: { companyId: string; config: CreateCompanyTurnaroundConfigRequest },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost(`/companies/${params.companyId}/turnaround-configs`, params.config);
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

export const updateTurnaroundConfigAction = createAsyncThunk(
  "companies/turnaround-configs/update",
  async (
    params: { companyId: string; configId: string; config: UpdateCompanyTurnaroundConfigRequest },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(
        `/companies/${params.companyId}/turnaround-configs/${params.configId}`,
        params.config
      );
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

export const deleteTurnaroundConfigAction = createAsyncThunk(
  "companies/turnaround-configs/delete",
  async (params: { companyId: string; configId: string }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onDelete(`/companies/${params.companyId}/turnaround-configs/${params.configId}`);
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
export const companySlice = createSlice({
  name: "companies",
  initialState: {
    allCompaniesState: { data: [], loading: false },
    companyByIdState: { data: null, loading: false },
    createCompanyState: { data: null, loading: false },
    updateCompanyState: { data: null, loading: false },
    deleteCompanyState: { data: null, loading: false },
    createTurnaroundConfigState: { data: null, loading: false },
    updateTurnaroundConfigState: { data: null, loading: false },
    deleteTurnaroundConfigState: { data: null, loading: false },
  } as CompanyState,
  reducers: {
    clearCompanyStates(state, _: PayloadAction) {
      state.allCompaniesState = { data: [], loading: false };
      state.companyByIdState = { data: null, loading: false };
      state.createCompanyState = { data: null, loading: false };
      state.updateCompanyState = { data: null, loading: false };
      state.deleteCompanyState = { data: null, loading: false };
      state.createTurnaroundConfigState = { data: null, loading: false };
      state.updateTurnaroundConfigState = { data: null, loading: false };
      state.deleteTurnaroundConfigState = { data: null, loading: false };
    },
    clearCreateCompanyState(state, _: PayloadAction) {
      state.createCompanyState = { data: null, loading: false };
    },
    clearUpdateCompanyState(state, _: PayloadAction) {
      state.updateCompanyState = { data: null, loading: false };
    },
    clearDeleteCompanyState(state, _: PayloadAction) {
      state.deleteCompanyState = { data: null, loading: false };
    },
    clearCreateTurnaroundConfigState(state, _: PayloadAction) {
      state.createTurnaroundConfigState = { data: null, loading: false };
    },
    clearUpdateTurnaroundConfigState(state, _: PayloadAction) {
      state.updateTurnaroundConfigState = { data: null, loading: false };
    },
    clearDeleteTurnaroundConfigState(state, _: PayloadAction) {
      state.deleteTurnaroundConfigState = { data: null, loading: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCompaniesAction.pending, (state: CompanyState) => {
        state.allCompaniesState.loading = true;
      })
      .addCase(getAllCompaniesAction.fulfilled, (state: CompanyState, action) => {
        state.allCompaniesState.loading = false;
        state.allCompaniesState.data = action.payload;
      })
      .addCase(getAllCompaniesAction.rejected, (state: CompanyState) => {
        state.allCompaniesState.loading = false;
      })
      .addCase(getCompanyByIdAction.pending, (state: CompanyState) => {
        state.companyByIdState.loading = true;
        state.companyByIdState.data = null;
      })
      .addCase(getCompanyByIdAction.fulfilled, (state: CompanyState, action) => {
        state.companyByIdState.loading = false;
        state.companyByIdState.data = action.payload;
      })
      .addCase(getCompanyByIdAction.rejected, (state: CompanyState) => {
        state.companyByIdState.loading = false;
      })
      .addCase(createCompanyAction.pending, (state: CompanyState) => {
        state.createCompanyState.loading = true;
        state.createCompanyState.data = null;
      })
      .addCase(createCompanyAction.fulfilled, (state: CompanyState, action) => {
        state.createCompanyState.loading = false;
        state.createCompanyState.data = action.payload;
      })
      .addCase(createCompanyAction.rejected, (state: CompanyState) => {
        state.createCompanyState.loading = false;
      })
      .addCase(updateCompanyAction.pending, (state: CompanyState) => {
        state.updateCompanyState.loading = true;
        state.updateCompanyState.data = null;
      })
      .addCase(updateCompanyAction.fulfilled, (state: CompanyState, action) => {
        state.updateCompanyState.loading = false;
        state.updateCompanyState.data = action.payload;
      })
      .addCase(updateCompanyAction.rejected, (state: CompanyState) => {
        state.updateCompanyState.loading = false;
      })
      .addCase(deleteCompanyAction.pending, (state: CompanyState) => {
        state.deleteCompanyState.loading = true;
        state.deleteCompanyState.data = null;
      })
      .addCase(deleteCompanyAction.fulfilled, (state: CompanyState, action) => {
        state.deleteCompanyState.loading = false;
        state.deleteCompanyState.data = action.payload;
      })
      .addCase(deleteCompanyAction.rejected, (state: CompanyState) => {
        state.deleteCompanyState.loading = false;
      })
      .addCase(createTurnaroundConfigAction.pending, (state: CompanyState) => {
        state.createTurnaroundConfigState.loading = true;
        state.createTurnaroundConfigState.data = null;
      })
      .addCase(createTurnaroundConfigAction.fulfilled, (state: CompanyState, action) => {
        state.createTurnaroundConfigState.loading = false;
        state.createTurnaroundConfigState.data = action.payload;
      })
      .addCase(createTurnaroundConfigAction.rejected, (state: CompanyState) => {
        state.createTurnaroundConfigState.loading = false;
      })
      .addCase(updateTurnaroundConfigAction.pending, (state: CompanyState) => {
        state.updateTurnaroundConfigState.loading = true;
        state.updateTurnaroundConfigState.data = null;
      })
      .addCase(updateTurnaroundConfigAction.fulfilled, (state: CompanyState, action) => {
        state.updateTurnaroundConfigState.loading = false;
        state.updateTurnaroundConfigState.data = action.payload;
      })
      .addCase(updateTurnaroundConfigAction.rejected, (state: CompanyState) => {
        state.updateTurnaroundConfigState.loading = false;
      })
      .addCase(deleteTurnaroundConfigAction.pending, (state: CompanyState) => {
        state.deleteTurnaroundConfigState.loading = true;
        state.deleteTurnaroundConfigState.data = null;
      })
      .addCase(deleteTurnaroundConfigAction.fulfilled, (state: CompanyState, action) => {
        state.deleteTurnaroundConfigState.loading = false;
        state.deleteTurnaroundConfigState.data = action.payload;
      })
      .addCase(deleteTurnaroundConfigAction.rejected, (state: CompanyState) => {
        state.deleteTurnaroundConfigState.loading = false;
      });
  },
});

// Actions and Selectors
export const {
  clearCompanyStates,
  clearCreateCompanyState,
  clearUpdateCompanyState,
  clearDeleteCompanyState,
  clearCreateTurnaroundConfigState,
  clearUpdateTurnaroundConfigState,
  clearDeleteTurnaroundConfigState,
} = companySlice.actions;

export const getAllCompaniesState = (state: AppState) => state.companies.allCompaniesState;
export const getCompanyByIdState = (state: AppState) => state.companies.companyByIdState;
export const getCreateCompanyState = (state: AppState) => state.companies.createCompanyState;
export const getUpdateCompanyState = (state: AppState) => state.companies.updateCompanyState;
export const getDeleteCompanyState = (state: AppState) => state.companies.deleteCompanyState;
export const getCreateTurnaroundConfigState = (state: AppState) => state.companies.createTurnaroundConfigState;
export const getUpdateTurnaroundConfigState = (state: AppState) => state.companies.updateTurnaroundConfigState;
export const getDeleteTurnaroundConfigState = (state: AppState) => state.companies.deleteTurnaroundConfigState;

export default companySlice.reducer;