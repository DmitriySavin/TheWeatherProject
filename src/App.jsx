import "./App.css";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className="container">
      <Header />
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;
