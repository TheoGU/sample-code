import React from "react";
import cn from "classnames";
import { LeftChevronIcon, RightChevronIcon } from "@heroicons/react/24/solid";
import { Icon } from "@/components/display/icon/icon";
import { getYear, getMonthName } from "@/helpers/date";

interface Props {
  className?: string;
  date: Date;
  prev: () => void;
  next: () => void;
}

export const CalendarNavigation = ({ className, prev, next, date }: Props) => {
  return (
    <div className={cn("calendar-navigation", className)}>
      <Icon
        Component={LeftChevronIcon}
        className={cn("calendar-navigation-icon")}
        onClick={prev}
      />
      <div className={cn("calendar-navigation-month")}>
        <span>{getMonthName(date)}</span>
        <span>{getYear(date)}</span>
      </div>
      <Icon
        Component={RightChevronIcon}
        className={cn("calendar-navigation-icon")}
        onClick={next}
      />
    </div>
  );
};
