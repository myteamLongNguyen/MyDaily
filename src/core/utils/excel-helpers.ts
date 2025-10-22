import XLSX from "xlsx-js-style";
import { ReportResponse } from "../../redux/features/report-slice";
import {
  dateFormatter,
  fractionOfDayToTimeString,
  timeFormatter,
} from "./datetime-utils";
import {
  DReportResponse,
  WeeklyDReportsResponse,
} from "../../redux/features/design-report-slice";
import { AbsentDate } from "../../redux/features/misa-slice";
import {
  ExportReportsResponse,
  ExportGroupedReportsResponse,
  ExportDReportsResponse,
  ExportTaskDReportsResponse,
  ExportTaskReportsResponse,
  ExportGroupedDReportsResponse,
} from "../../redux/features/data-export.slice";
import { WeeklySummaryResponse } from "../../redux/features/weekly-summary-slice";
import { UserResponse } from "../../redux/features/user-slice";

const borderColor = { rgb: "9E9E9E" };

const headerStyle = {
  font: { bold: true, sz: 14 }, // Bold and font size 12
  alignment: { horizontal: "center", vertical: "center" }, // Center text
  border: {
    top: { style: "dashed", color: borderColor },
    bottom: { style: "dashed", color: borderColor },
    left: { style: "thin", color: borderColor },
    right: { style: "thin", color: borderColor },
  },
  fill: {
    fgColor: { rgb: "E0E0E0" },
  },
};

const dataCellStyle = {
  font: { sz: 14 },
  alignment: { horizontal: "left", vertical: "center", wrapText: true },
  border: {
    top: { style: "dashed", color: borderColor },
    bottom: { style: "dashed", color: borderColor },
    left: { style: "thin", color: borderColor },
    right: { style: "thin", color: borderColor },
  },
};

const getColumnWidths = (data: any[][]) => {
  const columnWidths: number[] = [];

  data.forEach((row) => {
    row.forEach((cell, colIndex) => {
      const cellLength = (cell && cell.toString().length) || 0;
      if (!columnWidths[colIndex] || cellLength > columnWidths[colIndex]) {
        columnWidths[colIndex] = cellLength;
      }
    });
  });

  return columnWidths.map((length) => Math.min(length + 4, 100)); // Adding 4 for padding and setting a max width of 100
};

// function handleDailyReportsSheet(
//   dailyReports: ExportTaskReportsResponse,
//   absentDates: AbsentDate[]
// ): XLSX.WorkSheet {
//   const aoaData: any[] = [
//     [
//       "Date",
//       "Task Group",
//       "",
//       "Start Time",
//       "End Time",
//       "Duration",
//       "Quantity",
//       "Detail",
//       "Progress",
//       "Comments",
//       "Notes",
//       "Overtime",
//     ],
//   ];
//   const merges: any[] = [];
//   let rowIndex = 1; // Start after header row

//   merges.push({
//     s: { r: 0, c: 1 },
//     e: { r: 0, c: 2 },
//   });

//   let exportReports = dailyReports;

//   absentDates.forEach((ad) => {
//     if (exportReports[ad.date]) {
//       exportReports = {
//         ...exportReports,
//         [ad.date]: [
//           ...exportReports[ad.date],
//           {
//             content: `${ad.type} (${ad.reason}) - ${ad.total} hr${
//               ad.total > 1 ? "s" : ""
//             }, ${timeFormatter(ad.from)} - ${timeFormatter(ad.to)}`,
//           },
//         ],
//       };
//     } else {
//       exportReports = {
//         ...exportReports,
//         [ad.date]: [
//           {
//             content: `${ad.type} (${ad.reason}) - ${ad.total} hr${
//               ad.total > 1 ? "s" : ""
//             }, ${timeFormatter(ad.from)} - ${timeFormatter(ad.to)}`,
//           },
//         ],
//       };
//     }
//   });

//   const sortedDates = Object.keys(exportReports)
//     .map((dateKey) => new Date(dateKey))
//     .sort((a, b) => a.getTime() - b.getTime())
//     .map((date) => date.toISOString().split("T")[0]);

//   // Flatten the data and add rows while tracking dateKey merging
//   sortedDates.forEach((dateKey) => {
//     const reports = exportReports[dateKey] as (ReportResponse | any)[];
//     let previousTag: any = null;
//     let startRowIndex = -1;

