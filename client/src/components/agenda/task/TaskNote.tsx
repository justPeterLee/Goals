import styles from "./Task.module.css";
import { format } from "date-fns";
import ReactDOM from "react-dom";
import { useState } from "react";
import { Backdrop } from "../agendaComponents/AddTask";
export function TaskAgendaNote(props: { data: any }) {
  const date = new Date(props.data.date);
  const currTime = format(date, "h:mmaa");
  const follTime = format(date.setHours(date.getHours() + 1), "h:mmaa");

  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(() => true);
    console.log(showDescription);
  };
  return (
    <>
      <div
        className={styles.taskNoteAgendaContainer}
        onClick={(e) => {
          e.stopPropagation();
          toggleDescription();
          // console.log("open", props.data.id);
        }}
      >
        <div className={styles.taskTimeBlockContainer}>
          <p className={styles.taskTimeBlockTask}>{props.data.task}</p>
          <p className={styles.taskTimeBlockTime}>
            {`${currTime} - ${follTime}`}
          </p>
        </div>
      </div>

      {showDescription && (
        <TaskAgendaNoteModal
          onClose={(e: any) => {
            e.stopPropagation();
            setShowDescription(false);
          }}
          data={props.data}
        />
      )}
    </>
  );
}

export function TaskAgendaNoteModal(props: {
  onClose: (e: any) => void;
  data: any;
}) {
  const portalRoot = document.getElementById("portal-modal");

  if (!portalRoot) {
    return <div>Portal root not found!</div>;
  }

  return ReactDOM.createPortal(
    <Backdrop close={props.onClose}>
      <p>task description</p>
    </Backdrop>,
    portalRoot
  );
}
