import styles from './Schedule.module.css'
import { useSelector } from "react-redux";

export default function Schedule() {
  const options = useSelector((state) => Object.keys(state.tasks.schedules));
  const selected = useSelector((state) => state.current);

  return (
    <div className={styles.schedule}>
      <h2>Your Schedules</h2>
      <select value={selected} className="select">
        {options.map((option) => {
          return (
            <option value={option} key={option}>
              {option}
            </option>
          );
        })}
      </select>
      <br/>
      <label htmlFor="name" >Create a new one</label>
      <br/>
      <input id="name" placeholder="Schedule name" className="input" />
      <br/>
      <button className="btn">Create</button>
    </div>
  );
}