//     reports.forEach((item: ReportResponse | any, index: number) => {
//       if (typeof item.id === "string") {
//         aoaData.push([
//           `${new Date(dateKey).toLocaleDateString("en-US", {
//             weekday: "long",
//           })} ${dateFormatter(new Date(dateKey), "dd-MM-yyyy")}`,
//           `${item.taskGroup.title}`,
//           `${item.taskGroup.taskFunction.organization.name} • ${
//             item.taskGroup.taskFunction.title
//           }${item.taskGroup.branch ? ` / ${item.taskGroup.branch.name}` : ""}`,
//           item.startTime ? timeFormatter(item.startTime) : "--",
//           item.endTime ? timeFormatter(item.endTime) : "--",
//           item.tag !== null && item.tag === previousTag ? "" : item.duration,
//           item.quantity,
//           item.detail,
//           item.progress.capitalizeWords(),
//           item.comments,
//           item.notes,
//           item.overtime ? "Yes" : "No",
//         ]);

//         // Check if item.tag is not null and same as the previous tag
//         if (item.tag !== null && item.tag === previousTag) {
//           // Continue merging the `duration` cells
//           if (startRowIndex === -1) {
//             startRowIndex = rowIndex - 1; // Set the start of the merge
//           }
//         } else {
//           // If the tag has changed or is null, finalize the previous merge
//           if (startRowIndex !== -1 && startRowIndex < rowIndex - 1) {
//             merges.push({
//               s: { r: startRowIndex, c: 5 }, // `duration` is in the 5th column (zero-based)
//               e: { r: rowIndex - 1, c: 5 },
//             });
//           }
//           // Reset tracking for the next possible merge
//           previousTag = item.tag;
//           startRowIndex = -1;
//         }
//       } else {
//         aoaData.push([
//           `${new Date(dateKey).toLocaleDateString("en-US", {
//             weekday: "long",
//           })} ${dateFormatter(new Date(dateKey), "dd-MM-yyyy")}`,
//           item.content,
//           "",
//           "",
//           "",
//           "",
//           "",
//           "",
//           "",
//           "",
//           "",
//           "",
//         ]);
//         // Merge the entire row for absent label
//         merges.push({
//           s: { r: rowIndex, c: 1 },
//           e: { r: rowIndex, c: 11 },
//         });
//       }

//       // If it's the first row for this dateKey, mark for merging
//       if (index === 0) {
//         merges.push({
//           s: { r: rowIndex, c: 0 }, // Start of the merge
//           e: { r: rowIndex + reports.length - 1, c: 0 }, // End of the merge (spanning rows)
//         });
//       }
//       rowIndex++;
//     });

//     // // Final check for any unmerged durations when the loop ends
//     // if (startRowIndex !== -1 && startRowIndex !== rowIndex - 1) {
//     //   merges.push({
//     //     s: { r: startRowIndex, c: 5 }, // Merge `duration` in the 5th column
//     //     e: { r: rowIndex - 1, c: 5 },
//     //   });
//     // }
//   });

//   // Create a worksheet
//   const worksheet = XLSX.utils.aoa_to_sheet(aoaData);

//   // Apply merges to the worksheet
//   worksheet["!merges"] = merges;

//   // Apply the header style to the header cells
//   const dataRange = XLSX.utils.decode_range(worksheet["!ref"] || "");
//   // console.log(headerRange);
//   for (let C = dataRange.s.c; C <= dataRange.e.c; ++C) {
//     const cellRef = XLSX.utils.encode_cell({ r: 0, c: C });
//     if (!worksheet[cellRef]) continue;
//     worksheet[cellRef].s = headerStyle;
//   }

