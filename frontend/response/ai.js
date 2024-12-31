document.addEventListener("DOMContentLoaded", function () {
    const columns = document.querySelectorAll(".column");

    columns.forEach(column => {
        column.addEventListener("click", function () {
            this.classList.toggle("expanded");
        });
    });
    makeGetRequest();
});

function makeGetRequest() {
    const params = new URLSearchParams({
        nitrogen: 90,
        phosphorus: 42,
        potassium: 43,
        temperature: 20.88,
        humidity: 82.00,
        ph: 6.5,
        rainfall: 203
    });

    fetch(`http://127.0.0.1:5000/predict?${params.toString()}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        var highestProbability = 0;
        for (let x = 0; x < data.keras_prediction.length; x++) {
            if (data.keras_prediction[x] > highestProbability) {
                highestProbability = data.keras_prediction[x];
            }
        }
        document.getElementById('stats').innerText = null;
    })
    .catch(error => console.error('Error:', error));
}