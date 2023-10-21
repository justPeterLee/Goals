import styles from "../Agenda.module.css";
import { AddTaskModal } from "./AddTask";

import { useState } from "react";

export function TimeBlock() {
  // time (12 - 12);
  // date mm/dd/yyyy
  // task
  //      - title
  //      - description
  //      - importance
  //      - finished

  const [selectedModal, setSelectedModal] = useState(-1);
  const [toggleModal, setToggleModal] = useState(false);
  const openModal = () => {
    console.log("toggle");
    setToggleModal(() => true);
  };

  const closeModal = () => {
    setToggleModal(() => false);
  };
  return (
    <div className={styles.timeBlockContainer}>
      {Array.from({ length: 12 }, (_, index) => {
        return <Block key={index} isOpen={selectedModal} onOpen={openModal} />;
      })}

      <AddTaskModal isOpen={toggleModal} onClose={closeModal} />
    </div>
  );
}

function Block(props: { isOpen: number; onOpen: () => void }) {
  // time lable
  // on click

  const [toggleTask, setToggle] = useState(false);

  const addTask = () => {
    props.onOpen();
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
