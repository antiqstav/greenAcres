const allCrops = ['Moth Beans', 'Mung Beans', 'Lentils', 
    'Rices', 'Jutes', 'Bananas', 'Pomegranates', 
    'Blackgrams', 'Grapes', 'Oranges', 'Papayas', 
    'Mangos', 'Coffees', 'Chickpeas', 'Cotton', 
    'Maize', 'Apples', 'Coconuts', 'Kidney Beans', 
    'Muskmelons', 'Watermelons', 'Pigeon Peas'];
const url = "ED7E18E0-48F5-31DD-A419-1997BA464EFE";

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
    const params = new URLSearchParams({
        nitrogen: 90,
        phosphorus: 42,
        potassium: 43,
        temperature: weatherArr[0],
        humidity: weatherArr[1],
        ph: 6.75,
        rainfall: weatherArr[2]
    })
    var url = `http://127.0.0.1:5000/predict?${params.toString()}`;
    console.log("AI requested at: " + url);
    fetch(url, {
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
            console.log(predictions);
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
                        arr = text.split("\n");
                        // arr[1] is the description of the crop
                        // arr[5 - 6] is how to plant them
                        // and arr[9 - 11] is how to care for them
                        document.getElementById('desc').innerText = arr[1];
                        document.getElementById('how').innerText = arr[5];
                        document.getElementById('how2').innerText = arr[6];
                        document.getElementById('prac').innerText = arr[9];
                        document.getElementById('prac2').innerText = arr[10];
                        document.getElementById('prac3').innerText = arr[11];
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
    console.log("Weather requested at: " + url);
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
            document.getElementById('temp').innerText = "Temperature in Celsius: " + temp.toFixed(2);
            document.getElementById('humid').innerText = "Humidity in percent: " + humidity.toFixed(2);
            document.getElementById('rain').innerText = "Rainfall in millimeters: " + rainfall.toFixed(2);
        });
}

function getSoil() {
    
}