// EXS 29th May 2020 - Combine both the login and signup scripts into one
// Version 1.0 - Right now the script does not write or respond to the local database
// removing all code to confirm button click functionality is working

$(document).ready(() => {
    // Getting references to our form and inputs
    let newUser = { firstName: "", lastName: "", email: "", ourLat: 0.0, ourLong: 0.0 };

    const loginForm = $("form.login");
    let emailInput = $("input#email-input");
    let passwordInput = $("input#password-input");

    // EXS check to see if the login button has been clicked
    // Validate our fields have data, if not, then return out of the function
    $(':button').click(function(event) {
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
        } else if (this.id === "signUpBtn") {
            let userData = {
                    email: emailInput.val().trim(),
                    password: passwordInput.val().trim()
                }
                // If we have null data return out
            if (!userData.email || !userData.password) {
                return;
            }
            signUpUser(userData.email, userData.password);
            emailInput.val("");
            passwordInput.val("");
            //console.log("Our UserData:", userData);
            //console.log("Signup Button Pressed")
        };
    });

    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(email, password) {
        console.log(email, password);
        console.log("Executing Login User");
        $.post("/api/login", {
                email: email,
                password: password
            })
            .then(function() {
                // EXS 1st June 2020, if we have a successful login, we should try and obtain and save the users location
                // at this pointfor display on the members page, if the location is not available we default it to Washington DC.
                window.location.replace("/members");
                // If there's an error, log the error
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    // EXS 30th May 2020 - signUpUser function, pass over user created details, then
    // grant them accessLevel 1, which I believe is Noob...
    // If the creation is good, then proceed to the members page
    // EXS Added in test data for name and lat/long

    // EXS 4th June 2020 - This will require some refactoring, as clicking the signUp button now now opens a modal
    // Clicking signup on the modal should be executing this post call.

    // EXS 4th June 2020 - Need to add in error check, if user is already in the system, they cannot create a new account

    function signUpUser(email, password) {
        // EXS 2nd June 2020 - If we have 0 in both ourLat and ourLong, then default to Washington DC coords
        if (newUser.ourLat == 0 && newUser.ourLong == 0) {
            console.log("We are at 0,0");
            newUser.ourLat = 38.9072;
            newUser.ourLong = -77.0369;
        }
        getNewUserFirstName();

        console.log("Did our modal getNewUserFirstName code run?");
        $.post("/api/signup", {
                name: newUser.firstName,
                email: email,
                password: password,
                accessLevel: 1,
                geoLat: newUser.ourLat,
                geoLong: newUser.ourLong
            }).then(function(data) {

                // window.location.replace("/members");
                // If there's an error, handle it by throwing up a bootstrap alert
            })
            .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        console.log("Login Error: ", err);
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

    getLocation();

    // EXS 4th June adding in getting first name code here
    // We can then traqnsfer the entered data to the newUser object for writing.

    const getNewUserFirstName = () => {
        console.log("Getting our first name!");
        let modal = document.getElementById("myModal-2");
        let btn = document.getElementById("signUpBtn");
        let span = document.getElementsByClassName("close-2")[0];
        console.log("modal: ", modal);
        console.log("btn: ", btn);
        console.log("span: ", span);

        $(".signUpBtn").on("click", () => {
            console.log("Signup button pressed");
        });

        // btn.onclick = function() {
        //     modal.style.display = "block";
        // }
        span.onclick = function() {
            modal.style.display = "none";
        }

        $("#finalSignUp").on("click", () => {
            console.log("finalsignup was clicked");
            console.log($("#firstName").val());
            console.log("Our User Data: ", newUser);
            window.location.replace("/members");
        })



    }
});