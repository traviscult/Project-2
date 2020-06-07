// import { DataTypes } from "sequelize/types";

// const db = require("../../models");
$(document).ready(function() {
    //const userEmailAddress = ""

    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    // EXS 2nd June 2020 - Updated to pull NWS data for the users current Lat/Long
    //  console.log("Calling members.js");
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
                //  console.log("Members Page Weather Reponse: ", response.properties);
                const currentWeatherIcon = '<img src="' + response.properties.periods[0].icon + '">';
                //    console.log("Our Weather Icon value: ", currentWeatherIcon);
                $('#ourWeatherIcon').html(currentWeatherIcon);
                $("#wd1").text(" " + response.properties.periods[0].temperature);
                $("#wd2").text(" " + response.properties.periods[1].temperature);
                $("#wd3").text(" " + response.properties.periods[3].temperature);
                $("#wd4").text(" " + response.properties.periods[5].temperature);
                $("#wd5").text(" " + response.properties.periods[7].temperature);
            });
        });
    }
});