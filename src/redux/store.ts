import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth-slice";
import { taskSlice } from "./features/task-slice";
import { otherSlice } from "./features/other-slice";
import { commonSlice } from "./features/common-slice";
import { reportSlice } from "./features/report-slice";
import { userSlice } from "./features/user-slice";
import { misaSlice } from "./features/misa-slice";
import { documentSlice } from "./features/document-slice";
import { dReportSlice } from "./features/design-report-slice";
import { weeklySummarySlice } from "./features/weekly-summary-slice";
import { experienceSlice } from "./features/experience-slice";
import { customerSlice } from "./features/customer-slice";
import { categorySlice } from "./features/category-slice";
import {scheduleExportSlice} from "./features/schedule-export.slice";
import { incidentSlice } from "./features/incident-slice";
import { taskTypeSlice } from "./features/task-type-slice";
import { taskGroupTypeSlice } from "./features/task-group-type.slice";
import { subJobTypeSlice } from "./features/sub-job-type.slice";
import { subJobCategorySlice } from "./features/sub-job-category-slice";
import { jobTypeSlice } from "./features/job-type.slice";
import { jobSlice } from "./features/job.slice";
import { companySlice } from "./features/company-slice";
import { contactSlice } from "./features/contact-slice";
import { addressSlice } from "./features/address-slice";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [taskSlice.name]: taskSlice.reducer,
    [otherSlice.name]: otherSlice.reducer,
    [commonSlice.name]: commonSlice.reducer,
    [reportSlice.name]: reportSlice.reducer,
    [documentSlice.name]: documentSlice.reducer,
    [misaSlice.name]: misaSlice.reducer,
    [dReportSlice.name]: dReportSlice.reducer,
    [weeklySummarySlice.name]: weeklySummarySlice.reducer,
    [experienceSlice.name]: experienceSlice.reducer,
    [customerSlice.name]: customerSlice.reducer,
    [categorySlice.name]: categorySlice.reducer,
    [scheduleExportSlice.name]: scheduleExportSlice.reducer,
    [incidentSlice.name]: incidentSlice.reducer,
    [taskTypeSlice.name]: taskTypeSlice.reducer,
    [taskGroupTypeSlice.name]: taskGroupTypeSlice.reducer,
    [subJobTypeSlice.name]: subJobTypeSlice.reducer,
    [subJobCategorySlice.name]: subJobCategorySlice.reducer,
    [jobTypeSlice.name]: jobTypeSlice.reducer,
    [jobSlice.name]: jobSlice.reducer,
    [companySlice.name]: companySlice.reducer,
    [contactSlice.name]: contactSlice.reducer,
    [addressSlice.name]: addressSlice.reducer,
  },
  devTools: true,
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
