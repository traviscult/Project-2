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

    // buildNPSURL();






    // Eddie's code goes here 
    // EXS 22nd May 2020 - Added in API code and some test data, we will need to 
    // be pulling the lat/long from the NPS location for relevant data
    // Test Data 38.9072° N, 77.0369° W - DC
    // https://api.weather.gov/points/{latitude},{longitude}
    // API Key is not always required for some data

    // const nwsAPIURL = "https://api.weather.gov/points/";

    // let ourTestLat = "38.9072"
    // let ourTestLong = "-77.0369"

    // const ourNWSCall = () => {
    //     let ourNWSURL = (`${nwsAPIURL} ${ourTestLat},${ourTestLong}`);
    //     console.log(ourNWSURL);
    //     $.ajax({
    //         url: ourNWSURL,
    //         method: "GET"
    //     }).then((response) => {
    //         console.log(response)
    // These two responses hold the current forecast and hourly forecast
    // console.log(response.properties.forecast);
    // console.log(response.properties.forecastHourly);
    // Examples URLS
    // Forecast https://api.weather.gov/gridpoints/LWX/95,71/forecast
    // Forecast Hourly https://api.weather.gov/gridpoints/LWX/95,71/forecast
    //         });
    //     }
});
// module.exports = npsapi;
// module.exports = ourNWSCall;


const ourBlogPost = () => {
    // EXS 1st June 2020 - All our user to create a blog post

}

const editBlogPost = () => {
    // EXS 1st June 2020 - Edit existing blog post
    // Only original poster and Moderator+ can edit an existing post
    // After a post is modified it needs to have a line that states
    // this post was modified by xxxxxx on date/time
}

const deleteBlogPost = () => {
    // EXS 1st June 2020 - Delete an existing blog post
    // Only original poster and moderators+ can delete a blog post
}

const grantModeratorRights = () => {
    // EXS 1st June 2020 - Grant a user moderator rights
    // this can onjly be performed by a user with admin permissions
}



//does api support cors may have to move data to node 

//start here then move to node .js if node use axios