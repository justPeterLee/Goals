import styles from "./Task.module.css";
import { format } from "date-fns";
import ReactDOM from "react-dom";
import { useState } from "react";
import { Backdrop } from "../agendaComponents/AddTask";
import { useCompleteTask } from "../../../hook/useTaskServer.hook";
import { useAppDispatch } from "../../../hook/redux.hook";
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
          date={date}
          time={{ currTime, follTime }}
        />
      )}
    </>
  );
}

export function TaskAgendaNoteModal(props: {
  onClose: (e: any) => void;
  data: any;
  date: Date;
  time: { currTime: string; follTime: string };
}) {
  const dispatch = useAppDispatch();

  const portalRoot = document.getElementById("portal-modal");
  const dateFormat = format(props.date, "EEEE, LLLL");

  const toggleTaskCompletion = () => {
    console.log("complete task");
    const date = new Date(props.data.date);
    dispatch({
      type: "PUT_TASK_COMPLETION",
      payload: {
        id: props.data.id,
        status: !props.data.completion,
        date: {
          date: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
          fullDate: date,
        },
      },
    });
  };
  if (!portalRoot) {
    return <div>Portal root not found!</div>;
  }

  return ReactDOM.createPortal(
    <Backdrop close={props.onClose}>
      <div
        className={styles.taskModalContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.taskModalTitle}>
          <span className={styles.taskLabelContainer}>
            <p className={styles.taskLabel}>task</p>
            <p
              className={styles.taskStatus}
              style={{ color: props.data.completion ? "green" : "red" }}
            >
              {props.data.completion ? "completed" : "uncompleted"}
            </p>
          </span>
          <p className={styles.taskTitle}>{props.data.task}</p>
        </div>

        <div className={styles.taskModalDate}>
          <p>{dateFormat}</p>
          <div
            style={{
              height: "2px",
              width: "2px",
              backgroundColor: "rgb(50,50,50)",
              borderRadius: "100px",
            }}
          ></div>
          <p>{`${props.time.currTime} - ${props.time.follTime}`}</p>
        </div>

        {props.data.description ? (
          <div className={styles.taskDescriptionContainer}>
            <p className={styles.taskLabel}>description</p>
            <p className={styles.taskDescription}>{props.data.description}</p>
          </div>
        ) : (
          <></>
        )}
        <div className={styles.taskModalButton}>
          <button>edit</button>
          <button
            onClick={() => {
              toggleTaskCompletion();
            }}
          >
            {props.data.completion ? "uncomplete" : "complete"}
          </button>
        </div>

        <button
          className="closeButton"
          onClick={(e) => {
            props.onClose(e);
          }}
        >
          x
        </button>
      </div>
    </Backdrop>,
    portalRoot
  );
}
