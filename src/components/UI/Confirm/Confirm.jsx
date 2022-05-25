import styles from "./Confirm.module.css";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/uiSlice";
import { tasksActions } from "../../../store/tasksSlice";

export default function Confirm({ title, id }) {
  const dispatch = useDispatch();

  return (
    <div className={styles.modal}>
      <p>
        Are you sure you want to delete <b>{title}</b>?
      </p>
      <div className={styles.buttons}>
        <button
          onClick={() => {
            dispatch(uiActions.closeConfirmation());
          }}
          className={styles.cancel}
        >
          Cancel
        </button>
        <button className={styles.delete} onClick={() => {
            dispatch(tasksActions.removeTask(id))
            dispatch(uiActions.closeConfirmation())
        }}>
          Delete
        </button>
      </div>
    </div>
  );
}
