import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setErrorState } from "./common-slice";
import { CustomerResponse } from "./customer-slice";
import { DocumentResponse } from "./document-slice";
import { GetAllUsersRequest, UserResponse } from "./user-slice";
import { onGet, onPost, onPatch, onDelete } from "../../core/api-service";
import paths from "../../navigation/paths";
import { ResponseState, ErrorState } from "../common-state";
import { AppState } from "../store";

export enum UrgencyLevel {
  High = "High",
  Medium = "Medium",
  Low = "Low",
}

export enum Status {
  Pending = "Pending",
  Unresolved = "Unresolved",
  Resolved = "Resolved",
}

export const urgencyIcons = {
  High: "🔴",
  Medium: "🟡",
  Low: "🔵",
};

export const statusIcons = {
  Resolved: "✅",
  Unresolved: "❌",
  Pending: "⏳",
};


export interface TechnicalUnitResponse {
  id: string;
  name: string;
  status: TechnicalUnitStatus;
}

export enum TechnicalUnitStatus {
  Active = "active",
  Inactive = "inactive",
}
export interface AllIncidentsRequest {
  technicalUnitIds: string[];
}

export interface IncidentRequest {
  title: string;
  urgencyLevel: UrgencyLevel;
  technicalUnitIds: string[];
  customerId: string;
  description: string;
  actionPlan?: string;
  followUpDate?: Date;
  status: Status;
  //attachments?: File[];
  occurrenceDate?: Date;
  supervisorIds: string[];
  memberIds: string[];
}
export interface IncidentResponse {
  id: string;
  title: string;
  urgencyLevel: UrgencyLevel;
  technicalUnits: TechnicalUnitResponse[];
  customer: CustomerResponse;
  description: string;
  attachments: DocumentResponse[];
  actionPlan: string;
  followUpDate: Date;
  status: Status;
  created: Date;
  occurrenceDate: Date; 
  supervisors: UserResponse[]; 
  members: UserResponse[];
}

interface IncidentState {
  incidentByIdState: { data: IncidentResponse | null; loading: boolean };
  allIncidentsState: { data: IncidentResponse[]; loading: boolean };
  createIncidentState: { data:ResponseState<IncidentResponse> | null; loading: boolean };
  updateIncidentState: { data: ResponseState<IncidentResponse> | null; loading: boolean };
  deleteIncidentState: { data: ResponseState<void> | null; loading: boolean };
  updateIncidentStatusState: {
    data: ResponseState<void> | null;
    loading: boolean;
  };
  documentsByIncidentIdState: {
    data: DocumentResponse[] | null;
    loading: boolean;
  };
  allIncidentUsersState: { data: UserResponse[]; loading: boolean };
}

export const incidentByIdStateAction = createAsyncThunk(
  "incidents/id",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onGet(`/incidents/${id}`);
      return response.data;
    } catch (error: any) {
      const errorState: ErrorState = {
        message:
          error.response.data?.message ?? "Error occurred! Please try again.",
        redirect:
          error.response.status === 401
            ? { destination: paths.UNAUTHORIZED, permanent: true }
            : undefined,
      };
      dispatch(setErrorState(errorState));
      return rejectWithValue(errorState);
    }
  }
);

export const allIncidentsStateAction = createAsyncThunk(
  "incidents/all",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/incidents/all");
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

export const createIncidentStateAction = createAsyncThunk(
  "incidents/create",
  async (
    { req }: { req: IncidentRequest },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/incidents", req);
      return response;
    } catch (error: any) {
      const errorState: ErrorState = {
        message:
          error.response.data?.message ?? "Error occurred! Please try again.",
        redirect:
          error.response.status === 401
            ? { destination: paths.UNAUTHORIZED, permanent: true }
            : undefined,
      };
      dispatch(setErrorState(errorState));
      return rejectWithValue(errorState);
    }
  }
);

export const updateIncidentStateAction = createAsyncThunk(
  "incidents/update",
  async (
    { id, req }: { id: string; req: IncidentRequest },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(`/incidents/${id}`, req);
      return response;
    } catch (error: any) {
      const errorState: ErrorState = {
        message:
          error.response.data?.message ?? "Error occurred! Please try again.",
        redirect:
          error.response.status === 401
            ? { destination: paths.UNAUTHORIZED, permanent: true }
            : undefined,
      };
      dispatch(setErrorState(errorState));
      return rejectWithValue(errorState);
    }
  }
);

