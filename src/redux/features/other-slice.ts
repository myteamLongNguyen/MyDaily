import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setErrorState } from "./common-slice";
import { CategoryResponse } from "./category-slice";
import { TechnicalUnitResponse, TechnicalUnitStatus } from "./incident-slice";
import { onPost, onGet, onPatch, onDelete } from "../../core/api-service";
import paths from "../../navigation/paths";
import { ResponseState, ErrorState } from "../common-state";
import { AppState } from "../store";

export enum CommonStatus {
  Active = "active",
  Inactive = "inactive",
}

export interface TeamResponse {
  id: string;
  name: string;
  status: CommonStatus;
}

export interface GroupTeamResponse {
  id: string;
  name: string;
  status: CommonStatus;
}

export interface PositionResponse {
  id: string;
  name: string;
  teamId: string;
  status: CommonStatus;
}

export interface ExerienceResponse {
  id: string;
  title: string;
  status: CommonStatus;
}

export interface BranchResponse {
  id: string;
  name: string;
  status: CommonStatus;
}

export interface OrganizationResponse {
  id: string;
  name: string;
  status: CommonStatus;
}

export interface RecurrenceResponse {
  id: string;
  title: string;
}

export interface JobTypeResponse {
  id: string;
  title: string;
  status: CommonStatus;
}

export interface JobRequestTypeResponse {
  id: string;
  title: string;
  status: CommonStatus;
}

export interface RelationshipStatusResponse {
  id: string;
  title: string;
  status: CommonStatus;
}

export interface GetAllTeamsRequest {
  roles: number[];
  status: CommonStatus[];
}

export interface GetAllGroupTeamsRequest {
  status: CommonStatus[];
}

export interface GetAllPositionsRequest {
  status: CommonStatus[];
  teamId: string;
}

export interface GetRecurrenceRequest {
  teamId: string;
}

export interface GetJobTypeRequest {
  teamId: string;
  status: CommonStatus | null;
}

export interface GetJobRequestTypeRequest {
  teamId: string;
  status: CommonStatus | null;
}

export interface GetRelationshipStatusRequest {
  teamId: string;
  status: CommonStatus | null;
}

export interface CreateRecurrenceRequest {
  title: string;
  teamId: string;
}

export interface RenameRecurrenceRequest {
  id: string;
  title: string;
}

export interface CreateJobTypeRequest {
  title: string;
  teamId: string;
}

export interface UpdateJobTypeRequest {
  id: string;
  title: string;
  status: CommonStatus;
}

export interface CreateJobRequestTypeRequest {
  title: string;
  teamId: string;
}

export interface UpdateJobRequestTypeRequest {
  id: string;
  title: string;
  status: CommonStatus;
}

export interface CreateRelationshipStatusRequest {
  title: string;
  teamId: string;
}

export interface UpdateRelationshipStatusRequest {
  id: string;
  title: string;
  status: CommonStatus;
}

export interface SupportResourceResponse {
  id: string;
  title: string;
  description: string;
  category: CategoryResponse;
}

export interface GetSupportResourcesRequest {
  categoryId: string;
}

export interface CreateSupportResourceRequest {
  title: string;
  description: string;
  categoryId: string;
}

export interface UpdateSupportResourceRequest {
  id: string;
  title: string;
  description: string;
}

export interface DeleteSupportResourceRequest {
  id: string;
}

export interface IssueResponse {
  id: string;
  title: string;
  description: string;
  category: CategoryResponse;
}

export interface GetIssuesRequest {
  categoryId: string;
}

export interface CreateIssueRequest {
  title: string;
  description: string;
  categoryId: string;
}

export interface UpdateIssueRequest {
  id: string;
  title: string;
  description: string;
}

export interface DeleteIssueRequest {
  id: string;
}

export interface ReasonResponse {
  id: string;
  title: string;
  description: string;
  category: CategoryResponse;
}

export interface GetReasonsRequest {
  categoryId: string;
}

export interface CreateReasonRequest {
  title: string;
  description: string;
  categoryId: string;
}

export interface UpdateReasonRequest {
  id: string;
  title: string;
  description: string;
}

export interface DeleteReasonRequest {
  id: string;
}

export interface ChallengeResponse {
  id: string;
  title: string;
  description: string;
  category: CategoryResponse;
}

export interface GetChallengesRequest {
  categoryId: string;
}

export interface CreateChallengeRequest {
  title: string;
  description: string;
  categoryId: string;
}

export interface UpdateChallengeRequest {
  id: string;
  title: string;
  description: string;
}

export interface DeleteChallengeRequest {
  id: string;
}

export interface TechnicalUnitRequest {
  id: string;
  name: string;
  status: TechnicalUnitStatus;
}

