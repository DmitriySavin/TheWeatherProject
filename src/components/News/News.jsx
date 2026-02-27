import axios from "axios";
import { useEffect, useState } from "react";
import s from "./News.module.css";
import { nanoid } from "nanoid";
import error404 from "../../image/error-404.png"

const News = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const news = axios.create({ baseURL: "https://newsapi.org" });
  const api = "f5fc43119e0e4095be12f810d5821a92";

  useEffect(() => {
    async function getTopNews() {
      const res = await news.get(
        "/v2/top-headlines?country=us&pageSize=4&apiKey=" + api,
      );
      setData(res.data.articles);
    }
    getTopNews();
  }, []);

  const handleOpenNews = (url) => {
    window.open(url, "_blank");
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);

    console.log(data);

    const res = await news.get(
      `/v2/top-headlines?country=us&page=${nextPage}&pageSize=4&apiKey=` + api,
    );
    setData((prevState) => [...prevState, ...res.data.articles]);
  };

  return (
    <>
      <section className={s.newsSection}>
        <div className={s.test}>
          <h3 className={s.title}>Top news</h3>
          <ul className={s.newsList}>
            {data &&
              data.map(({ title, description, url, urlToImage }) => {
                const img = urlToImage || error404;
                return (
                  <li
                    className={s.newsItem}
                    key={nanoid()}
                    onClick={() => handleOpenNews(url)}
                  >
                    <img src={img} alt={description} className={s.newsImg} />
                    <p className={s.newsTitle}>{title}</p>
                  </li>
                );
              })}
          </ul>
          <button className={s.loadMore} onClick={handleLoadMore}>
            See more
          </button>
        </div>
      </section>
    </>
  );
};

export default News;
