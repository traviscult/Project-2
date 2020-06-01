$(document).ready(function () {

  // EXS 1st June 2020 - Added in some test data for modal ond greeting message
  // In  prod this needs to be changed to the values stored in the database.
  const ourTestName = "Fred"
  const ourTestEmail = "Fred@fred.com"
  $("#modalUserName").text(ourTestName);
  $("#modalUserEmail").text(ourTestEmail);
  $("#greeting").text(ourTestName);

  // EXS 29th May 2020 - saunders.eddie@outlook.com
  // Quick and dirty function to get Users position, this will prompt the user to allow location
  //  This can be tidied up for the final build
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(showPosition);
    } else {
      console.log("GeoLocation not supported");
    }
  }

  const showPosition = (position) => {
    // EXS 30th May 2020 - Testing to display our NWS data
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    // EXS 30th May 2020 - create API call to NWS to get current conditions
    const ourLat = position.coords.latitude;
    const ourLong = position.coords.longitude;
    // EXS 30th May 2020 - Create our NWS calls, this is test data so we're cheating a little
    // to make sure everything is being returned as expected

    // Forecast https://api.weather.gov/gridpoints/LWX/95,71/forecast
    // Forecast Hourly https://api.weather.gov/gridpoints/LWX/95,71/forecast
    // Lat/Long Info https://api.weather.gov/points/lat,long

    const nwsAPIURL = "https://api.weather.gov/points/";
    const ourNWSURL = (`${nwsAPIURL}${ourLat},${ourLong}`);
    $.ajax({
      url: ourNWSURL,
      method: "GET",
    }).then((response) => {
      console.log(response);
    });
    console.log(ourNWSURL);
  }

  getLocation();

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
  });


});
