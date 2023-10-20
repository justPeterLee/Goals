import styles from "../Agenda.module.css";

export function TimeBlock() {
  // time (12 - 12);
  // date mm/dd/yyyy
  // task
  //      - title
  //      - description
  //      - importance
  //      - finished

  return (
    <div className={styles.timeBlockContainer}>
      <Block />
    </div>
  );
}

function Block() {
  // time lable
  // on click

  return <div className={styles.blockContainer}></div>;
}
