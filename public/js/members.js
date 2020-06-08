
// import { DataTypes } from "sequelize/types";

// const db = require("../../models");
$(document).ready(function () {
    //const userEmailAddress = ""

    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    // EXS 2nd June 2020 - Updated to pull NWS data for the users current Lat/Long
    //  console.log("Calling members.js");



    //const userEmailAddress = ""
    // const getEmail = () => {
    //     $.get("/api/user_data").then(function (data) {
    //         let email = data.email
    //         return email;
    $.get("/api/user_data").then(function (data) {
        // $(".member-name").text(data.email);
        //  console.log("Our get user_data:", data);

        $("#modalUserName").text(data.name);
        $("#modalUserEmail").text(data.email);
        $("#greeting").text(data.name);
        getOurWeather(data.lat, data.long);

        // getOurPlaceName(data.lat, data.long);


        // getOurPlaceName(data.lat, data.long);

    });

    $(".blogBtn").click(async () => {
        const data = await $.get("/api/user_data")
        console.log("I am calling this", data)
        let email = data.email
        let review = $("#blogCreateField").val();
        let title = $("#blogCreateInput").val();

        postData(title, review, email)
        console.log("I am being clicked to create a BLOG")
    });





    function postData(title, review, email) {
        $.post("/api/blogs", {
            title: title,
            review: review,
            email: email
        }).then(res => {
            console.log("post data res", res)
            getBlogPost(title, review, email)
        })
    }

    // $(".blogBtn").click(() => {
    //     // getEmail();
    //     let review = $("#blogCreateField").val("");
    //     let title = $("#blogCreateInput").val("");
    //     // $.ajax({
    //     //     method: "GET",
    //     //     url: "/api/user_data"
    //     // }).then(function (response) {
    //     //     console.log(response.email)
    //     //     let email = response.email
    //     // }).then(function (req, res) {
    //     $.post("/api/blogs", {
    //         title: title,
    //         review: review,
    //         // email: email
    //     })
    //     console.log("I am being clicked to create a BLOGGGGGG")
    //     getBlogPost()
    // })

    function getBlogPost(title, review, email) {
        //   console.log("in blog post function")
        //   console.log("email", email)
        //   console.log("title", title)
        //   console.log("review", review)
        $.get("/api/blogs", function (data) {
            // data.length > 0 ? console.log("array", data) : console.log("this didnt work")

            // console.log("Getting our blog data: ", data)
            // console.log(data.title)
            //$("#blogOne").text(" " + data.title);
            // $("#BlogTwo").text(" " + res.title);
            // $("#BlogThree").text(" " + res.title);
            // $("#BlogFour").text(" " + res.title);
            // $("#BlogFive").text(" " + res.title);
        }).then(function (data) {
            console.log("Our .then data value: ", data);
            for (let i = 0; i < data.length; i++) {
                $("#blogOne").text(" " + data[0].title)
                $("#blogTwo").text(" " + data[i + 1].title)
                $("#blogThree").text(" " + data[i + 2].title)
                $("#blogFour").text(" " + data[i + 3].title)
                $("#blogFive").text(" " + data[i + 4].title)
            }

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
                console.log("We have a fail!");
                // EXS 8th June default to DC if we get a fail result
                const ourNWSErrorURL = ("https://api.weather.gov/gridpoints/LWX/95,71/forecast");
                $.get(ourNWSErrorURL, (response, status) => {
                    //       console.log("We have an error response: ",response)
                    displayOurWeather(response);
                    //newUser.ourLat = 38.9072;
                    //newUser.ourLong = -77.0369
                    getOurPlaceName(38.9072, -77.0369);
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
        console.log("Our place name settings: ", settings)
        $.ajax(settings).done(function (response) {
            $('#currentWeather').text(" " + response.data[0].city);
        });

    }
})