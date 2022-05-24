import styles from "./Clock.module.css";
import { useSelector, useDispatch } from "react-redux";
import { tasksActions } from "../../store/tasksSlice";
import { uiActions } from "../../store/uiSlice";

let degree = [];

for (let i = 15; i < 360; i += 30) {
  degree.push(i);
}

export default function Clock({ time }) {
  const current = useSelector((state) => state.tasks.current);
  const selected = useSelector((state) => state.tasks.selected);
  const mode = useSelector((state) => state.tasks.mode);
  const dispatch = useDispatch();

  const tasks = useSelector((state) =>
    state.tasks.schedules[current].reduce((list, task) => {
      let obj = { ...list };
      if (obj.hasOwnProperty(task.color)) {
        obj[task.color] = [...obj[task.color], ...task.times];
      } else {
        obj[task.color] = [...task.times];
      }
      return obj;
    }, {})
  );

  const taskList = useSelector((state) => state.tasks.schedules[current]);

  const colors = Object.keys(tasks);
  let hour = time - 1;

  return (
    <div className={styles.clock}>
      {degree.map((deg) => {
        hour++;
        let curr;
        colors.forEach((color) => {
          if (tasks[color].includes(hour)) {
            curr = color;
          }
        });
        let time = hour;

        let pieceStyle = {
          transform: `translateX(-50%) rotate(${deg}deg)`,
        };
        let task
        if (curr) {
          pieceStyle.backgroundColor = curr;
          task = taskList.find(task => task.color === curr)
        }

        return (
          <div
            key={deg}
            className={styles.piece}
            style={pieceStyle}
            onClick={() => {
              if (mode === 'Inspect' && curr) {
                dispatch(uiActions.openModal({
                  title: task.title, 
                  description: task.description,
                  color: task.color
                }))
              }
              else if (mode === "Select" && selected) {
                const task = taskList.find((item) => item.id === selected);
                dispatch(
                  tasksActions.addTime({
                    id: task.id,
                    time: time,
                  })
                );
              }
            }}
          />
        );
      })}
    </div>
  );
}
