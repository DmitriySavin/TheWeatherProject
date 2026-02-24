// import { useEffect, useState } from "react";
// import s from "./WeeklyForecast.module.css";

// const API_KEY = "cba63fdcf08d3619930d27c1f8549784";
// const GEO_URL = "https://api.openweathermap.org";
// const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

// export default function WeeklyForecast({ city }) {
//     const [forecast, setForecast] = useState(null); // сюди буде приходити прогноз
//     const [error, setError] = useState(null); // сюди буде приходити помилка
//     const [isLoading, setIsLoading] = useState(false); // грузіння

//     // чат кинув такий об'єкт на основі даних, які я знайшов в open-meteo
//     const weatherCodeMap = {
//         0: { description: "Clear sky", icon: "01d" },
//         1: { description: "Mainly clear", icon: "02d" },
//         2: { description: "Partly cloudy", icon: "03d" },
//         3: { description: "Overcast", icon: "04d" },
//         45: { description: "Fog", icon: "50d" },
//         48: { description: "Depositing rime fog", icon: "50d" },
//         51: { description: "Light drizzle", icon: "09d" },
//         53: { description: "Moderate drizzle", icon: "09d" },
//         55: { description: "Dense drizzle", icon: "09d" },
//         56: { description: "Light freezing drizzle", icon: "13d" },
//         57: { description: "Dense freezing drizzle", icon: "13d" },
//         61: { description: "Slight rain", icon: "10d" },
//         63: { description: "Moderate rain", icon: "10d" },
//         65: { description: "Heavy rain", icon: "10d" },
//         66: { description: "Light freezing rain", icon: "13d" },
//         67: { description: "Heavy freezing rain", icon: "13d" },
//         71: { description: "Slight snow fall", icon: "13d" },
//         73: { description: "Moderate snow fall", icon: "13d" },
//         75: { description: "Heavy snow fall", icon: "13d" },
//         77: { description: "Snow grains", icon: "13d" },
//         80: { description: "Slight rain showers", icon: "09d" },
//         81: { description: "Moderate rain showers", icon: "09d" },
//         82: { description: "Violent rain showers", icon: "09d" },
//         85: { description: "Slight snow showers", icon: "13d" },
//         86: { description: "Heavy snow showers", icon: "13d" },
//         95: { description: "Thunderstorm", icon: "11d" },
//         96: { description: "Thunderstorm with slight hail", icon: "11d" },
//         99: { description: "Thunderstorm with heavy hail", icon: "11d" },
//     };

//     useEffect(() => {
//         if (!city) return; // якщо не прийшло місто, тоді не виконуй цю логіку

//         function fetchData() {
//             // цю функцію ми викличемо нижче
//             // отримаємо координати міста
//             setIsLoading(true); // загрузка = true
//             setError(null); // на всякий випадок error = null, якщо при минулому виконанні була помилка
//             fetch(`${GEO_URL}/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`) // запит по місту
//                 .then((res) => {
//                     if (!res.ok) throw new Error("Geo error"); // якщо запит пройшов НЕ успішно, то повертається помилка
//                     return res.json(); // в іншому випадку, форматуємо отриманні дані в json формат
//                 })
//                 .then((geoData) => {
//                     if (!geoData.length) throw new Error("City not found"); // якщо такого міста не існує в базі даних, тоді побачимо помилку

//                     const { lat, lon } = geoData[0]; // дістаємо координати з масиву отриманних даних

//                     // отримаємо прогноз на основі отриманих координатів
//                     return fetch(
//                         `${WEATHER_URL}?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=8`,
//                         // робимо запит на отриманні координати
//                     );
//                 })
//                 .then((res) => {
//                     if (!res.ok) throw new Error("Weather error"); // якщо запит пройшов НЕ успішно, то повертається помилка
//                     return res.json(); // в іншому випадку, форматуємо отриманні дані в json формат
//                 })
//                 .then((data) => {
//                     setForecast(data.daily); // дістаємо з отриманного масиву об'єкт з прогнозом на тиждень та додаємо його в наш масив прогнозу
//                 })
//                 .catch((err) => {
//                     setError(err.message); // ловимо помилку. в хук стану помилки нам прийде повідомлення з помилкою, яке ми створили через конструктор Error
//                     setForecast(null); // якщо прийде помилка, то відповідно в масиві нічого не буде
//                 })
//                 .finally(() => {
//                     setIsLoading(false); // гарантовано загрузка припинеться
//                 });
//         }

//         fetchData(); // виклик цієї функції
//     }, [city]);

//     if (isLoading) return <p>Loading...</p>; // текст при загрузці
//     if (error) return <p>Error: {error}</p>; // текст при помилці(нам вже прийшов error.message)
//     if (!forecast) return null; // якщо прогноз порожній, то нічого не повертай.

