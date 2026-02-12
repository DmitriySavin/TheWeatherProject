import "./App.css";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";
import News from "./components/News/News";

function App() {
  return (
    <>
      <Header />
      <News />
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
