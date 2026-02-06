import styles from "./WeatherHaracteristics.module.css";

export const WeatherHaracteristics = () => {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        <li key={"#"} className={styles.item}>
          <p className={styles.itemTitle}>Feels like</p>
          <p className={styles.itemText}>30.0°C</p>
          <svg className={styles.icon}>
            <use></use>
          </svg>
        </li>
        <li key={"#"} className={styles.item}>
          <p className={styles.itemTitle}>Min °C</p>
          <p className={styles.itemText}>30.0°C</p>
          <p className={styles.itemTitle}>Max °C</p>
          <p className={styles.itemText}>30.0°C</p>
        </li>
        <li key={"#"} className={styles.item}>
          <p className={styles.itemTitle}>"Humidity"</p>
          <p className={styles.itemText}>"59%"</p>
          <svg className={styles.icon}>
            <use></use>
          </svg>
        </li>
        <li key={"#"} className={styles.item}>
          <p className={styles.itemTitle}>"Humidity"</p>
          <p className={styles.itemText}>"1007 Pa"</p>
          <svg>
            <use></use>
          </svg>
        </li>
        <li key={"#"} className={styles.item}>
          <p className={styles.itemTitle}>"Wind speed"</p>
          <p className={styles.itemText}>"3.17 m/s"</p>
          <svg className={styles.icon}>
            <use></use>
          </svg>
        </li>
        <li key={"#"} className={styles.item}>
          <p className={styles.itemTitle}>Visibility</p>
          <p className={styles.itemText}>"Unlimited%"</p>
          <svg className={styles.icon}>
            <use></use>
          </svg>
        </li>
      </ul>
    </div>
  );
};

// °C