//     return (
//         <section className={s.forecast}>
//             <ul className={s.forecastList}>
//                 {forecast.time.map((date, index) => {
//                     const code = forecast.weather_code[index];
//                     const { description, icon } = weatherCodeMap[code] || {
//                         description: "Unknown",
//                         icon: "01d",
//                     };
//                     const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

//                     return (
//                         <li key={date}>
//                             {/* дата, яку відформатував за допомогою чата */}
//                             <span>
//                                 {new Date(date).toLocaleDateString("en-US", {
//                                     weekday: "short",
//                                     month: "short",
//                                     day: "numeric",
//                                 })}
//                             </span>

//                             {/* 2️ іконка з температура */}
//                             <span>
//                                 <img src={iconUrl} alt={description} />
//                                 {Math.round(forecast.temperature_2m_max[index])}°/
//                                 {Math.round(forecast.temperature_2m_min[index])}°C
//                             </span>

//                             {/* характеристика погоди */}
//                             <span>{description}</span>
//                         </li>
//                     );
//                 })}
//             </ul>
//         </section>
//     );
// }

import { useEffect, useState } from "react";
import s from "./WeeklyForecast.module.css";

const API_KEY = "cba63fdcf08d3619930d27c1f8549784";
const GEO_URL = "https://api.openweathermap.org";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

export default function WeeklyForecast() {
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState(""); // Für das Input-Feld
  const [searchCity, setSearchCity] = useState(""); // Erst dies löst den Effekt aus

  // чат кинув такий об'єкт на основі даних, які я знайшов в open-meteo
  const weatherCodeMap = {
    0: { description: "Clear sky", icon: "01d" },
    1: { description: "Mainly clear", icon: "02d" },
    2: { description: "Partly cloudy", icon: "03d" },
    3: { description: "Overcast", icon: "04d" },
    45: { description: "Fog", icon: "50d" },
    48: { description: "Depositing rime fog", icon: "50d" },
    51: { description: "Light drizzle", icon: "09d" },
    53: { description: "Moderate drizzle", icon: "09d" },
    55: { description: "Dense drizzle", icon: "09d" },
    56: { description: "Light freezing drizzle", icon: "13d" },
    57: { description: "Dense freezing drizzle", icon: "13d" },
    61: { description: "Slight rain", icon: "10d" },
    63: { description: "Moderate rain", icon: "10d" },
    65: { description: "Heavy rain", icon: "10d" },
    66: { description: "Light freezing rain", icon: "13d" },
    67: { description: "Heavy freezing rain", icon: "13d" },
    71: { description: "Slight snow fall", icon: "13d" },
    73: { description: "Moderate snow fall", icon: "13d" },
    75: { description: "Heavy snow fall", icon: "13d" },
    77: { description: "Snow grains", icon: "13d" },
    80: { description: "Slight rain showers", icon: "09d" },
    81: { description: "Moderate rain showers", icon: "09d" },
    82: { description: "Violent rain showers", icon: "09d" },
    85: { description: "Slight snow showers", icon: "13d" },
    86: { description: "Heavy snow showers", icon: "13d" },
    95: { description: "Thunderstorm", icon: "11d" },
    96: { description: "Thunderstorm with slight hail", icon: "11d" },
    99: { description: "Thunderstorm with heavy hail", icon: "11d" },
  };

  useEffect(() => {
    if (!searchCity) return;

    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        // 1. Geocoding
        const geoRes = await fetch(
          `${GEO_URL}/geo/1.0/direct?q=${searchCity}&limit=1&appid=${API_KEY}`,
        );
        const geoData = await geoRes.json();

        if (!geoData.length) throw new Error("City not found");
        const { lat, lon } = geoData[0];

        // 2. Wetterdaten
        const weatherRes = await fetch(
          `${WEATHER_URL}?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=8`,
        );
        const data = await weatherRes.json();

        setForecast(data.daily);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          setForecast(null);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [searchCity]);

  // Handler für das Formular
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(inputValue);
  };

  return (
    <section className={s.forecast}>
      <form onSubmit={handleSubmit} className={s.searchForm}>
        <input
          type="text"
          value={inputValue}
          placeholder="Enter city..."
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p className={s.error}>Error: {error}</p>}

      {forecast && !isLoading && (
        <ul className={s.forecastList}>
          {forecast.time.map((date, index) => {
            const code = forecast.weather_code[index];
            const { description, icon } = weatherCodeMap[code] || {
              description: "Unknown",
              icon: "01d",
            };

            return (
              <li key={date} className={s.forecastItem}>
                <span className={s.date}>
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <img
                  src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                  alt={description}
                />
                <span className={s.temp}>
                  {Math.round(forecast.temperature_2m_max[index])}° /{" "}
                  {Math.round(forecast.temperature_2m_min[index])}°C
                </span>
                <span className={s.desc}>{description}</span>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
