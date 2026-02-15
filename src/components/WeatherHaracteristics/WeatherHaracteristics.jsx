import styles from "./WeatherHaracteristics.module.css";
import { FaTemperatureHigh } from "react-icons/fa";
import fetchArticlesApi from '../../services/weatherApi'
import { Component } from "react";
 
class WeatherHaracteristics extends Component {

state = {
    name: "",
    weather: null,
    articles: [],
  };

  // changeInput = (value) => {
  //   this.setState({
  //     name: this.props.name,
  //   });
  // };

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
             <FaTemperatureHigh />
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
 
};

// °C
