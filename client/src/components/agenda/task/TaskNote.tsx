import styles from "./Task.module.css";
import { format } from "date-fns";

export function TaskAgendaNote(props: { data: any }) {
  console.log(new Date(props.data.date));
  const date = new Date(props.data.date);
  const currTime = format(date, "h:mmaa");
  const follTime = format(date.setHours(date.getHours() + 1), "h:mmaa");
  return (
    <div className={styles.taskNoteAgendaContainer}>
      <div className={styles.taskTimeBlockContainer}>
        <p className={styles.taskTimeBlockTask}>{props.data.task}</p>
        <p className={styles.taskTimeBlockTime}>
          {`${currTime} - ${follTime}`}
        </p>
      </div>
    </div>
  );
}
