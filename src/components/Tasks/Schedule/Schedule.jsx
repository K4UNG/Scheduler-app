import styles from "./Schedule.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { tasksActions } from "../../../store/tasksSlice";
import { uiActions } from "../../../store/uiSlice";

export default function Schedule() {
  const options = useSelector((state) => Object.keys(state.tasks.schedules));
  const selected = useSelector((state) => state.tasks.current);
  const mode = useSelector(state => state.tasks.mode)
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  function addSchedule(e) {
    e.preventDefault();
    if (!name || options.includes(name)) {
      setError(true);
      return;
    }
    dispatch(tasksActions.addSchedule(name));
    setName("");
  }

  function scheduleChangeHandler(e) {
    dispatch(tasksActions.changeSchedule(e.target.value));
  }

  return (
    <div className={styles.schedule}>
      <h2>Your Schedules</h2>
      <div className={styles.wrapper}>
        <select
          value={selected}
          className="select"
          onChange={scheduleChangeHandler}
        >
          {options.map((option) => {
            return (
              <option value={option} key={option}>
                {option}
              </option>
            );
          })}
        </select>
        {mode === 'Delete' && options.length > 1 && <button onClick={() => {
          dispatch(uiActions.askConfirmation({
            title: selected,
            id: 'remove'
          }))
        }} className={`btn ${styles.delete}`}>Delete</button>}
        <br className={styles.break} />
        <label htmlFor="name">Create a new one</label>
        <br className={styles.break} />
        <form onSubmit={addSchedule}>
          <input
            id="name"
            placeholder="Schedule name"
            className={`input ${error && "error"}`}
            onChange={(e) => {
              setName(e.target.value);
              setError(null);
            }}
            value={name}
          />
          <br className={styles.break} />
          <button className="btn">Create</button>
        </form>
      </div>
    </div>
  );
}
