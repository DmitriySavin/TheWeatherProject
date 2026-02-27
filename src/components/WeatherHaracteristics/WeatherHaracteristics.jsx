import styles from "./WeatherHaracteristics.module.css";
import { FaTemperatureHigh } from "react-icons/fa";
<<<<<<< HEAD
import eye from "../../assets/images/eye.png";
import gradusnic from "../../assets/images/gradusnic.png";
import temperature from "../../assets/images/temperature.png";
import veter from "../../assets/images/veter.png";

export const WeatherHaracteristics = ({ data }) => {

  const iconUrl = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        
          
        
            <>
              <li key={`${data.id}--1`} className={styles.item}>
                <p className={styles.itemTitle}>Feels like</p>
                <p className={styles.itemText}>{data.temp}°C</p>
                <div className={styles.wrapperImg}>
                  <img src={temperature} alt="" className={styles.img}/>
                </div>
              </li>
              <li key={`${data.id}--2`} className={styles.item}>
                <p className={styles.itemTitle}>Min °C</p>
                <p className={styles.itemText}>{data.minTemp}°C</p>
                <p className={styles.itemTitle}>Max °C</p>
                <p className={styles.itemText}>{data.maxTemp}°C</p>
              </li>
              <li key={`${data.id}--3`} className={styles.item}>
                <p className={styles.itemTitle}>Humidity</p>
                <p className={styles.itemText}>{data.humidity}%</p>
                <div className={styles.wrapperImg}>
                  <img src={iconUrl} alt="Погода" className={styles.secongImg}/>
                </div>
              </li>
              <li key={`${data.id}--4`} className={styles.item}>
                <p className={styles.itemTitle}>Pressure</p>
                <p className={styles.itemText}>{data.pressure} Pa</p>
                <div className={styles.wrapperImg}>
                  <img src={gradusnic} alt="" className={styles.img}/>
                </div>
              </li>
              <li key={`${data.id}--5`} className={styles.item}>
                <p className={styles.itemTitle}>Wind speed</p>
                <p className={styles.itemText}>{data.windSpeed} m/s</p>
                <div className={styles.wrapperImg}>
                  <img src={veter} alt="" className={styles.img}/>
                </div>
              </li>
              <li key={`${data.id}--6`} className={styles.item}>
                <p className={styles.itemTitle}>Visibility</p>
                <p className={styles.itemText}>{data.visibility}</p>
                <div className={styles.wrapperImg}>
                  <img src={eye} alt="" className={styles.img}/>
                </div>
              </li>
            </>
          
      
      </ul>
    </div>
  );
};
=======
import fetchArticlesApi from "../../services/weatherApi";
import { Component } from "react";

export class WeatherHaracteristics extends Component {
  state = {
    name: "",
    weather: null,
    articles: [],
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.state.name) {
      return;
    }

    const { name } = this.state;
    const options = { name };
    fetchArticlesApi(options).then((articlesApi) =>
      this.setState((prevState) => ({
        articles: [...prevState.articles, articlesApi],
        name: "",
      })),
    );
    console.log(this.state.articles);
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <ul className={styles.list}>
          <li key={"#"} className={styles.item}>
            <p className={styles.itemTitle}>Feels like</p>
            <p className={styles.itemText}>30.0°C</p>
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

      //  <ul>
      //     {this.state.articles.map((article) => (
      //       <li key={article.id}>
      //         <h2>Temperature: {article.main.temp}</h2>
      //       </li>
      //     ))}
      //   </ul>  ?
    );
  }
}
>>>>>>> weatherHaracteristics

// °C
