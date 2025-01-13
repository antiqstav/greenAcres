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
    const params = new URLSearchParams({
        nitrogen: 90,
        phosphorus: 42,
        potassium: 43,
        temperature: 22,
        humidity: 82.00,
        ph: 6.5,
        rainfall: 203
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
            predictions = data.keras_prediction;
            for (let x = 0; x < predictions.length; x++) {
                if (predictions[x] > highest) {
                    highest = predictions[x];
                    ind = x;
                }
            }
            document.getElementById('stats').innerText = allCrops[ind];
        })
        .catch(error => console.error('Error:', error));
}

// All API callings
function getTemp() {
    const lat = Number(localStorage.getItem("latitude"));
    const lon = Number(localStorage.getItem("longitude"));
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=fahrenheit`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            const weather = data.current_weather;
            const temp = weather.temperature;
            return (temp * 5.0/9.0) + 32;
        })   
}