import { createSlice } from "@reduxjs/toolkit";
import { ReportResponse } from "./report-slice";
import { TaskGroupResponse } from "./task-slice";
import { DReportResponse } from "./design-report-slice";
import { JobTypeResponse, RelationshipStatusResponse } from "./other-slice";
import { WeeklySummaryResponse } from "./weekly-summary-slice";

export enum ExportType {
  // TaskReport = "tasks report",
  OneOnOne = "1 on 1",
}

export enum ExportFormat {
  Excel = "excel",
}

export enum ExportPeriod {
  Custom = "custom",
  // Weekly = "weekly",
  // Monthly = "monthly",
  PastWeek = "past week",
  PastMonth = "past month",
  Past3Months = "past 3 months",
  Past6Months = "past 6 months",
}

export interface GetReportsRequest {
  types: ExportType[];
  format: ExportFormat;
  userId: string;
}

export interface ExportReportsRequest {
  // userId: string;
  userIds: string[];
  groupTeamIds: string[];
  start: Date;
  end: Date;
  types: ExportType[];
}

export interface ExportTaskReportsResponse {
  [key: string]: (ReportResponse | any)[];
}

export interface ExportGroupedReportsResponse {
  taskGroup: TaskGroupResponse;
  reports: ReportResponse[];
  totalDuration: number;
  totalQuantity: number;
}

export interface ExportReportsResponse {
  task: ExportTaskReportsResponse | null;
  grouped: ExportGroupedReportsResponse[] | null;
  weeklySummary: WeeklySummaryResponse[] | null;
}

export interface ExportTaskDReportsResponse {
  [key: string]: (DReportResponse | any)[];
}

export interface ExportGroupedDReportsResponse {
  key: string;
  relationship: RelationshipStatusResponse;
  reports: DReportResponse[];
  type: JobTypeResponse;
  totalDuration: number;
  totalJobs: number;
  totalLevels: number;
  totalQuantity: number;
  totalSquareMetres: number;
  totalUnits: number;
}

export interface ExportDReportsResponse {
  task: ExportTaskDReportsResponse | null;
  grouped: ExportGroupedDReportsResponse[] | null;
  weeklySummary: WeeklySummaryResponse[] | null;
}

export const dataExportSlice = createSlice({
  name: "dataExport",
  initialState: {},
  reducers: {},
});

export enum ExportFrequency {
  Daily = "daily",
  Weekly = "weekly",
  Monthly = "monthly",
  Annually = "annually",
}

export default dataExportSlice.reducer;
