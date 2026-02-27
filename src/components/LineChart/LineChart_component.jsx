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

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

export const WeatherChart = ({ name }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (!name) return;

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=9abb2e573db1c5f1f867196375388bbe&units=metric`
        );
        const data = await response.json();
        if (!data.list) return;

        const labels = data.list.slice(0, 8).map(item =>
          new Date(item.dt * 1000).getHours() + ":00"
        );
        const temps = data.list.slice(0, 8).map(item => item.main.temp);

        setChartData({
          labels,
          datasets: [{
            label: `Temperature in ${name}`,
            data: temps,
            borderColor: "orange",
            backgroundColor: "rgba(255,165,0,0.2)",
            tension: 0.3
          }]
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchWeather();
  }, [name]);

  return (
    <section className={styles.section}>
      <div className={styles.background}>
        {chartData ? <Line className={styles.line} data={chartData} /> : <p>Loading chart...</p>}
      </div>
    </section>
  );
};