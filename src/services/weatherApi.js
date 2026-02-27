const BASE_API = "cba63fdcf08d3619930d27c1f8549784";

const BASE_URL = "https://api.openweathermap.org";

const fetchArticlesApi = ({ name }) => {
  return fetch(`${BASE_URL}/data/2.5/weather?q=${name}&appid=${BASE_API}`)
    .then((articles) => articles.json())
    .catch((error) => console.log("error fetch"));
};


export default fetchArticlesApi;
