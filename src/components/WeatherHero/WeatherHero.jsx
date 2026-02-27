import styles from "../WeatherHero/WeatherHero.module.css";
import { IoSearchSharp } from "react-icons/io5";
import fetcharticleApi from "../../services/citysearch";
import { useState } from "react";
import { CityCards } from "../CityCards/CityCards";
import { WeatherHaracteristics } from "../WeatherHaracteristics/WeatherHaracteristics";
import { WeatherChart } from "../LineChart/LineChart_component";
import { ToastContainer, toast, Slide  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function WeatherHero() {
  const d = new Date();
  const day = d.getDate();
  const s = ["th", "st", "nd", "rd"][
    day % 10 > 3 || Math.floor((day % 100) / 10) === 1 ? 0 : day % 10
  ];
  const monthYear = d.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const weekday = d.toLocaleDateString("en-US", { weekday: "long" });

  const [name, setName] = useState("");
  const [articles, setArticles] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  // Добавление нового города
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name) return;

    // Проверка на дубли
    if (articles.some((a) => a.name?.toLowerCase() === name.toLowerCase())) {
      toast.info("City already in the list");
      return;
    }

    try {
      const newArticle = await fetcharticleApi(name);
      // Ограничиваем список 3 последними элементами
      setArticles((prev) => [...prev, newArticle].slice(-3));
      setName("");
    } catch (error) {
      toast.error("Not found or Api failed", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    }
  };

  // Toggle характеристик
  const toggleHaracteristics = (id) => {
    if (!id) return;
    setSelectedId((prev) => (prev === id ? null : id));
  };

  // Обновление города
  const handleRefresh = async (id, name) => {
    try {
      const newData = await fetcharticleApi(name);
      setArticles((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                main: newData.main,
                weather: newData.weather,
                wind: newData.wind,
                visibility: newData.visibility,
                name: newData.name,
              }
            : item,
        ),
      );
      toast.success("City updated!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    } catch (error) {
      toast.error("Failed to refresh city", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    }
  };

  // Удаление города
  const filteredArticles = (cardId) => {
    if (!cardId) return;
    setArticles((prev) => prev.filter((article) => article.id !== cardId));
    if (selectedId === cardId) setSelectedId(null);
  };

  // Данные для WeatherHaracteristics
  const getWeatherData = () =>
    articles.map((article) => ({
      id: article.id ?? article.dt,
      name: article.name, // <-- обязательно!
      feelsLike: article.main?.feels_like ?? "-",
      temp: article.main?.temp ?? "-",
      minTemp: article.main?.temp_min ?? "-",
      maxTemp: article.main?.temp_max ?? "-",
      humidity: article.main?.humidity ?? "-",
      pressure: article.main?.pressure ?? "-",
      windSpeed: article.wind?.speed ?? "-",
      icon: article.weather?.[0]?.icon ?? "01d",
      visibility:
        article.visibility >= 10000
          ? "Unlimited"
          : `${article.visibility / 1000} km`,
    }));

  const data = getWeatherData();
  const selectedData = data.find((item) => item.id === selectedId);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.content}>
          <h1>Weather dashboard</h1>

          <div className={styles.info}>
            <p className={styles.desc}>
              Create your personal list of favorite cities and always be aware
              of the weather.
            </p>
            <div className={styles.divider} />
            <h3 className={styles.date}>
              {monthYear} <br />
              {weekday}, {day}
              {s}
            </h3>
          </div>

          <form className={styles.search} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search location..."
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <button className={styles.searchBtn}>
              <IoSearchSharp className={styles.searchIcon} />
            </button>
          </form>

          <ToastContainer />
        </div>
      </section>
      <ul className={styles.list}>
        {articles.map((article) => (
          <CityCards
            key={article.id ?? article.dt}
            article={article}
            id={article.id}
            filteredArticles={filteredArticles}
            toggleHaracteristics={toggleHaracteristics}
            handleRefresh={handleRefresh}
            selectedId={selectedId}
          />
        ))}
      </ul>
      {selectedData && (
        <>
          <WeatherHaracteristics data={selectedData} />
          <WeatherChart name={selectedData.name} />
        </>
      )}
    </>
  );
}
