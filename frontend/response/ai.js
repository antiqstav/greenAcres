const allCrops = ['Moth Beans', 'Mung Bean', 'Lentil', 
    'Rice', 'Jute', 'Banana', 'Pomegranate', 
    'Blackgram', 'Grapes', 'Orange', 'Papaya', 
    'Mango', 'Coffee', 'Chick Pea', 'Cotton', 
    'Maize', 'Apple', 'Coconut', 'Kidney Beans', 
    'Muskmelon', 'Watermelon', 'Pigeon Peas'];

document.addEventListener("DOMContentLoaded", function () {
    const columns = document.querySelectorAll(".column");

    columns.forEach(column => {
        column.addEventListener("click", function () {
            this.classList.toggle("expanded");
        });
    });
    makeAIRequest();
});

function makeAIRequest() {
    getWeather();
    const weatherArr = [Number(localStorage.getItem("temp")), Number(localStorage.getItem("humidity")), Number(localStorage.getItem("rainfall"))];
    document.getElementById('weather').innerText = "The temperature in the area is " + weatherArr[0] + "°C, the humidity is " + weatherArr[1] + "%, and the rainfall is " + weatherArr[2] + "mm.";
    const params = new URLSearchParams({
        nitrogen: 90,
        phosphorus: 42,
        potassium: 43,
        temperature: weatherArr[0],
        humidity: weatherArr[1],
        ph: 6.5,
        rainfall: weatherArr[2]
    })
    fetch(`http://127.0.0.1:5000/predict?${params.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            var highest = 0;
            var ind = -1;
            const predictions = data.keras_prediction;
            predictions.sort((a, b) => a - b);
            document.getElementById('stats').innerText = allCrops[0] + " " + allCrops[1] + " " + allCrops[2];
        })
        .catch(error => console.error('Error:', error));
}

// All API callings
function getWeather() {
    const lat = Number(localStorage.getItem("latitude"));
    const lon = Number(localStorage.getItem("longitude"));
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,rain`;
    var temp = 0;
    var humidity = 0;
    var rainfall = 0;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const tempArr = data.hourly.temperature_2m;
            const humidityArr = data.hourly.relative_humidity_2m;
            const rainfallArr = data.hourly.rain;
            for (let x = 0; x < tempArr.length; x++) {
                temp += tempArr[x];
                humidity += humidityArr[x];
                rainfall += rainfallArr[x];
            }
            temp = temp / tempArr.length;
            humidity = humidity / humidityArr.length;
            rainfall = rainfall / rainfallArr.length;
            localStorage.setItem("temp", temp);
            localStorage.setItem("humidity", humidity);
            localStorage.setItem("rainfall", rainfall);
        });
}