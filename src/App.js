import ReactDOM from "react-dom";
import Hero from "./components/Hero/Hero";
import Body from "./components/Body/Body";
import { useSelector, useDispatch } from "react-redux";
import Backdrop from "./components/UI/Backdrop/Backdrop";
import Modal from "./components/UI/Modal/Modal";
import Confirm from "./components/UI/Confirm/Confirm";
import { useEffect } from "react";
import { tasksActions } from "./store/tasksSlice";

let initial = true

function App() {
  const { id, shown, title, description, color, conf, confTitle, confId } =
    useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.tasks);

  useEffect(() => {
    const tasks = localStorage.getItem("schedules");
    if (!tasks) return
    dispatch(
      tasksActions.replaceTasks(JSON.parse(tasks))
    );
  }, [dispatch])

  useEffect(() => {
    if (initial) {
      initial = false;
      return;
    }
    localStorage.setItem("schedules", JSON.stringify(data));
  }, [data]);

  return (
    <>
      <main>
        <Hero />
        <Body />
      </main>
      {shown &&
        ReactDOM.createPortal(
          <Backdrop>
            <Modal
              id={id}
              title={title}
              description={description}
              color={color}
            />
          </Backdrop>,
          document.getElementById("ui")
        )}
      {conf &&
        ReactDOM.createPortal(
          <Backdrop>
            <Confirm title={confTitle} id={confId} />
          </Backdrop>,
          document.getElementById("ui")
        )}
    </>
  );
}

export default App;
