const BASE_API = "9abb2e573db1c5f1f867196375388bbe";
const BASE_URL = "https://api.openweathermap.org";

const fetcharticleApi = (name) => {
  return fetch(
    `${BASE_URL}/data/2.5/weather?q=${name}&appid=${BASE_API}&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("City not found");
      }
      return res.json();
    })
};

export default fetcharticleApi;
