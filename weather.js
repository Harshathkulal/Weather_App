const apiKey = "84130fab70f00afa80c71897a4a3d02a";
const url = "https://api.openweathermap.org/data/2.5/weather?a&units=metric&q=";

const searchbox = document.querySelector(".search-bar input");
const btn = document.querySelector(".search-bar button");
const weatherIcon = document.querySelector(".weather-icon");

//Async function to fetch the data through Api
async function checkweather(city) {
	const response = await fetch(url + city + `&appid=${apiKey}`);
// condition for Empty city if searched
	if (response.status == 404) {
		document.querySelector(".error").style.display ="block"
		document.querySelector(".weather").style.display ="none"
		document.querySelector(".valid").style.display ="none"
	}
//condition  for invalid city Name
	else if (response.status == 400) {
		document.querySelector(".error").style.display ="none"
		document.querySelector(".weather").style.display ="none"
		document.querySelector(".valid").style.display ="block"
	}
	else {

		const data = await response.json();
		console.log(data);

//Target all element in the screen
		document.querySelector(".city").innerHTML = data.name;
		document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
		document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
		document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

		if (data.weather[0].main == "Clouds") {
			weatherIcon.src = "images/clouds.png";
		}
		else if (data.weather[0].main == "Clear") {
			weatherIcon.src = "images/clear.png";
		}
		else if (data.weather[0].main == "Drizzle") {
			weatherIcon.src = "images/drizzle.png";
		}
		else if (data.weather[0].main == "Rain") {
			weatherIcon.src = "images/rain.png";
		}
		else if (data.weather[0].main == "Snow") {
			weatherIcon.src = "images/snow.png";
		}
		else if (data.weather[0].main == "Mist") {
			weatherIcon.src = "images/mist.png";
		}

		document.querySelector(".weather").style.display = "block";
		document.querySelector(".error").style.display = "none"
		document.querySelector(".valid").style.display ="none"
	}
}

btn.addEventListener("click", () => {
	checkweather(searchbox.value);

})