//   // Apply the data cell style to all data cells
//   for (let R = 1; R <= dataRange.e.r; ++R) {
//     for (let C = dataRange.s.c; C <= dataRange.e.c; ++C) {
//       const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
//       if (!worksheet[cellRef]) continue;
//       const lastAoa = aoaData[R][aoaData[R].length - 1];
//       if (lastAoa === "Yes" || lastAoa === "No") {
//         worksheet[cellRef].s = [3, 4, 5, 6, 8, 11].includes(C)
//           ? {
//               ...dataCellStyle,
//               alignment: {
//                 ...dataCellStyle.alignment,
//                 horizontal: "center",
//                 vertical: "center",
//               },
//               fill: {
//                 fgColor: {
//                   rgb:
//                     C === 0 ||
//                     (C === 5 && merges.findIndex((e) => e.e.c === 5) !== -1)
//                       ? "ffffff"
//                       : R % 2 === 0
//                       ? "f3f3f3"
//                       : "ffffff",
//                 },
//               },
//             }
//           : {
//               ...dataCellStyle,
//               fill: {
//                 fgColor: {
//                   rgb:
//                     C === 0 ||
//                     (C === 5 && merges.findIndex((e) => e.e.c === 5) !== -1)
//                       ? "ffffff"
//                       : R % 2 === 0
//                       ? "f3f3f3"
//                       : "ffffff",
//                 },
//               },
//             };
//       } else {
//         worksheet[cellRef].s = {
//           ...dataCellStyle,
//           alignment: {
//             ...dataCellStyle.alignment,
//             horizontal: C === 0 ? "left" : "center",
//             vertical: "center",
//           },
//           fill: {
//             fgColor: { rgb: "fbfba3" },
//           },
//         };
//       }
//     }
//   }

//   // Set column widths based on content
//   const columnWidths = getColumnWidths(aoaData);
//   worksheet["!cols"] = columnWidths.map((width) => ({ wch: width }));

//   return worksheet;
// }

// function handleWeeklyReportsSheet(
//   weeklyReports: ExportGroupedReportsResponse[]
// ): XLSX.WorkSheet {
//   const aoaData: any[] = [
//     [
//       "Task Group",
//       "Total Duration",
//       "Total Quantity",
//       "Avg. Time",
//       "Date",
//       "Start Time",
//       "End Time",
//       "Duration",
//       "Quantity",
//       "Detail",
//       "Progress",
//       "Comments",
//       "Notes",
//       "Overtime",
//     ],
//   ];
//   const merges: any[] = [];
//   let rowIndex = 1; // Start after header row

//   let exportReports = weeklyReports;

//   // const sortedDates = Object.keys(exportReports)
//   //   .map((dateKey) => new Date(dateKey))
//   //   .sort((a, b) => a.getTime() - b.getTime())
//   //   .map((date) => date.toISOString().split("T")[0]);

//   // Flatten the data and add rows while tracking dateKey merging
//   exportReports.forEach((task: ExportGroupedReportsResponse) => {
//     task.reports.forEach((item: ReportResponse, index: number) => {
//       aoaData.push([
//         task.taskGroup.title,
//         fractionOfDayToTimeString(task.totalDuration),
//         task.totalQuantity,
//         fractionOfDayToTimeString(
//           task.totalDuration /
//             (task.totalQuantity !== 0 ? task.totalQuantity : 1)
//         ),
//         `${new Date(item.date).toLocaleDateString("en-US", {
//           weekday: "long",
//         })} ${dateFormatter(new Date(item.date), "dd-MM-yyyy")}`,
//         item.startTime ? timeFormatter(item.startTime) : "--",
//         item.endTime ? timeFormatter(item.endTime) : "--",
//         item.duration,
//         item.quantity,
//         item.detail,
//         item.progress.capitalizeWords(),
//         item.comments,
//         item.notes,
//         item.overtime ? "Yes" : "No",
//       ]);

//       // If it's the first row for this dateKey, mark for merging
//       if (index === 0) {
//         merges.push({
//           s: { r: rowIndex, c: 0 }, // Start of the merge
//           e: { r: rowIndex + task.reports.length - 1, c: 0 }, // End of the merge (spanning rows)
//         });
//         merges.push({
//           s: { r: rowIndex, c: 1 }, // Start of the merge
//           e: { r: rowIndex + task.reports.length - 1, c: 1 }, // End of the merge (spanning rows)
//         });
//         merges.push({
//           s: { r: rowIndex, c: 2 }, // Start of the merge
//           e: { r: rowIndex + task.reports.length - 1, c: 2 }, // End of the merge (spanning rows)
//         });
//         merges.push({
//           s: { r: rowIndex, c: 3 }, // Start of the merge
//           e: { r: rowIndex + task.reports.length - 1, c: 3 }, // End of the merge (spanning rows)
//         });
//       }

