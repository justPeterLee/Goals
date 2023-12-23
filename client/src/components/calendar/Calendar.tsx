import styles from "./Calendar.module.css";

import { CalendarContext } from "../../hook/calendar.context";
import { useGenerateDate } from "../../hook/useCalendar.hook";

import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useContext } from "react";

export default function Calendar() {
  const calenadarContext = useContext(CalendarContext);
  const navigate = useNavigate();
  const params = useParams();

  const proxyParms: { month: string; year: string } = {
    month: params.month || "",
    year: params.year || "",
  };

  const changeMonth = (direction: number) => {
    const currentMonth = calenadarContext!.currentMonth.current.month + 1;
    const currentYear = calenadarContext!.currentMonth.current.year;
    const newURL = { month: currentMonth + direction, year: currentYear };

    if (newURL.month > 12) {
      newURL.month = 1;
      newURL.year += 1;
    } else if (newURL.month < 1) {
      newURL.month = 12;
      newURL.year -= 1;
    }

    navigate(`/calendar/${newURL.year}/${newURL.month}`);
  };
  useEffect(() => {
    calenadarContext?.manualMonth(proxyParms);
  }, [navigate]);

  return (
    <div className={`${styles.calendarContainer} container`}>
      <button
        onClick={() => {
          changeMonth(-1);
        }}
      >
        prev
      </button>
      <button
        onClick={() => {
          changeMonth(1);
        }}
      >
        next
      </button>
      <CalendarMonth month={calenadarContext!.currentMonth.month.name} />
      <Month />
    </div>
  );
}

function CalendarMonth(props: { month: string }) {
  const { month } = props;
  return <div className={styles.titleContainer}>{month}</div>;
}

function Day(props: {
  position: {
    day: { number: number; text: string };
    index: number;
    row: number;
  };
  date: Date;
  month: string;
  dayPos: string;
  dayOffset: number;
}) {
  // const { day, index, row } = props.position;
  const { dayPos, dayOffset, date } = props;

  // const dateConvert = useDateConvert(date);

  // console.log(dateConvert);

  return (
    <div
      className={styles.dayContainer}
      style={
        dayPos !== "current" ? { backgroundColor: "rgb(220,220,220)" } : {}
      }
    >
      <div className={styles.dayTitle}>
        <span className={`${styles.titleContainer}`}>
          <Link
            className={styles.day}
            to={`/agenda/${date.getFullYear()}/${
              date.getMonth() + 1
            }/${date.getDate()} `}
          >
            {dayOffset}
          </Link>
          <p className={styles.title}></p>
        </span>
      </div>
      <div className={styles.dayBody}></div>
      <div className={styles.dayFooter}></div>
    </div>
  );
}

interface month {
  current: { day: number; month: number; year: number };
  month: { name: string; days: number };
  start: { number: number; day: string };
  end: { dayIndex: number; day: string; number: number };
  previous: { name: string; days: number };
  following: { name: string; days: number };
}
function Week(props: { row: number; month: month }) {
  const { row, month } = props;

  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thurseday",
    "Friday",
    "Saturday",
  ];
  return (
    <div className={styles.weekContainer}>
      {week.map((day, index) => {
        let current = false;
        let trueIndex = index + row * 7;
        let dayPos = "current";
        let dayOffset = 0;
        let trueMonth = month.month.name;

        // console.log(month.current.month - 1);
        if (trueIndex < month.start.number) {
          current = false;
          dayPos = "before";
          dayOffset =
            month.previous.days - (month.start.number - trueIndex) + 1;

          trueMonth = month.previous.name;
        } else if (trueIndex > month.end.number) {
          current = false;
          dayPos = "after";
          dayOffset = trueIndex - month.end.number;
          trueMonth = month.following.name;
        } else {
          current = true;
          dayPos = "current";
          dayOffset = trueIndex - month.start.number + 1;
        }
        let date = useGenerateDate(
          dayOffset,
          dayPos,
          month.current.month,
          month.current.year
        );

        return (
          <Day
            key={index}
            position={{
              day: { number: index, text: day },
              index: trueIndex,
              row: row,
            }}
            date={date}
            month={trueMonth}
            dayPos={dayPos}
            dayOffset={dayOffset}
          />
        );
      })}
    </div>
  );
}

function Month() {
  const calenadrContext = useContext(CalendarContext);
  return (
    <div className={styles.monthContainer}>
      {Array.from({ length: 5 }, (_, index) => {
        return (
          <Week key={index} row={index} month={calenadrContext!.currentMonth} />
        );
      })}
    </div>
  );
}
