import styles from "../Agenda.module.css";
import { TaskAgendaNote } from "../../task/TaskNote";

import { AddTaskModal } from "./AddTask";
import { CalendarContext } from "../../../hook/calendar.context";

import { useAppSelector } from "../../../hook/redux.hook";
import { useState, useContext, useEffect } from "react";
import { format } from "date-fns";
export function TimeBlock() {
  // time (12 - 12);
  // date mm/dd/yyyy
  // task
  //      - title
  //      - description
  //      - importance
  //      - finished

  const timeKey = useAppSelector((state) => state.agenda.agenda);
  const [timeKeyState, setTimeKeyState] = useState(timeKey);

  const calenadarContext = useContext(CalendarContext);

  const [selectedBlock, setSelectedBlock] = useState(-2);
  const [toggleModal, setToggleModal] = useState(false);

  const [selectedTime, setSelectedTime] = useState({
    current: "",
    following: "",
  });

  const openModal = (position: number) => {
    // console.log(position);
    setToggleModal(() => true);
    setSelectedBlock(() => position);
    const proxyTime = new Date(calenadarContext!.currentAgenda.date);
    const curTime =
      position == -1 ? "" : format(proxyTime.setHours(position), "h:mmaa");
    const folTime =
      position == -1 ? "" : format(proxyTime.setHours(position + 1), "h:mmaa");

    setSelectedTime({
      current: curTime.toLocaleLowerCase(),
      following: folTime.toLocaleLowerCase(),
    });
  };

  const closeModal = () => {
    setToggleModal(() => false);
    setSelectedBlock(-2);
  };

  useEffect(() => {
    setTimeKeyState(timeKey);
  }, [timeKey]);
  return (
    <div className={styles.timeBlockContainer}>
      <div
        style={
          selectedBlock === -1
            ? { backgroundColor: "rgb(240,240,240, .8)" }
            : {}
        }
        className={styles.dayBlock}
        onClick={() => openModal(-1)}
      />
      {Array.from({ length: 24 }, (_, index) => {
        let proxyDate = calenadarContext!.currentAgenda.date;
        let time;
        if (index > -10) {
          proxyDate.setHours(index);
          time = `${format(proxyDate, "h aa")}`;
        } else {
          proxyDate?.setUTCHours(0);
          time = proxyDate;
        }
        const date = format(proxyDate, "EEEE',' LLLL e");
        // console.log(proxyDate);
        const timeKeyUnit = timeKeyState[index] || [];
        return (
          <Block
            key={index}
            isOpen={selectedBlock}
            onOpen={openModal}
            position={index}
            time={time}
            date={date}
            selected={selectedBlock}
            timeKey={timeKeyUnit}
          />
        );
      })}

      <AddTaskModal
        isOpen={toggleModal}
        onClose={closeModal}
        selected={selectedBlock}
        selectedTime={selectedTime}
      />
    </div>
  );
}

function Block(props: {
  isOpen: number;
  onOpen: (position: number) => void;
  position: number;
  time: string | Date;
  date: string;
  selected: number;
  timeKey: any;
}) {
  // time lable
  // on click
  // console.log(props.timeKey);

  const addTask = () => {
    props.onOpen(props.position);
  };

  return (
    <div
      className={styles.blockContainer}
      onClick={addTask}
      style={
        props.selected === props.position
          ? { backgroundColor: "rgb(240,240,240, .8)" }
          : {}
      }
    >
      <div className={styles.blockTime}>
        <span className={styles.blockTimeText}>
          {props.time.toLocaleString()} {props.position}
        </span>
      </div>

      <Line vertical={false} />
      <Line
        vertical={true}
        configure={{
          height: "3.5rem",
          bottom: "-.5rem",
          left: "4rem",
          backgroundColor: "rgb(200,200,200)",
        }}
      />
      <div className={styles.blockContext}>
        {/* {JSON.stringify(props.timeKey)} */}
        {/* <TaskAgendaNote />
        <TaskAgendaNote /> */}
        {props.timeKey.map((_task: any, index: number) => (
          <TaskAgendaNote key={index} />
        ))}
      </div>
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
