$(document).ready(function () {


  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  // EXS 2nd June 2020 - Updated to pull NWS data for the users current Lat/Long
  $.get("/api/user_data").then(function (data) {
    // $(".member-name").text(data.email);
    console.log("Our get user_data:", data);
    $("#modalUserName").text(data.name);
    $("#modalUserEmail").text(data.email);
    $("#greeting").text(data.name);
    const ourFirstNWSURL = (`https://api.weather.gov/points/${data.lat},${data.long}`);
    // EXS 2nd June 2020 - Get our initial weather 
    $.ajax({
      url: ourFirstNWSURL,
      method: "GET"
    }).then((response) => {
      //console.log(response.properties.forecast);
      const ourLongRangeForecast = response.properties.forecast;
      //console.log (ourLongRangeForecast);
      $.ajax({
        url: ourLongRangeForecast,
        method: "GET"
      }).then((response) => {
        console.log(response.properties.periods[0].temperature);
        $("#ourTemp").text(response.properties.periods[0].temperature);
      })
    });
  });




  // EXS 2nd June 2020 - When user first logs in then we get the local weather on the members
  // page
  // API's we have available
  // Forecast https://api.weather.gov/gridpoints/LWX/95,71/forecast
  // Forecast Hourly https://api.weather.gov/gridpoints/LWX/95,71/forecast
  // Lat/Long Info https://api.weather.gov/points/lat,long

  const loadWeather = () => {
    const ourTestNWSURL = "https://api.weather.gov/gridpoints/RAH/78,52/forecast"
    const nwsAPIURL = "https://api.weather.gov/points/";
    const ourNWSURL = (`${nwsAPIURL}${ourLat},${ourLong}`);
    $.ajax({
      url: ourTestNWSURL,
      method: "GET",
    }).then((response) => {
      console.log(response.properties.periods[0]);
      const ourWeatherIcon = response.properties.periods[0].icon;
      const ourWeatherTemp = response.properties.periods[0].temperature;
      console.log(ourWeatherIcon, ourWeatherTemp);
    });
  };

  $("#ourTemp").text("Test");
  $("#ourWeatherIcon").text("Testing");






});
