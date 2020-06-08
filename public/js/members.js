// import { DataTypes } from "sequelize/types";

// const db = require("../../models");
$(document).ready(function() {
    //const userEmailAddress = ""

    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    // EXS 2nd June 2020 - Updated to pull NWS data for the users current Lat/Long
    //  console.log("Calling members.js");
<<<<<<< HEAD
    $.get("/api/user_data").then(function(data) {
        // $(".member-name").text(data.email);
        //  console.log("Our get user_data:", data);
        $("#modalUserName").text(data.name);
        $("#modalUserEmail").text(data.email);
        $("#greeting").text(data.name);
        //userEmailAddress = data.email;
        //console.log("userEmailAddress: ", userEmailAddress);
        //  EXS puilling weather api call

        // if (data.ourLat === 0 && data.ourLong === 0) {
        //     let ourLat = 38.9072;
        //     let ourLong = -77.0369;
        //     getOurWeather(ourLat, ourLong);
        // } else {
        //     getOurWeather(data.ourLat, data.ourLong);
        // }
        console.log("Getting User Data: ", data.ourLat, data.ourLong);
=======
    $.get("/api/user_data").then(function (data) {
        $("#modalUserName").text(data.name);
        $("#modalUserEmail").text(data.email);
        $("#greeting").text(data.name);
        getOurWeather(data.lat, data.long);
       // getOurPlaceName(data.lat, data.long);
>>>>>>> master
    });

    $(".blogBtn").click(() => {
        $.get("/api/user_data").then(function(data) {
            let email = data.email
            let review = $("#blogCreateField").val();
            let title = $("#blogCreateInput").val();
            $.post("/api/blogs", {
                title,
                review,
                email
            })
        });
        // console.log("I am being clicked to create a BLOGGGGGG") let title = $("#blogCreateInput").val();
        //     let review = $("#blogCreateField").val();
        //     //let email = $("#modalUserEmail").val();
        //     //   console.log(data.email, review, title);
        //     //let email = userEmailAddress;
        //     console.log("Our passed email: ", email);
        //     $.post("/api/blogs", {
        //             title,
        //             review,
        //             email
        //         })
        //         //getBlogPost()
    });

    function getBlogPost() {

        $.get("/api/blogs", (req, res) => {
            // console.log(req)
            // console.log(res)
            // $("#blogOne").text(req.title);
            // $("#BlogTwo").text(" " + req.body.title);
            // $("#BlogThree").text(" " + req.body.title);
            // $("#BlogFour").text(" " + req.body.title);
            // $("#BlogFive").text(" " + req.body.title);
        })
    }

    function getOurWeather(lat, long) {
        const ourFirstNWSURL = (`https://api.weather.gov/points/${lat},${long}`);
        // console.log("Our First NWS URL: ", ourFirstNWSURL);
        // EXS 2nd June 2020 - Get our initial weather 
        $.get(ourFirstNWSURL, (response, status) => {
            //  console.log("Response: ", response);
            //  console.log("Status: ", status);
            //console.log("Our City Returned value?: ", response);
            const ourLongRangeForecast = response.properties.forecast;
            //console.log("Our Long Range Forecase URL: ", ourLongRangeForecast);
            $.get(ourLongRangeForecast, (response, status) => {
                displayOurWeather(response);
                getOurPlaceName(lat, long);
            }).fail(function () {
                console.log ("We have a fail!");
                // EXS 8th June default to DC if we get a fail result
                const ourNWSErrorURL = ("https://api.weather.gov/gridpoints/LWX/95,71/forecast");
                $.get(ourNWSErrorURL, (response, status) => {
                    //       console.log("We have an error response: ",response)
                    displayOurWeather(response);
                    //newUser.ourLat = 38.9072;
                    //newUser.ourLong = -77.0369
                    getOurPlaceName(38.9072,-77.0369);
                });
            });
        });
    }
    function getOurPlaceName(lat, long) {
        ourURL = (`https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${lat}${long}/nearbyCities?radius=10`)
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": ourURL,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
                "x-rapidapi-key": "8a6cd7a64emsh3dd70caa88d8d20p193484jsn53fd404332c5"
            }
        }
        console.log ("Our place name settings: ", settings)
        $.ajax(settings).done(function (response) {
            $('#currentWeather').text(" " + response.data[0].city);
        });

    }
});
