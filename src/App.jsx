
import './App.css'
import { WeatherHaracteristics } from './components/WeatherHaracteristics/WeatherHaracteristics'
import WeatherHero from './components/WeatherHero/WeatherHero'
import "./App.css";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";


function App() {
  return (
    <>

      <WeatherHero />

      <Header />
      <ToastContainer position="top-center" autoClose={1000} />

    </>
  );
}

export default App;


// import "./App.css";

// import { WeatherHaracteristics } from "./components/WeatherHaracteristics/WeatherHaracteristics";
// import "./App.css";
// import { ToastContainer } from "react-toastify";
// import Header from "./components/Header/Header";
// import News from "./components/News/News";

// function App() {
//   return (
//     <>

//       {/* <div className="container"> */}
//         {/* <WeatherHaracteristics /> */}

//       <Header />
//       <News />
//         <ToastContainer position="top-right" autoClose={2000} />
//          {/* </div> */}

//       <Header />
//       <News />
//       <ToastContainer position="top-right" autoClose={2000} />

//     </>
//   );
// }

// export default App;
