import { createContext, ReactNode, useState } from "react";
import { useCalendar } from "./useCalendar.hook";
interface CalendarContextType {
  resetDay: () => void;
  generateCurrentDate: () => Date;
  generateDate: (index: number, state: boolean) => void;
  currentMonth: month;
}

interface month {
  current: { day: number; month: number; year: number };
  month: { name: string; days: number };
  start: { number: number; day: string };
  end: { dayIndex: number; day: string; number: number };
  previous: { name: string; days: number };
  following: { name: string; days: number };
}

export const CalendarContext = createContext<CalendarContextType | null>(null);

export default function CalendarContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const currentMonth = useCalendar();

  let day = 1;
  function generateCurrentDate() {
    console.log(day);
    const generatedDate = new Date(
      `${currentMonth.current.month} ${day} ${currentMonth.current.year}`
    );
    day += 1;
    return generatedDate;
  }

  function generateDate(index: number, state: boolean) {}

  function resetDay() {
    day = 1;
  }
  return (
    <CalendarContext.Provider
      value={{ resetDay, generateCurrentDate, generateDate, currentMonth }}
    >
      {children}
    </CalendarContext.Provider>
  );
}
