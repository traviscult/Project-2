$(document).ready(function() {


    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    // EXS 2nd June 2020 - Updated to pull NWS data for the users current Lat/Long
    $.get("/api/user_data").then(function(data) {
        // $(".member-name").text(data.email);
        console.log("Our get user_data:", data);
        $("#modalUserName").text(data.name);
        $("#modalUserEmail").text(data.email);
        $("#greeting").text(data.name);
        getOurWeather(data.lat, data.long);
    });


<<<<<<< HEAD
=======
  //  $(".close-2").on ("click", ()=>{
  //   console.log("name submit is being clicked")
  //   let name = $("#firstName").val("");

  //   $.post("/api/signup,", {name}).then(function (res){

  //     const {name} = res;
  //     console.log(name)

  //     $.ajax({
  //       type: "POST",
  //       url: url
  //     })
  //   })

  // })
>>>>>>> master

    $(".blogBtn").click(() => {
        console.log("I am being clicked to create a BLOGGGGGG")

<<<<<<< HEAD
        // const blogCreateInput = "here is my blog creat input";
        // const blogCreatefield = "blog field";

        let title = $("#blogCreateInput").val();
        let review = $("#blogCreateField").val();

        $.post("/api/blogs", { title, review, }).then(function(res) {
=======
    // const blogCreateInput = "here is my blog creat input";
    // const blogCreatefield = "blog field";

    let title = $("#blogCreateInput").val();
    let review = $("#blogCreateField").val();

    $.post("/api/blogs", {
      title,
      review,
    }).then(function (res) {

      const {
        title,
        review
      } = res;
      console.log(title, review)
>>>>>>> master

            const { title, review } = res;
            console.log(title, review)

            $.ajax({
                type: "POST",
                url: url,
            });

        });
    });
<<<<<<< HEAD

    // EXS 4th June 2020 This is a test function for getting the weather. This does actually work, need to investigate
    // making this an api call
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
=======
  });


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
>>>>>>> master


            });
        });
    }
});