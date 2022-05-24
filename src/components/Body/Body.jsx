import styles from "./Body.module.css";
import Schedule from "../Tasks/Schedule/Schedule";
import NewTask from "../Tasks/NewTask/NewTask";
import TasksList from "../Tasks/TasksList/TasksList";
import { useSelector, useDispatch } from "react-redux";
import { tasksActions } from "../../store/tasksSlice";

const modes = ["Inspect", "Select", "Delete"];

export default function Body() {
  const mode = useSelector((state) => state.tasks.mode);
    const dispatch = useDispatch()

  return (
    <div className={styles.body}>
      <div className={styles.buttons}>
        {modes.map((curr) => {
          return (
            <button
                key={curr}
              className={`${styles.btn} ${mode === curr && styles.active}`}
              onClick={() => {
                  dispatch(tasksActions.changeMode(curr))
              }}
            >
              {curr}
            </button>
          );
        })}
      </div>
      <Schedule />
      <TasksList />
      <NewTask />
    </div>
  );
}