//       rowIndex++; // Move to the next row
//     });
//   });

//   // Create a worksheet
//   const worksheet = XLSX.utils.aoa_to_sheet(aoaData);

//   // Apply merges to the worksheet
//   worksheet["!merges"] = merges;

//   // Apply the header style to the header cells
//   const headerRange = XLSX.utils.decode_range(worksheet["!ref"] || "");

//   // Apply styles to header cells
//   for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
//     const cellRef = XLSX.utils.encode_cell({ r: 0, c: C });
//     if (!worksheet[cellRef]) continue;
//     worksheet[cellRef].s = headerStyle;
//   }

//   // Apply the data cell style to all data cells
//   for (let R = 1; R <= headerRange.e.r; ++R) {
//     for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
//       const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
//       if (!worksheet[cellRef]) continue;
//       worksheet[cellRef].s = [1, 2, 3, 5, 6, 7, 8, 10, 13].includes(C)
//         ? {
//             ...dataCellStyle,
//             alignment: {
//               ...dataCellStyle.alignment,
//               horizontal: "center",
//               vertical: "center",
//             },
//             fill: {
//               fgColor: {
//                 rgb: [0, 1, 2, 3].includes(C)
//                   ? "ffffff"
//                   : R % 2 === 0
//                   ? "f3f3f3"
//                   : "ffffff",
//               },
//             },
//           }
//         : {
//             ...dataCellStyle,
//             fill: {
//               fgColor: {
//                 rgb: [0, 1, 2, 3].includes(C)
//                   ? "ffffff"
//                   : R % 2 === 0
//                   ? "f3f3f3"
//                   : "ffffff",
//               },
//             },
//           };
//     }
//   }

//   // Set column widths based on content
//   const columnWidths = getColumnWidths(aoaData);
//   worksheet["!cols"] = columnWidths.map((width) => ({ wch: width }));

//   return worksheet;
// }

export function exportToExcel(
  reports: ExportReportsResponse,
  absentDates: AbsentDate[],
  name: string
) {
  // Create a workbook and add the worksheet
  const workbook = XLSX.utils.book_new();
  // if (reports.task) {
  //   const dailyReportsSheet = handleDailyReportsSheet(
  //     reports.task,
  //     absentDates
  //   );
  //   XLSX.utils.book_append_sheet(workbook, dailyReportsSheet, "Tasks");
  // }

  // if (reports.grouped) {
  //   const weeklyReportsSheet = handleWeeklyReportsSheet(reports.grouped);
  //   XLSX.utils.book_append_sheet(workbook, weeklyReportsSheet, "Grouped Tasks");
  // }

  if (reports.weeklySummary) {
    const summariesSheet = handleWeeklySummariesSheet(reports.weeklySummary);
    XLSX.utils.book_append_sheet(workbook, summariesSheet, "1 On 1");
  }

  // Export the workbook to an Excel file
  XLSX.writeFile(workbook, `${name}.xlsx`);
}

// function handleDailyDReportsSheet(
//   dailyReports: ExportTaskDReportsResponse,
//   absentDates: AbsentDate[]
// ): XLSX.WorkSheet {
//   const aoaData: any[] = [
//     [
//       "Date",
//       "Task Group",
//       "",
//       "Job Number",
//       "Job Type",
//       "Relationship Status",
//       "Square metres",
//       "Units",
//       "Levels",
//       "Request Type",
//       "Start Time",
//       "End Time",
//       "Duration",
//       "Detail",
//       "Progress",
//       "Comments",
//       "Notes",
//       "Overtime",
//     ],
//   ];
//   const merges: any[] = [];
//   let rowIndex = 1; // Start after header row

//   merges.push({
//     s: { r: 0, c: 1 },
//     e: { r: 0, c: 2 },
//   });

//   let exportReports = dailyReports;

