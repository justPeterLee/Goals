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
    <Backdrop>
      <div className={styles.addTaskModalContainer}></div>
    </Backdrop>,
    portalRoot
  );
}

function Backdrop(props: { children: ReactNode }) {
  // makes child element only clickable
  return <div className="backdrop">{props.children}</div>;
}
