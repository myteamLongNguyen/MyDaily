import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setErrorState } from "./common-slice";
import { TeamResponse } from "./other-slice";
import { onPost, onPatch } from "../../core/api-service";
import paths from "../../navigation/paths";
import { ResponseState, ErrorState } from "../common-state";
import { AppState } from "../store";

export interface DocsSharing {
  teamId: string;
  teamName: string;
}

export interface DocsFolderResponse {
  id: string;
  name: string;
  parentId: string | null;
  created: Date;
  modified: Date;
  sharing: DocsSharing[];
  paths: string[];
  owner: TeamResponse | null;
}

export interface DocumentResponse {
  id: string;
  name: string;
  url: string;
  size: number;
  uploadDate: Date;
  sharing: DocsSharing[];
  parentId: string | null;
  owner: TeamResponse | null;
}

export interface AllFilesResponse {
  folders: DocsFolderResponse[];
  files: DocumentResponse[];
}

export interface GetAllFilesRequest {
  ownerId: string | null;
  parentId: string | null;
}

export interface CreateFolderRequest {
  name: string;
  parentId: string | null;
  ownerId: string | null;
}

export interface RenameFolderRequest {
  id: string;
  name: string;
}

export interface DeleteFolderRequest {
  id: string;
  path: string;
}

export interface UploadDocumentRequest {
  file: File;
  path: string | null;
  ownerId: string;
  incidentId?: string;
}

export interface DeleteDocumentRequest {
  id: string;
  path: string;
}

interface DocumentState {
  allFilesState: { data: AllFilesResponse | null; loading: boolean };
  newFolderState: {
    data: ResponseState<DocsFolderResponse> | null;
    loading: boolean;
  };
  renameFolderState: { data: ResponseState<void> | null; loading: boolean };
  deleteFolderState: { data: ResponseState<void> | null; loading: boolean };
  uploadDocumentState: {
    data: ResponseState<DocumentResponse> | null;
    loading: boolean;
  };
  deleteDocumentState: { data: ResponseState<void> | null; loading: boolean };
}

