// from data.js
let tableData = data;
let filteredData = tableData;

// Get a reference to the table body
let tbody = d3.select("tbody");

// Select the buttons and form
let button1 = d3.select("#filter-btn");
let button2 = d3.select("#clear-filter-btn");
let form = d3.select("form");

// Create event handlers 
button1.on("click", runEnter);
button2.on("click", resetTable);
form.on("submit", runEnter);

// Complete the event handler function for the form
function runEnter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Clear the prior filter results
    d3.selectAll("td").remove();

    // Select the input element and get the raw HTML node
    let inputElementDate = d3.select("#datetime");
    let inputElementCity = d3.select("#city");
    let inputElementState = d3.select("#state");
    let inputElementCountry = d3.select("#country");
    let inputElementShape = d3.select("#shape");

    // Get the value property of the input element
    let inputValueDate = inputElementDate.property("value");
    let inputValueCity = inputElementCity.property("value");
    let inputValueState = inputElementState.property("value");
    let inputValueCountry = inputElementCountry.property("value");
    let inputValueShape = inputElementShape.property("value");

    console.log(inputValueDate);
    console.log(inputValueCity);
    console.log(inputValueState);
    console.log(inputValueCountry);
    console.log(inputValueShape);

    // Successively filter the data based on the inputs
    filteredData = tableData.filter(ufoSighting => ufoSighting.datetime === inputValueDate);
    filteredData = filteredData.filter(ufoSighting => ufoSighting.city.toUpperCase() === inputValueCity.toUpperCase());
    filteredData = filteredData.filter(ufoSighting => ufoSighting.state.toUpperCase() === inputValueState.toUpperCase());
    filteredData = filteredData.filter(ufoSighting => ufoSighting.country.toUpperCase() === inputValueCountry.toUpperCase());
    filteredData = filteredData.filter(ufoSighting => ufoSighting.shape.toUpperCase() === inputValueShape.toUpperCase());

    // Append rows that meet filter criteria to the table
    filteredData.forEach((UFO) => {

        let row = tbody.append("tr");
        Object.entries(UFO).forEach(([key, value]) => {
            let cell = row.append("td");
            cell.text(value);
        });
    });
};

function resetTable() {
    d3.selectAll("td").remove();
    tableData.forEach((UFO) => {
        let row = tbody.append("tr");
        Object.entries(UFO).forEach(([key, value]) => {
            let cell = row.append("td");
            cell.text(value);
        });
    });
};


// var string = input.value;
// x.innerHTML = string[0].toUpperCase() +
//     string.slice(1);