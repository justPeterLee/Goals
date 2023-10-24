import styles from "../Agenda.module.css";

import ReactDOM from "react-dom";
import { ReactNode } from "react";
export function AddTaskModal({
  isOpen,
  onClose,
  selected,
}: {
  isOpen: boolean;
  onClose: () => void;
  selected: {
    time: { current: string; following: string };
    date: string | undefined;
  };
}) {
  // create backdrop
  // create modal
  //  - always at center
  //  - x, save, backdrop

  const portalRoot = document.getElementById("portal-modal");

  if (!portalRoot) {
    return <div>Portal root not found!</div>;
  }
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <Backdrop close={onClose}>
      <div
        className={styles.addTaskModalContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div>
          {selected!.date} {selected.time.current} - {selected.time.following}
        </div>
        <InputValidation />
        <textarea className="textarea-task " placeholder="add description" />
        <button
          className="button-task"
          onClick={() => {
            console.log(selected);
          }}
        >
          Save
        </button>
      </div>
    </Backdrop>,
    portalRoot
  );
}

function Backdrop(props: { children: ReactNode; close: () => void }) {
  // makes child element only clickable

  return (
    <div className="backdrop" onClick={props.close}>
      {props.children}
    </div>
  );
}

function InputValidation() {
  return (
    <>
      <input className="input-validation" placeholder="add task"></input>
    </>
  );
}
