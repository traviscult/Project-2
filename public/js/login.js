// EXS 29th May 2020 - Combine both the login and signup scripts into one
// Version 1.0 - Right now the script does not write or respond to the local database
// removing all code to confirm button click functionality is working

$(document).ready(() => {
    // Getting references to our form and inputs
    let newUser = {
        name: "",
        password: "",
        email: "",
        ourLat: 0.0,
        ourLong: 0.0
    };

    const loginForm = $("form.login");
    let emailInput = $("input#email-input");
    let passwordInput = $("input#password-input");
    let nameInput = $("input#firstName");

    // EXS check to see if the login button has been clicked
    // Validate our fields have data, if not, then return out of the function
    $(':button').click(function (event) {
        event.preventDefault();
        if (this.id === "loginBtn") {
            let userData = {
                email: emailInput.val().trim(),
                password: passwordInput.val().trim()
            }
            // If we have null data return out
            if (!userData.email || !userData.password) {
                return;
            }
            loginUser(userData.email, userData.password);
            emailInput.val("");
            passwordInput.val("");
            // console.log("Our UserData:", userData);
            // console.log("Login Button Pressed");
        } else if (this.id === "signUpBtn") {
            let userData = {
                email: emailInput.val().trim(),
                password: passwordInput.val().trim()
            }
            // added this line 
            newUser.email = userData.email
            // If we have null data return out
            if (!userData.email || !userData.password) {
                return;
            }
            // console.log("Signup Button Pressed")
        };
    });

    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(email, password) {
        // console.log(name, email, password);
        // console.log("Executing Login User");
        $.post("/api/login", {
            email: email,
            password: password
        })
            .then(function () {
                // EXS 1st June 2020, if we have a successful login, we should try and obtain and save the users location
                // at this pointfor display on the members page, if the location is not available we default it to Washington DC.
                window.location.replace("/members");
                // If there's an error, log the error
            })
            .catch(function (err) {
                console.log(err);
            });

    }
    // EXS 30th May 2020 - signUpUser function, pass over user created details, then
    // grant them accessLevel 1, If the creation is good, then proceed to the members page
    // EXS Added in test data for name and lat/long
    function signUpUser(email, password) {
           $.post("/api/signup", {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            accessLevel: 1,
            geoLat: newUser.ourLat,
            geoLong: newUser.ourLong
        }).then(function (data) {
            window.location.replace("/members");
            // If there 's an error, handle it by throwing up a bootstrap alert
        })
            .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }

    // EXS 1st June 2020 Get our geolocation here and return the value to the signup user function
    // This is done here so we dont have to keep looking when the user is on the members page
    const getLocation = (position) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
    
        } else {
            console.log("GeoLocation not supported");
        }
    }

    const showPosition = (position) => {
        // EXS 30th May 2020 - Copy our geoLocation into newUser lat and long
        newUser.ourLat = position.coords.latitude;
        newUser.ourLong = position.coords.longitude;
    }


    let modal = document.getElementById("myModal-2");
    let btn = document.getElementById("signUpBtn");
    let span = document.getElementsByClassName("close-2")[0];

    btn.onclick = function () {
        modal.style.display = "block";
    }
    span.onclick = function () {
        modal.style.display = "none";
    }

    getLocation(); // EXS 8th June 2020 - Seems to be the only place this works. Will investigate later

    $(".close-2").on("click", () => {
        console.log ("Creating our sign up")

        let userData = {
            name: nameInput.val().trim()
        }
        newUser.name = nameInput.val().trim();
        // console.log("requesting new user info", newUser)
        if (!userData.name) {
            return;
        }
        console.log ("Our newUserData: ", newUser);

        if (newUser.ourLat == 0 && newUser.ourLong == 0) {
            console.log("We are at 0,0");
            newUser.ourLat = 38.9072;
            newUser.ourLong = -77.0369;
        }

        // Here we should parse our object data and send it to user creation
        // Do some data logging first
        newUser.password = passwordInput.val().trim();
//        console.log(newUser)
        signUpUser(newUser.name, newUser.email, userData.password, newUser.accessLevel, newUser.ourLat, newUser.ourLong);
    });
});