import "dayjs/locale/fr";

const dayjs = require("dayjs");

const isBetween = require("dayjs/plugin/isBetween");

dayjs.extend(isBetween);
// Set the locale to French (fr)
dayjs.locale("fr");
const weekday = require("dayjs/plugin/weekday");

dayjs.extend(weekday);

interface CurrentWeekProps {
  number: number;
  month: string;
  day: string;
  isCurrent: boolean;
}
interface CurrentTimeProps {
  hour: string;
  minute: string;
}

/**
 * Return an array of HH:mm between start and end by step minutes
 * @param start {string} Start time in HH:mm format
 * @param end {string} End time in HH:mm format
 * @param step {number} Step in minutes
 * @returns {string[]} List of HH:mm
 */
export const getTimeBar = ({
  start,
  end,
  step,
}: {
  start: string;
  end: string;
  step: number;
}): string[] => {
  const startTime = dayjs(`1999/01/01${start}`, "HH:mm");
  const endTime = dayjs(`1999/01/01${end}`, "HH:mm");
  const duration: number = endTime.diff(startTime, "minute");

  const timeBar: string[] = [];
  for (let i = 0; i <= duration; i += step) {
    timeBar.push(startTime.add(i, "minute").format("HH:mm"));
  }
  return timeBar as string[];
};

/**
 * Return true if the date1 is before the date2
 * @param date1 {Date} date1
 * @param date2 {Date} date2
 * @returns {boolean} true if date1 is before date2
 */
export const isBefore = (date1: Date, date2: Date): boolean =>
  dayjs(date1).isBefore(dayjs(date2)) as boolean;

/**
 * Return true if the date1 is after the date2
 * @param date1 {Date} date1
 * @param date2 {Date} date2
 * @returns {boolean} true if date1 is after date2
 */
export const isAfter = (date1: Date, date2: Date): boolean =>
  dayjs(date1).isAfter(dayjs(date2)) as boolean;

/**
 * Return the difference in days between date1 and date2 from the start of the month
 * @param date1 {Date} date1
 * @param date2 {Date} date2
 * @returns {number} Difference in days
 */
export const differenceInMonths = (date1: Date, date2: Date): number =>
  dayjs(date1).startOf("month").diff(dayjs(date2).startOf("month"), "month");

/**
 * Get an array of X dates starting from the first day of the month
 * @param date {Date} Date object
 * @param number {number} Number of dates
 * @returns {Date[]} Array of dates
 */
export const getDateInterval = (
  date: Date,
  number: number,
  key = "month",
): Date[] => {
  const dates = [];
  for (let i = 0; i < number; i += 1) {
    dates.push(dayjs(date).add(i, key).startOf(key).toDate());
  }

  return dates as Date[];
};

/**
 * Return the duration in string format (ex: 1h 30min)
 * @param start {Date} Start date
 * @param end {Date} End date
 * @returns {string} Duration formatted (ex: 1h 30min)
 */
export const getDurationFormatted = ({
  start,
  end,
}: {
  start: Date;
  end: Date;
}): string => {
  const startTime = dayjs(start, "HH:mm");
  const endTime = dayjs(end, "HH:mm");
  const duration = endTime.diff(startTime, "minute");
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  if (hours === 0) return `${minutes}min`;
  if (minutes === 0) return `${hours}h`;

  return `${hours}h ${minutes}min` as string;
};

// TODO: Refactor this function with getDurationFormatted && getDurationDate
/**
 * Return the duration in minutes
 * @param start {string} Start time (HH:mm) or Date
 * @param end {string} End time (HH:mm) or Date
 * @returns {number} Duration in minutes
 */
export const getDuration = ({
  start,
  end,
}: {
  start: string | Date;
  end: string | Date;
}): number => {
  const startValueFormatted =
    typeof start === "string" ? `1999/01/01${start}` : start;
  const endValueFormatted = typeof end === "string" ? `1999/01/01${end}` : end;

  const startTime = dayjs(startValueFormatted, "HH:mm");
  const endTime = dayjs(endValueFormatted, "HH:mm");
  const duration = endTime.diff(startTime, "minute");

  return (duration / 60) as number;
};

