import styles from "./Schedule.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { tasksActions } from "../../../store/tasksSlice";

export default function Schedule() {
  const options = useSelector((state) => Object.keys(state.tasks.schedules));
  const selected = useSelector((state) => state.tasks.current);
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
      <br />
      <label htmlFor="name">Create a new one</label>
      <br />
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
        <br />
        <button className="btn">Create</button>
      </form>
    </div>
  );
}
