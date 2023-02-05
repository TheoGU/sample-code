import React, { useState, useEffect } from "react";
import cn from "classnames";
import {
  firstDayOfMonth,
  isSameDate,
  getMonth,
  getCurrentWeek,
  daysInMonth,
  add,
  getFullYear,
  getDate,
} from "@/helpers/date";
import { CalendarNavigation } from "./navigation";

export interface CalendarProps {
  /**
   * Custom class name
   */
  className?: string;
  /**
   * Allow to show the week
   */
  showWeek?: boolean;
  /**
   * Initial date value
   */
  value: Date;
  /**
   * Callback when date change
   */
  onChange?: (date: Date) => void;
}

export const Calendar = ({
  className,
  onChange,
  showWeek,
  value,
}: CalendarProps) => {
  const [date, setDate] = useState<Date>(value);

  useEffect(() => {
    setDate(value);
  }, [value]);

  // List of name days in the week
  const weekDayName = getCurrentWeek().map(({ day }) => {
    return (
      <th key={day} className={cn("calendar-week-day-name")}>
        {day}
      </th>
    );
  });

  // compute blank days
  const blanks = [];
  let firstDay: number = parseInt(firstDayOfMonth(date).toString(), 10);

  if (firstDay === 0) {
    firstDay = 7;
  }

  for (let i = 1; i < firstDay; i += 1) {
    blanks.push(
      <td className={cn("calendar-day-cell", "calendar-day-cell-invisible")}>
        {daysInMonth(date) - i}
      </td>,
    );
  }
  blanks.reverse();

  // compute days in month
  const daysInMonthValues = [];
  for (let d = 1; d <= daysInMonth(date); d += 1) {
    const newDate = (dateValue: Date) =>
      new Date(
        getDate({
          year: getFullYear(dateValue),
          month: getMonth(dateValue),
          day: d,
        }),
      );
    const isValueDay = isSameDate(date, newDate(value));
    const isToday = isSameDate(new Date(), newDate(date));

    daysInMonthValues.push(
      <td
        role="presentation"
        key={isValueDay ? 999 : d}
        onKeyDown={() => {
          onChange && onChange(newDate(date));
        }}
        className={cn("calendar-day-cell")}
        onClick={() => {
          onChange && onChange(newDate(date));
        }}
      >
        {isValueDay || isToday ? (
          <span
            className={cn({
              isTodayContainer: isToday && !isValueDay,
              isValueDayContainer: isValueDay,
            })}
          />
        ) : null}
        <span
          className={cn({
            isValueDay,
            isToday,
          })}
        >
          {d}
        </span>
      </td>,
    );
  }

  const totalSlots = [...blanks, ...daysInMonthValues];
  const rows: any = [];
  let cells: any = [];

  totalSlots.forEach((row, i) => {
    if (i % 7 !== 0) {
      cells.push(row);
    } else {
      const insertRow = cells.slice();
      rows.push(insertRow);
      cells = [];
      cells.push(row);
    }
    if (i === totalSlots.length - 1) {
      const insertRow = cells.slice();
      rows.push(insertRow);
    }
  });

  rows.forEach((r) => {
    if (r.length < 7 && r.length > 0) {
      let next = 0;
      for (let i = 1; i < 7; i += 1) {
        const rowValue = r[i];
        if (!rowValue) {
          next = +1;
          r.push(
            <td
              className={cn("calendar-day-cell", "calendar-day-cell-invisible")}
            >
              {next}
            </td>,
          );
        }
      }
    }
  });

  const nextMonth = () => {
    setDate(
      add({
        date,
        number: 1,
      }),
    );
  };
  const prevMonth = () => {
    setDate(
      add({
        date,
        number: -1,
      }),
    );
  };

  return (
    <div className={cn("calendar", className)}>
      <CalendarNavigation date={date} next={nextMonth} prev={prevMonth} />
      <table className={cn("calendar-table")}>
        <thead>
          <tr>{weekDayName}</tr>
        </thead>
        <tbody>
          {rows.map((d, i) => {
            const isIn = d.find(({ key }: { key: string }) => key === "999");

            return (
              <tr
                key={i}
                className={cn({
                  showWeekTest: isIn && showWeek,
                })}
              >
                {d}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
