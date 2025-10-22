import { useState, useEffect, useRef } from "react";
import {
  format,
  subMonths,
  addMonths,
  subYears,
  addYears,
  isEqual,
  getDaysInMonth,
  getDay,
  isSameDay,
} from "date-fns";
import { ArrowLeftOutlined } from "./icons/arrow-left-outlined";
import { ArrowRightOutlined } from "./icons/arrow-right-outlined";
import { DateOutlined } from "./icons/date-outlined";

type DatepickerType = "date" | "month";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface Props {
  defaultValue: Date;
  readOnly: boolean;
  onChanged: (value: Date) => void;
}

export default function DatePicker(props: Props) {
  const { defaultValue, readOnly, onChanged } = props;

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLDivElement>(null);

  const [dayCount, setDayCount] = useState<Array<number>>([]);
  const [blankDays, setBlankDays] = useState<Array<number>>([]);
  const [showDatepicker, setShowDatepicker] = useState(false);
  const [datepickerHeaderDate, setDatepickerHeaderDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [type, setType] = useState<DatepickerType>("date");

  const decrement = () => {
    switch (type) {
      case "date":
        setDatepickerHeaderDate((prev) => subMonths(prev, 1));
        break;
      case "month":
        setDatepickerHeaderDate((prev) => subYears(prev, 1));
        break;
    }
  };

  const increment = () => {
    switch (type) {
      case "date":
        setDatepickerHeaderDate((prev) => addMonths(prev, 1));
        break;
      case "month":
        setDatepickerHeaderDate((prev) => addYears(prev, 1));
        break;
    }
  };

  const isToday = (date: number) =>
    isSameDay(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth(), date),
      selectedDate
    );

  const setDateValue = (date: number) => () => {
    const newDate = new Date(
      datepickerHeaderDate.getFullYear(),
      datepickerHeaderDate.getMonth(),
      date
    );
    setSelectedDate(newDate);
    onChanged(newDate);
    setShowDatepicker(false);
  };

  const getDayCount = (date: Date) => {
    const daysInMonth = getDaysInMonth(date);
    const dayOfWeek =
      (getDay(new Date(date.getFullYear(), date.getMonth(), 1)) + 6) % 7;
    const blankdaysArray = Array.from({ length: dayOfWeek }, (_, i) => i + 1);

    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    setBlankDays(blankdaysArray);
    setDayCount(daysArray);
  };

  const isSelectedMonth = (month: number) =>
    isEqual(
      new Date(selectedDate.getFullYear(), month, selectedDate.getDate()),
      selectedDate
    );

  const setMonthValue = (month: number) => () => {
    setDatepickerHeaderDate(
      new Date(
        datepickerHeaderDate.getFullYear(),
        month,
        datepickerHeaderDate.getDate()
      )
    );
    setType("date");
  };

  const toggleDatepicker = () => {
    if (!readOnly) {
      setShowDatepicker((prev) => !prev);
    }
  };

  const showMonthPicker = () => setType("month");

  const showYearPicker = () => setType("date");

  useEffect(() => {
    getDayCount(datepickerHeaderDate);
  }, [datepickerHeaderDate]);

  useEffect(() => {
    setSelectedDate(defaultValue);
    setDatepickerHeaderDate(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        dropdownButtonRef.current &&
        !dropdownButtonRef.current.contains(event.target as Node)
      ) {
        setShowDatepicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownButtonRef}
      className={`relative bg-background-paper border border-divider sm:text-sm rounded-lg block w-full focus:outline-none ${
        readOnly ? "text-text-title" : "text-text-primary"
      }`}
    >
      <input
        type="text"
        readOnly
        className="w-full cursor-pointer focus:outline-none p-2.5 rounded-lg"
        value={format(selectedDate, "dd-MM-yyyy")}
        onClick={toggleDatepicker}
      />
      <div
        className="cursor-pointer absolute top-0 right-0 px-3 py-2"
        onClick={toggleDatepicker}
      >
        <DateOutlined className="h-6 w-6 text-text-title" />
      </div>
      {showDatepicker && (
        <div
          ref={dropdownRef}
          className="w-fit absolute top-0 left-0 bg-background-default mt-12 rounded-lg shadow p-4 z-10"
        >
          <div className="flex justify-between items-center mb-2">
            <div>
              <div
                className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
                onClick={decrement}
              >
                <ArrowLeftOutlined className="h-5 w-5 text-text-title" />
              </div>
            </div>
            <div className="flex">
              {type === "date" && (
                <div
                  onClick={showMonthPicker}
                  className="flex-grow p-2 cursor-pointer hover:bg-gray-200 rounded-md"
                >
                  <p className="text-center">
                    {format(datepickerHeaderDate, "MMMM")}
                  </p>
                </div>
              )}
              <div className="flex-grow p-2">
                <p className="text-center">
                  {format(datepickerHeaderDate, "yyyy")}
                </p>
              </div>
            </div>
            <div
              className="cursor-pointer hover:bg-gray-200 p-2 rounded-md"
              onClick={increment}
            >
              <ArrowRightOutlined className="h-5 w-5 text-text-title" />
            </div>
          </div>
          {type === "date" && (
            <>
              <div className="flex flex-wrap mb-4 -mx-1">
                {DAYS.map((day, i) => (
                  <div key={i} style={{ width: "14.26%" }} className="px-1">
                    <div className="text-text-title font-medium text-center text-xs">
                      {day}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap -mx-1">
                {blankDays.map((_, i) => (
                  <div key={i} style={{ width: "14.26%" }} />
                ))}
                {dayCount.map((d, i) => (
                  <div key={i} style={{ width: "14.26%" }}>
                    <div
                      onClick={setDateValue(d)}
                      className={`p-2 m-0.5 cursor-pointer text-center text-sm rounded-md ${
                        isToday(d) ? "bg-gray-200" : "hover:bg-gray-200"
                      }`}
                    >
                      {d}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {type === "month" && (
            <div className="flex flex-wrap -mx-1">
              {Array(12)
                .fill(null)
                .map((_, i) => (
                  <div
                    key={i}
                    onClick={setMonthValue(i)}
                    style={{ width: "25%" }}
                  >
                    <div
                      className={`cursor-pointer p-4 m-1 text-center text-sm rounded-md hover:bg-gray-200 ${
                        isSelectedMonth(i) ? "bg-gray-200" : "hover:bg-gray-200"
                      }`}
                    >
                      {format(
                        new Date(
                          datepickerHeaderDate.getFullYear(),
                          i,
                          datepickerHeaderDate.getDate()
                        ),
                        "MMM"
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
