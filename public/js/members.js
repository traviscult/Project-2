// const db = require("../../models");
$(document).ready(function () {
    //const userEmailAddress = ""
    // const getEmail = () => {
    //     $.get("/api/user_data").then(function (data) {
    //         let email = data.email
    //         return email;

    //     })
    //     console.log(email)
    // }
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    // EXS 2nd June 2020 - Updated to pull NWS data for the users current Lat/Long
    //  console.log("Calling members.js");
    $.get("/api/user_data").then(function (data) {
        // $(".member-name").text(data.email);
        //  console.log("Our get user_data:", data);
        $("#modalUserName").text(data.name);
        $("#modalUserEmail").text(data.email);
        $("#greeting").text(data.name);
        //userEmailAddress = data.email;
        //console.log("userEmailAddress: ", userEmailAddress);
        getOurWeather(data.lat, data.long);
    });

    $(".blogBtn").click(() => {
        $.get("/api/user_data", function (data) {
                console.log("I am calling this", data)
                let email = data.email
                let review = $("#blogCreateField").val();
                let title = $("#blogCreateInput").val();
                // console.log("email", email)
                // console.log("title", title)
                // console.log("review", review)
                // $.post("/api/blogs", {
                //         title: title,
                //         review: review,
                //         email: email
                //     },

                // ) 
                postData(title, review, email)
            },


        );

        // getBlogPost()
        console.log("I am being clicked to create a BLOG")
    });

    function postData(title, review, email) {
        
        $.post("/api/blogs", {
                title: title,
                review: review,
                email: email
            }

        ).then(res => {
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
        console.log("in blog post function")
        console.log("email", email)
        console.log("title", title)
        console.log("review", review)
        $.get("/api/blogs", function (data) {
            data.length > 0 ? console.log("array", data) : console.log("this didnt work")
            
            console.log(data)
            console.log(data.title)
            $("#blogOne").text(" " + data.title);
            // $("#BlogTwo").text(" " + res.title);
            // $("#BlogThree").text(" " + res.title);
            // $("#BlogFour").text(" " + res.title);
            // $("#BlogFive").text(" " + res.title);
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