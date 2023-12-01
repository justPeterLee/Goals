import { createContext, ReactNode, useState } from "react";
import { useCalendar, useAgenda } from "./useCalendar.hook";
import { useNavigate } from "react-router-dom";

interface CalendarContextType {
  resetDay: () => void;
  generateCurrentDate: () => Date;
  currentMonth: month;
  manualMonth: (manual: { month: string; year: string }) => void;
  manualAgenda: (manual: { date: string; month: string; year: string }) => void;
  currentAgenda: agenda;
}

interface month {
  current: { day: number; month: number; year: number };
  month: { name: string; days: number };
  start: { number: number; day: string };
  end: { dayIndex: number; day: string; number: number };
  previous: { name: string; days: number };
  following: { name: string; days: number };
}

interface agenda {
  month: month;
  date: Date;
  full: { day: string; date: number; month: string; year: number };
  fullNum: { day: number; date: number; month: number; year: number };
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
        const newMonth = useCalendar(manual);
        setCurrentMonth(newMonth);
      }
    } else {
      setCurrentMonth(useCalendar(undefined));
      console.log("rerender");
    }
  }

  let day = 1;
  function generateCurrentDate() {
    console.log(day);
    const generatedDate = new Date(
      `${currentMonth.current.month} ${day} ${currentMonth.current.year}`
    );
    day += 1;
    return generatedDate;
  }

  function resetDay() {
    day = 1;
  }

  // agenda
  const [agendaDate, setAgendaDate] = useState(useAgenda(undefined));

  function manualAgenda(manual: { date: string; month: string; year: string }) {
    let newAgenda = useAgenda(undefined);
    if (manual.month && manual.date && manual.year) {
      newAgenda = useAgenda(manual);
      setAgendaDate(() => newAgenda);
    } else {
      setAgendaDate(useAgenda(undefined));
    }

    return newAgenda;
  }

  return (
    <CalendarContext.Provider
      value={{
        resetDay,
        generateCurrentDate,
        currentMonth,
        manualMonth,
        manualAgenda,
        currentAgenda: agendaDate,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}
