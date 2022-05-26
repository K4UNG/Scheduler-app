import styles from "./Hero.module.css";
import Clock from "../Clock/Clock";
import { useState, useEffect } from "react";

export default function Hero() {
  const [current, setCurrent] = useState("noon");
  const [screen, setScreen] = useState(null);

  useEffect(() => {
    const getScreen = () => {
      const width = window.innerWidth;
      if (width >= 860) {
        setScreen("desktop");
      } else {
        setScreen("mobile");
      }
    };
    getScreen();
    window.onresize = getScreen;
    return () => window.removeEventListener("resize", getScreen);
  }, []);

  return (
    <section className={styles.hero}>
      <h1 className={styles.hero__title}>Scheduler</h1>
      <div className={styles.clock__wrapper}>
        {(current === "noon" || screen === "desktop") && (
          <div className={styles.div}>
            <Clock time={1} />
            {screen === "desktop" && <p>1AM-12AM</p>}
          </div>
        )}
        {(current === "night" || screen === "desktop") && (
          <div className={styles.div}>
            <Clock time={13} />
            {screen === "desktop" && <p>1PM-12PM</p>}
          </div>
        )}
      </div>

      {screen === "mobile" && (
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
      )}
    </section>
  );
}
