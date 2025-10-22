import { useEffect, useState } from "react";
import { format } from "date-fns";
import { MultiValue, SingleValue } from "react-select";
import { OptionValue } from "../../types/component";
import { ValueLabelType } from "../../types/others";
import { UserResponse, UserRole } from "../../redux/features/user-slice";

export function dateFormatter(date: Date, pattern?: string): string {
  return format(date, pattern ?? "dd MMM yyyy");
}

export function timeFormatter(date: Date, pattern?: string): string {
  return format(date, pattern ?? "hh:mm a");
}

export function isSelectSingleValue(
  value: any
): value is SingleValue<OptionValue> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    "value" in value &&
    "label" in value
  );
}

export function isSelectMultiValue(
  value: any
): value is MultiValue<OptionValue> {
  return (
    Array.isArray(value) && value.every((item) => isSelectSingleValue(item))
  );
}

export function getWeekNumber(date: Date): number {
  const year = date.getUTCFullYear();
  return Math.ceil(
    ((date.getTime() - Date.UTC(year, 0, 1)) / 86400000 +
      new Date(year, 0, 1).getUTCDay() +
      1) /
      7
  );
}

export function hasPermission(
  user: UserResponse | null,
  categories: string[],
  roles: UserRole[]
): boolean {
  if (user === null) {
    return false;
  }
  const validCat =
    categories.length === 0 ? true : categories.includes(user.category.id);
  const validRole = roles.length === 0 ? true : roles.includes(user.role);
  return validCat && validRole;
}

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const months = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];

export function listDatesInRange(start: Date, end: Date): ValueLabelType[] {
  let currentDate = new Date(start);
  const endDate = new Date(end);
  const dates: ValueLabelType[] = [];
  for (const day of weekdays) {
    dates.push({
      value: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        17,
        0,
        0
      ),
      label: currentDate.toLocaleString("en-US", {
        weekday: "long",
      }),
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  // while (currentDate <= endDate) {}
  return dates;
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

export function formatDuration(totalHours: number) {
  const hours = Math.floor(totalHours); // Extract whole hours
  const minutes = Math.round((totalHours - hours) * 60);
  return `${hours} hr ${minutes} min`;
}

function getBreakpoint(width: number) {
  if (width >= 1536) return "2xl";
  if (width >= 1280) return "xl";
  if (width >= 1024) return "lg";
  if (width >= 768) return "md";
  if (width >= 640) return "sm";
  return "xs";
}

export default function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState(() =>
    getBreakpoint(window.innerWidth)
  );

  useEffect(() => {
    function handleResize() {
      setBreakpoint(getBreakpoint(window.innerWidth));
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
}

export function calculateDuration(
  startTime: string,
  endTime: string
): { hour: number; minute: number } {
  const breakStart: string = "12:00";
  const breakEnd: string = "13:00";
  const [breakStartHour, breakStartMinute] = breakStart.split(":").map(Number);
  const [breakEndHour, breakEndMinute] = breakEnd.split(":").map(Number);

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  let hour = endHour - startHour;
  let minute = endMinute - startMinute;

  if (minute < 0) {
    hour -= 1;
    minute += 60;
  }

  // Convert all times to minutes for easier comparison
  const startTimeInMinutes = startHour * 60 + startMinute;
  const endTimeInMinutes = endHour * 60 + endMinute;
  const breakStartInMinutes = breakStartHour * 60 + breakStartMinute;
  const breakEndInMinutes = breakEndHour * 60 + breakEndMinute;

  // Subtract the break time if it overlaps
  if (
    startTimeInMinutes < breakEndInMinutes &&
    endTimeInMinutes > breakStartInMinutes
  ) {
    const overlapStart = Math.max(startTimeInMinutes, breakStartInMinutes);
    const overlapEnd = Math.min(endTimeInMinutes, breakEndInMinutes);
    const breakDuration = Math.max(0, overlapEnd - overlapStart);

    hour -= Math.floor(breakDuration / 60);
    minute -= breakDuration % 60;

    if (minute < 0) {
      hour -= 1;
      minute += 60;
    }
  }

  return { hour, minute };
}

export function updateDateWithTime(date: Date, time: string): Date {
  const [hours, minutes] = time.split(":").map(Number);

  const updatedDate = new Date(date);
  updatedDate.setHours(hours, minutes, 0, 0); // Set hours, minutes, seconds, and milliseconds

  return updatedDate;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  } else if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  } else {
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  }
}

export function getFileExtension(fileName: string): string {
  const lastDotIndex = fileName.lastIndexOf(".");
  if (lastDotIndex === -1 || lastDotIndex === 0) {
    return "";
  }
  return fileName.substring(lastDotIndex + 1);
}

export function isValidHexColor(color: string): boolean {
  const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexColorRegex.test(color);
}

export function setTimeForDate(date: Date, time: string): Date {
  const [hours, minutes] = time.split(":").map(Number);
  const newDate = new Date(date);
  newDate.setHours(hours, minutes, 0, 0);
  return newDate;
}

export function calAbsentTime(
  absentFrom: Date,
  absentTo: Date,
  workStart: Date,
  workEnd: Date,
  breakStart: Date,
  breakEnd: Date
): number {
  if (workEnd > absentFrom && workStart < absentTo) {
    const overlapStart: Date = absentFrom > workStart ? absentFrom : workStart;
    const overlapEnd: Date = absentTo < workEnd ? absentTo : workEnd;
    let overlapDurationInMs: number =
      overlapEnd.getTime() - overlapStart.getTime();

    // Check if the absence overlaps with break time and adjust the duration
    if (overlapEnd > breakStart && overlapStart < breakEnd) {
      const breakOverlapStart: Date =
        overlapStart < breakStart ? breakStart : overlapStart;
      const breakOverlapEnd: Date =
        overlapEnd > breakEnd ? breakEnd : overlapEnd;
      const breakOverlapDurationMs: number =
        breakOverlapEnd.getTime() - breakOverlapStart.getTime();
      overlapDurationInMs -= breakOverlapDurationMs;
    }

    // Convert to hours
    return overlapDurationInMs / (1000 * 60 * 60);
  }
  return 0;
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

export function getPreviousWeekDateString(date: Date): string {
  const previousWeekDate = new Date(date);
  previousWeekDate.setDate(date.getDate() - 7);
  return dateFormatter(previousWeekDate, "yyyy-MM-dd");
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
