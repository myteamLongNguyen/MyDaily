import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { setErrorState } from "./common-slice";
import { onGet, onPost, onPatch, onDelete } from "../../core/api-service";
import paths from "../../navigation/paths";
import { ResponseState, ErrorState } from "../common-state";

// Enums (aligned with backend AddressStatus enum)
export enum AddressStatus {
  Active = "active",
  Inactive = "inactive",
}

// Interfaces (aligned with backend DTOs)
export interface AddressResponse {
  id: string;
  streetNum: string;
  streetName?: string;
  streetType?: string;
  buildingNum?: string;
  unitNum?: string;
  lotNum?: string;
  town?: string;
  region?: string;
  country: string;
  postalCode?: string;
  commentLine?: string;
  position?: string;
  status: AddressStatus;
  created: Date;
  lastUpdated: Date;
  display?: string;
}

export interface CreateAddressRequest {
  streetNum: string;
  streetName?: string;
  streetType?: string;
  buildingNum?: string;
  unitNum?: string;
  lotNum?: string;
  town?: string;
  region?: string;
  country: string;
  postalCode?: string;
  commentLine?: string;
  position?: string;
  status?: AddressStatus;
  display?: string;
}

export interface UpdateAddressRequest {
  streetNum?: string;
  streetName?: string;
  streetType?: string;
  buildingNum?: string;
  unitNum?: string;
  lotNum?: string;
  town?: string;
  region?: string;
  country?: string;
  postalCode?: string;
  commentLine?: string;
  position?: string;
  status?: AddressStatus;
  display?: string;
}

// State Interface
export interface AddressState {
  allAddressesState: { data: AddressResponse[]; loading: boolean };
  addressByIdState: { data: AddressResponse | null; loading: boolean };
  addressesByStatusState: { data: AddressResponse[]; loading: boolean };
  createAddressState: { data: ResponseState<AddressResponse> | null; loading: boolean };
  updateAddressState: { data: ResponseState<AddressResponse> | null; loading: boolean };
  deleteAddressState: { data: ResponseState<void> | null; loading: boolean };
}

// Async Thunks
export const getAllAddressesAction = createAsyncThunk(
  "addresses/all",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onGet("/addresses");
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

export const getAddressByIdAction = createAsyncThunk(
  "addresses/id",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onGet(`/addresses/${id}`);
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

export const getAddressesByStatusAction = createAsyncThunk(
  "addresses/status",
  async (status: AddressStatus, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onGet(`/addresses/status/${status}`);
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

export const createAddressAction = createAsyncThunk(
  "addresses/create",
  async (params: CreateAddressRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/addresses", params);
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

export const updateAddressAction = createAsyncThunk(
  "addresses/update",
  async (params: UpdateAddressRequest & { id: string }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(`/addresses/${params.id}`, params);
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

export const deleteAddressAction = createAsyncThunk(
  "addresses/delete",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onDelete(`/addresses/${id}`);
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

// Slice Definition
export const addressSlice = createSlice({
  name: "addresses",
  initialState: {
    allAddressesState: { data: [], loading: false },
    addressByIdState: { data: null, loading: false },
    addressesByStatusState: { data: [], loading: false },
    createAddressState: { data: null, loading: false },
    updateAddressState: { data: null, loading: false },
    deleteAddressState: { data: null, loading: false },
  } as AddressState,
  reducers: {
    clearAddressStates(state) {
      state.allAddressesState = { data: [], loading: false };
      state.addressByIdState = { data: null, loading: false };
      state.addressesByStatusState = { data: [], loading: false };
      state.createAddressState = { data: null, loading: false };
      state.updateAddressState = { data: null, loading: false };
      state.deleteAddressState = { data: null, loading: false };
    },
    clearCreateAddressState(state) {
      state.createAddressState = { data: null, loading: false };
    },
    clearUpdateAddressState(state) {
      state.updateAddressState = { data: null, loading: false };
    },
    clearDeleteAddressState(state) {
      state.deleteAddressState = { data: null, loading: false };
    },
    clearAddressesByStatusState(state) {
      state.addressesByStatusState = { data: [], loading: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllAddressesAction.pending, (state: AddressState) => {
        state.allAddressesState.loading = true;
      })
      .addCase(getAllAddressesAction.fulfilled, (state: AddressState, action) => {
        state.allAddressesState.loading = false;
        state.allAddressesState.data = action.payload;
      })
      .addCase(getAllAddressesAction.rejected, (state: AddressState) => {
        state.allAddressesState.loading = false;
        state.allAddressesState.data = [];
      })
      .addCase(getAddressByIdAction.pending, (state: AddressState) => {
        state.addressByIdState.loading = true;
        state.addressByIdState.data = null;
      })
      .addCase(getAddressByIdAction.fulfilled, (state: AddressState, action) => {
        state.addressByIdState.loading = false;
        state.addressByIdState.data = action.payload;
      })
      .addCase(getAddressByIdAction.rejected, (state: AddressState) => {
        state.addressByIdState.loading = false;
      })
      .addCase(getAddressesByStatusAction.pending, (state: AddressState) => {
        state.addressesByStatusState.loading = true;
        state.addressesByStatusState.data = [];
      })
      .addCase(getAddressesByStatusAction.fulfilled, (state: AddressState, action) => {
        state.addressesByStatusState.loading = false;
        state.addressesByStatusState.data = action.payload;
      })
      .addCase(getAddressesByStatusAction.rejected, (state: AddressState) => {
        state.addressesByStatusState.loading = false;
        state.addressesByStatusState.data = [];
      })
      .addCase(createAddressAction.pending, (state: AddressState) => {
        state.createAddressState.loading = true;
        state.createAddressState.data = null;
      })
      .addCase(createAddressAction.fulfilled, (state: AddressState, action) => {
        state.createAddressState.loading = false;
        state.createAddressState.data = action.payload;
      })
      .addCase(createAddressAction.rejected, (state: AddressState) => {
        state.createAddressState.loading = false;
      })
      .addCase(updateAddressAction.pending, (state: AddressState) => {
        state.updateAddressState.loading = true;
        state.updateAddressState.data = null;
      })
      .addCase(updateAddressAction.fulfilled, (state: AddressState, action) => {
        state.updateAddressState.loading = false;
        state.updateAddressState.data = action.payload;
      })
      .addCase(updateAddressAction.rejected, (state: AddressState) => {
        state.updateAddressState.loading = false;
      })
      .addCase(deleteAddressAction.pending, (state: AddressState) => {
        state.deleteAddressState.loading = true;
        state.deleteAddressState.data = null;
      })
      .addCase(deleteAddressAction.fulfilled, (state: AddressState, action) => {
        state.deleteAddressState.loading = false;
        state.deleteAddressState.data = action.payload;
      })
      .addCase(deleteAddressAction.rejected, (state: AddressState) => {
        state.deleteAddressState.loading = false;
      });
  },
});

// Actions and Selectors
export const {
  clearAddressStates,
  clearCreateAddressState,
  clearUpdateAddressState,
  clearDeleteAddressState,
  clearAddressesByStatusState,
} = addressSlice.actions;

export const getAllAddressesState = (state: AppState) => state.addresses.allAddressesState;
export const getAddressByIdState = (state: AppState) => state.addresses.addressByIdState;
export const getAddressesByStatusState = (state: AppState) => state.addresses.addressesByStatusState;
export const getCreateAddressState = (state: AppState) => state.addresses.createAddressState;
export const getUpdateAddressState = (state: AppState) => state.addresses.updateAddressState;
export const getDeleteAddressState = (state: AppState) => state.addresses.deleteAddressState;

export default addressSlice.reducer;