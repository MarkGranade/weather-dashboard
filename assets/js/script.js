// api key = 86cf2599b4d48be1597e0c714e1912bf
var searchFormEl = document.querySelector('#user-form');
var cityInputEl = document.querySelector('#city');
var weatherContainerEl = document.querySelector('#weather-container');
var weatherSearchTerm = document.querySelector('#weather-search-term');

// GET WEATHER DATA FUNCTION
var getWeather = function(cityName) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=86cf2599b4d48be1597e0c714e1912bf&units=imperial';

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            displayWeather(data, cityName);
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
var displayWeather = function(weather, searchTerm) {
    console.log(weather);
    console.log(searchTerm);

    // clear old content
    weatherContainerEl.textContent = '';
    weatherSearchTerm.textContent = searchTerm;

    // DISPLAY TEMP FUNCTION
    var displayTemp = function(weather, searchTerm) {
        // format temp to be displayed
        var temperature = 'Temp: ' + weather.main.temp + ' &#186;';

        // create a container temp
        var tempEl = document.createElement('div');
        tempEl.classList = 'list-item flex-row justify-space-between align-center';

        // create a <span> element to hold temp
        var titleEl = document.createElement('span');
        titleEl.textContent = temperature;

        // append to container
        tempEl.appendChild(titleEl);

        // append container to the DOM
        weatherContainerEl.appendChild(tempEl);
    };
    displayTemp(weather, searchTerm);
};



searchFormEl.addEventListener('submit', formSubmitHandler);

