let titleLogo = document.querySelector(".title");
let bodyElem = document.querySelector("body");

function changeBackgroundImage() {
	let randNum = Math.ceil(Math.random() * 10);
	bodyElem.style.backgroundImage = `url('images/bg${randNum}.jpg')`;
	titleLogo.style.color = (randNum == 3 || randNum == 4 || randNum == 5) ? "white" : "white";
}

window.addEventListener("load", () => {
	changeBackgroundImage();
});

let cityInput = document.querySelector("#get-city");
cityInput.addEventListener("keypress", (event) => {
	if (event.key == "Enter") {
		fetchDataFromApi();
		changeBackgroundImage();
	}
});

let apiData = {
	url: "https://api.openweathermap.org/data/2.5/weather?q=",
	key: "124b92a8dd9ec01ffb0dbf64bc44af3c",
};
cityInput.value = "new york";
fetchDataFromApi();
cityInput.value = "";

function fetchDataFromApi() {
	let insertedCity = cityInput.value;
	fetch(`${apiData.url}${insertedCity}&&appid=${apiData.key}`)
		.then((res) => res.json())
		.then((data) => addDataToDom(data));
}

let cityName = document.querySelector(".city-name");
let cityTemp = document.querySelector(".weather-deg");
let cityCond = document.querySelector(".weather-condition");
let cityHumidity = document.querySelector(".humidity");
let todayDate = document.querySelector(".date");

function addDataToDom(data) {
	cityName.innerHTML = `${data.name}, ${data.sys.country}`;
	cityTemp.innerHTML = `${Math.round(data.main.temp - 273.15)}°c`;
	
	cityHumidity.innerHTML = `humedad: ${data.main.humidity}%`;
	todayDate.innerHTML = getDate();
}

let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

function getDate() {
	let newTime = new Date();
	let month = months[newTime.getMonth()];
	return `${newTime.getDate()} ${month} ${newTime.getFullYear()}`;
}
