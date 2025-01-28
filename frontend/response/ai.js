const allCrops = ['Moth Beans', 'Mung Beans', 'Lentils', 
    'Rices', 'Jutes', 'Bananas', 'Pomegranates', 
    'Blackgrams', 'Grapes', 'Oranges', 'Papayas', 
    'Mangos', 'Coffees', 'Chickpeas', 'Cotton', 
    'Maize', 'Apples', 'Coconuts', 'Kidney Beans', 
    'Muskmelons', 'Watermelons', 'Pigeon Peas'];

document.addEventListener("DOMContentLoaded", function () {
    const columns = document.querySelectorAll(".column");

    columns.forEach(column => {
        column.addEventListener("click", function () {
            this.classList.toggle("expanded");
            const hiddenText = this.querySelector('.hidden-text');
            if (hiddenText) {
                hiddenText.style.display = this.classList.contains('expanded') ? 'block' : 'none';
            }
        });
    });
    makeAIRequest();
});

// main function!
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
            predictions.sort((b, a) => b - a);
            if (allCrops[0] !== undefined) {
                document.getElementById('crop1').innerText = "The best crop in your location is " + allCrops[21] + "!";
                document.getElementById('crop2').innerText = "Another crop that will thrive in your area are " + allCrops[20] + ".";
                document.getElementById('crop3').innerText = "Another crop that will thrive in your area are " + allCrops[19] + ".";
                var str = allCrops[21];
                str = str.toLowerCase();
                for (var x = 0; x < str.length; x++) {
                    if (str.charAt(x) === ' ') { str = str.replace(' ', ''); }
                }
                str = str + ".txt";
                fetch("../../backend/cropTexts/" + str)
                    .then((res) => res.text())
                    .then((text) => {
                        document.getElementById('how').innerText = text;
                    })
                    .catch((e) => console.error(e));
            }
            else {
                document.getElementById('crop1').innerText = "There seems to be an issue with the prediction model. Please try again later, or access the landing page again.";
            }
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
            localStorage.setItem("temp", temp.toFixed(2));
            localStorage.setItem("humidity", humidity.toFixed(2));
            localStorage.setItem("rainfall", rainfall.toFixed(2));
        });
}