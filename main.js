const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

let cityInput = "Paris";

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        //app.style.opacity = "0";
    });
});

form.addEventListener('submit', (e) => {
    if(search.value.length === 0) {
        alert('Please enter the city name');
    } else {
        cityInput = search.value;
        //console.log(search.value);
        fetchWeatherData();
        search.value = "";
        //app.style.opacity = "0";
        e.preventDefault();
    }
});


function fetchWeatherData() {
    //console.log(cityInput);
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + cityInput + '&appid=18332cc2ca6fb7462e1d398a3cc35ac6')
      .then(response => response.json())
      .then(metadata => {
        fetch('https://api.openweathermap.org/data/2.5/weather?' + 'lat=' + metadata[0].lat + '&lon=' + metadata[0].lon + '&appid=18332cc2ca6fb7462e1d398a3cc35ac6')
          .then(response => response.json())
          .then(data => {
            console.log(data);
            nameOutput.innerHTML = cityInput;
            temp.innerHTML = ((data.main.temp - 273.15).toFixed(1)) + "&#176";
            //console.log(temp.innerHTML);
            conditionOutput.innerHTML = data.weather[0].main;
            cloudOutput.innerHTML = data.clouds.all + " %";
            humidityOutput.innerHTML = data.main.humidity + " %";
            windOutput.innerHTML = (((data.wind.speed)*2.23694).toFixed(2)) + " m/h";

            const iconId = data.weather[0].icon;
            icon.src = `https://openweathermap.org/img/wn/${iconId}@2x.png`;
            //URL is https://openweathermap.org/img/wn/10d@2x.png

            let timeoftheday = "day";
            const code = data.weather[0].id;
            const checkday = data.weather[0].icon;
            if(checkday.charAt(2) === "n") {
                timeoftheday = "night";  
            }

            if(code === 800) {
                app.style.backgroundImage = `url(./images/${timeoftheday}/clear.jpg)`;
                btn.style.background = "#000000";
                if(timeoftheday === "night") 
                { 
                    btn.style.background = "#181e27";
                }

            } else if (code == 801 || code == 802 || code == 803 || code == 804 || code === 701 || code === 711 || code === 721
                || code === 731 || code === 741 || code === 751 || code === 761 || code === 762 || code === 771 || code === 781) 
           
            {
                app.style.backgroundImage = `url(./images/${timeoftheday}/cloudy.jpg)`;
                btn.style.background = "#fa691b";

                if(timeoftheday === "night")
                {
                    btn.style.background = "#181e27";


                }
  
            } else if (code === 500 || code === 501 || code === 502 || code === 503 || code === 504 || code === 511 || code === 520 || code === 521 || code === 522 || code === 531 
               || code === 200 || code === 201 || code === 202 || code === 210 || code === 211 || code === 212 || code === 221 || code === 230 || code === 231 || code === 232
               || code === 300 || code === 301 || code === 302 || code === 310 || code === 311 || code === 312 || code === 313 || code === 314 || code === 321) 
            
            {
                app.style.backgroundImage = `url(./images/${timeoftheday}/rainy.jpg)`;
                btn.style.background = "#647d75";
                

                if(timeoftheday === "night")
                {
                    btn.style.background = "#325c80";

                }

            } else {

                app.style.backgroundImage = `url(./images/${timeoftheday}/snowy.jpg)`;
                btn.style.background = "#4d72aa";
                if(timeoftheday === "night")
                {
                    btn.style.background = "#1b1b1b";

                }
            }
            
          })

          .catch(() => {
            alert("City Not Found : 404");
          });
      });
  }
  
fetchWeatherData();
