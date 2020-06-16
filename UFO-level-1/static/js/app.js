// from data.js
let tableData = data;
let filteredData = tableData;

// YOUR CODE HERE!
// Get a reference to the table body
let tbody = d3.select("tbody");

// Console.log the weather data from data.js
// console.log(data);

// Select the button
let button = d3.select("#filter-btn");

// Select the form
let form = d3.select("form");

// Create event handlers 
button.on("click", runEnter);
form.on("submit", runEnter);

// Complete the event handler function for the form
function runEnter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
    d3.selectAll("td").remove();

    // Select the input element and get the raw HTML node
    let inputElement = d3.select("#datetime");

    // Get the value property of the input element
    let inputValue = inputElement.property("value");

    console.log(inputValue);
    console.log(tableData);

    filteredData = tableData.filter(ufoSighting => ufoSighting.datetime === inputValue);

    console.log(filteredData);

    filteredData.forEach((UFO) => {

        let row = tbody.append("tr");
        Object.entries(UFO).forEach(([key, value]) => {
            let cell = row.append("td");
            cell.text(value);
        });
    });


};

filteredData.forEach((UFO) => {

    let row = tbody.append("tr");
    Object.entries(UFO).forEach(([key, value]) => {
        let cell = row.append("td");
        cell.text(value);
    });
});

// var string = input.value;
// x.innerHTML = string[0].toUpperCase() +
//     string.slice(1);