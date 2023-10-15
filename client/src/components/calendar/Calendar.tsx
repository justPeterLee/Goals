import styles from "./Calendar.module.css";

export default function Calendar() {
  return (
    <div className={`${styles.calendarContainer} container`}>
      <Month />
    </div>
  );
}

function Day(props: { day: string; index: number; row: number }) {
  const { day, index, row } = props;

  return (
    <div className={styles.dayContainer}>
      <div className={styles.dayTitle}>
        <span className={`${styles.titleContainer}`}>
          <p className={styles.day}>{index + row + 1}</p>
          {/* <p className={styles.title}> {day}</p> */}
        </span>
      </div>
      <div className={styles.dayBody}></div>
      <div className={styles.dayFooter}></div>
    </div>
  );
}

function Week(props: { row: number }) {
  const { row } = props;
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
        return <Day key={index} day={day} index={index} row={row} />;
      })}
    </div>
  );
}

function Month() {
  return (
    <div className={styles.monthContainer}>
      {Array.from({ length: 5 }, (_, index) => {
        const rowIndex = index * 7;
        return <Week key={index} row={rowIndex} />;
      })}
    </div>
  );
}
