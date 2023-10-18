import styles from "./Calendar.module.css";

import { useContext } from "react";
import { CalendarContext } from "../../hook/calendar.context";
import { useGenerateDate, useDateConvert } from "../../hook/useCalendar.hook";

export default function Calendar() {
  return (
    <div className={`${styles.calendarContainer} container`}>
      <CalendarMonth />
      <Month />
    </div>
  );
}

function CalendarMonth() {
  return <div className={styles.titleContainer}>month</div>;
}

function Day(props: {
  position: {
    day: { number: number; text: string };
    index: number;
    row: number;
  };
  date: Date | any;
  month: string;
  dayPos: string;
  dayOffset: number;
}) {
  const { day, index, row } = props.position;
  const { dayPos, dayOffset, date, month } = props;

  const dateConvert = useDateConvert(date);

  console.log(dateConvert);
  return (
    <div className={styles.dayContainer}>
      <div className={styles.dayTitle}>
        <span className={`${styles.titleContainer}`}>
          <p className={styles.day}>{dayOffset}</p>
          <p className={styles.title}>
            {/* {dayPos} {dayOffset} */}
            {`${day.text} ${month} ${dayOffset}, 2023`}
          </p>
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
  const calenadrContext = useContext(CalendarContext);

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
        if (trueIndex < month.start.number) {
          current = false;
          dayPos = "before";
          dayOffset = month.start.number - trueIndex;
        } else if (trueIndex > month.end.number) {
          current = false;
          dayPos = "after";
          dayOffset = trueIndex - month.end.number;
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
            month={month.month.name}
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
