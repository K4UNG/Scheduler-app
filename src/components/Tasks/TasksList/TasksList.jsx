import styles from "./TasksList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../../store/uiSlice";
import { tasksActions } from "../../../store/tasksSlice";

export default function TasksList() {
  const current = useSelector((state) => state.tasks.current);
  const tasks = useSelector((state) => state.tasks.schedules[current]);
  const mode = useSelector((state) => state.tasks.mode);
  const selected = useSelector((state) => state.tasks.selected);
  const dispatch = useDispatch();

  return (
    <div className={styles.list}>
      <h2>Tasks</h2>
      <div className={styles.list__wrapper}>
        {tasks.length === 0 && <p>No tasks added yet.</p>}
        {tasks.map((task) => {
          return (
            <div
              className={
                styles.task +
                ` ${
                  selected === task.id && mode === "Select" && styles.selected
                }`
              }
              key={task.id}
              onClick={() => {
                if (mode === "Inspect") {
                  dispatch(
                    uiActions.openModal({
                      id: task.id,
                      title: task.title,
                      description: task.description,
                      color: task.color,
                    })
                  );
                } else if (mode === "Select") {
                  dispatch(tasksActions.changeSelected(task.id));
                } else if (mode === 'Delete') {
                  dispatch(uiActions.askConfirmation({
                    title: task.title,
                    id: task.id
                  }));
                }
              }}
            >
              <span style={{ backgroundColor: task.color }} /> {task.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}
