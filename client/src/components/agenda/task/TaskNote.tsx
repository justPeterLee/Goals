import styles from "./Task.module.css";
import { format } from "date-fns";
import ReactDOM from "react-dom";
import { useState } from "react";
import { Backdrop } from "../agendaComponents/AddTask";
import { useAppDispatch } from "../../../hook/redux.hook";
export function TaskAgendaNote(props: { data: any }) {
  const date = new Date(props.data.date);
  const currTime = format(date, "h:mmaa");
  const follTime = format(date.setHours(date.getHours() + 1), "h:mmaa");

  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(() => true);
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
        <TaskModal
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
  editToggle: () => void;
  data: any;
  date: Date;
  time: { currTime: string; follTime: string };
}) {
  const dispatch = useAppDispatch();
  const dateFormat = format(props.date, "EEEE, LLLL  d");

  const toggleTaskCompletion = () => {
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

  return (
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
        <button
          onClick={() => {
            props.editToggle();
          }}
        >
          edit
        </button>
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
  );
}

function TaskModalEdit(props: {
  onClose: (e: any) => void;
  editToggle: () => void;
  data: any;
  date: Date;
  time: { currTime: string; follTime: string };
}) {
  const dispatch = useAppDispatch();

  const dateFormat = format(props.date, "EEEE, LLLL  d");

  const [newTaskValue, setNewTaskValue] = useState({
    title: props.data.task,
    description: props.data.description,
  });

  const [errorValue, setErrorValue] = useState({
    title: false,
  });
  const validateNewTask = () => {
    if (newTaskValue.title.replace(/\s+/g, "") === "") {
      setErrorValue({ ...errorValue, title: true });
    } else {
      const date = new Date(props.data.date);

      setErrorValue({ ...errorValue, title: false });
      dispatch({
        type: "PUT_TASK",
        payload: {
          ...newTaskValue,
          id: props.data.id,
          date: {
            date: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            fullDate: date,
          },
        },
      });
      props.editToggle();
    }
  };

  const deleteTask = () => {
    const date = new Date(props.data.date);

    dispatch({
      type: "DELETE_TASK",
      payload: {
        id: props.data.id,
        date: {
          date: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear(),
          fullDate: date,
        },
      },
    });
  };
  return (
    <div
      className={styles.taskModalEditContainer}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={styles.taskEditTitleContainer}>
        <span className={styles.taskLabelContainer}>
          <p className={styles.taskLabel}>task</p>
          {/* <p
            className={styles.taskStatus}
            style={{ color: props.data.completion ? "green" : "red" }}
          >
            {props.data.completion ? "completed" : "uncompleted"}
          </p> */}
        </span>
        <span>
          <input
            className={styles.taskEditTitle}
            placeholder="Add Title"
            value={newTaskValue.title}
            onChange={(e) => {
              setNewTaskValue({ ...newTaskValue, title: e.target.value });
            }}
          />
          <div
            className={styles.taskEditTitleLine}
            style={errorValue.title ? { backgroundColor: "red" } : {}}
          />
        </span>
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

      <div className={styles.taskEditDescriptionContainer}>
        <span className={styles.taskLabel}>description</span>
        <textarea
          placeholder="Add Description"
          value={newTaskValue.description}
          onChange={(e) => {
            setNewTaskValue({ ...newTaskValue, description: e.target.value });
          }}
        />
      </div>

      <div className={styles.taskEditButtonContainer}>
        <button
          onClick={() => {
            deleteTask();
          }}
        >
          delete
        </button>
        <button
          onClick={() => {
            validateNewTask();
          }}
        >
          save
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
  );
}

function TaskModal(props: {
  onClose: (e: any) => void;
  data: any;
  date: Date;
  time: { currTime: string; follTime: string };
}) {
  const portalRoot = document.getElementById("portal-modal");

  const [editModeState, setEditModeState] = useState(false);

  const editOn = () => {
    setEditModeState(true);
  };

  const editOff = () => {
    setEditModeState(false);
  };

  if (!portalRoot) {
    return <div>Portal root not found!</div>;
  }

  return ReactDOM.createPortal(
    <Backdrop close={props.onClose}>
      {editModeState ? (
        <TaskModalEdit
          editToggle={editOff}
          onClose={props.onClose}
          data={props.data}
          date={props.date}
          time={props.time}
        />
      ) : (
        <TaskAgendaNoteModal
          onClose={props.onClose}
          editToggle={editOn}
          data={props.data}
          date={props.date}
          time={props.time}
        />
      )}
    </Backdrop>,
    portalRoot
  );
}
