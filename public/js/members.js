// const db = require("../../models");
$(document).ready(function () {


  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  // EXS 2nd June 2020 - Updated to pull NWS data for the users current Lat/Long
  console.log("Calling members.js");
  $.get("/api/user_data").then(function (data) {
    // $(".member-name").text(data.email);
    console.log("Our get user_data:", data);
    $("#modalUserName").text(data.name);
    $("#modalUserEmail").text(data.email);
    $("#greeting").text(data.name);
    getOurWeather(data.lat, data.long);
  });

  $(".blogBtn").click(() => {
    console.log("I am being clicked to create a BLOGGGGGG")
    let title = $("#blogCreateInput").val();
    let review = $("#blogCreateField").val();
    

    console.log(title, review)

    $.post("/api/blogs", {
        title,
        review,
      })
      .then(function (res) {

        const {
          title,
          review
        } = res;
        console.log(res)

        $.ajax({
          type: "POST",
          url: url,
        });
      });
    getBlogPost()
  });


  function getBlogPost() {

    $.get("/api/blogs", (req, res) => {
      console.log(req)
      console.log(res)
      // $("#blogOne").text(req.body.title);
      // $("#BlogTwo").text(" " + req.body.title);
      // $("#BlogThree").text(" " + req.body.title);
      // $("#BlogFour").text(" " + req.body.title);
      // $("#BlogFive").text(" " + req.body.title);


    })


  }


  function getOurWeather(lat, long) {
    const ourFirstNWSURL = (`https://api.weather.gov/points/${lat},${long}`);
    console.log("Our First NWS URL: ", ourFirstNWSURL);
    // EXS 2nd June 2020 - Get our initial weather 
    $.get(ourFirstNWSURL, (response, status) => {
      console.log("Response: ", response);
      console.log("Status: ", status);
      const ourLongRangeForecast = response.properties.forecast;
      console.log("Our Long Range Forecase URL: ", ourLongRangeForecast);
      $.get(ourLongRangeForecast, (response, status) => {
        console.log(response.properties);
        const currentWeatherIcon = '<img src="' + response.properties.periods[0].icon + '">';
        console.log("Our Weather Icon value: ", currentWeatherIcon);
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