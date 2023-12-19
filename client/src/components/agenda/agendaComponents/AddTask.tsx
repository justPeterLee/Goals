import styles from "../Agenda.module.css";

import ReactDOM from "react-dom";
import { ReactNode, useState, useContext } from "react";
import { useDispatch } from "react-redux";

import { CalendarContext } from "../../../hook/calendar.context";

export function AddTaskModal({
  isOpen,
  onClose,
  selected,
  selectedTime,
}: {
  isOpen: boolean;
  onClose: () => void;
  selected: number;
  selectedTime: { current: string; following: string };
}) {
  // create backdrop
  // create modal
  //  - always at center
  //  - x, save, backdrop

  const agendaContext = useContext(CalendarContext);
  const agenda = agendaContext!.currentAgenda;

  const dispatch = useDispatch();

  const [taskValue, setTaskValue] = useState({
    title: "",
    description: "",
  });

  const [errorTask, setErrorTask] = useState({
    title: false,
  });
  const portalRoot = document.getElementById("portal-modal");

  const inputValidation = () => {
    const proxyTask = taskValue;
    const proxyErrorTask = errorTask;
    const taskKey = Object.keys(errorTask);

    const error = { isValid: true, error: {} };

    taskKey.forEach((value: string) => {
      if (
        proxyTask[value as keyof typeof proxyTask].replace(/\s+/g, "") === ""
      ) {
        proxyErrorTask[value as keyof typeof proxyErrorTask] = true;
        error.isValid = false;
        error.error = {
          ...error.error,
          [value]: proxyTask[value as keyof typeof proxyTask],
        };
      } else {
        proxyErrorTask[value as keyof typeof proxyErrorTask] = false;
      }
    });
    setErrorTask({ ...proxyErrorTask });

    return error;
  };

  const saveTask = () => {
    const isError = inputValidation();
    if (isError.isValid) {
      const date = new Date(agenda.date);

      if (selected === -1) {
        date.setHours(0);
      } else {
        date.setHours(selected);
      }
      // console.log(date);
      // console.log(agenda);

      const task_data = {
        task: taskValue.title,
        description: taskValue.description,

        date: date.toISOString(),
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),

        index: -1,
      };

      console.log(task_data);

      dispatch({ type: "POST_TASK", payload: task_data });
      dispatch({
        type: "GET_TASK",
        payload: {
          ...agenda.fullNum,
          fullDate: agenda.date,
        },
      });
      clearTask();
      onClose();
    } else {
      console.log("input error");
    }
  };

  const clearTask = () => {
    setTaskValue({
      title: "",
      description: "",
    });
  };

  if (!portalRoot) {
    return <div>Portal root not found!</div>;
  }
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <Backdrop
      close={() => {
        onClose();
        setErrorTask({ ...errorTask, title: false });
        clearTask();
      }}
    >
      <div
        className={styles.addTaskModalContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div>
          <p>
            {agenda.full.day}, {agenda.full.month} {agenda.full.date}
          </p>
          {selectedTime.current ? (
            <p>
              {selectedTime.current} - {selectedTime.following}
            </p>
          ) : (
            <></>
          )}
        </div>

        <input
          className="input-validation"
          placeholder="add task"
          onChange={(e) => {
            setTaskValue(() => {
              return { ...taskValue, title: e.target.value };
            });
          }}
          onFocus={() => {
            setErrorTask({ ...errorTask, title: false });
          }}
          value={taskValue.title}
          style={errorTask.title ? { borderBottom: "1px solid red" } : {}}
        />

        <textarea
          className="textarea-task "
          placeholder="add description"
          onChange={(e) => {
            setTaskValue(() => {
              return { ...taskValue, description: e.target.value };
            });
          }}
          value={taskValue.description}
        />
        <button className="button-task" onClick={saveTask}>
          Save
        </button>
      </div>
    </Backdrop>,
    portalRoot
  );
}

export function Backdrop(props: {
  children: ReactNode;
  close: (e?: any) => void;
}) {
  // makes child element only clickable

  return (
    <div className="backdrop" onClick={props.close}>
      {props.children}
    </div>
  );
}