/**
 * Return the duration in minutes
 * @param start {string} Start time (HH:mm) or Date
 * @param end {string} End time (HH:mm) or Date
 * @returns {number} Duration in minutes
 */
export const getDurationDate = ({
  start,
  end,
}: {
  start: string | Date;
  end: string | Date;
}): number => {
  const startTime = dayjs(start);
  const endTime = dayjs(end);
  const duration = endTime.diff(startTime, "minute");

  return duration as number;
};

/**
 * Return the Date object from string HH:mm (ex: 08:00)
 * @param time {string} Time in HH:mm format
 * @returns {Date} Date object
 */
export const timeToDateTime = (time: string): Date =>
  dayjs(`1999/01/01${time}`, "HH:mm");

export const extractTime = (date: Date) => dayjs(date).format("HH:mm");

/**
 * Return the first day of the month
 * @param date {Date} Date object
 * @returns {Date} Date object
 */
export const firstDayOfMonth = (date: Date = new Date()): Date =>
  dayjs(date).startOf("month").format("d");

/**
 * Return the number of days in the month
 * @param date {Date} Date object
 * @returns {number} Number of days
 */
export const daysInMonth = (date: Date = new Date()): number =>
  dayjs(date).daysInMonth();

/**
 * Return the year
 * @param date {Date | number} Date object
 * @returns {number} Year
 */
export const getFullYear = (date: Date | number = new Date()): number =>
  dayjs(typeof date === "number" ? `${date}-01-01` : date).year();

/**
 * Return the month (0-11)
 * @param date {Date | number} Date object
 * @returns {number} Month (0-11)
 */
export const getMonth = (date: Date | number = new Date()): number =>
  dayjs(typeof date === "number" ? `2000-${date}-01` : date).month();

/**
 * Return the day (1-31)
 * @param date {Date | number} Date object
 * @returns {Date} Date object with the day passed in parameter
 */
export const getDay = (date: Date | number = new Date()): Date =>
  dayjs(typeof date === "number" ? `2000-01-${date}` : date).date();

/**
 * Return a object with the day of the week name and the month name
 * @param date {Date} Date object
 * @returns {object} Object with the day of the week name and the month name from the date passed in parameter
 */
export const dateToDayNumberMonthObject = (
  date: Date,
): {
  number: number;
  month: string;
  weekName: string;
} => ({
  weekName: dayjs(date).format("dddd"),
  number: dayjs(date).format("DD"),
  month: dayjs(date).format("MMMM"),
});

/**
 * Return the date from a day number and a month number and a year
 * @param day {number} Day number
 * @param month {number} Month number
 * @param year {number} Year
 * @returns {string} Date in YYYY-MM-DD format
 */
export const getDate = ({
  month = new Date().getMonth(),
  year = new Date().getFullYear(),
  day = new Date().getDate(),
}: {
  month?: number;
  day?: number;
  year?: number;
}): string => {
  return dayjs(new Date(year, month, day)).format("YYYY-MM-DD");
};

/**
 * Return an array of dates from date with the possibility skip weekends
 * @param {Date} date Date object
 * @param {number} days Number of days to add
 * @param {boolean} skipWE Skip weekends default false
 * @returns
 */
export const getNextDay = ({
  date,
  number,
  skipWE,
}: {
  date: Date;
  number: number;
  skipWE: boolean;
}): Date[] => {
  let day = dayjs(date);
  const days: Date[] = [day.toDate()];

  for (let i = 1; i < number; i += 1) {
    day = day.add(1, "day");
    if (skipWE && (day.day() === 0 || day.day() === 6)) {
      i -= 1;
    } else {
      days.push(day.toDate());
    }
  }

  return days;
};

// Format date
/**
 * Return the date in format
 * @param date {Date} Date object
 * @param format {string} Format (default: YYYY-MM-DD)
 * @returns {string} Date formatted by format parameter
 */
export const formatDate = (
  date: Date | string,
  format = "YYYY-MM-DD",
): string => dayjs(date).format(format);

