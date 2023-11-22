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
  const [selectedTime, setSelectedTime] = useState({
    time: { current: "", following: "" },
    date: calenadarContext?.currentAgenda.date.toDateString(),
  });
  const openModal = (
    position: number,
    selectedData: { time: string | Date; date: string }
  ) => {
    // console.log(position);
    setToggleModal(() => true);
    setSelectedBlock(() => position);

    const currentTimeStatus =
      position <= 11 ? "AM" : position == 24 ? "AM" : "PM";
    const followingTimeStatus =
      position === 11
        ? currentTimeStatus === "AM"
          ? "PM"
          : "AM"
        : position === 23
        ? currentTimeStatus === "AM"
          ? "PM"
          : "AM"
        : currentTimeStatus;

    const time =
      typeof selectedData.time === "object"
        ? selectedData.time.getHours()
        : parseInt(selectedData.time);
    const followingTime = time + 1 <= 12 ? (time + 1).toString() : "1";

    setSelectedTime({
      time: {
        current: `${time.toString()} ${currentTimeStatus}`,
        following: `${followingTime} ${followingTimeStatus}`,
      },
      date: selectedData.date,
    });
  };

  const closeModal = () => {
    setToggleModal(() => false);
    setSelectedBlock(-1);
  };

  return (
    <div className={styles.timeBlockContainer}>
      {Array.from({ length: 25 }, (_, index) => {
        let proxyDate = calenadarContext!.currentAgenda.date;
        let time;
        if (index > 0) {
          proxyDate.setHours(index);
          time = `${format(proxyDate, "h aa")}`;
        } else {
          proxyDate?.setUTCHours(0);
          time = proxyDate;
        }
        const date = format(proxyDate, "EEEE',' LLLL e");
        // console.log(proxyDate);
        return (
          <Block
            key={index}
            isOpen={selectedBlock}
            onOpen={openModal}
            position={index}
            time={time}
            date={date}
            selected={selectedBlock}
          />
        );
      })}

      <AddTaskModal
        isOpen={toggleModal}
        onClose={closeModal}
        selected={selectedTime}
      />
    </div>
  );
}

function Block(props: {
  isOpen: number;
  onOpen: (
    position: number,
    selectedData: { time: string | Date; date: string }
  ) => void;
  position: number;
  time: string | Date;
  date: string;
  selected: number;
}) {
  // time lable
  // on click

  const addTask = () => {
    props.onOpen(props.position, { time: props.time, date: props.date });
    console.log(props.date);
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
        <p className={styles.blockTimeText}>{props.time.toLocaleString()}</p>
      </div>

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
