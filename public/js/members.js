// const db = require("../../models");
$(document).ready(function () {

    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    // EXS 2nd June 2020 - Updated to pull NWS data for the users current Lat/Long
    //  console.log("Calling members.js");
    $.get("/api/user_data").then(function (data) {
        // $(".member-name").text(data.email);
        // console.log("Our get user_data:", data);
        $("#modalUserName").text(data.name);
        $("#modalUserEmail").text(data.email);
        $("#greeting").text(data.name);
        getOurWeather(data.lat, data.long);
        getOurPlaceName(data.lat, data.long);
    });

    $(".blogBtn").click(() => {
        $.get("/api/user_data").then(function (data) {
            let email = data.email
            let review = $("#blogCreateField").val();
            let title = $("#blogCreateInput").val();
            $.post("/api/blogs", {
                title,
                review,
                email
            })
        });
        console.log("I am being clicked to create a BLOGGGGGG") 
        // let title = $("#blogCreateInput").val();
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
        getBlogPost()
    });

    function getBlogPost() {

        $.get("/api/blogs", (req, res) => {
            console.log(req)
            console.log(res)
            $("#blogOne").text(" " + res.title);
            $("#BlogTwo").text(" " + res.title);
            $("#BlogThree").text(" " + res.title);
            $("#BlogFour").text(" " + res.title);
            $("#BlogFive").text(" " + res.title);
        })
    }

    function displayOurWeather(ourWeatherData) {
        // console.log("Our Weather Data: ", ourWeatherData);
        const currentWeatherIcon = '<img src="' + ourWeatherData.properties.periods[0].icon + '">';
        //  $('#currentWeather').text(" Our Place Name Goes Here");
        $('#ourWeatherIcon').html(currentWeatherIcon);
        $("#wd1").text(" " + ourWeatherData.properties.periods[0].name + " " + ourWeatherData.properties.periods[0].detailedForecast);
        $("#wd2").text(" " + ourWeatherData.properties.periods[1].name + " " + ourWeatherData.properties.periods[1].detailedForecast);
        $("#wd3").text(" " + ourWeatherData.properties.periods[2].name + " " + ourWeatherData.properties.periods[2].detailedForecast);
        $("#wd4").text(" " + ourWeatherData.properties.periods[4].name + " " + ourWeatherData.properties.periods[4].detailedForecast);
        $("#wd5").text(" " + ourWeatherData.properties.periods[6].name + " " + ourWeatherData.properties.periods[6].detailedForecast);
        return;
    }

    function getOurWeather(lat, long) {
        const ourFirstNWSURL = (`https://api.weather.gov/points/${lat},${long}`);
        // EXS 2nd June 2020 - Get our initial weather 
        $.get(ourFirstNWSURL, (response, status) => {
            const ourLongRangeForecast = response.properties.forecast;
            $.get(ourLongRangeForecast, (response, status) => {
                displayOurWeather(response);
            }).fail(function () {
                //      console.log ("We have a fail!");
                // EXS 8th June default to DC if we get a fail result
                const ourNWSErrorURL = ("https://api.weather.gov/gridpoints/LWX/95,71/forecast");
                $.get(ourNWSErrorURL, (response, status) => {
                    //       console.log("We have an error response: ",response)
                    displayOurWeather(response);
                });
            });
        });
    }
    function getOurPlaceName(lat, long) {
        ourURL = (`https://wft-geo-db.p.rapidapi.com/v1/geo/locations/${lat}${long}/nearbyCities?radius=10`)
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": ourURL,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
                "x-rapidapi-key": "8a6cd7a64emsh3dd70caa88d8d20p193484jsn53fd404332c5"
            }
        }

        $.ajax(settings).done(function (response) {
            $('#currentWeather').text(" " + response.data[0].city);
        });

    }
});
