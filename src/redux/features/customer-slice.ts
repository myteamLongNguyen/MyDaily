import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setErrorState } from "./common-slice";
import { CommonStatus } from "./other-slice";
import { onPost } from "../../core/api-service";
import paths from "../../navigation/paths";
import { ErrorState } from "../common-state";
import { AppState } from "../store";

export interface CustomerResponse {
  id: string;
  name: string;
  status: CommonStatus;
}

export interface GetAllCustomersRequest {
  status: CommonStatus[];
}

interface CustomerState {
  customersState: { data: CustomerResponse[]; loading: boolean };
}

export const customersStateAction = createAsyncThunk(
  "others/customers",
  async (params: GetAllCustomersRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await onPost("/others/customers", params);
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

export const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customersState: { data: [], loading: false },
  } as CustomerState,
  reducers: {
    clearCustomerState(state, _: PayloadAction) {
      state.customersState = { data: [], loading: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(customersStateAction.pending, (state: CustomerState, _) => {
        state.customersState.loading = true;
        state.customersState.data = [];
      })
      .addCase(
        customersStateAction.fulfilled,
        (state: CustomerState, action) => {
          state.customersState.loading = false;
          state.customersState.data = action.payload as CustomerResponse[];
        }
      )
      .addCase(customersStateAction.rejected, (state: CustomerState, _) => {
        state.customersState.loading = false;
      });
  },
});

export const { clearCustomerState } = customerSlice.actions;

export const getCustomersState = (state: AppState) =>
  state.customer.customersState;

export default customerSlice.reducer;