interface OtherState {
  teamState: { data: TeamResponse[]; loading: boolean };
  groupTeamState: { data: GroupTeamResponse[]; loading: boolean };
  positionsState: { data: PositionResponse[]; loading: boolean };
  branchState: { data: BranchResponse[]; loading: boolean };
  organizationState: { data: OrganizationResponse[]; loading: boolean };
  recurrenceState: { data: RecurrenceResponse[]; loading: boolean };
  createRecurrenceState: {
    data: ResponseState<RecurrenceResponse> | null;
    loading: boolean;
  };
  renameRecurrenceState: { data: ResponseState<void> | null; loading: boolean };
  jobTypeState: { data: JobTypeResponse[]; loading: boolean };
  createJobTypeState: {
    data: ResponseState<JobTypeResponse> | null;
    loading: boolean;
  };
  updateJobTypeState: { data: ResponseState<void> | null; loading: boolean };
  jobRequestTypeState: { data: JobRequestTypeResponse[]; loading: boolean };
  createJobRequestTypeState: {
    data: ResponseState<JobRequestTypeResponse> | null;
    loading: boolean;
  };
  updateJobRequestTypeState: {
    data: ResponseState<void> | null;
    loading: boolean;
  };
  relationshipStatusState: {
    data: RelationshipStatusResponse[];
    loading: boolean;
  };
  createRelationshipStatusState: {
    data: ResponseState<RelationshipStatusResponse> | null;
    loading: boolean;
  };
  updateRelationshipStatusState: {
    data: ResponseState<void> | null;
    loading: boolean;
  };
  supportResourcesState: {
    data: SupportResourceResponse[];
    loading: boolean;
  };
  createSupportResourceState: {
    data: ResponseState<SupportResourceResponse> | null;
    loading: boolean;
  };
  updateSupportResourceState: {
    data: ResponseState<void> | null;
    loading: boolean;
  };
  deleteSupportResourceState: {
    data: ResponseState<void> | null;
    loading: boolean;
  };
  issuesState: {
    data: IssueResponse[];
    loading: boolean;
  };
  createIssueState: {
    data: ResponseState<IssueResponse> | null;
    loading: boolean;
  };
  updateIssueState: {
    data: ResponseState<void> | null;
    loading: boolean;
  };
  deleteIssueState: {
    data: ResponseState<void> | null;
    loading: boolean;
  };
  reasonsState: {
    data: ReasonResponse[];
    loading: boolean;
  };
  createReasonState: {
    data: ResponseState<ReasonResponse> | null;
    loading: boolean;
  };
  updateReasonState: {
    data: ResponseState<void> | null;
    loading: boolean;
  };
  deleteReasonState: {
    data: ResponseState<void> | null;
    loading: boolean;
  };
  challengesState: {
    data: ChallengeResponse[];
    loading: boolean;
  };
  createChallengeState: {
    data: ResponseState<ChallengeResponse> | null;
    loading: boolean;
  };
  updateChallengeState: {
    data: ResponseState<void> | null;
    loading: boolean;
  };
  deleteChallengeState: {
    data: ResponseState<void> | null;
    loading: boolean;
  };
  technicalUnitsState: { data: TechnicalUnitResponse[]; loading: boolean };
  createTechnicalUnitState: {
    data: ResponseState<TechnicalUnitResponse> | null;
    loading: boolean;
  };
  updateTechnicalUnitState: {
    data: ResponseState<void> | null;
    loading: boolean;
  };
  deleteTechnicalUnitState: {
    data: ResponseState<void> | null;
    loading: boolean;
  };
}

