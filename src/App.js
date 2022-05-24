import ReactDOM from "react-dom";
import Hero from "./components/Hero/Hero";
import Body from "./components/Body/Body";
import { useSelector } from "react-redux";
import Backdrop from "./components/UI/Backdrop/Backdrop";
import Modal from "./components/UI/Modal/Modal";

function App() {
  const {shown, title, description, color} = useSelector((state) => state.ui);
  return (
    <>
      <main>
        <Hero />
        <Body />
      </main>
      {shown &&
        ReactDOM.createPortal(
          <Backdrop>
            <Modal title={title} description={description} color={color} />
          </Backdrop>,
          document.getElementById("ui")
        )}
    </>
  );
}

export default App;
