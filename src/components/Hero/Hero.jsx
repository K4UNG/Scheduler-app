import styles from "./Hero.module.css";
import Clock from "../Clock/Clock";
import { useState } from "react";

export default function Hero() {
  const [current, setCurrent] = useState("noon");

  return (
    <section className={styles.hero}>
      <h1 className={styles.hero__title}>Scheduler</h1>
      {current === "noon" && <Clock time={1} />}
      {current === "night" && <Clock time={13} />}
      <select
        value={current}
        className={styles.select}
        onChange={(e) => {
          setCurrent(e.target.value);
        }}
      >
        <option value="noon">1AM-12AM</option>
        <option value="night">1PM-12PM</option>
      </select>
    </section>
  );
}
