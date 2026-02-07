import "./App.css";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
