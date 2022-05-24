import styles from "./NewTask.module.css";
import { useState } from "react";
import { tasksActions } from "../../../store/tasksSlice";
import { useDispatch } from "react-redux";

export default function NewTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#777777");

  const dispatch = useDispatch()

  function submitHandler(e) {
    e.preventDefault()
    dispatch(tasksActions.addTask({
        id: Math.random(),
        title,
        description,
        color,
        times: []
    }))
    setTitle('')
    setDescription('')
    setColor('#777777')
  }

  return (
    <div className={styles.wrapper}>
      <h2>Add a New Task</h2>
      <form onSubmit={submitHandler}>
        <label htmlFor="color">Color</label>
        <br />
        <input
          id="color"
          type="color"
          value={color}
          onChange={(e) => {
            setColor(e.target.value)
          }}
        />
        <br />

        <label htmlFor="title">Title</label>
        <br />
        <input
          id="title"
          type="text"
          className="input"
          placeholder="Task title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <br />

        <label htmlFor="description">Description</label>
        <br />
        <textarea
          id="description"
          className="input"
          placeholder="Task description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <br />
        <button className="btn">Add</button>
      </form>
    </div>
  );
}