//   absentDates.forEach((ad) => {
//     if (exportReports[ad.date]) {
//       exportReports = {
//         ...exportReports,
//         [ad.date]: [
//           ...exportReports[ad.date],
//           {
//             content: `${ad.type} (${ad.reason}) - ${ad.total} hr${
//               ad.total > 1 ? "s" : ""
//             }, ${timeFormatter(ad.from)} - ${timeFormatter(ad.to)}`,
//           },
//         ],
//       };
//     } else {
//       exportReports = {
//         ...exportReports,
//         [ad.date]: [
//           {
//             content: `${ad.type} (${ad.reason}) - ${ad.total} hr${
//               ad.total > 1 ? "s" : ""
//             }, ${timeFormatter(ad.from)} - ${timeFormatter(ad.to)}`,
//           },
//         ],
//       };
//     }
//   });

//   const sortedDates = Object.keys(exportReports)
//     .map((dateKey) => new Date(dateKey))
//     .sort((a, b) => a.getTime() - b.getTime())
//     .map((date) => date.toISOString().split("T")[0]);

//   // Flatten the data and add rows while tracking dateKey merging
//   sortedDates.forEach((dateKey) => {
//     const reports = exportReports[dateKey] as (DReportResponse | any)[];

//     reports.forEach((item: DReportResponse | any, index: number) => {
//       if (typeof item.id === "string") {
//         aoaData.push([
//           `${new Date(dateKey).toLocaleDateString("en-US", {
//             weekday: "long",
//           })} ${dateFormatter(new Date(dateKey), "dd-MM-yyyy")}`,
//           `${item.taskGroup?.title ?? "--"}`,
//           item.taskGroup
//             ? `${item.taskGroup.taskFunction.organization.name} • ${
//                 item.taskGroup.taskFunction.title
//               }${
//                 item.taskGroup.branch ? ` / ${item.taskGroup.branch.name}` : ""
//               }`
//             : "--",
//           item.jobNumber ? item.jobNumber : "--",
//           item.jobType ? item.jobType.title : "--",
//           item.relationshipStatus ? item.relationshipStatus.title : "--",
//           item.aquareMeters,
//           item.units,
//           item.levels,
//           item.jobRequestType.map((e: any) => e.title).join(", "),
//           item.startTime ? timeFormatter(item.startTime) : "--",
//           item.endTime ? timeFormatter(item.endTime) : "--",
//           item.duration,
//           item.detail,
//           item.progress.capitalizeWords(),
//           item.comments,
//           item.notes,
//           item.overtime ? "Yes" : "No",
//         ]);
//       } else {
//         aoaData.push([
//           `${new Date(dateKey).toLocaleDateString("en-US", {
//             weekday: "long",
//           })} ${dateFormatter(new Date(dateKey), "dd-MM-yyyy")}`,
//           item.content,
//           "",
//           "",
//           "",
//           "",
//           "",
//           "",
//           "",
//           "",
//           "",
//           "",
//           "",
//           "",
//           "",
//           "",
//           "",
//           "",
//         ]);
//         // Merge the entire row for absent label
//         merges.push({
//           s: { r: rowIndex, c: 1 },
//           e: { r: rowIndex, c: 17 },
//         });
//       }

//       // If it's the first row for this dateKey, mark for merging
//       if (index === 0) {
//         merges.push({
//           s: { r: rowIndex, c: 0 }, // Start of the merge
//           e: { r: rowIndex + reports.length - 1, c: 0 }, // End of the merge (spanning rows)
//         });
//       }
//       rowIndex++;
//     });
//   });

//   // Create a worksheet
//   const worksheet = XLSX.utils.aoa_to_sheet(aoaData);

//   // Apply merges to the worksheet
//   worksheet["!merges"] = merges;

//   // Apply the header style to the header cells
//   const dataRange = XLSX.utils.decode_range(worksheet["!ref"] || "");
//   // console.log(headerRange);
//   for (let C = dataRange.s.c; C <= dataRange.e.c; ++C) {
//     const cellRef = XLSX.utils.encode_cell({ r: 0, c: C });
//     if (!worksheet[cellRef]) continue;
//     worksheet[cellRef].s = headerStyle;
//   }

