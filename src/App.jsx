import './App.css'
import WeatherHero from './components/WeatherHero/WeatherHero'
import "./App.css";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";
import Slider from "./components/Slider/Slider";
import News from "./components/News/News";
import WeeklyForecast from './components/WeeklyForecast/WeeklyForecast';

function App() {
  return (
    <>
      <Header />
      <WeatherHero />
      <div className="container">
        <WeeklyForecast />
        <News />
        <Slider />
        <ToastContainer position="top-center" autoClose={1000} />
      </div>
    </>
  );
}

export default App;