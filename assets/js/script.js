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
            fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=imperial&appid=86cf2599b4d48be1597e0c714e1912bf').then(function(response) {
                response.json().then(function(data) {
                    var fiveDayData = data;
                    displayFiveDay(fiveDayData);
                });
            })
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=hourly,daily&appid=86cf2599b4d48be1597e0c714e1912bf`)
                .then(function(response) {
                    return response.json()
                })
                .then(function (uvData) {
                    displayWeather(data, uvData);
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
    console.log(data);

    weatherContainerEl.innerHTML = `
    <h3 id="currentName" class="fw-bold">${name}
    <div id="currentTemp" class="fw-normal">Temperature: ${tempData} °F</div>
    <div id="currentWind" class="fw-normal">Wind: ${wind} MPH</div>
    <div id="currentHumidity" class="fw-normal">Humidity: ${humidity}</div>
    <div id="currentUv" class="fw-normal">UV Index: ${uvIndex}</div>
    `
};

var displayFiveDay = function(data) {
    for (var i = 0; i < 5; i++) {
        // create a <div> for temperature
        var tempEl = document.createElement('div');
        tempEl.textContent = data.list[i].main.temp + ' °F';
        console.log(tempEl);


        // create a <div> for wind
        var windEl = document.createElement('div');
        windEl.textContent = data.list[i].wind.speed + ' MPH';
        console.log(windEl);

        // create a <div> for humidity

        console.log(tempEl);
        fiveDayContainerEl.appendChild(tempEl);


    }
};

searchFormEl.addEventListener('submit', formSubmitHandler);
