import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setErrorState } from "./common-slice";
import { onGet, onPost, onPatch, onDelete } from "../../core/api-service";
import paths from "../../navigation/paths";
import { ResponseState, ErrorState } from "../common-state";
import { AppState } from "../store";

// Interfaces (aligned with DTOs)
export interface ContactResponse {
  id: string;
  firstName: string;
  middleName?: string;
  lastName?: string;
  preferredName?: string;
  primaryEmail: string;
  secondaryEmail?: string;
  primaryPhone?: string;
  secondaryPhone?: string;
  notes?: string;
  reference?: string;
  companyId?: string;
  jobIds?: string[];
  created?: Date;
  lastUpdated?: Date;
}

export interface CreateContactRequest {
  firstName: string;
  middleName?: string;
  lastName?: string;
  preferredName?: string;
  primaryEmail: string;
  secondaryEmail?: string;
  primaryPhone?: string;
  secondaryPhone?: string;
  notes?: string;
  reference?: string;
  companyId?: string;
}

export interface UpdateContactRequest {
  id: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  preferredName?: string;
  primaryEmail?: string;
  secondaryEmail?: string;
  primaryPhone?: string;
  secondaryPhone?: string;
  notes?: string;
  reference?: string;
  companyId?: string;
}

// State Interface
export interface ContactState {
  allContactsState: { data: ContactResponse[]; loading: boolean };
  contactByIdState: { data: ContactResponse | null; loading: boolean };
  createContactState: { data: ResponseState<ContactResponse> | null; loading: boolean };
  updateContactState: { data: ResponseState<ContactResponse> | null; loading: boolean };
  deleteContactState: { data: ResponseState<void> | null; loading: boolean };
}

// Async Thunks
export const getAllContactsAction = createAsyncThunk(
  "contacts/all",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onGet("/contacts");
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

export const getContactByIdAction = createAsyncThunk(
  "contacts/id",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onGet(`/contacts/${id}`);
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

export const createContactAction = createAsyncThunk(
  "contacts/create",
  async (params: CreateContactRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/contacts", params);
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

export const updateContactAction = createAsyncThunk(
  "contacts/update",
  async (params: UpdateContactRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(`/contacts/${params.id}`, params);
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

export const deleteContactAction = createAsyncThunk(
  "contacts/delete",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onDelete(`/contacts/${id}`);
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
export const contactSlice = createSlice({
  name: "contacts",
  initialState: {
    allContactsState: { data: [], loading: false },
    contactByIdState: { data: null, loading: false },
    createContactState: { data: null, loading: false },
    updateContactState: { data: null, loading: false },
    deleteContactState: { data: null, loading: false },
  } as ContactState,
  reducers: {
    clearContactStates(state, _: PayloadAction) {
      state.allContactsState = { data: [], loading: false };
      state.contactByIdState = { data: null, loading: false };
      state.createContactState = { data: null, loading: false };
      state.updateContactState = { data: null, loading: false };
      state.deleteContactState = { data: null, loading: false };
    },
    clearCreateContactState(state, _: PayloadAction) {
      state.createContactState = { data: null, loading: false };
    },
    clearUpdateContactState(state, _: PayloadAction) {
      state.updateContactState = { data: null, loading: false };
    },
    clearDeleteContactState(state, _: PayloadAction) {
      state.deleteContactState = { data: null, loading: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllContactsAction.pending, (state: ContactState) => {
        state.allContactsState.loading = true;
      })
      .addCase(getAllContactsAction.fulfilled, (state: ContactState, action) => {
        state.allContactsState.loading = false;
        state.allContactsState.data = action.payload;
      })
      .addCase(getAllContactsAction.rejected, (state: ContactState) => {
        state.allContactsState.loading = false;
      })
      .addCase(getContactByIdAction.pending, (state: ContactState) => {
        state.contactByIdState.loading = true;
        state.contactByIdState.data = null;
      })
      .addCase(getContactByIdAction.fulfilled, (state: ContactState, action) => {
        state.contactByIdState.loading = false;
        state.contactByIdState.data = action.payload;
      })
      .addCase(getContactByIdAction.rejected, (state: ContactState) => {
        state.contactByIdState.loading = false;
      })
      .addCase(createContactAction.pending, (state: ContactState) => {
        state.createContactState.loading = true;
        state.createContactState.data = null;
      })
      .addCase(createContactAction.fulfilled, (state: ContactState, action) => {
        state.createContactState.loading = false;
        state.createContactState.data = action.payload;
      })
      .addCase(createContactAction.rejected, (state: ContactState) => {
        state.createContactState.loading = false;
      })
      .addCase(updateContactAction.pending, (state: ContactState) => {
        state.updateContactState.loading = true;
        state.updateContactState.data = null;
      })
      .addCase(updateContactAction.fulfilled, (state: ContactState, action) => {
        state.updateContactState.loading = false;
        state.updateContactState.data = action.payload;
      })
      .addCase(updateContactAction.rejected, (state: ContactState) => {
        state.updateContactState.loading = false;
      })
      .addCase(deleteContactAction.pending, (state: ContactState) => {
        state.deleteContactState.loading = true;
        state.deleteContactState.data = null;
      })
      .addCase(deleteContactAction.fulfilled, (state: ContactState, action) => {
        state.deleteContactState.loading = false;
        state.deleteContactState.data = action.payload;
      })
      .addCase(deleteContactAction.rejected, (state: ContactState) => {
        state.deleteContactState.loading = false;
      });
  },
});

// Actions and Selectors
export const {
  clearContactStates,
  clearCreateContactState,
  clearUpdateContactState,
  clearDeleteContactState,
} = contactSlice.actions;

export const getAllContactsState = (state: AppState) => state.contacts.allContactsState;
export const getContactByIdState = (state: AppState) => state.contacts.contactByIdState;
export const getCreateContactState = (state: AppState) => state.contacts.createContactState;
export const getUpdateContactState = (state: AppState) => state.contacts.updateContactState;
export const getDeleteContactState = (state: AppState) => state.contacts.deleteContactState;

export default contactSlice.reducer;