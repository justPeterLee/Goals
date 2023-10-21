import styles from "../Agenda.module.css";
import { AddTaskModal } from "./AddTask";
import { CalendarContext } from "../../../hook/calendar.context";

import { useState, useContext } from "react";
import { format } from "date-fns";
export function TimeBlock() {
  // time (12 - 12);
  // date mm/dd/yyyy
  // task
  //      - title
  //      - description
  //      - importance
  //      - finished

  const calenadarContext = useContext(CalendarContext);
  const [selectedBlock, setSelectedBlock] = useState(-1);
  const [toggleModal, setToggleModal] = useState(false);

  const openModal = (position: number) => {
    console.log(position);
    setToggleModal(() => true);
  };

  const closeModal = () => {
    setToggleModal(() => false);
  };

  return (
    <div className={styles.timeBlockContainer}>
      {Array.from({ length: 25 }, (_, index) => {
        let proxyDate = calenadarContext!.currentAgenda.date;
        let time;
        let date;
        if (index > 0) {
          proxyDate?.setHours(index);
          time = format(proxyDate, "h aa");
          date = format(proxyDate, "EEEE',' LLLL e");
        } else {
          proxyDate?.setUTCHours(0);
          time = proxyDate;
        }
        let timeText = index > 0 ? `${index}` : "date";
        return (
          <Block
            key={index}
            isOpen={selectedBlock}
            onOpen={openModal}
            position={index}
            time={time}
            timeText={timeText}
            date={date}
          />
        );
      })}

      <AddTaskModal isOpen={toggleModal} onClose={closeModal} />
    </div>
  );
}

function Block(props: {
  isOpen: number;
  onOpen: (position: number) => void;
  position: number;
  time: Date | string | undefined;
  timeText: string;
  date: Date | string | undefined;
}) {
  // time lable
  // on click

  const addTask = () => {
    props.onOpen(props.position);
    console.log(props.date);
  };
  return (
    <div className={styles.blockContainer} onClick={addTask}>
      <div className={styles.blockTime}>{props.time?.toLocaleString()}</div>
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
