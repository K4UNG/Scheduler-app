import styles from "./NewTask.module.css";
import { useState } from "react";
import { tasksActions } from "../../../store/tasksSlice";
import { useDispatch, useSelector } from "react-redux";

export default function NewTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#777777");
  const current = useSelector((state) => state.tasks.current);
  const colors = useSelector((state) =>
    state.tasks.schedules[current].map((task) => task.color)
  );
  const [colorError, setColorError] = useState(null);
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const dispatch = useDispatch();

  function submitHandler(e) {
    e.preventDefault();
    if (colors.includes(color)) {
      setColorError("Please select a new color");
      return;
    } else if (!title) {
      setTitleError(true);
      return;
    } else if (!description) {
      setDescriptionError(true);
      return;
    }
    dispatch(
      tasksActions.addTask({
        id: Math.random(),
        title,
        description,
        color,
        times: [],
      })
    );
    setTitle("");
    setDescription("");
    setColor("#777777");
  }

  return (
    <div className={styles.wrapper}>
      <h2>Add a New Task</h2>
      <form onSubmit={submitHandler}>
        <label htmlFor="color">Color</label>
        <br />
        <div className={styles.color__wrapper}>
          <input
            id="color"
            type="color"
            value={color}
            onChange={(e) => {
              setColorError(null);
              setColor(e.target.value);
            }}
          />
          {colorError && <span>{colorError}</span>}
        </div>
        <br />

        <label htmlFor="title">Title</label>
        <br />
        <input
          id="title"
          type="text"
          className={`input ${styles.title} ${titleError && "error"}`}
          placeholder="Task title"
          value={title}
          onChange={(e) => {
            setTitleError(false);
            setTitle(e.target.value);
          }}
        />
        <br />

        <label htmlFor="description">Description</label>
        <br />
        <textarea
          id="description"
          className={`input ${styles.desc} ${descriptionError && "error"}`}
          placeholder="Task description"
          value={description}
          onChange={(e) => {
            setDescriptionError(false);
            setDescription(e.target.value);
          }}
        ></textarea>
        <br />
        <button className="btn">Add</button>
      </form>
    </div>
  );
}
