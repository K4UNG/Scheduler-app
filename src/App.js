import ReactDOM from "react-dom";
import Hero from "./components/Hero/Hero";
import Body from "./components/Body/Body";
import { useSelector } from "react-redux";
import Backdrop from "./components/UI/Backdrop/Backdrop";
import Modal from "./components/UI/Modal/Modal";
import Confirm from "./components/UI/Confirm/Confirm";

function App() {
  const { id, shown, title, description, color, conf, confTitle } = useSelector(
    (state) => state.ui
  );
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
            <Confirm
              title={confTitle}
            />
          </Backdrop>,
          document.getElementById("ui")
        )}
    </>
  );
}

export default App;
