import styles from "./WeatherHero.module.css";
import { IoSearchSharp } from "react-icons/io5";
import fetcharticleApi from "../../services/citysearch";
import { useState } from "react";
import { CityCards } from "../CityCards/CityCards";
import { WeatherHaracteristics } from "../WeatherHaracteristics/WeatherHaracteristics";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function WeatherHero() {
  const d = new Date();
  const day = d.getDate();
  const s = ["th", "st", "nd", "rd"][
    day % 10 > 3 || Math.floor((day % 100) / 10) == 1 ? 0 : day % 10
  ];
  const monthYear = d.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const weekday = d.toLocaleDateString("en-US", { weekday: "long" });
  const [name, setName] = useState("");
  const [articles, setArticles] = useState([]);

  // для везерХарактеристик
  const [selectedId, setSelectedId] = useState(null);

  const changeName = (name) => {
    setName(name);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetcharticleApi(name).then(
      (articlesApi) => setArticles([...articles, articlesApi]),
      setName(""),
    );
  };

  // для везерХарактеристик
  const toggleHaracteristics = (id) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const getWeatherData = () => {
    return articles.map((article) => ({
      feelsLike: article.feelsLike,
      temp: article.main.temp,
      minTemp: article.main.temp_min,
      maxTemp: article.main.temp_max,
      humidity: article.main.humidity,
      pressure: article.main.pressure,
      windSpeed: article.wind.speed,
      icon: article.weather[0].icon,
      visibility:
        article.visibility >= 10000
          ? "Unlimited"
          : `${article.visibility / 1000} km`,
      id: article.id,
    }));
  };

  const data = getWeatherData();

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>Weather dashboard</h1>

        <div className={styles.info}>
          <p className={styles.desc}>
            Create your personal list of favorite cities and always be aware of
            the weather.
          </p>

          <div className={styles.divider} />

          <h3 className={styles.date}>
            {monthYear} <br />
            {weekday}, {day}
            {s}
          </h3>
        </div>

      <>
        <ul className={styles.list}>
          {articles.map((article) => (
            <CityCards
              key={article.id}
              article={article}
              filteredArticles={filteredArticles}
              id={article.id}
              handleRefresh={handleRefresh}
              toggleHaracteristics={toggleHaracteristics}
            />
          ))}
        </ul>

{selectedId && (
  <WeatherHaracteristics
    data={data.find((item) => item.id === selectedId)}
  />
)}
        <ToastContainer />
      </>

        <form className={styles.search} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search location..."
            onChange={(e) => changeName(e.target.value)}
            value={name}
          />
          <button className={styles.searchBtn}>
            <IoSearchSharp className={styles.searchIcon} />
          </button>
        </form>
      </div>
    </section>

  );
}
  