//   // Apply the data cell style to all data cells
//   for (let R = 1; R <= dataRange.e.r; ++R) {
//     for (let C = dataRange.s.c; C <= dataRange.e.c; ++C) {
//       const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
//       if (!worksheet[cellRef]) continue;
//       const lastAoa = aoaData[R][aoaData[R].length - 1];
//       if (lastAoa === "Yes" || lastAoa === "No") {
//         worksheet[cellRef].s = [3, 4, 5, 6, 7, 8, 10, 11, 12, 14, 17].includes(
//           C
//         )
//           ? {
//               ...dataCellStyle,
//               alignment: {
//                 ...dataCellStyle.alignment,
//                 horizontal: "center",
//                 vertical: "center",
//               },
//               fill: {
//                 fgColor: {
//                   rgb: C === 0 ? "ffffff" : R % 2 === 0 ? "f3f3f3" : "ffffff",
//                 },
//               },
//             }
//           : {
//               ...dataCellStyle,
//               fill: {
//                 fgColor: {
//                   rgb: C === 0 ? "ffffff" : R % 2 === 0 ? "f3f3f3" : "ffffff",
//                 },
//               },
//             };
//       } else {
//         worksheet[cellRef].s = {
//           ...dataCellStyle,
//           alignment: {
//             ...dataCellStyle.alignment,
//             horizontal: C === 0 ? "left" : "center",
//             vertical: "center",
//           },
//           fill: {
//             fgColor: { rgb: "fbfba3" },
//           },
//         };
//       }
//     }
//   }

//   // Set column widths based on content
//   const columnWidths = getColumnWidths(aoaData);
//   worksheet["!cols"] = columnWidths.map((width) => ({ wch: width }));

//   return worksheet;
// }

// function handleWeeklyDReportsSheet(
//   weeklyReports: ExportGroupedDReportsResponse[]
// ): XLSX.WorkSheet {
//   const aoaData: any[] = [
//     [
//       "Task",
//       "Total Square metres",
//       "Total Units",
//       "Total Levels",
//       "Date",
//       "Job Type",
//       "Relationship Status",
//       "Square metres",
//       "Units",
//       "Levels",
//       "Request Type",
//       "Start Time",
//       "End Time",
//       "Duration",
//       "Detail",
//       "Progress",
//       "Comments",
//       "Notes",
//       "Overtime",
//     ],
//   ];
//   const merges: any[] = [];
//   let rowIndex = 1; // Start after header row

//   let exportReports = weeklyReports;

//   // Flatten the data and add rows while tracking dateKey merging
//   exportReports.forEach((job: WeeklyDReportsResponse) => {
//     job.reports.forEach((item: DReportResponse, index: number) => {
//       aoaData.push([
//         job.key,
//         job.totalSquareMetres,
//         job.totalUnits,
//         job.totalLevels,
//         `${new Date(item.date).toLocaleDateString("en-US", {
//           weekday: "long",
//         })} ${dateFormatter(new Date(item.date), "dd-MM-yyyy")}`,
//         item.jobType ? item.jobType.title : "--",
//         item.relationshipStatus ? item.relationshipStatus.title : "--",
//         item.aquareMeters,
//         item.units,
//         item.levels,
//         item.jobRequestType.map((e: any) => e.title).join(", "),
//         item.startTime ? timeFormatter(item.startTime) : "--",
//         item.endTime ? timeFormatter(item.endTime) : "--",
//         item.duration,
//         item.detail,
//         item.progress.capitalizeWords(),
//         item.comments,
//         item.notes,
//         item.overtime ? "Yes" : "No",
//       ]);

//       if (index === 0) {
//         merges.push({
//           s: { r: rowIndex, c: 0 }, // Start of the merge
//           e: { r: rowIndex + job.reports.length - 1, c: 0 }, // End of the merge (spanning rows)
//         });
//         merges.push({
//           s: { r: rowIndex, c: 1 }, // Start of the merge
//           e: { r: rowIndex + job.reports.length - 1, c: 1 }, // End of the merge (spanning rows)
//         });
//         merges.push({
//           s: { r: rowIndex, c: 2 }, // Start of the merge
//           e: { r: rowIndex + job.reports.length - 1, c: 2 }, // End of the merge (spanning rows)
//         });
//         merges.push({
//           s: { r: rowIndex, c: 3 }, // Start of the merge
//           e: { r: rowIndex + job.reports.length - 1, c: 3 }, // End of the merge (spanning rows)
//         });
//       }

//       rowIndex++; // Move to the next row
//     });
//   });