/**
 * Allow to set the time of a date
 * @param date {Date} Date object
 * @param hour {number} hour
 * @param minute {number} minute
 * @returns {Date} Date object with the time passed in parameter
 */
export const setTime = (
  date: Date,
  {
    hour = 23,
    minute = 59,
  }: {
    hour?: number;
    minute?: number;
  },
): Date => dayjs(date).set("hour", hour).set("minute", minute).toDate();

/**
 * Return the current week
 * @param date {Date} Date object
 * @param options {object} Options
 * @param options.skipWE {boolean} Skip weekends
 * @returns {CurrentWeekProps[]} Array of dates
 */
export const getCurrentWeek = (
  date: Date = new Date(),
  { skipWE = false } = {},
): CurrentWeekProps[] => {
  const day = dayjs(date);
  // 0 to start by Monday
  const weekStart = day.weekday(0);
  const days = [];
  const numberByWeek = 6 - (skipWE ? 2 : 0);

  for (let i = 0; i <= numberByWeek; i += 1) {
    const today = day.format("D");
    const number = dayjs(weekStart).add(i, "days").format("D");

    days.push({
      number,
      month: dayjs(weekStart).add(i, "days").format("MMMM"),
      day: dayjs(weekStart).add(i, "days").format("dd"),
      isCurrent: today === number,
    });
  }

  return days as CurrentWeekProps[];
};

/**
 * Return true if the date is in the range
 * @param target target date
 * @param range range date
 * @returns {boolean} true if the date is in the range
 */
export const isInInterval = ({
  target,
  interval,
}: {
  target: {
    start: Date;
    end: Date;
  };
  interval: {
    start: Date;
    end: Date;
  };
}): boolean => {
  return (
    dayjs(target.start).isBetween(interval.start, interval.end, "", "[]") ||
    dayjs(target.end).isBetween(interval.start, interval.end, "", "[]")
  );
};

/**
 * Return the current time
 * @returns {CurrentTimeProps} {hour: string (HH), minute: string (mm)}
 */
export const getCurrentTime = (): CurrentTimeProps => {
  return {
    hour: dayjs().format("HH").toString(),
    minute: dayjs().format("mm").toString(),
  } as CurrentTimeProps;
};

/**
 * Return the month name
 * @param date {Date} Date object
 * @returns {string} Month name
 */
export const getMonthName = (date: Date): string => {
  return dayjs(date).format("MMMM") as string;
};

/**
 * Return the Year
 * @param date {Date} Date object
 * @returns {string} Year YYYY
 */
export const getYear = (date: Date): string => {
  return dayjs(date).format("YYYY") as string;
};

/**
 * Return the date with the key (month,...) added
 * @param date {Date} Date object
 * @param key {string} Key to add (month, year, day...) Default: month
 * @param amount {number} Number of month to add
 * @returns {Date} Date object
 */
export const add = ({
  date = new Date(),
  key = "month",
  number = 1,
}: {
  date?: Date;
  key?: string;
  number?: number;
}) => dayjs(date).add(number, key).format();

/**
 * Return if the date is full same
 * @param date1 {Date} Date object
 * @param date2 {Date} Date object
 * @returns {boolean} True if the date is full same
 *
 * @example
 * isSameDate(new Date(2020, 0, 1), new Date(2020, 0, 1)) // true
 * isSameDate(new Date(2020, 0, 1), new Date(2020, 0, 2)) // false
 * isSameDate(new Date(2020, 0, 1), new Date(2020, 2, 1)) // false
 */
export const isSameDate = (
  date1: Date,
  date2: Date,
  {
    noDay = false,
  }: {
    noDay?: boolean;
  } = {},
): boolean => {
  if (noDay) {
    return (
      dayjs(date1).isSame(date2, "month") && dayjs(date1).isSame(date2, "year")
    );
  }
  return (
    dayjs(date1).isSame(date2, "day") &&
    dayjs(date1).isSame(date2, "month") &&
    dayjs(date1).isSame(date2, "year")
  );
};
