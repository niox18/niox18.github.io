// Crear mapa en Bluefields
var map = L.map('map').setView([11.9986, -83.7642], 13);
// Lupa de búsqueda
L.Control.geocoder({
    defaultMarkGeocode: true
}).addTo(map);

// Mapa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Click en el mapa
map.on('click', async function(e) {

    let lat = e.latlng.lat.toFixed(4);
    let lng = e.latlng.lng.toFixed(4);

    document.getElementById("location").innerText = `${lat}, ${lng}`;

    try {

        let url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&hourly=relativehumidity_2m,precipitation`;

        let response = await fetch(url);
        let data = await response.json();

        let clima = data.current_weather;

        // Datos reales
        document.getElementById("temp").innerText =
            clima.temperature + " °C";

        document.getElementById("wind").innerText =
            clima.windspeed + " km/h";

        document.getElementById("humidity").innerText =
            data.hourly.relativehumidity_2m[0] + " %";

        document.getElementById("rain").innerText =
            data.hourly.precipitation[0] + " mm";

        // Datos simulados
        document.getElementById("aqi").innerText =
            Math.floor(Math.random() * 100);

        document.getElementById("uv").innerText =
            Math.floor(Math.random() * 11);

        document.getElementById("ndvi").innerText =
            Math.random().toFixed(2);

    } catch (error) {

        console.log(error);
        alert("Error al obtener datos");
    }
});

// TURISMO
let touristSelect = document.getElementById("touristSelect");

// Detectar cambio
touristSelect.addEventListener("change", function() {

    let value = this.value;

    if(value === "") {

        document.getElementById("placeName").innerText = "--";
        document.getElementById("price").innerText = "--";

        return;
    }

    let data = value.split("|");

    let place = data[0];
    let transport = data[1];
    let price = data[2];

    document.getElementById("placeName").innerText = place;
    document.getElementById("price").innerText = price;

    // Cambiar texto según transporte
    if (transport === "Taxi") {

        document.getElementById("transportLabel").innerText =
            "🚕 Tarifa aproximada en taxi:";

    } else {

        document.getElementById("transportLabel").innerText =
            "✈️ Tarifa aproximada en avión:";
    }
});