//   // Create a worksheet
//   const worksheet = XLSX.utils.aoa_to_sheet(aoaData);

//   // Apply merges to the worksheet
//   worksheet["!merges"] = merges;

//   // Apply the header style to the header cells
//   const headerRange = XLSX.utils.decode_range(worksheet["!ref"] || "");

//   // Apply styles to header cells
//   for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
//     const cellRef = XLSX.utils.encode_cell({ r: 0, c: C });
//     if (!worksheet[cellRef]) continue;
//     worksheet[cellRef].s = headerStyle;
//   }

//   // Apply the data cell style to all data cells
//   for (let R = 1; R <= headerRange.e.r; ++R) {
//     for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
//       const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
//       if (!worksheet[cellRef]) continue;
//       worksheet[cellRef].s = [
//         1, 2, 3, 5, 6, 7, 8, 9, 11, 12, 13, 15, 18,
//       ].includes(C)
//         ? {
//             ...dataCellStyle,
//             alignment: {
//               ...dataCellStyle.alignment,
//               horizontal: "center",
//               vertical: "center",
//             },
//             fill: {
//               fgColor: {
//                 rgb: [0, 1, 2, 3].includes(C)
//                   ? "ffffff"
//                   : R % 2 === 0
//                   ? "f3f3f3"
//                   : "ffffff",
//               },
//             },
//           }
//         : {
//             ...dataCellStyle,
//             fill: {
//               fgColor: {
//                 rgb: [0, 1, 2, 3].includes(C)
//                   ? "ffffff"
//                   : R % 2 === 0
//                   ? "f3f3f3"
//                   : "ffffff",
//               },
//             },
//           };
//     }
//   }

//   // Set column widths based on content
//   const columnWidths = getColumnWidths(aoaData);
//   worksheet["!cols"] = columnWidths.map((width) => ({ wch: width }));

//   return worksheet;
// }

// export function exportToExcelForDesign(
//   reports: ExportDReportsResponse,
//   absentDates: AbsentDate[],
//   name: string
// ) {
//   // Create a workbook and add the worksheet
//   const workbook = XLSX.utils.book_new();
//   if (reports.task) {
//     const dailyReportsSheet = handleDailyDReportsSheet(
//       reports.task,
//       absentDates
//     );
//     XLSX.utils.book_append_sheet(workbook, dailyReportsSheet, "Tasks");
//   }

//   if (reports.grouped) {
//     const weeklyReportsSheet = handleWeeklyDReportsSheet(reports.grouped);
//     XLSX.utils.book_append_sheet(workbook, weeklyReportsSheet, "Grouped Tasks");
//   }

//   if (reports.weeklySummary) {
//     const summariesSheet = handleWeeklySummariesSheet(reports.weeklySummary);
//     XLSX.utils.book_append_sheet(workbook, summariesSheet, "1 On 1");
//   }

//   // Export the workbook to an Excel file
//   XLSX.writeFile(workbook, `${name}.xlsx`);
// }

