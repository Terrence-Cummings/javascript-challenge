// TERRENCE CUMMINGS
// Javascript Challenge

// Set variable equal to the data array of objects in data.js
let tableData = data;

// Grab the dates from the data to change the date format
let dateList = tableData.map(sighting => sighting.datetime);

// Create a list of the dates with new YYYY-MM-DD format to match against the datepicker input.
let newDateList = [];
dateList.forEach(function(dataDate) {
    splitDay = dataDate.split('/');
    if (splitDay[0].length < 2) {
        splitDay[0] = "0" + splitDay[0];
    };
    if (splitDay[1].length < 2) {
        splitDay[1] = "0" + splitDay[1];
    };
    dataDate = splitDay[2] + "-" + splitDay[0] + "-" + splitDay[1];
    newDateList.push(dataDate);
});

// Determine the earliest and latest dates in the data to set the datepicker calendar attributes
firstDate = newDateList[0];
lastDate = newDateList[newDateList.length - 1];

// Set datepicker input options to be constrained by latest and earliest dates in the data. Set the starting input 
// dates equal to the earliest and latest dates in the data
d3.select('#startdate').attr("min", firstDate);
d3.select('#startdate').attr("max", lastDate);
d3.select('#enddate').attr("max", lastDate);
d3.select('#startdate').attr("value", firstDate);
d3.select('#enddate').attr("value", lastDate);

// Replace the datetime field in the data with the new formats for matching against user input.
for (i = 0; i < tableData.length; i++) {
    tableData[i].datetime = newDateList[i];
};

// Get a reference to the table body
let tbody = d3.select("tbody");

// Select the buttons and form
let button1 = d3.select("#filter-btn");
let form = d3.select("form");


// Create event handlers 
button1.on("click", runEnter);
form.on("submit", runEnter);

// Set the initial table on opening the webpage to include all the data
d3.selectAll("td").remove();
tableData.forEach((UFO) => {
    let row = tbody.append("tr");
    Object.entries(UFO).forEach(([key, value]) => {
        let cell = row.append("td");
        cell.text(value.toUpperCase());
    });
});

// Function to update the MIN search end date based on the search start date. End date can't be before start date.
function chgEndMin(valEnd) {
    d3.select('#enddate').attr("min", valEnd);
};

// Complete the event handler function for the form
function runEnter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Clear the prior filter results
    d3.selectAll("td").remove();

    // Select the input element and get the raw HTML node
    let inputElementStartDate = d3.select("#startdate");
    let inputElementEndDate = d3.select("#enddate");
    let inputElementCity = d3.select("#city");
    let inputElementState = d3.select("#state");
    let inputElementCountry = d3.select("#country");
    let inputElementShape = d3.select("#shape");

    // Get the value property of the input element
    let inputValueStartDate = inputElementStartDate.property("value");
    let inputValueEndDate = inputElementEndDate.property("value");
    let inputValueCity = inputElementCity.property("value");
    let inputValueState = inputElementState.property("value");
    let inputValueCountry = inputElementCountry.property("value");
    let inputValueShape = inputElementShape.property("value");

    // Start with the full data set before beginning to filter
    let filteredData = tableData

    // Successively filter the data based on the inputs. If input is null include all results for that input.
    // Include dates greater than or equal to input Start Date
    if (inputValueStartDate) {
        filteredData = filteredData.filter(ufoSighting => ufoSighting.datetime >= inputValueStartDate);
    };
    // Include dates less than or equal to input End Date
    if (inputValueEndDate) {
        filteredData = filteredData.filter(ufoSighting => ufoSighting.datetime <= inputValueEndDate);
    };
    // Include records for chosen city.
    if (inputValueCity) {
        filteredData = filteredData.filter(ufoSighting => ufoSighting.city.toUpperCase() === inputValueCity.toUpperCase());
    };
    // Include records from chosen State from dropdown list
    if (inputValueState) {
        filteredData = filteredData.filter(ufoSighting => ufoSighting.state.toUpperCase() === inputValueState.toUpperCase());
    };
    // Include records from chosen Country from  dropdown list
    if (inputValueCountry) {
        filteredData = filteredData.filter(ufoSighting => ufoSighting.country.toUpperCase() === inputValueCountry.toUpperCase());
    };
    // Include records from chosen Shape from dropdown list
    if (inputValueShape) {
        filteredData = filteredData.filter(ufoSighting => ufoSighting.shape.toUpperCase() === inputValueShape.toUpperCase());
    };

    // Append rows that meet filter criteria to the table
    d3.selectAll("td").remove();
    filteredData.forEach((UFO) => {
        let row = tbody.append("tr");
        Object.entries(UFO).forEach(([key, value]) => {
            let cell = row.append("td");
            cell.text(value.toUpperCase());
        });
    });
};