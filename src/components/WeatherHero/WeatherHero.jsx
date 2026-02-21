import styles from "./WeatherHero.module.css";
import { IoSearchSharp } from "react-icons/io5";
import fetcharticleApi from "../../services/citysearch";
import { useState } from "react";

export default function WeatherHero() {
  const d = new Date();
  const day = d.getDate();
  const s = ["th","st","nd","rd"][(day%10>3 || Math.floor(day%100/10)==1) ? 0 : day%10];
  const monthYear = d.toLocaleDateString("en-US", { month: 'long', year: 'numeric' });
  const weekday = d.toLocaleDateString("en-US", { weekday: 'long' });
  const [name, setName] = useState("");
  const [articles, setArticles] = useState([]); 


  const changeName = (name) => {
    setName(name);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    fetcharticleApi(name)
    .then(articlesApi =>  setArticles([...articles, articlesApi]), setName(""))
  }



  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>Weather dashboard</h1>

        <div className={styles.info}>
          <p className={styles.desc}>
            Create your personal list of favorite cities and always be aware of the weather.
          </p>

          <div className={styles.divider} />

          <h3 className={styles.date}>
            {monthYear} <br /> 
            {weekday}, {day}{s}
          </h3>
        </div>

        <form className={styles.search} onSubmit={handleSubmit}>
          <input type="text" placeholder="Search location..." onChange={(e) => changeName(e.target.value)} value={name}/>
          <button className={styles.searchBtn}>
            <IoSearchSharp className={styles.searchIcon}/> 
          </button>
        </form>
      </div>
    </section>
  );
}