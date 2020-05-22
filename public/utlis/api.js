

const apiKey = "&api_key=dpjVnZgcztgiyaTCVctE31HiudiZW5TLxgP4rQj7";
const locationURL = "https://developer.nps.gov/api/v1/places?statecode=";
let stateCode = " ";

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


module.exports = npsapi;

// Eddie's code goes here 

//does api support cors may have to move data to node 

//start here then move to node .js if node use axios 