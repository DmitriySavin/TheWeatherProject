import { useEffect, useState } from "react";
import styles from "./LineChart_style.module.css";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export function WeatherChart() {
  const [city, setCity] = useState("Kyiv");
  const [chartData, setChartData] = useState(null);


  const fetchWeather = async (searchCity) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=9abb2e573db1c5f1f867196375388bbe&units=metric`
      );

      const data = await response.json();

      if (!data.list) {
        alert("Місто не знайдено!"); 
        return;
      }

      const labels = data.list.slice(0, 8).map(item =>
        new Date(item.dt * 1000).getHours() + ":00"
      );

      const temps = data.list.slice(0, 8).map(item =>
        item.main.temp
      );

      setChartData({
        labels,
        datasets: [{
          label: `Температура в ${searchCity}`, 
          data: temps,
          borderColor: "orange",
          backgroundColor: "rgba(255,165,0,0.2)",
          tension: 0.3
        }]
      });

    } catch (error) {
      console.error("Помилка:", error);
    }
  };


  useEffect(() => {
    fetchWeather(city);
  
  }, []);

  function handleClick() {
    if (city.trim() !== "") {
      fetchWeather(city);
    }
  }

  return (
    <section className={styles.section}>
      <div className="container">
      <div className={styles.background}>
        <h3 className={styles.title}>Hourly forecast</h3>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Введіть місто"
        />
        <button onClick={handleClick}>Шукати</button>

        {chartData && <Line className={styles.line}  data={chartData} />}
      </div>
    </div>
    </section>
  );
}