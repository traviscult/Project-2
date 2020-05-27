

const apiKey = "&api_key=dpjVnZgcztgiyaTCVctE31HiudiZW5TLxgP4rQj7";
const locationURL = "https://developer.nps.gov/api/v1/places?statecode=";

let stateCode = "nc";

const buildNPSURL = () => {

    let npsURL = (`${locationURL}${stateCode}${apiKey}`)

    console.log(npsURL)
    //AJAX call
    $.ajax({
        url: npsURL,
        method: "GET",
    }).then((response) => {
        console.log(response.data)
    });
};

buildNPSURL();


// module.exports = npsapi;



// Eddie's code goes here 
// EXS 22nd May 2020 - Added in API code and some test data, we will need to 
// be pulling the lat/long from the NPS location for relevant data
// Test Data 38.9072° N, 77.0369° W - DC
// https://api.weather.gov/points/{latitude},{longitude}
// API Key is not always required for some data

const nwsAPIURL = "https://api.weather.gov/points/";

let ourLat = "38.9072"
let ourLong = "77.0369"

const ourNWSCall = () => {
    let ourNWSURL = (`${nwsAPIURL} ${ourLat},${ourLong}`);
    console.log (ourNWSURL);
    $.ajax ({
        url: ourNWSURL,
        method: "GET"
    }).then ((response) => {
        console.log (response)
    });
}

//does api support cors may have to move data to node 

//start here then move to node .js if node use axios 