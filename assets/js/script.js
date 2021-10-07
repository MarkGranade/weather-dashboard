// api key = 86cf2599b4d48be1597e0c714e1912bf
var searchFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#city');
var weatherContainerEl = document.querySelector('#weather-container');
var weatherSearchTerm = document.querySelector('#weather-search-term');
var fiveDayContainerEl = document.querySelector('#five-day-container');
var currentDay = moment().format('MM/DD/YYYY');
console.log(currentDay);

var getWeather = function(cityName) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=86cf2599b4d48be1597e0c714e1912bf&units=imperial';
    // make a request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            // fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=imperial&appid=86cf2599b4d48be1597e0c714e1912bf').then(function(response) {
            //     response.json().then(function(data) {
            //         console.log(data);
            //         var fiveDayData = data;
            //         displayFiveDay(fiveDayData);
            //     });
            // })
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=hourly,minutely,alerts&units=imperial&appid=86cf2599b4d48be1597e0c714e1912bf`)
                .then(function(response) {
                    return response.json()
                })
                .then(function (uvData) {
                    console.log(uvData);
                    displayWeather(data, uvData);
                    displayFiveDay(uvData);
                })
            });
    });
};

// SUBMIT FORM FUNCTION
var formSubmitHandler = function(event) {
    event.preventDefault();

    // get value from <input> element via the cityInputEl DOM variable and store in its own variable callled 'cityName'
    var cityName = cityInputEl.value.trim();

    // if city name exists display, else show an alert
    if (cityName) {
        getWeather(cityName);
        cityInputEl.value= '';
    } else {
        alert('Please enter a valid city name.');
    }
    console.log(event);
};

// DISPLAY DATA FUNCTION
var displayWeather = function(data, uvData) {
    var name = data.name;
    var tempData = data.main.temp;
    var wind = data.wind.speed;
    var humidity = data.main.humidity;
    var uvIndex = uvData.current.uvi;
    var date = moment.unix(data.dt).format('MM/DD/YYYY');
    var iconurl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

    console.log(data);

    weatherContainerEl.innerHTML = `
    <h3 id="currentName" class="fw-bold">${name} <span> ${date}</span> <img src="${iconurl}"/></h3>
    <div id="currentTemp" class="fw-normal">Temperature: ${tempData} °F</div>
    <div id="currentWind" class="fw-normal">Wind: ${wind} MPH</div>
    <div id="currentHumidity" class="fw-normal">Humidity: ${humidity}</div>
    <div id="currentUv" class="fw-normal">UV Index: ${uvIndex}</div>
    `
};

var displayFiveDay = function(data) {
    console.log(data);

    for (var i = 1; i < 6; i++) {
        var dayEl = document.createElement('div');
        dayEl.className = 'container-3';

        var date = moment.unix(data.daily[i].dt).format('MM/DD/YYYY');

        var dateEl = document.createElement('p');
        dateEl.textContent = date;

        var iconurl = "http://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png";
        var iconEl = document.createElement('img');
        iconEl.src = iconurl;

        // create a <div> for temperature
        var tempEl = document.createElement('p');
        tempEl.textContent = data.daily[i].temp.day + ' °F';

        // create a <div> for wind
        var windEl = document.createElement('p');
        windEl.textContent = data.daily[i].wind_speed + ' MPH';

        var humidityEl = document.createElement('p');
        humidityEl.textContent = data.daily[i].humidity + '%';

        dayEl.appendChild(dateEl);
        dayEl.appendChild(iconEl);
        dayEl.appendChild(tempEl);
        dayEl.appendChild(windEl);
        dayEl.appendChild(humidityEl);

        // create a <div> for humidity

        fiveDayContainerEl.appendChild(dayEl);


    }
};

searchFormEl.addEventListener('submit', formSubmitHandler);
