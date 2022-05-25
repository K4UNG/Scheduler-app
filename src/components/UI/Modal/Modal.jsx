import styles from "./Modal.module.css";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/uiSlice";
import { tasksActions } from "../../../store/tasksSlice";
import { useState } from "react";

export default function Modal({ id, title, color, description }) {
  const [mode, setMode] = useState("view");
  const [colorIn, setColor] = useState(color);
  const [titleIn, setTitle] = useState(title);
  const [descriptionIn, setDescription] = useState(description);

  const dispatch = useDispatch();

  function editHandler() {
    setMode("edit");
  }

  function closeModal() {
    dispatch(uiActions.closeModal())
  }

  function applyHandler() {
    closeModal()
    dispatch(tasksActions.updateTask({
      id,
      title: titleIn,
      color: colorIn,
      description: descriptionIn
    }))
  }

  return (
    <div className={styles.modal}>
      <button
        className={styles.close}
        onClick={closeModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill=""
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <h2>{title}</h2>
      {mode === "edit" && (
        <>
          <label htmlFor="title">title:</label>
          <input
            className={styles.title}
            value={titleIn}
            onChange={(e) => setTitle(e.target.value)}
          />
        </>
      )}
      <p>
        color: {mode === "view" && <span style={{ backgroundColor: color }} />}
        {mode === "edit" && (
          <input
            type="color"
            value={colorIn}
            onChange={(e) => setColor(e.target.value)}
          />
        )}
      </p>
      <label htmlFor="description">description:</label>
      {mode === "view" && <p id="description">{description}</p>}
      {mode === "edit" && (
        <textarea
          value={descriptionIn}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      )}

      {mode === "view" && (
        <button onClick={editHandler} className={styles.edit}>
          edit
        </button>
      )}
      {mode === "edit" && (
        <button onClick={applyHandler} className={styles.edit}>
          Apply
        </button>
      )}
    </div>
  );
}
