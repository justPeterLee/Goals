import { createContext, ReactNode, useState } from "react";
import { useCalendar } from "./useCalendar.hook";
import { useNavigate } from "react-router-dom";

interface CalendarContextType {
  resetDay: () => void;
  generateCurrentDate: () => Date;
  generateDate: (index: number, state: boolean) => void;
  currentMonth: month;
  manualMonth: (manual: { month: string; year: string }) => void;
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
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(useCalendar(undefined));

  function manualMonth(manual: { month: string; year: string }) {
    if (manual.month && manual.year) {
      if (parseInt(manual.month) > 12) {
        navigate(`/calendar/${manual.year}/12`);
      } else if (parseInt(manual.month) < 1) {
        navigate(`/calendar/${manual.year}/1`);
      } else {
        console.log("now");
        const newMonth = useCalendar(manual);
        setCurrentMonth(newMonth);
      }
    } else {
      setCurrentMonth(useCalendar(undefined));
      console.log("rerender");
    }
  }
  //   const currentMonth = useCalendar(undefined);

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
      value={{
        resetDay,
        generateCurrentDate,
        generateDate,
        currentMonth,
        manualMonth,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}
