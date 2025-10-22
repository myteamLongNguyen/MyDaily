import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  subMonths,
  subWeeks,
} from "date-fns";
import { ExportPeriod } from "../../redux/features/data-export.slice";

export function dateFormatter(date: Date, pattern?: string): string {
  return format(date, pattern ?? "dd MMM yyyy");
}

export function timeFormatter(date: Date, pattern?: string): string {
  return format(date, pattern ?? "hh:mm a");
}

export function fractionOfDayToTimeString(decimalHours: number): string {
  // Calculate hours and minutes from the decimal hours
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);

  // Format the hours and minutes to ensure two digits
  const hoursString = hours.toString().padStart(2, "0");
  const minutesString = minutes.toString().padStart(2, "0");

  // Return the formatted time string
  return `${hoursString}:${minutesString}`;
}

export function convertHourMinToDecimalHours(
  hour: number,
  min: number
): number {
  return parseFloat((hour + min / 60).toFixed(2));
}

export function convertDecimalToHourMin(decimalHours: number): {
  hour: number;
  minute: number;
} {
  // Extract hours from the decimal number
  const hours = Math.floor(decimalHours);

  // Calculate minutes from the decimal part
  const minutes = Math.round((decimalHours - hours) * 60);

  return { hour: hours, minute: minutes };
}

export function updateDateWithTime(date: Date, time: string): Date {
  const [hours, minutes] = time.split(":").map(Number);

  const updatedDate = new Date(date);
  updatedDate.setHours(hours, minutes, 0, 0); // Set hours, minutes, seconds, and milliseconds

  return updatedDate;
}

export function setTimeForDate(date: Date, time: string): Date {
  const [hours, minutes] = time.split(":").map(Number);
  const newDate = new Date(date);
  newDate.setHours(hours, minutes, 0, 0);
  return newDate;
}

export function combineDateTime(originalDate: Date, targetDate: Date): Date {
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth();
  const day = targetDate.getDate();

  const hours = originalDate.getHours();
  const minutes = originalDate.getMinutes();
  const seconds = originalDate.getSeconds();

  return new Date(year, month, day, hours, minutes, seconds);
}

const timeFormat = /^([01]\d|2[0-3]):[0-5]\d$/;

export function isValidTime(time: string) {
  return timeFormat.test(time);
}

export function timeAgoWithDate(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // If the difference is over 1 day, return the exact date and time
  const oneDayInSeconds = 86400; // 60 * 60 * 24
  if (seconds > oneDayInSeconds) {
    return dateFormatter(date, "dd MMM yyyy hh:mm a");
  }

  let interval = Math.floor(seconds / 3600); // Seconds in an hour
  if (interval >= 1) {
    return interval === 1 ? "1 hour ago" : `${interval} hours ago`;
  }

  interval = Math.floor(seconds / 60); // Seconds in a minute
  if (interval >= 1) {
    return interval === 1 ? "1 minute ago" : `${interval} minutes ago`;
  }

  return "Just now";
}

export function adjustDateRange(period: ExportPeriod): {
  startDate: Date | null;
  endDate: Date | null;
} {
  const currentDate = new Date();
  let startDate: Date | null = null;
  let endDate: Date | null = null;

  switch (period) {
    // case ExportPeriod.Weekly:
    //   startDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Week starts on Monday
    //   endDate = endOfWeek(currentDate, { weekStartsOn: 1 });
    //   break;
    // case ExportPeriod.Monthly:
    //   startDate = startOfMonth(currentDate);
    //   endDate = endOfMonth(currentDate);
    //   break;
    case ExportPeriod.PastWeek:
      startDate = startOfWeek(subWeeks(currentDate, 1), { weekStartsOn: 1 });
      endDate = endOfWeek(subWeeks(currentDate, 1), { weekStartsOn: 1 });
      break;
    case ExportPeriod.PastMonth:
      startDate = startOfMonth(subMonths(currentDate, 1));
      endDate = endOfMonth(subMonths(currentDate, 1));
      break;
    case ExportPeriod.Past3Months:
      startDate = startOfMonth(subMonths(currentDate, 3));
      endDate = endOfMonth(subMonths(currentDate, 1));
      break;
    case ExportPeriod.Past6Months:
      startDate = startOfMonth(subMonths(currentDate, 6));
      endDate = endOfMonth(subMonths(currentDate, 1));
      break;
    // default:
    //   throw new Error("Invalid period specified");
  }

  return { startDate, endDate };
}
