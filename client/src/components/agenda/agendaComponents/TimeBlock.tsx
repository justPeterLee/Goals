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
      <Block />
      <Block />
      <Block />
      <Block />
      <Block />
      <Block />
      <Block />
      <Block />
      <Block />
      <Block />
    </div>
  );
}

function Block() {
  // time lable
  // on click

  const addTask = () => {
    console.log("add task");
  };
  return (
    <div className={styles.blockContainer} onClick={addTask}>
      <div className={styles.blockTime}>time</div>
      <Line
        vertical={true}
        configure={{
          height: "1rem",
          bottom: "-.5rem",
          left: "5rem",
          backgroundColor: "rgb(200,200,200)",
        }}
      />
      <Line vertical={false} />
    </div>
  );
}

interface configure {
  height?: string;
  width?: string;
  position?: string | any;
  backgroundColor?: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}
function Line(props: { vertical: boolean; configure?: configure }) {
  return (
    <div
      className={props.vertical ? styles.verLine : styles.horLine}
      style={props.configure ? props.configure : {}}
    />
  );
}
