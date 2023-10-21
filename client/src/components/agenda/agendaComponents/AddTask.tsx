import styles from "../Agenda.module.css";

import ReactDOM from "react-dom";
import { ReactNode } from "react";
export function AddTaskModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
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
        <InputValidation />
        <textarea className="textarea-task " placeholder="add description" />
        <button
          className="button-task"
          onClick={() => {
            onClose();
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
