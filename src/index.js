//DATE
function todayIs() {
  let todayDate = document.querySelector("#date");
  todayDate.innerHTML = `Today is ${day}, ${date} ${month} ${year}`;
}
let now = new Date();

let date = now.getDate();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let year = now.getFullYear();

todayIs();

//TIME
function currentTime() {
  let time = document.querySelector("#time");
  time.innerHTML = `${hour}:${minute}`;
}

let timeNow = new Date();
let hour = String(timeNow.getHours()).padStart(2, "0");
let minute = String(timeNow.getMinutes()).padStart(2, "0");
currentTime();

//Displaying the weather based on the location (1) current, (2) requested:
//(0) Displaying the weather conditions general:
function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
}

//(1) current location:
function currentPosition(position) {
  let apiKey = "8ade40df9cf169461fc7f8acab2e9ac0";
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentButton = document.querySelector(".location");
currentButton.addEventListener("click", getCurrentPosition);

//(2) search for a specific city-location:
function getName(city) {
  let apiKey = "8ade40df9cf169461fc7f8acab2e9ac0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search-engine").value;
  getName(city);
}

let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", handleSubmit);

getName("Berlin");
