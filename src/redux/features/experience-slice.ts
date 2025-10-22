import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setErrorState } from "./common-slice";
import { CommonStatus } from "./other-slice";
import { onPost } from "../../core/api-service";
import paths from "../../navigation/paths";
import { ErrorState } from "../common-state";
import { AppState } from "../store";

export interface ExperienceResponse {
  id: string;
  title: string;
  status: CommonStatus;
}

export interface GetAllExperiencesRequest {
  status: CommonStatus[];
}

interface ExperienceState {
  experiencesState: { data: ExperienceResponse[]; loading: boolean };
}

export const experiencesStateAction = createAsyncThunk(
  "others/experiences",
  async (params: GetAllExperiencesRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/others/experiences", params);
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

export const experienceSlice = createSlice({
  name: "experience",
  initialState: {
    experiencesState: { data: [], loading: false },
  } as ExperienceState,
  reducers: {
    clearExperienceState(state, _: PayloadAction) {
      state.experiencesState = { data: [], loading: false };
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all experiences
      .addCase(experiencesStateAction.pending, (state: ExperienceState, _) => {
        state.experiencesState.loading = true;
        state.experiencesState.data = [];
      })
      .addCase(
        experiencesStateAction.fulfilled,
        (state: ExperienceState, action) => {
          state.experiencesState.loading = false;
          state.experiencesState.data = action.payload as ExperienceResponse[];
        }
      )
      .addCase(experiencesStateAction.rejected, (state: ExperienceState, _) => {
        state.experiencesState.loading = false;
      });
  },
});

export const { clearExperienceState } = experienceSlice.actions;

export const getExperiencesState = (state: AppState) =>
  state.experience.experiencesState;

export default experienceSlice.reducer;