function handleWeeklySummariesSheet(
  summaries: WeeklySummaryResponse[]
): XLSX.WorkSheet {
  const aoaData: any[] = [
    [
      "User",
      "Week",
      "Meet expectations",
      "Reasons",
      "",
      "Challenges",
      "",
      "",
      "Errors/Quality Identified",
      "",
      "",
      "",
      "",
      "Output Goals for Next Week",
      "Support and Resources Needed",
      "",
      "Actions",
      "",
    ],
  ];
  const merges: any[] = [];
  merges.push({
    s: { r: 0, c: 3 },
    e: { r: 0, c: 4 },
  });
  merges.push({
    s: { r: 0, c: 5 },
    e: { r: 0, c: 7 },
  });
  merges.push({
    s: { r: 0, c: 8 },
    e: { r: 0, c: 12 },
  });
  merges.push({
    s: { r: 0, c: 14 },
    e: { r: 0, c: 15 },
  });
  merges.push({
    s: { r: 0, c: 16 },
    e: { r: 0, c: 17 },
  });

  aoaData.push([
    "",
    "",
    "",
    "Type",
    "Detail",
    "Type",
    "Explain",
    "Action/Proposed",
    "Type",
    "Quantity",
    "Job Number",
    "Reason",
    "Action/Proposed",
    "",
    "Type",
    "Explain",
    "Type",
    "Detail",
  ]);

  let rowIndex = 2; // Start after header row

  // Group summaries by user
  const groupedSummaries = summaries.reduce((acc, summary) => {
    const userId = summary.user.id;
    if (!acc[userId]) {
      acc[userId] = {
        user: summary.user,
        summaries: [],
      };
    }
    acc[userId].summaries.push(summary);
    return acc;
  }, {} as Record<string, { user: UserResponse; summaries: WeeklySummaryResponse[] }>);

  for (const userGroup of Object.values(groupedSummaries)) {
    const user = userGroup.user;

    // Group user
    const userStartRow = rowIndex;

    userGroup.summaries.forEach((summary: WeeklySummaryResponse) => {
      const longestField = Math.max(
        summary.reasons.length,
        summary.challenges.length,
        summary.issueIdentifies.length,
        summary.goals.length,
        summary.supportResources.length,
        summary.actions.length
      );

      for (let i = 0; i < longestField; i++) {
        const values = [
          user.name,
          `${dateFormatter(summary.startDate, "dd MMM")} - ${dateFormatter(
            summary.endDate,
            "dd MMM"
          )}`,
          summary.metGoals ? "Yes" : "No",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ];

        // Populate fields based on available data
        if (i < summary.reasons.length) {
          values[3] = summary.reasons[i].type.title;
          values[4] = summary.reasons[i].detail;
        }
        if (i < summary.challenges.length) {
          values[5] = summary.challenges[i].type.title;
          values[6] = summary.challenges[i].explain;
          values[7] = summary.challenges[i].action;
        }
        if (i < summary.issueIdentifies.length) {
          values[8] = summary.issueIdentifies[i].type.title;
          values[9] = summary.issueIdentifies[i].quantity?.toString() ?? "--";
          values[10] = summary.issueIdentifies[i].jobNumber ?? "--";
          values[11] = summary.issueIdentifies[i].reason;
          values[12] = summary.issueIdentifies[i].action;
        }
        if (i < summary.goals.length) {
          values[13] = summary.goals[i].goal;
        }
        if (i < summary.supportResources.length) {
          values[14] = summary.supportResources[i].type.title;
          values[15] = summary.supportResources[i].explain;
        }
        if (i < summary.actions.length) {
          values[16] = summary.actions[i].type;
          values[17] = summary.actions[i].detail;
        }

        aoaData.push(values);
      }
      rowIndex += longestField;
    });

    // Merge the user name
    merges.push({
      s: { r: userStartRow, c: 0 }, // User column start
      e: { r: rowIndex - 1, c: 0 }, // User column end
    });
  }

  // Create a worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(aoaData);

  // Apply merges to the worksheet
  worksheet["!merges"] = merges;

  // Apply the header style to the header cells
  const dataRange = XLSX.utils.decode_range(worksheet["!ref"] || "");
  for (let C = dataRange.s.c; C <= dataRange.e.c; ++C) {
    const cellRef = XLSX.utils.encode_cell({ r: 0, c: C });
    if (!worksheet[cellRef]) continue;
    worksheet[cellRef].s = headerStyle;

    const subCellRef = XLSX.utils.encode_cell({ r: 1, c: C });
    if (!worksheet[subCellRef]) continue;
    worksheet[subCellRef].s = headerStyle;
  }

  // Apply the data cell style to all data cells
  for (let R = 2; R <= dataRange.e.r; ++R) {
    for (let C = dataRange.s.c; C <= dataRange.e.c; ++C) {
      const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
      if (!worksheet[cellRef]) continue;
      worksheet[cellRef].s = {
        ...dataCellStyle,
        alignment: {
          ...dataCellStyle.alignment,
          horizontal: C === 0 || C === 1 ? "center" : "left",
          vertical: "center",
        },
        fill: {
          fgColor: {
            rgb:
              C === 0 || C === 1 ? "ffffff" : R % 2 === 0 ? "f3f3f3" : "ffffff",
          },
        },
      };
    }
  }

  // Set column widths based on content
  const columnWidths = getColumnWidths(aoaData);
  worksheet["!cols"] = columnWidths.map((width) => ({ wch: width }));

  return worksheet;
}
