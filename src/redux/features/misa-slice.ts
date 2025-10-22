import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setErrorState } from "./common-slice";
import axiosInstance from "../../core/api-service/axios";
import { ErrorState } from "../common-state";
import { AppState } from "../store";

export const amisUrl =
  "https://amisapp.misa.vn/APIS/TimesheetOpenAPI/api/Open/get-data-application";

export const amisHeaders = {
  "x-clientid": process.env.REACT_APP_MISA_X_CLIENTID,
  "x-transactionid": process.env.REACT_APP_MISA_X_TRANSACTIONID,
  "x-token": process.env.REACT_APP_MISA_X_TOKEN,
};

export interface AbsentDate {
  date: string;
  from: Date;
  to: Date;
  total: number;
  type: string;
  reason: string;
}
export interface GetDataApplicationRequest {
  Filter: null;
  CustomFilter: null;
  QuickSearch: {};
  CustomParam: {
    SubSystemCode: string;
      // | "Attendance"
      // | "LateInEarlyOut"
      // | "OverTime"
      // | "MissionAllowance"
      // | "UpdateTimekeeper"
      // | "ChangeShift";
    FromDate: string;
    ToDate: string;
  };
}

interface AttendanceDataItem {
  Date: string;
  NumberOfDay: number;
}

export interface AttendanceRecord {
  AttendanceID: number;
  FullName: string;
  EmployeeCode: string;
  OrganizationUnitName: string;
  JobPositionName: string;
  JobTitleName: string | null;
  RequestDate: string;
  FromDate: string;
  ToDate: string;
  LeaveDay: number;
  NumberOfHourLeave: number;
  DictionaryKey: number;
  AttendanceTypeName: string;
  AttendanceTypeName_EN: string;
  SalaryRate: number;
  TotalLeaved: number;
  NumRemain: number;
  NumLeave: number;
  Reason: string;
  ApprovalName: string;
  ForwarderNames: string | null;
  SubstituteName: string | null;
  RelationShipNames: string | null;
  AttendanceData: AttendanceDataItem[];
  EmployeeAttendanceCodes: string;
  EmployeeAttendanceNames: string;
  ShowEmployeeAttendance: string | null;
  Step: number;
  NextStep: number;
  IsProcess: number;
  IsApplyProcessNew: number;
  Description: string | null;
  Status: number;
  CreatedDate: string;
  CreatedBy: string;
  ModifiedDate: string;
  ModifiedBy: string;
}

export interface DataApplicationResponse {
  ValidateInfo: any[];
  Success: boolean;
  Code: number;
  SubCode: number;
  UserMessage: string | null;
  SystemMessage: string | null;
  Data: {
    Total: number;
    PageData: AttendanceRecord[];
  };
}

interface MisaState {
  attendanceState: { data: DataApplicationResponse | null; loading: boolean };
}

export const getAttendanceStateAction = createAsyncThunk(
  "misa/attendance",
  async (params: GetDataApplicationRequest, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setErrorState(null));
      const response = await axiosInstance.post(amisUrl, params, {
        headers: amisHeaders,
      });
      return response.data;
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

export const misaSlice = createSlice({
  name: "misa",
  initialState: {
    attendanceState: { data: null, loading: false },
  } as MisaState,
  reducers: {
    clearMisaStates(state, _: PayloadAction) {
      state.attendanceState = { data: null, loading: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAttendanceStateAction.pending, (state: MisaState, _) => {
        state.attendanceState.loading = true;
        state.attendanceState.data = null;
      })
      .addCase(
        getAttendanceStateAction.fulfilled,
        (state: MisaState, action) => {
          state.attendanceState.loading = false;
          state.attendanceState.data =
            action.payload as DataApplicationResponse;
        }
      )
      .addCase(getAttendanceStateAction.rejected, (state: MisaState, _) => {
        state.attendanceState.loading = false;
      });
  },
});

export const { clearMisaStates } = misaSlice.actions;

export const getAttendanceState = (state: AppState) =>
  state.misa.attendanceState;

export default misaSlice.reducer;
