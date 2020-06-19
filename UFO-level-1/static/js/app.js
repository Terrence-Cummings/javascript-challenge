let tableData = data;

let dateList = tableData.map(sighting => sighting.datetime);

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

firstDate = newDateList[0];
lastDate = newDateList[newDateList.length - 1];

d3.select('#startdate').attr("min", firstDate);
d3.select('#startdate').attr("max", lastDate);
d3.select('#enddate').attr("max", lastDate);


for (i = 0; i < tableData.length; i++) {
    tableData[i].datetime = newDateList[i];
};

// Get a reference to the table body
let tbody = d3.select("tbody");

// Select the buttons and form
let button1 = d3.select("#filter-btn");
let form = d3.select("form");
let chgStart = d3.select('#startdate');

// Create event handlers 
button1.on("click", runEnter);
form.on("submit", runEnter);

chgStart.onchange = function() {
    console.log("Start Date Changed!");
};


d3.selectAll("td").remove();
tableData.forEach((UFO) => {
    let row = tbody.append("tr");
    Object.entries(UFO).forEach(([key, value]) => {
        let cell = row.append("td");
        cell.text(value);
    });
});

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
    // d3.select('#enddate').attr("min", inputValueStartDate);
    let inputValueEndDate = inputElementEndDate.property("value");
    let inputValueCity = inputElementCity.property("value");
    let inputValueState = inputElementState.property("value");
    let inputValueCountry = inputElementCountry.property("value");
    let inputValueShape = inputElementShape.property("value");

    let filteredData = tableData

    // Successively filter the data based on the inputs. If input is null include all results for that input.
    if (inputValueStartDate) {
        filteredData = filteredData.filter(ufoSighting => ufoSighting.datetime >= inputValueStartDate);
    };
    if (inputValueEndDate) {
        filteredData = filteredData.filter(ufoSighting => ufoSighting.datetime <= inputValueEndDate);
    };
    if (inputValueCity) {
        filteredData = filteredData.filter(ufoSighting => ufoSighting.city.toUpperCase() === inputValueCity.toUpperCase());
    };
    if (inputValueState) {
        filteredData = filteredData.filter(ufoSighting => ufoSighting.state.toUpperCase() === inputValueState.toUpperCase());
    };
    if (inputValueCountry) {
        filteredData = filteredData.filter(ufoSighting => ufoSighting.country.toUpperCase() === inputValueCountry.toUpperCase());
    };
    if (inputValueShape) {
        filteredData = filteredData.filter(ufoSighting => ufoSighting.shape.toUpperCase() === inputValueShape.toUpperCase());
    };

    // Append rows that meet filter criteria to the table
    d3.selectAll("td").remove();
    filteredData.forEach((UFO) => {
        let row = tbody.append("tr");
        Object.entries(UFO).forEach(([key, value]) => {
            let cell = row.append("td");
            cell.text(value);
        });
    });
};