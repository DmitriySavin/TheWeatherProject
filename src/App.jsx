// import "./App.css";
// import { ToastContainer } from "react-toastify";
// import Header from "./components/Header/Header";

// function App() {
//   return (
//     <>
//       <Header />
//       <ToastContainer position="top-center" autoClose={1000} />
//     </>
//   );
// }

// export default App;

import "./App.css";

import { WeatherHaracteristics } from "./components/WeatherHaracteristics/WeatherHaracteristics";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";
import News from "./components/News/News";
import WeatherHero from "./components/WeatherHero/WeatherHero";

function App() {
  return (
    <>
      <div className="container">
        <WeatherHaracteristics />
        <WeatherHero />

        <Header />
        <News />
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </>
  );
}

export default App;