export const deleteIncidentStateAction = createAsyncThunk(
  "incidents/delete",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onDelete(`/incidents/${id}`);
      return response;
    } catch (error: any) {
      const errorState: ErrorState = {
        message:
          error.response.data?.message ?? "Error occurred! Please try again.",
        redirect:
          error.response.status === 401
            ? { destination: paths.UNAUTHORIZED, permanent: true }
            : undefined,
      };
      dispatch(setErrorState(errorState));
      return rejectWithValue(errorState);
    }
  }
);

export const updateIncidentStatusStateAction = createAsyncThunk(
  "incidents/update-status",
  async (
    { id, status }: { id: string; status: Status },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(`/incidents/${id}/status`, { status });
      return response;
    } catch (error: any) {
      const errorState: ErrorState = {
        message:
          error.response.data?.message ?? "Error occurred! Please try again.",
        redirect:
          error.response.status === 401
            ? { destination: paths.UNAUTHORIZED, permanent: true }
            : undefined,
      };
      dispatch(setErrorState(errorState));
      return rejectWithValue(errorState);
    }
  }
);
export const getDocumentsByIncidentIdStateAction = createAsyncThunk(
  "incidents/documents",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onGet(`/incidents/${id}/documents`);
      return response.data; 
    } catch (error: any) {
      const errorState: ErrorState = {
        message:
          error.response.data?.message ?? "Error occurred! Please try again.",
        redirect:
          error.response.status === 401
            ? { destination: paths.UNAUTHORIZED, permanent: true }
            : undefined,
      };
      dispatch(setErrorState(errorState));
      return rejectWithValue(errorState);
    }
  }
);

