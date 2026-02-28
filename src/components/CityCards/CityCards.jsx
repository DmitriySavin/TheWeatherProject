import styles from "./CityCards.module.css";
import { FaRedoAlt, FaRegHeart, FaHeart, FaTrashAlt } from "react-icons/fa";
import { useState } from "react";
import WeeklyForecast from "../WeeklyForecast/WeeklyForecast";

export const CityCards = ({
  article,
  filteredArticles,
  id,
  handleRefresh,
  toggleHaracteristics,
  showForecast,
}) => {
  const [heart, setHeart] = useState(false);

  const formatDateTime = (timestamp, timezone) => {
    const date = new Date((timestamp + timezone) * 1000);
    const time = date.toLocaleTimeString("uk-UA", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });
    const fullDate = date.toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    });
    const weekday = date.toLocaleDateString("en-US", {
      weekday: "long",
      timeZone: "UTC",
    });
    return { time, fullDate, weekday };
  };

  const { time, fullDate, weekday } = formatDateTime(
    article.dt,
    article.timezone,
  );
  const iconCode = article.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const toggleHeart = () => setHeart(!heart);
  const name = article.name;

  return (
    <li className={styles.item}>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>{article.sys.country}</h2>
        <h2 className={styles.title}>{article.name}</h2>
      </div>

      <p className={styles.time}>{time}</p>

      <div className={styles.buttonWrapper}>
        <button type="button" className={styles.button}>
          <p className={styles.btnText}>Hourly forecast</p>
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => showForecast(article.name)}
        >
          <p className={styles.btnText}>Weekly forecast</p>
        </button>
      </div>

      <p className={styles.date}>
        {fullDate} | {weekday}
      </p>

      <div className={styles.cardContent}>
        <img src={iconUrl} alt="weather icon" className={styles.cardImg} />
      </div>

      <p className={styles.temp}>{article.main.temp}℃</p>

      <div className={styles.menuWrapper}>
        <div className={styles.menuWrapperFrame}>
          <button type="button" onClick={() => handleRefresh(id, name)}>
            <FaRedoAlt size={20} color="black" />
          </button>

          <button
            type="button"
            onClick={toggleHeart}
            className={styles.buttons}
          >
            {heart ? (
              <FaHeart size={20} color="red" />
            ) : (
              <FaRegHeart size={20} color="red" className={styles.iconBtn} />
            )}
          </button>
        </div>

        <div className={styles.menuWrapperFrame}>
          <button
            type="button"
            onClick={() => toggleHaracteristics(article.id)}
            className={styles.button}
          >
            See more
          </button>
          <button type="button" onClick={() => filteredArticles(id)}>
            <FaTrashAlt size={20} color="black" />
          </button>
        </div>
      </div>
    </li>
  );
};
