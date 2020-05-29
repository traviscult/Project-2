$(document).ready(function() {

  // EXS 29th May 2020 - saunders.eddie@outlook.com
  // Quick and dirty function to get Users position, this will prompt the user to allow location
  //  This can be tidied up for the final build
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(showPosition);
    } else {
      console.log ("GeoLocation not supported");
    }
  }

  const showPosition = (position) => {
    console.log (position.coords.latitude);
    console.log (position.coords.longitude);
  }

  getLocation();

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });


});


