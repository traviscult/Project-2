$(document).ready(() => {

    const apiKey = "&api_key=dpjVnZgcztgiyaTCVctE31HiudiZW5TLxgP4rQj7";
    const locationURL = "https://developer.nps.gov/api/v1/places?statecode=";
    // let selectedState;

    // let stateCode = "ca";

    $("#state-selection").click(() => {
        console.log("I have been clicked!!!")
        let stateSelected = $("#state-selected option:selected").val();
        console.log(typeof stateSelected, stateSelected)
        // $("#state-selected option:selected").val("");
        buildNPSURL(stateSelected)
    });

    const buildNPSURL = async (stateSelected) => {
        console.log("Build URL is being called")
        let npsURL = (`${locationURL}${stateSelected}${apiKey}`)

        console.log(npsURL)
        //AJAX call
        const result = await $.ajax({
            url: npsURL,
            method: "GET",
        })
        console.log("response is being called!!!", result)

        $("#parks").empty();

        result.data.map(statepark => {
            console.log("statepark", statepark)
            const placeHolderImg = "https://www.nps.gov/articles/images/yose-main.jpg";
            let picture = statepark.images[0].url.includes(".jpg") ? statepark.images[0].url : placeHolderImg;
            let parkPicture = ` <a target="_blank" href="${statepark.url}"><img src=${picture}></a>`
            let card = $("<div>").addClass("card parkCard");
            let cardImg = $("<div>").addClass("card-image").append(parkPicture);
            let parkNameEl = $("<h1>").addClass("card-title").text(statepark.title);
            console.log(parkNameEl)
            let cardBody = $("<div>").addClass("card-content");
            let row = $("<div>").addClass("row");
            let columnOne = $("<div>").addClass("col s6");
            let columnTwo = $("<div>").addClass("col s6");

            // append all lets to the page
            row.append(columnOne, columnTwo);
            columnOne.append(parkPicture);
            columnTwo.append(parkPicture);
            cardBody.append(parkNameEl);
            card.append(cardImg);
            card.append(cardBody);

            $("#parks").append(card);
        })
    };

    
    // Eddie's code goes here 
    // EXS 22nd May 2020 - Added in API code and some test data, we will need to 
    // be pulling the lat/long from the NPS location for relevant data
    // Test Data 38.9072° N, 77.0369° W - DC
    // https://api.weather.gov/points/{latitude},{longitude}
    // API Key is not always required for some data
    // EXS 2nd June 2020 - Initial page loading we need an API to pull in the 
    // the weather data and the credentials of the logged in user.



});
