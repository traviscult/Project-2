// const db = require("../../models");
$(document).ready(function() {

    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    // EXS 2nd June 2020 - Updated to pull NWS data for the users current Lat/Long
    //  console.log("Calling members.js");
    $.get("/api/user_data").then(function(data) {
        // $(".member-name").text(data.email);
        console.log("Our get user_data:", data);
        $("#modalUserName").text(data.name);
        $("#modalUserEmail").text(data.email);
        $("#greeting").text(data.name);
        getOurWeather(data.lat, data.long);
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
        console.log("Getting User Data: ", data.lat, data.long);
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
            // $("#blogOne").text(req.body.title);
            // $("#BlogTwo").text(" " + req.body.title);
            // $("#BlogThree").text(" " + req.body.title);
            // $("#BlogFour").text(" " + req.body.title);
            // $("#BlogFive").text(" " + req.body.title);
        })
    }

    function displayOurWeather(ourWeatherData) {
        console.log ("Our Weather Data: ", ourWeatherData);
        const currentWeatherIcon = '<img src="' + ourWeatherData.properties.periods[0].icon + '">';
        $('#ourWeatherIcon').html(currentWeatherIcon);
        $("#wd1").text(" " + ourWeatherData.properties.periods[0].temperature);
        $("#wd2").text(" " + ourWeatherData.properties.periods[1].temperature);
        $("#wd3").text(" " + ourWeatherData.properties.periods[3].temperature);
        $("#wd4").text(" " + ourWeatherData.properties.periods[5].temperature);
        $("#wd5").text(" " + ourWeatherData.properties.periods[7].temperature);
        return;
    }

    function getOurWeather(lat, long) {
        const ourFirstNWSURL = (`https://api.weather.gov/points/${lat},${long}`);
        // EXS 2nd June 2020 - Get our initial weather 
        $.get(ourFirstNWSURL, (response, status) => {
            const ourLongRangeForecast = response.properties.forecast;
            $.get(ourLongRangeForecast, (response, status) => {
               displayOurWeather(response);
            }).fail (function() {
                console.log ("We have a fail!");
                // EXS 8th June default to DC if we get a fail result
                const ourNWSErrorURL = ("https://api.weather.gov/gridpoints/LWX/95,71/forecast");
                $.get(ourNWSErrorURL, (response, status) => {
                   console.log("We have an error response: ",response)
                   displayOurWeather(response);
                });
            });
        });
    } 
});
