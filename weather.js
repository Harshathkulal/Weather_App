const apiKey = "API_KEY";
const url = "https://api.openweathermap.org/data/2.5/weather?a&units=metric&q=";

const searchbox = document.querySelector(".search-bar input");
const btn = document.querySelector(".search-bar button");
const weatherIcon = document.querySelector(".weather-icon");

//Async function to fetch the data through Api
async function checkweather(city) {
  const response = await fetch(url + city + `&appid=${apiKey}`);
  // condition for Empty city if searched
  if (response.status == 404) {
    document.querySelector(".error").classList.remove("d-none");
    document.querySelector(".weather").classList.add("d-none");
    document.querySelector(".valid").classList.add("d-none");
  }
  //condition  for invalid city Name
  else if (response.status == 400) {
    document.querySelector(".error").classList.add("d-none");
    document.querySelector(".weather").classList.add("d-none");
    document.querySelector(".valid").classList.remove("d-none");
  } else {
    const data = await response.json();
    //Data=data

    //Target all element in the screen
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "./images/clouds-fill.svg";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/sun-fill.svg";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/cloud-drizzle-fill.svg";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/cloud-rain-fill.svg";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "images/cloud-snow-fill.svg";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/cloud-sun-fill.svg";
    }

    document.querySelector(".weather").classList.remove("d-none");
    document.querySelector(".error").classList.add("d-none");
    document.querySelector(".valid").classList.add("d-none");
  }
}

btn.addEventListener("click", () => {
  checkweather(searchbox.value);
});
