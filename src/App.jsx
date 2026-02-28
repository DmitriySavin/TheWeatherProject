import "./App.css";
import WeatherHero from "./components/WeatherHero/WeatherHero";
import "./App.css";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/Header";
import Slider from "./components/Slider/Slider";
import News from "./components/News/News";
import WeeklyForecast from "./components/WeeklyForecast/WeeklyForecast";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <WeatherHero />
      <div className="container">
        <WeeklyForecast />
        <News />
        <Slider />
      </div>
      <Footer />
      <ToastContainer position="top-center" autoClose={1000} />
    </>
  );
}

export default App;
