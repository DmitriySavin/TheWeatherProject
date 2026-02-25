import { useEffect, useState } from "react";
import styles from "./Slider.module.css";

const API_KEY = "54233827-6daf8d189c6a08ed24e1e9e1a";

const Slider = () => {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${API_KEY}&q=nature&image_type=photo&per_page=10`
    )
      .then((res) => res.json())
      .then((data) => { 
        setImages(data.hits);
        setIndex(2); 
      });
  }, []);

  useEffect(() => {
    if (!images.length) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [images]);

  const getIndex = (i) => (i + images.length) % images.length;

  return (
    <section className={styles.gallery}>
      <div className={styles.container}>
      <h2 className={styles.title}>Beautiful nature</h2>

      <div className={styles.slider}>
        {images.map((img, i) => {
          let className = styles.slide;

          if (i === index) className += ` ${styles.active}`;
          else if (i === getIndex(index - 1)) className += ` ${styles.prev}`;
          else if (i === getIndex(index + 1)) className += ` ${styles.next}`;
          else if (i === getIndex(index - 2)) className += ` ${styles.farPrev}`;
          else if (i === getIndex(index + 2)) className += ` ${styles.farNext}`;
          else className += ` ${styles.hidden}`;

          return (
            <div className={className} key={img.id}>
              <img src={img.webformatURL} alt={img.tags} />
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
};

export default Slider;