export const allIncidentUsersStateAction = createAsyncThunk(
  "incidents/users-all",
  async (params: GetAllUsersRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/incidents/users-all", params);
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

export const incidentSlice = createSlice({
  name: "incidents",
  initialState: {
    incidentByIdState: { data: null, loading: false },
    allIncidentsState: { data: [], loading: false },
    createIncidentState: { data: null, loading: false },
    updateIncidentState: { data: null, loading: false },
    deleteIncidentState: { data: null, loading: false },
    updateIncidentStatusState: { data: null, loading: false },
    documentsByIncidentIdState: { data: null, loading: false },
    allIncidentUsersState: { data: [], loading: false },
  } as IncidentState,
  reducers: {
    clearIncidentStates(state, _: PayloadAction) {
      state.incidentByIdState = { data: null, loading: false };
      state.allIncidentsState = { data: [], loading: false };
      state.createIncidentState = { data: null, loading: false };
      state.updateIncidentState = { data: null, loading: false };
      state.deleteIncidentState = { data: null, loading: false };
      state.updateIncidentStatusState = { data: null, loading: false };
      state.documentsByIncidentIdState = { data: null, loading: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incidentByIdStateAction.pending, (state: IncidentState, _) => {
        state.incidentByIdState.loading = true;
        state.incidentByIdState.data = null;
      })
      .addCase(
        incidentByIdStateAction.fulfilled,
        (state: IncidentState, action) => {
          state.incidentByIdState.loading = false;
          state.incidentByIdState.data = action.payload as IncidentResponse;
        }
      )
      .addCase(incidentByIdStateAction.rejected, (state: IncidentState, _) => {
        state.incidentByIdState.loading = false;
      })
      .addCase(allIncidentsStateAction.pending, (state: IncidentState, _) => {
        state.allIncidentsState.loading = true;
      })
      .addCase(
        allIncidentsStateAction.fulfilled,
        (state: IncidentState, action) => {
          state.allIncidentsState.loading = false;
          state.allIncidentsState.data = action.payload as IncidentResponse[];
        }
      )
      .addCase(allIncidentsStateAction.rejected, (state: IncidentState, _) => {
        state.allIncidentsState.loading = false;
      })
      .addCase(createIncidentStateAction.pending, (state: IncidentState, _) => {
        state.createIncidentState.loading = true;
        state.createIncidentState.data = null;
      })
      .addCase(
        createIncidentStateAction.fulfilled,
        (state: IncidentState, action) => {
          state.createIncidentState.loading = false;
          state.createIncidentState.data = action.payload as ResponseState<IncidentResponse>;
        }
      )
      .addCase(
        createIncidentStateAction.rejected,
        (state: IncidentState, _) => {
          state.createIncidentState.loading = false;
        }
      )
      .addCase(updateIncidentStateAction.pending, (state: IncidentState, _) => {
        state.updateIncidentState.loading = true;
        state.updateIncidentState.data = null;
      })
      .addCase(
        updateIncidentStateAction.fulfilled,
        (state: IncidentState, action) => {
          state.updateIncidentState.loading = false;
          state.updateIncidentState.data =
            action.payload as ResponseState<IncidentResponse>;
        }
      )
      .addCase(
        updateIncidentStateAction.rejected,
        (state: IncidentState, _) => {
          state.updateIncidentState.loading = false;
        }
      )
      .addCase(deleteIncidentStateAction.pending, (state: IncidentState, _) => {
        state.deleteIncidentState.loading = true;
        state.deleteIncidentState.data = null;
      })
      .addCase(
        deleteIncidentStateAction.fulfilled,
        (state: IncidentState, action) => {
          state.deleteIncidentState.loading = false;
          state.deleteIncidentState.data =
            action.payload as ResponseState<void>;
        }
      )
      .addCase(
        deleteIncidentStateAction.rejected,
        (state: IncidentState, _) => {
          state.deleteIncidentState.loading = false;
        }
      )
      .addCase(
        updateIncidentStatusStateAction.pending,
        (state: IncidentState, _) => {
          state.updateIncidentStatusState.loading = true;
          state.updateIncidentStatusState.data = null;
        }
      )
      .addCase(
        updateIncidentStatusStateAction.fulfilled,
        (state: IncidentState, action) => {
          state.updateIncidentStatusState.loading = false;
          state.updateIncidentStatusState.data =
            action.payload as ResponseState<void>;
        }
      )
      .addCase(
        updateIncidentStatusStateAction.rejected,
        (state: IncidentState, _) => {
          state.updateIncidentStatusState.loading = false;
        }
      )
      .addCase(
        getDocumentsByIncidentIdStateAction.pending,
        (state: IncidentState, _) => {
          state.documentsByIncidentIdState.loading = true;
          state.documentsByIncidentIdState.data = null;
        }
      )
      .addCase(
        getDocumentsByIncidentIdStateAction.fulfilled,
        (state: IncidentState, action) => {
          state.documentsByIncidentIdState.loading = false;
          state.documentsByIncidentIdState.data =
            action.payload as DocumentResponse[];
        }
      )
      .addCase(
        getDocumentsByIncidentIdStateAction.rejected,
        (state: IncidentState, _) => {
          state.documentsByIncidentIdState.loading = false;
        }
      )
      .addCase(allIncidentUsersStateAction.pending, (state: IncidentState, _) => {
        state.allIncidentUsersState.loading = true;
      })
      .addCase(
        allIncidentUsersStateAction.fulfilled,
        (state: IncidentState, action) => {
          state.allIncidentUsersState.loading = false;
          state.allIncidentUsersState.data = action.payload as UserResponse[];
        }
      )
      .addCase(allIncidentUsersStateAction.rejected, (state: IncidentState, _) => {
        state.allIncidentUsersState.loading = false;
      });
  },
});

export const { clearIncidentStates } = incidentSlice.actions;

export const getIncidentByIdState = (state: AppState) =>
  state.incidents.incidentByIdState;
export const getAllIncidentsState = (state: AppState) =>
  state.incidents.allIncidentsState;
export const getCreateIncidentState = (state: AppState) =>
  state.incidents.createIncidentState;
export const getUpdateIncidentState = (state: AppState) =>
  state.incidents.updateIncidentState;
export const getDeleteIncidentState = (state: AppState) =>
  state.incidents.deleteIncidentState;
export const getUpdateIncidentStatusState = (state: AppState) =>
  state.incidents.updateIncidentStatusState;
export const getDocumentsByIncidentIdState = (state: AppState) =>
  state.incidents.documentsByIncidentIdState;
export const getAllIncidentUsersState = (state: AppState) =>
  state.incidents.allIncidentUsersState;

export default incidentSlice.reducer;
