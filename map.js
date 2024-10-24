const apiUrlMap = 'https://data.princegeorgescountymd.gov/resource/7k64-tdwr.json';

// JS code based off ugly restaurant page project from class (https://glitch.com/edit/#!/ugly-page-redesign)
// initialize map -- leaflet
function initMap() {
    const map = L.map('map').setView([38.92, -76.9], 9.5); // center
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 13,
        attribution: '© OpenStreetMap'
    }).addTo(map);
    return map;
}

// placing markers on map (for the libraries)... libraries = data array, map = the map we initialized
function markerPlace(libraries, map) {
    // check for and remove existing markers on layer
    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            layer.remove();
        }
    });
    // console.log("hey");
    console.log("Libraries data:", libraries);

    // foreach loop -- add marker for each library
    libraries.forEach((library) => {
        console.log("hey");
        if (library.location_1) {
            const [lon, lat] = [library.location_1.longitude, library.location_1.latitude]; // getting coordinates

            // some parsing of data... bc address is string of json obj
            const humanAddress = JSON.parse(library.location_1.human_address);
            const address = humanAddress.address;

            // console.log(`Library coords: ${library.branch_name}, Lat: ${lat}, Lon: ${lon}`);
            L.marker([lat, lon]).addTo(map) 
                .bindPopup(`<b>${library.branch_name}</b><br>${address}`);
        }
    });
}

// fetch library data and call func to place markers on map
async function loadLibraryData() {
    const map = initMap(); // init
    const response = await fetch(apiUrlMap); // fetch
    const libraries = await response.json(); // convertt to json
    
    markerPlace(libraries, map); //  markers on map
}


document.addEventListener('DOMContentLoaded', loadLibraryData);
