const apiUrl = 'https://data.princegeorgescountymd.gov/resource/7k64-tdwr.json';



// Fetch the data... return count of libraries per zip code
async function fetchData() {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // count library per zip code
    const zipCounts = {};

    // for each loop.... loop through data 
    data.forEach(library => {
        const zip = library.zip_code;
        // if already exists in zipCounts, increment, otherwise add to zipCounts
        if (zipCounts[zip]) {
            zipCounts[zip]++;
        } else {
            zipCounts[zip] = 1;
        }
    });

    return zipCounts;
}

// Create bar chart
async function createBarChart(chartType, selector) {
    // get zipcode counts from previous function
    const zipCounts = await fetchData();

    // zip codes = keys and counts = values for chart
    const zipCodes = Object.keys(zipCounts);
    const libraryCounts = Object.values(zipCounts);

    // Create bar chart
    const ctx = document.querySelector(selector);

    const chart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: zipCodes, // x axis
            datasets: [{
                label: 'Number of Libraries',  // y axis
                data: libraryCounts,
                backgroundColor: randColors(libraryCounts.length),
                borderColor: 'black',
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: chartType === "bar" ? {
                y: {
                    beginAtZero: true
                }
            } : {}
        }
    });
}

// function to get random color (from https://www.w3schools.com/JS/js_random.asp and also class sample code)
function randColors(len) {
    const colors = [];
    for (let i = 0; i < len; i++) {
        const randomColor = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.7)`;
        colors.push(randomColor);
    }
    return colors;
}

// call func to create charts
createBarChart('bar', '#chart1');
createBarChart('pie', '#chart2');
createBarChart('doughnut', '#chart3');