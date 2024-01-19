// const apiKey = "7418b6e2129b4bcf980153933230506";
const apiKey = "23a66db112ae91232162cbdffe560848";
const apiUrl = "http://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const loader = document.querySelector(".loader")
loader.style.display="none"

async function checkWeather(city) {
  loader.style.display="flex"
  document.querySelector(".weather").style.display = "none"
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  // const response = await fetch(apiUrl + `${apiKey}&q=haldia&days=7&aqi=no&alerts=no` );
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    loader.style.display="none"
  } else {
    let data = await response.json();

    console.log(data);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + " °C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "mist.png";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "snow.png";
    }

    document.querySelector(".weather").style.display = "block";
    loader.style.display="none"
    document.querySelector(".error").style.display = "none";
  }
}
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