export const groupTeamStateAction = createAsyncThunk(
  "others/group-teams",
  async (params: GetAllGroupTeamsRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/others/group-teams", params);
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

export const teamStateAction = createAsyncThunk(
  "others/teams",
  async (params: GetAllTeamsRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/others/teams", params);
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

export const positionsStateAction = createAsyncThunk(
  "others/positions",
  async (params: GetAllPositionsRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/others/positions", params);
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

export const branchStateAction = createAsyncThunk(
  "others/branches",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onGet("/others/branches");
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

export const organizationStateAction = createAsyncThunk(
  "others/organizations",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onGet("/others/organizations");
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

export const recurrenceStateAction = createAsyncThunk(
  "others/recurrences",
  async (params: GetRecurrenceRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/others/recurrences", params);
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

export const createRecurrenceStateAction = createAsyncThunk(
  "others/recurrence",
  async (params: CreateRecurrenceRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/others/recurrence", params);
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

export const renameRecurrenceStateAction = createAsyncThunk(
  "others/recurrence/rename",
  async (params: RenameRecurrenceRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(`/others/recurrence/${params.id}`, {
        title: params.title,
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

export const jobTypesStateAction = createAsyncThunk(
  "others/job-types",
  async (params: GetJobTypeRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/others/job-types", params);
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

export const createJobTypeStateAction = createAsyncThunk(
  "others/job-type",
  async (params: CreateJobTypeRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/others/job-type", params);
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

export const updateJobTypeStateAction = createAsyncThunk(
  "others/job-type/update",
  async (params: UpdateJobTypeRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(`/others/job-type/${params.id}`, {
        title: params.title,
        status: params.status,
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

export const jobRequestTypesStateAction = createAsyncThunk(
  "others/job-request-types",
  async (params: GetJobRequestTypeRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/others/job-request-types", params);
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

export const createJobRequestTypeStateAction = createAsyncThunk(
  "others/job-request-type",
  async (
    params: CreateJobRequestTypeRequest,
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/others/job-request-type", params);
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

export const updateJobRequestTypeStateAction = createAsyncThunk(
  "others/job-request-type/update",
  async (
    params: UpdateJobRequestTypeRequest,
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(`/others/job-request-type/${params.id}`, {
        title: params.title,
        status: params.status,
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

export const relationshipStatusesStateAction = createAsyncThunk(
  "others/relationship-statuses",
  async (
    params: GetRelationshipStatusRequest,
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/others/relationship-statuses", params);
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

export const createRelationshipStatusStateAction = createAsyncThunk(
  "others/relationship-status",
  async (
    params: CreateRelationshipStatusRequest,
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/others/relationship-status", params);
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

export const updateRelationshipStatusStateAction = createAsyncThunk(
  "others/relationship-status/update",
  async (
    params: UpdateRelationshipStatusRequest,
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(
        `/others/relationship-status/${params.id}`,
        {
          title: params.title,
          status: params.status,
        }
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

export const supportResourcesStateAction = createAsyncThunk(
  "others/support-resources",
  async (params: GetSupportResourcesRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/others/support-resources", params);
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

export const createSupportResourceStateAction = createAsyncThunk(
  "others/support-resource",
  async (
    params: CreateSupportResourceRequest,
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/others/support-resource", params);
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

export const updateSupportResourceStateAction = createAsyncThunk(
  "others/support-resources/update",
  async (
    params: UpdateSupportResourceRequest,
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(`/others/support-resources/${params.id}`, {
        title: params.title,
        description: params.description,
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

export const deleteSupportResourceStateAction = createAsyncThunk(
  "others/support-resources/delete",
  async (
    params: DeleteSupportResourceRequest,
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setErrorState(null));
      const response = await onDelete(`/others/support-resources/${params.id}`);
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

export const issuesStateAction = createAsyncThunk(
  "others/issues",
  async (params: GetIssuesRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/others/issues", params);
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

export const createIssueStateAction = createAsyncThunk(
  "others/issue",
  async (params: CreateIssueRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/others/issue", params);
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

export const updateIssueStateAction = createAsyncThunk(
  "others/issues/update",
  async (params: UpdateIssueRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(`/others/issues/${params.id}`, {
        title: params.title,
        description: params.description,
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

export const deleteIssueStateAction = createAsyncThunk(
  "others/issues/delete",
  async (params: DeleteIssueRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onDelete(`/others/issues/${params.id}`);
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

export const reasonsStateAction = createAsyncThunk(
  "others/reasons",
  async (params: GetReasonsRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/others/reasons", params);
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

export const createReasonStateAction = createAsyncThunk(
  "others/reason",
  async (params: CreateReasonRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/others/reason", params);
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

export const updateReasonStateAction = createAsyncThunk(
  "others/reasons/update",
  async (params: UpdateReasonRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(`/others/reasons/${params.id}`, {
        title: params.title,
        description: params.description,
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

export const deleteReasonStateAction = createAsyncThunk(
  "others/reasons/delete",
  async (params: DeleteReasonRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onDelete(`/others/reasons/${params.id}`);
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

export const challengesStateAction = createAsyncThunk(
  "others/challenges",
  async (params: GetChallengesRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/others/challenges", params);
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

export const createChallengeStateAction = createAsyncThunk(
  "others/challenge",
  async (params: CreateChallengeRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/others/challenge", params);
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

export const updateChallengeStateAction = createAsyncThunk(
  "others/challenges/update",
  async (params: UpdateChallengeRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(`/others/challenges/${params.id}`, {
        title: params.title,
        description: params.description,
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

export const deleteChallengeStateAction = createAsyncThunk(
  "others/challenges/delete",
  async (params: DeleteChallengeRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onDelete(`/others/challenges/${params.id}`);
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

export const technicalUnitsStateAction = createAsyncThunk(
  "others/technical-units",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onGet("/others/technical-units");
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

export const createTechnicalUnitStateAction = createAsyncThunk(
  "others/technical-unit",
  async (params: TechnicalUnitRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/others/technical-unit", params);
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

export const updateTechnicalUnitStateAction = createAsyncThunk(
  "others/technical-unit/update",
  async (params: TechnicalUnitRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPatch(
        `/others/technical-unit/${params.id}`,
        params
      );
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

export const deleteTechnicalUnitStateAction = createAsyncThunk(
  "others/technical-unit/delete",
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onDelete(`/others/technical-unit/${id}`);
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

export const otherSlice = createSlice({
  name: "others",
  initialState: {
    teamState: { data: [], loading: false },
    groupTeamState: { data: [], loading: false },
    positionsState: { data: [], loading: false },
    branchState: { data: [], loading: false },
    organizationState: { data: [], loading: false },
    experiencesState: { data: [], loading: false },
    customersState: { data: [], loading: false },
    categoriesState: { data: [], loading: false },
    recurrenceState: { data: [], loading: false },
    createRecurrenceState: { data: null, loading: false },
    renameRecurrenceState: { data: null, loading: false },
    jobTypeState: { data: [], loading: false },
    createJobTypeState: { data: null, loading: false },
    updateJobTypeState: { data: null, loading: false },
    jobRequestTypeState: { data: [], loading: false },
    createJobRequestTypeState: { data: null, loading: false },
    updateJobRequestTypeState: { data: null, loading: false },
    relationshipStatusState: { data: [], loading: false },
    createRelationshipStatusState: { data: null, loading: false },
    updateRelationshipStatusState: { data: null, loading: false },
    supportResourcesState: { data: [], loading: false },
    createSupportResourceState: { data: null, loading: false },
    updateSupportResourceState: { data: null, loading: false },
    deleteSupportResourceState: { data: null, loading: false },
    issuesState: { data: [], loading: false },
    createIssueState: { data: null, loading: false },
    updateIssueState: { data: null, loading: false },
    deleteIssueState: { data: null, loading: false },
    reasonsState: { data: [], loading: false },
    createReasonState: { data: null, loading: false },
    updateReasonState: { data: null, loading: false },
    deleteReasonState: { data: null, loading: false },
    challengesState: { data: [], loading: false },
    createChallengeState: { data: null, loading: false },
    updateChallengeState: { data: null, loading: false },
    deleteChallengeState: { data: null, loading: false },
    technicalUnitsState: { data: [], loading: false },
    createTechnicalUnitState: { data: null, loading: false },
    updateTechnicalUnitState: { data: null, loading: false },
    deleteTechnicalUnitState: { data: null, loading: false },
  } as OtherState,
  reducers: {
    clearOtherStates(state, _: PayloadAction) {
      state.teamState = { data: [], loading: false };
      state.groupTeamState = { data: [], loading: false };
      state.positionsState = { data: [], loading: false };
      state.branchState = { data: [], loading: false };
      state.organizationState = { data: [], loading: false };
      state.recurrenceState = { data: [], loading: false };
      state.createRecurrenceState = { data: null, loading: false };
      state.renameRecurrenceState = { data: null, loading: false };
      state.jobTypeState = { data: [], loading: false };
      state.createJobTypeState = { data: null, loading: false };
      state.updateJobTypeState = { data: null, loading: false };
      state.jobRequestTypeState = { data: [], loading: false };
      state.createJobRequestTypeState = { data: null, loading: false };
      state.updateJobRequestTypeState = { data: null, loading: false };
      state.relationshipStatusState = { data: [], loading: false };
      state.createRelationshipStatusState = { data: null, loading: false };
      state.updateRelationshipStatusState = { data: null, loading: false };
      state.supportResourcesState = { data: [], loading: false };
      state.createSupportResourceState = { data: null, loading: false };
      state.updateSupportResourceState = { data: null, loading: false };
      state.deleteSupportResourceState = { data: null, loading: false };
      state.issuesState = { data: [], loading: false };
      state.createIssueState = { data: null, loading: false };
      state.updateIssueState = { data: null, loading: false };
      state.deleteIssueState = { data: null, loading: false };
      state.reasonsState = { data: [], loading: false };
      state.createReasonState = { data: null, loading: false };
      state.updateReasonState = { data: null, loading: false };
      state.deleteReasonState = { data: null, loading: false };
      state.challengesState = { data: [], loading: false };
      state.createChallengeState = { data: null, loading: false };
      state.updateChallengeState = { data: null, loading: false };
      state.deleteChallengeState = { data: null, loading: false };
      state.technicalUnitsState = { data: [], loading: false };
      state.createTechnicalUnitState = { data: null, loading: false };
      state.updateTechnicalUnitState = { data: null, loading: false };
      state.deleteTechnicalUnitState = { data: null, loading: false };
    },
    clearNewRecurrenceState(state, _: PayloadAction) {
      state.createRecurrenceState = { data: null, loading: false };
    },
    clearRenameRecurrenceState(state, _: PayloadAction) {
      state.renameRecurrenceState = { data: null, loading: false };
    },
    clearNewJobTypeState(state, _: PayloadAction) {
      state.createJobTypeState = { data: null, loading: false };
    },
    clearUpdateJobTypeState(state, _: PayloadAction) {
      state.updateJobTypeState = { data: null, loading: false };
    },
    clearNewJobRequestTypeState(state, _: PayloadAction) {
      state.createJobRequestTypeState = { data: null, loading: false };
    },
    clearUpdateJobRequestTypeState(state, _: PayloadAction) {
      state.updateJobRequestTypeState = { data: null, loading: false };
    },
    clearNewRelationshipStatusState(state, _: PayloadAction) {
      state.createRelationshipStatusState = { data: null, loading: false };
    },
    clearUpdateRelationshipStatusState(state, _: PayloadAction) {
      state.updateRelationshipStatusState = { data: null, loading: false };
    },
    clearNewSupportResourcesState(state, _: PayloadAction) {
      state.createSupportResourceState = { data: null, loading: false };
    },
    clearUpdateSupportResourceState(state, _: PayloadAction) {
      state.updateSupportResourceState = { data: null, loading: false };
    },
    clearDeleteSupportResourceState(state, _: PayloadAction) {
      state.deleteSupportResourceState = { data: null, loading: false };
    },
    clearNewIssueState(state, _: PayloadAction) {
      state.createIssueState = { data: null, loading: false };
    },
    clearUpdateIssueState(state, _: PayloadAction) {
      state.updateIssueState = { data: null, loading: false };
    },
    clearDeleteIssueState(state, _: PayloadAction) {
      state.deleteIssueState = { data: null, loading: false };
    },
    clearNewReasonState(state, _: PayloadAction) {
      state.createReasonState = { data: null, loading: false };
    },
    clearUpdateReasonState(state, _: PayloadAction) {
      state.updateReasonState = { data: null, loading: false };
    },
    clearDeleteReasonState(state, _: PayloadAction) {
      state.deleteReasonState = { data: null, loading: false };
    },
    clearNewChallengeState(state, _: PayloadAction) {
      state.createChallengeState = { data: null, loading: false };
    },
    clearUpdateChallengeState(state, _: PayloadAction) {
      state.updateChallengeState = { data: null, loading: false };
    },
    clearDeleteChallengeState(state, _: PayloadAction) {
      state.deleteChallengeState = { data: null, loading: false };
    },
    clearTechnicalUnitsState(state) {
      state.technicalUnitsState = { data: [], loading: false };
    },
    clearCreateTechnicalUnitState(state) {
      state.createTechnicalUnitState = { data: null, loading: false };
    },
    clearUpdateTechnicalUnitState(state) {
      state.updateTechnicalUnitState = { data: null, loading: false };
    },
    clearDeleteTechnicalUnitState(state) {
      state.deleteTechnicalUnitState = { data: null, loading: false };
    },
  },
  extraReducers: (builder) => {
    builder

      // Get all teams
      .addCase(teamStateAction.pending, (state: OtherState, _) => {
        state.teamState.loading = true;
        state.teamState.data = [];
      })
      .addCase(teamStateAction.fulfilled, (state: OtherState, action) => {
        state.teamState.loading = false;
        state.teamState.data = action.payload as TeamResponse[];
      })
      .addCase(teamStateAction.rejected, (state: OtherState, _) => {
        state.teamState.loading = false;
      })

      // Get all group teams
      .addCase(groupTeamStateAction.pending, (state: OtherState, _) => {
        state.groupTeamState.loading = true;
        state.groupTeamState.data = [];
      })
      .addCase(groupTeamStateAction.fulfilled, (state: OtherState, action) => {
        state.groupTeamState.loading = false;
        state.groupTeamState.data = action.payload as GroupTeamResponse[];
      })
      .addCase(groupTeamStateAction.rejected, (state: OtherState, _) => {
        state.groupTeamState.loading = false;
      })

      // Get all positions
      .addCase(positionsStateAction.pending, (state: OtherState, _) => {
        state.positionsState.loading = true;
        state.positionsState.data = [];
      })
      .addCase(positionsStateAction.fulfilled, (state: OtherState, action) => {
        state.positionsState.loading = false;
        state.positionsState.data = action.payload as PositionResponse[];
      })
      .addCase(positionsStateAction.rejected, (state: OtherState, _) => {
        state.positionsState.loading = false;
      })

      // Get all branches
      .addCase(branchStateAction.pending, (state: OtherState, _) => {
        state.branchState.loading = true;
        state.branchState.data = [];
      })
      .addCase(branchStateAction.fulfilled, (state: OtherState, action) => {
        state.branchState.loading = false;
        state.branchState.data = action.payload as BranchResponse[];
      })
      .addCase(branchStateAction.rejected, (state: OtherState, _) => {
        state.branchState.loading = false;
      })

      // Get all organizations
      .addCase(organizationStateAction.pending, (state: OtherState, _) => {
        state.organizationState.loading = true;
        state.organizationState.data = [];
      })
      .addCase(
        organizationStateAction.fulfilled,
        (state: OtherState, action) => {
          state.organizationState.loading = false;
          state.organizationState.data =
            action.payload as OrganizationResponse[];
        }
      )
      .addCase(organizationStateAction.rejected, (state: OtherState, _) => {
        state.organizationState.loading = false;
      })

      // Get all recurrences
      .addCase(recurrenceStateAction.pending, (state: OtherState, _) => {
        state.recurrenceState.loading = true;
        state.recurrenceState.data = [];
      })
      .addCase(recurrenceStateAction.fulfilled, (state: OtherState, action) => {
        state.recurrenceState.loading = false;
        state.recurrenceState.data = action.payload as RecurrenceResponse[];
      })
      .addCase(recurrenceStateAction.rejected, (state: OtherState, _) => {
        state.recurrenceState.loading = false;
      })

      // Create recurrence
      .addCase(createRecurrenceStateAction.pending, (state: OtherState, _) => {
        state.createRecurrenceState.loading = true;
        state.createRecurrenceState.data = null;
      })
      .addCase(
        createRecurrenceStateAction.fulfilled,
        (state: OtherState, action) => {
          state.createRecurrenceState.loading = false;
          state.createRecurrenceState.data =
            action.payload as ResponseState<RecurrenceResponse>;
        }
      )
      .addCase(createRecurrenceStateAction.rejected, (state: OtherState, _) => {
        state.createRecurrenceState.loading = false;
      })

      // Rename recurrence
      .addCase(renameRecurrenceStateAction.pending, (state: OtherState, _) => {
        state.renameRecurrenceState.loading = true;
        state.renameRecurrenceState.data = null;
      })
      .addCase(
        renameRecurrenceStateAction.fulfilled,
        (state: OtherState, action) => {
          state.renameRecurrenceState.loading = false;
          state.renameRecurrenceState.data =
            action.payload as ResponseState<void>;
        }
      )
      .addCase(renameRecurrenceStateAction.rejected, (state: OtherState, _) => {
        state.renameRecurrenceState.loading = false;
      })

      // Get all job types
      .addCase(jobTypesStateAction.pending, (state: OtherState, _) => {
        state.jobTypeState.loading = true;
        state.jobTypeState.data = [];
      })
      .addCase(jobTypesStateAction.fulfilled, (state: OtherState, action) => {
        state.jobTypeState.loading = false;
        state.jobTypeState.data = action.payload as JobTypeResponse[];
      })
      .addCase(jobTypesStateAction.rejected, (state: OtherState, _) => {
        state.jobTypeState.loading = false;
      })

      // Create job type
      .addCase(createJobTypeStateAction.pending, (state: OtherState, _) => {
        state.createJobTypeState.loading = true;
        state.createJobTypeState.data = null;
      })
      .addCase(
        createJobTypeStateAction.fulfilled,
        (state: OtherState, action) => {
          state.createJobTypeState.loading = false;
          state.createJobTypeState.data =
            action.payload as ResponseState<JobTypeResponse>;
        }
      )
      .addCase(createJobTypeStateAction.rejected, (state: OtherState, _) => {
        state.createJobTypeState.loading = false;
      })

      // Update job type
      .addCase(updateJobTypeStateAction.pending, (state: OtherState, _) => {
        state.updateJobTypeState.loading = true;
        state.updateJobTypeState.data = null;
      })
      .addCase(
        updateJobTypeStateAction.fulfilled,
        (state: OtherState, action) => {
          state.updateJobTypeState.loading = false;
          state.updateJobTypeState.data = action.payload as ResponseState<void>;
        }
      )
      .addCase(updateJobTypeStateAction.rejected, (state: OtherState, _) => {
        state.updateJobTypeState.loading = false;
      })

      // Get all job request types
      .addCase(jobRequestTypesStateAction.pending, (state: OtherState, _) => {
        state.jobRequestTypeState.loading = true;
        state.jobRequestTypeState.data = [];
      })
      .addCase(
        jobRequestTypesStateAction.fulfilled,
        (state: OtherState, action) => {
          state.jobRequestTypeState.loading = false;
          state.jobRequestTypeState.data = action.payload as JobTypeResponse[];
        }
      )
      .addCase(jobRequestTypesStateAction.rejected, (state: OtherState, _) => {
        state.jobRequestTypeState.loading = false;
      })

      // Create job request type
      .addCase(
        createJobRequestTypeStateAction.pending,
        (state: OtherState, _) => {
          state.createJobRequestTypeState.loading = true;
          state.createJobRequestTypeState.data = null;
        }
      )
      .addCase(
        createJobRequestTypeStateAction.fulfilled,
        (state: OtherState, action) => {
          state.createJobRequestTypeState.loading = false;
          state.createJobRequestTypeState.data =
            action.payload as ResponseState<JobRequestTypeResponse>;
        }
      )
      .addCase(
        createJobRequestTypeStateAction.rejected,
        (state: OtherState, _) => {
          state.createJobRequestTypeState.loading = false;
        }
      )

      // Update job request type
      .addCase(
        updateJobRequestTypeStateAction.pending,
        (state: OtherState, _) => {
          state.updateJobRequestTypeState.loading = true;
          state.updateJobRequestTypeState.data = null;
        }
      )
      .addCase(
        updateJobRequestTypeStateAction.fulfilled,
        (state: OtherState, action) => {
          state.updateJobRequestTypeState.loading = false;
          state.updateJobRequestTypeState.data =
            action.payload as ResponseState<void>;
        }
      )
      .addCase(
        updateJobRequestTypeStateAction.rejected,
        (state: OtherState, _) => {
          state.updateJobRequestTypeState.loading = false;
        }
      )

      // Get all relationship status
      .addCase(
        relationshipStatusesStateAction.pending,
        (state: OtherState, _) => {
          state.relationshipStatusState.loading = true;
          state.relationshipStatusState.data = [];
        }
      )
      .addCase(
        relationshipStatusesStateAction.fulfilled,
        (state: OtherState, action) => {
          state.relationshipStatusState.loading = false;
          state.relationshipStatusState.data =
            action.payload as JobTypeResponse[];
        }
      )
      .addCase(
        relationshipStatusesStateAction.rejected,
        (state: OtherState, _) => {
          state.relationshipStatusState.loading = false;
        }
      )

      // Create relationship status
      .addCase(
        createRelationshipStatusStateAction.pending,
        (state: OtherState, _) => {
          state.createRelationshipStatusState.loading = true;
          state.createRelationshipStatusState.data = null;
        }
      )
      .addCase(
        createRelationshipStatusStateAction.fulfilled,
        (state: OtherState, action) => {
          state.createRelationshipStatusState.loading = false;
          state.createRelationshipStatusState.data =
            action.payload as ResponseState<RelationshipStatusResponse>;
        }
      )
      .addCase(
        createRelationshipStatusStateAction.rejected,
        (state: OtherState, _) => {
          state.createRelationshipStatusState.loading = false;
        }
      )

      // Update relationship status
      .addCase(
        updateRelationshipStatusStateAction.pending,
        (state: OtherState, _) => {
          state.updateRelationshipStatusState.loading = true;
          state.updateRelationshipStatusState.data = null;
        }
      )
      .addCase(
        updateRelationshipStatusStateAction.fulfilled,
        (state: OtherState, action) => {
          state.updateRelationshipStatusState.loading = false;
          state.updateRelationshipStatusState.data =
            action.payload as ResponseState<void>;
        }
      )
      .addCase(
        updateRelationshipStatusStateAction.rejected,
        (state: OtherState, _) => {
          state.updateRelationshipStatusState.loading = false;
        }
      )

      // Get all support resources
      .addCase(supportResourcesStateAction.pending, (state: OtherState, _) => {
        state.supportResourcesState.loading = true;
        state.supportResourcesState.data = [];
      })
      .addCase(
        supportResourcesStateAction.fulfilled,
        (state: OtherState, action) => {
          state.supportResourcesState.loading = false;
          state.supportResourcesState.data =
            action.payload as SupportResourceResponse[];
        }
      )
      .addCase(supportResourcesStateAction.rejected, (state: OtherState, _) => {
        state.supportResourcesState.loading = false;
      })

      // Create support resource
      .addCase(
        createSupportResourceStateAction.pending,
        (state: OtherState, _) => {
          state.createSupportResourceState.loading = true;
          state.createSupportResourceState.data = null;
        }
      )
      .addCase(
        createSupportResourceStateAction.fulfilled,
        (state: OtherState, action) => {
          state.createSupportResourceState.loading = false;
          state.createSupportResourceState.data =
            action.payload as ResponseState<SupportResourceResponse>;
        }
      )
      .addCase(
        createSupportResourceStateAction.rejected,
        (state: OtherState, _) => {
          state.createSupportResourceState.loading = false;
        }
      )

      // Update support resource
      .addCase(
        updateSupportResourceStateAction.pending,
        (state: OtherState, _) => {
          state.updateSupportResourceState.loading = true;
          state.updateSupportResourceState.data = null;
        }
      )
      .addCase(
        updateSupportResourceStateAction.fulfilled,
        (state: OtherState, action) => {
          state.updateSupportResourceState.loading = false;
          state.updateSupportResourceState.data =
            action.payload as ResponseState<void>;
        }
      )
      .addCase(
        updateSupportResourceStateAction.rejected,
        (state: OtherState, _) => {
          state.updateSupportResourceState.loading = false;
        }
      )

      // Delete support resource
      .addCase(
        deleteSupportResourceStateAction.pending,
        (state: OtherState, _) => {
          state.deleteSupportResourceState.loading = true;
          state.deleteSupportResourceState.data = null;
        }
      )
      .addCase(
        deleteSupportResourceStateAction.fulfilled,
        (state: OtherState, action) => {
          state.deleteSupportResourceState.loading = false;
          state.deleteSupportResourceState.data =
            action.payload as ResponseState<void>;
        }
      )
      .addCase(
        deleteSupportResourceStateAction.rejected,
        (state: OtherState, _) => {
          state.deleteSupportResourceState.loading = false;
        }
      )

      // Get all issues
      .addCase(issuesStateAction.pending, (state: OtherState, _) => {
        state.issuesState.loading = true;
        state.issuesState.data = [];
      })
      .addCase(issuesStateAction.fulfilled, (state: OtherState, action) => {
        state.issuesState.loading = false;
        state.issuesState.data = action.payload as IssueResponse[];
      })
      .addCase(issuesStateAction.rejected, (state: OtherState, _) => {
        state.issuesState.loading = false;
      })

      // Create issue
      .addCase(createIssueStateAction.pending, (state: OtherState, _) => {
        state.createIssueState.loading = true;
        state.createIssueState.data = null;
      })
      .addCase(
        createIssueStateAction.fulfilled,
        (state: OtherState, action) => {
          state.createIssueState.loading = false;
          state.createIssueState.data =
            action.payload as ResponseState<IssueResponse>;
        }
      )
      .addCase(createIssueStateAction.rejected, (state: OtherState, _) => {
        state.createIssueState.loading = false;
      })

      // Update issue
      .addCase(updateIssueStateAction.pending, (state: OtherState, _) => {
        state.updateIssueState.loading = true;
        state.updateIssueState.data = null;
      })
      .addCase(
        updateIssueStateAction.fulfilled,
        (state: OtherState, action) => {
          state.updateIssueState.loading = false;
          state.updateIssueState.data = action.payload as ResponseState<void>;
        }
      )
      .addCase(updateIssueStateAction.rejected, (state: OtherState, _) => {
        state.updateIssueState.loading = false;
      })

      // Delete issue
      .addCase(deleteIssueStateAction.pending, (state: OtherState, _) => {
        state.deleteIssueState.loading = true;
        state.deleteIssueState.data = null;
      })
      .addCase(
        deleteIssueStateAction.fulfilled,
        (state: OtherState, action) => {
          state.deleteIssueState.loading = false;
          state.deleteIssueState.data = action.payload as ResponseState<void>;
        }
      )
      .addCase(deleteIssueStateAction.rejected, (state: OtherState, _) => {
        state.deleteIssueState.loading = false;
      })

      // Get all reasons
      .addCase(reasonsStateAction.pending, (state: OtherState, _) => {
        state.reasonsState.loading = true;
        state.reasonsState.data = [];
      })
      .addCase(reasonsStateAction.fulfilled, (state: OtherState, action) => {
        state.reasonsState.loading = false;
        state.reasonsState.data = action.payload as ReasonResponse[];
      })
      .addCase(reasonsStateAction.rejected, (state: OtherState, _) => {
        state.reasonsState.loading = false;
      })

      // Create reason
      .addCase(createReasonStateAction.pending, (state: OtherState, _) => {
        state.createReasonState.loading = true;
        state.createReasonState.data = null;
      })
      .addCase(
        createReasonStateAction.fulfilled,
        (state: OtherState, action) => {
          state.createReasonState.loading = false;
          state.createReasonState.data =
            action.payload as ResponseState<ReasonResponse>;
        }
      )
      .addCase(createReasonStateAction.rejected, (state: OtherState, _) => {
        state.createReasonState.loading = false;
      })

      // Update reason
      .addCase(updateReasonStateAction.pending, (state: OtherState, _) => {
        state.updateReasonState.loading = true;
        state.updateReasonState.data = null;
      })
      .addCase(
        updateReasonStateAction.fulfilled,
        (state: OtherState, action) => {
          state.updateReasonState.loading = false;
          state.updateReasonState.data = action.payload as ResponseState<void>;
        }
      )
      .addCase(updateReasonStateAction.rejected, (state: OtherState, _) => {
        state.updateReasonState.loading = false;
      })

      // Delete reason
      .addCase(deleteReasonStateAction.pending, (state: OtherState, _) => {
        state.deleteReasonState.loading = true;
        state.deleteReasonState.data = null;
      })
      .addCase(
        deleteReasonStateAction.fulfilled,
        (state: OtherState, action) => {
          state.deleteReasonState.loading = false;
          state.deleteReasonState.data = action.payload as ResponseState<void>;
        }
      )
      .addCase(deleteReasonStateAction.rejected, (state: OtherState, _) => {
        state.deleteReasonState.loading = false;
      })

      // Get all challenges
      .addCase(challengesStateAction.pending, (state: OtherState, _) => {
        state.challengesState.loading = true;
        state.challengesState.data = [];
      })
      .addCase(challengesStateAction.fulfilled, (state: OtherState, action) => {
        state.challengesState.loading = false;
        state.challengesState.data = action.payload as ChallengeResponse[];
      })
      .addCase(challengesStateAction.rejected, (state: OtherState, _) => {
        state.challengesState.loading = false;
      })

      // Create challenge
      .addCase(createChallengeStateAction.pending, (state: OtherState, _) => {
        state.createChallengeState.loading = true;
        state.createChallengeState.data = null;
      })
      .addCase(
        createChallengeStateAction.fulfilled,
        (state: OtherState, action) => {
          state.createChallengeState.loading = false;
          state.createChallengeState.data =
            action.payload as ResponseState<ChallengeResponse>;
        }
      )
      .addCase(createChallengeStateAction.rejected, (state: OtherState, _) => {
        state.createChallengeState.loading = false;
      })

      // Update challenge
      .addCase(updateChallengeStateAction.pending, (state: OtherState, _) => {
        state.updateChallengeState.loading = true;
        state.updateChallengeState.data = null;
      })
      .addCase(
        updateChallengeStateAction.fulfilled,
        (state: OtherState, action) => {
          state.updateChallengeState.loading = false;
          state.updateChallengeState.data =
            action.payload as ResponseState<void>;
        }
      )
      .addCase(updateChallengeStateAction.rejected, (state: OtherState, _) => {
        state.updateChallengeState.loading = false;
      })

      // Delete challenge
      .addCase(deleteChallengeStateAction.pending, (state: OtherState, _) => {
        state.deleteChallengeState.loading = true;
        state.deleteChallengeState.data = null;
      })
      .addCase(
        deleteChallengeStateAction.fulfilled,
        (state: OtherState, action) => {
          state.deleteChallengeState.loading = false;
          state.deleteChallengeState.data =
            action.payload as ResponseState<void>;
        }
      )
      .addCase(deleteChallengeStateAction.rejected, (state: OtherState, _) => {
        state.deleteChallengeState.loading = false;
      })
      // Fetch all technical units
      .addCase(technicalUnitsStateAction.pending, (state) => {
        state.technicalUnitsState.loading = true;
        state.technicalUnitsState.data = [];
      })
      .addCase(technicalUnitsStateAction.fulfilled, (state, action) => {
        state.technicalUnitsState.loading = false;
        state.technicalUnitsState.data =
          action.payload as TechnicalUnitResponse[];
      })
      .addCase(technicalUnitsStateAction.rejected, (state) => {
        state.technicalUnitsState.loading = false;
      })

      // Create technical unit
      .addCase(createTechnicalUnitStateAction.pending, (state) => {
        state.createTechnicalUnitState.loading = true;
        state.createTechnicalUnitState.data = null;
      })
      .addCase(createTechnicalUnitStateAction.fulfilled, (state, action) => {
        state.createTechnicalUnitState.loading = false;
        state.createTechnicalUnitState.data =
          action.payload as ResponseState<TechnicalUnitResponse>;
      })
      .addCase(createTechnicalUnitStateAction.rejected, (state) => {
        state.createTechnicalUnitState.loading = false;
      })

      // Update technical unit
      .addCase(updateTechnicalUnitStateAction.pending, (state) => {
        state.updateTechnicalUnitState.loading = true;
        state.updateTechnicalUnitState.data = null;
      })
      .addCase(updateTechnicalUnitStateAction.fulfilled, (state, action) => {
        state.updateTechnicalUnitState.loading = false;
        state.updateTechnicalUnitState.data =
          action.payload as ResponseState<void>;
      })
      .addCase(updateTechnicalUnitStateAction.rejected, (state) => {
        state.updateTechnicalUnitState.loading = false;
      })

      // Delete technical unit
      .addCase(deleteTechnicalUnitStateAction.pending, (state) => {
        state.deleteTechnicalUnitState.loading = true;
        state.deleteTechnicalUnitState.data = null;
      })
      .addCase(deleteTechnicalUnitStateAction.fulfilled, (state, action) => {
        state.deleteTechnicalUnitState.loading = false;
        state.deleteTechnicalUnitState.data =
          action.payload as ResponseState<void>;
      })
      .addCase(deleteTechnicalUnitStateAction.rejected, (state) => {
        state.deleteTechnicalUnitState.loading = false;
      });
  },
});

export const {
  clearOtherStates,
  clearNewRecurrenceState,
  clearRenameRecurrenceState,
  clearNewJobTypeState,
  clearUpdateJobTypeState,
  clearNewJobRequestTypeState,
  clearUpdateJobRequestTypeState,
  clearNewRelationshipStatusState,
  clearUpdateRelationshipStatusState,
  clearNewSupportResourcesState,
  clearUpdateSupportResourceState,
  clearDeleteSupportResourceState,
  clearNewIssueState,
  clearUpdateIssueState,
  clearDeleteIssueState,
  clearNewReasonState,
  clearUpdateReasonState,
  clearDeleteReasonState,
  clearNewChallengeState,
  clearUpdateChallengeState,
  clearDeleteChallengeState,
  clearTechnicalUnitsState,
  clearCreateTechnicalUnitState,
  clearUpdateTechnicalUnitState,
  clearDeleteTechnicalUnitState,
} = otherSlice.actions;

export const getTeamState = (state: AppState) => state.others.teamState;
export const getGroupTeamState = (state: AppState) =>
  state.others.groupTeamState;
export const getPositionsState = (state: AppState) =>
  state.others.positionsState;
export const getBranchState = (state: AppState) => state.others.branchState;
export const getOrganizationState = (state: AppState) =>
  state.others.organizationState;

// Recurrence
export const getRecurrenceState = (state: AppState) =>
  state.others.recurrenceState;
export const getCreateRecurrenceState = (state: AppState) =>
  state.others.createRecurrenceState;
export const getRenameRecurrenceState = (state: AppState) =>
  state.others.renameRecurrenceState;

// Job type
export const getJobTypeState = (state: AppState) => state.others.jobTypeState;
export const getCreateJobTypeState = (state: AppState) =>
  state.others.createJobTypeState;
export const getUpdateJobTypeState = (state: AppState) =>
  state.others.updateJobTypeState;

// Job request type
export const getJobRequestTypeState = (state: AppState) =>
  state.others.jobRequestTypeState;
export const getCreateJobRequestTypeState = (state: AppState) =>
  state.others.createJobRequestTypeState;
export const getUpdateJobRequestTypeState = (state: AppState) =>
  state.others.updateJobRequestTypeState;

// Relationship status
export const getRelationshipStatusState = (state: AppState) =>
  state.others.relationshipStatusState;
export const getCreateRelationshipStatusState = (state: AppState) =>
  state.others.createRelationshipStatusState;
export const getUpdateRelationshipStatusState = (state: AppState) =>
  state.others.updateRelationshipStatusState;

// Support resources
export const getSupportResourceState = (state: AppState) =>
  state.others.supportResourcesState;
export const getCreateSupportResourceState = (state: AppState) =>
  state.others.createSupportResourceState;
export const getUpdateSupportResourceState = (state: AppState) =>
  state.others.updateSupportResourceState;
export const getDeleteSupportResourceState = (state: AppState) =>
  state.others.deleteSupportResourceState;

// Issues
export const getIssuesState = (state: AppState) => state.others.issuesState;
export const getCreateIssueState = (state: AppState) =>
  state.others.createIssueState;
export const getUpdateIssueState = (state: AppState) =>
  state.others.updateIssueState;
export const getDeleteIssueState = (state: AppState) =>
  state.others.deleteIssueState;

// Reasons
export const getReasonsState = (state: AppState) => state.others.reasonsState;
export const getCreateReasonState = (state: AppState) =>
  state.others.createReasonState;
export const getUpdateReasonState = (state: AppState) =>
  state.others.updateReasonState;
export const getDeleteReasonState = (state: AppState) =>
  state.others.deleteReasonState;

// Challenges
export const getChallengesState = (state: AppState) =>
  state.others.challengesState;
export const getCreateChallengeState = (state: AppState) =>
  state.others.createChallengeState;
export const getUpdateChallengeState = (state: AppState) =>
  state.others.updateChallengeState;
export const getDeleteChallengeState = (state: AppState) =>
  state.others.deleteChallengeState;

// Incidents
export const getTechnicalUnitsState = (state: AppState) =>
  state.others.technicalUnitsState;
export const getCreateTechnicalUnitState = (state: AppState) =>
  state.others.createTechnicalUnitState;
export const getUpdateTechnicalUnitState = (state: AppState) =>
  state.others.updateTechnicalUnitState;
export const getDeleteTechnicalUnitState = (state: AppState) =>
  state.others.deleteTechnicalUnitState;

export default otherSlice.reducer;