export const allFilesStateAction = createAsyncThunk(
  "documents/all-files",
  async (params: GetAllFilesRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/documents/all-files", params);
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

export const createFolderStateAction = createAsyncThunk(
  "documents/folder",
  async (params: CreateFolderRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/documents/folder", params);
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

export const renameFolderStateAction = createAsyncThunk(
  "documents/folder/update",
  async (params: RenameFolderRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(`/documents/folder/${params.id}`, {
        name: params.name,
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

export const deleteFolderStateAction = createAsyncThunk(
  "documents/delete-folder",
  async (params: DeleteFolderRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/documents/delete-folder", params);
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

export const uploadDocumentStateAction = createAsyncThunk(
  "documents/upload/*",
  async (params: UploadDocumentRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const formData = new FormData();
      formData.append("file", params.file);
      formData.append("ownerId", params.ownerId);
      if (params.incidentId) {
        formData.append("incidentId", params.incidentId);
      }
      const response = await onPost(
        `/documents/upload/${params.path !== null ? params.path : "root"}`,
        formData,
        undefined,
        true
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

export const deleteDocumentStateAction = createAsyncThunk(
  "documents/delete",
  async (params: DeleteDocumentRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/documents/delete", params);
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

export const documentSlice = createSlice({
  name: "documents",
  initialState: {
    allFilesState: { data: null, loading: false },
    newFolderState: { data: null, loading: false },
    renameFolderState: { data: null, loading: false },
    deleteFolderState: { data: null, loading: false },
    uploadDocumentState: { data: null, loading: false },
    deleteDocumentState: { data: null, loading: false },
  } as DocumentState,
  reducers: {
    clearNewFolderState(state, _: PayloadAction) {
      state.newFolderState.data = null;
    },
    clearRenameFolderState(state, _: PayloadAction) {
      state.renameFolderState.data = null;
    },
    clearDeleteFolderState(state, _: PayloadAction) {
      state.deleteFolderState.data = null;
    },
    clearAllFilesStates(state, _: PayloadAction) {
      state.allFilesState = { data: null, loading: false };
    },
    clearUploadDocumentState(state, _: PayloadAction) {
      state.uploadDocumentState.data = null;
    },
    clearDeleteDocumentState(state, _: PayloadAction) {
      state.deleteDocumentState.data = null;
    },
    clearDocumentStates(state, _: PayloadAction) {
      state.newFolderState.data = null;
      state.renameFolderState.data = null;
      state.deleteFolderState.data = null;
      state.allFilesState = { data: null, loading: false };
      state.uploadDocumentState.data = null;
      state.deleteDocumentState.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allFilesStateAction.pending, (state: DocumentState, _) => {
        state.allFilesState.loading = true;
        state.allFilesState.data = null;
      })
      .addCase(
        allFilesStateAction.fulfilled,
        (state: DocumentState, action) => {
          state.allFilesState.loading = false;
          state.allFilesState.data = action.payload as AllFilesResponse;
        }
      )
      .addCase(allFilesStateAction.rejected, (state: DocumentState, _) => {
        state.allFilesState.loading = false;
      })
      .addCase(createFolderStateAction.pending, (state, _) => {
        state.newFolderState.loading = true;
        state.newFolderState.data = null;
      })
      .addCase(createFolderStateAction.fulfilled, (state, action) => {
        state.newFolderState.loading = false;
        state.newFolderState.data =
          action.payload as ResponseState<DocsFolderResponse>;
      })
      .addCase(createFolderStateAction.rejected, (state, _) => {
        state.newFolderState.loading = false;
      })
      .addCase(renameFolderStateAction.pending, (state, _) => {
        state.renameFolderState.loading = true;
        state.renameFolderState.data = null;
      })
      .addCase(renameFolderStateAction.fulfilled, (state, action) => {
        state.renameFolderState.loading = false;
        state.renameFolderState.data = action.payload as ResponseState<void>;
      })
      .addCase(renameFolderStateAction.rejected, (state, _) => {
        state.renameFolderState.loading = false;
      })
      .addCase(deleteFolderStateAction.pending, (state, _) => {
        state.deleteFolderState.loading = true;
        state.deleteFolderState.data = null;
      })
      .addCase(deleteFolderStateAction.fulfilled, (state, action) => {
        state.deleteFolderState.loading = false;
        state.deleteFolderState.data = action.payload as ResponseState<void>;
      })
      .addCase(deleteFolderStateAction.rejected, (state, _) => {
        state.deleteFolderState.loading = false;
      })
      .addCase(uploadDocumentStateAction.pending, (state, _) => {
        state.uploadDocumentState.loading = true;
        state.uploadDocumentState.data = null;
      })
      .addCase(uploadDocumentStateAction.fulfilled, (state, action) => {
        state.uploadDocumentState.loading = false;
        state.uploadDocumentState.data =
          action.payload as ResponseState<DocumentResponse>;
      })
      .addCase(uploadDocumentStateAction.rejected, (state, _) => {
        state.deleteDocumentState.loading = false;
      })
      .addCase(deleteDocumentStateAction.pending, (state, _) => {
        state.deleteDocumentState.loading = true;
        state.deleteDocumentState.data = null;
      })
      .addCase(deleteDocumentStateAction.fulfilled, (state, action) => {
        state.deleteDocumentState.loading = false;
        state.deleteDocumentState.data = action.payload as ResponseState<void>;
      })
      .addCase(deleteDocumentStateAction.rejected, (state, _) => {
        state.deleteDocumentState.loading = false;
      });
  },
});

export const {
  clearAllFilesStates,
  clearNewFolderState,
  clearRenameFolderState,
  clearDeleteFolderState,
  clearUploadDocumentState,
  clearDeleteDocumentState,
  clearDocumentStates,
} = documentSlice.actions;

export const getAllFilesState = (state: AppState) =>
  state.documents.allFilesState;
export const getNewFolderState = (state: AppState) =>
  state.documents.newFolderState;
export const getRenameFolderState = (state: AppState) =>
  state.documents.renameFolderState;
export const getDeleteFolderState = (state: AppState) =>
  state.documents.deleteFolderState;
export const getUploadDocumentState = (state: AppState) =>
  state.documents.uploadDocumentState;
export const getDeleteDocumentState = (state: AppState) =>
  state.documents.deleteDocumentState;

export default documentSlice.reducer;
