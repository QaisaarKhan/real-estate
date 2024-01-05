
var uid = null;
// Initialize Firebase
var config = {
    apiKey: "AIzaSyATKphkaqCJ9T3XZba4VOPQ8EnAgjPYBS4",
    authDomain: "united-property-kingdom.firebaseapp.com",
    databaseURL: "https://united-property-kingdom.firebaseio.com",
    projectId: "united-property-kingdom",
    storageBucket: "united-property-kingdom.appspot.com",
    messagingSenderId: "670945442306"
};
firebase.initializeApp(config);
//on scroll nav color change

$(document).ready(function () {

    var scrolli = $(window).scrollTop();
    if (scrolli > 50) {
        $('.nav-full').attr("height", "40");
        $('nav').addClass('shrink');
        $('.nav-full').attr("src", "./img/logo_sm_half.png");
        $(".arrow").fadeOut();

    }

    $(window).scroll(function () {
        if ($(document).scrollTop() > 50) {
            $('.nav-full').attr("height", "40");
            $('nav').addClass('shrink');
            $('.nav-full').attr("src", "./img/logo_sm_half.png");
            $(".arrow").fadeOut();


        } else {
            $('.nav-full').attr("height", "96");
            $('nav').removeClass('shrink');
            $('.nav-full').attr("src", "./img/logo_sm.png");
            $(".arrow").fadeIn();


        }
    });
    $(".loginBoxLogin").on('click', function () {
        var email = $("#login_email").val();
        var password = $("#login_password").val();

        firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
            $.notify("Login Successful", "success");
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                $.notify("Wrong password", "error");

            } else {
                alert(errorMessage);
            }
            console.log(error);
        });

    });

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            console.log(user);
            uid = user.uid;
            $(".vmbc").hide();
            phonefi = true;
            $(".userloginBox").fadeOut();

            $("#signUP").hide();
            $("#property_add").show();
            $(".passwords").hide();

            // ...
        } else {
            // User is signed out.
            // ...
            $("#signUP").show();
            $(".passwords").show();

            $("#property_add").hide();
            $(".userloginBox").show();
            console.log("signed out");
        }
        // ...
    });




    //$('.carousel').carousel({
    //    interval: 2000
    //});

    //var scrolli = $(window).scrollTop();
    //if (scrolli < 150) {
    //    $(".fixed-top").show();
    //}
    //$(window).scroll(function () {
    //    var scroll = $(window).scrollTop();
    //    if (scroll > 150) {

    //        $(".fixed-top").slideUp("fast", function () {
    //            // Animation complete
    //        });
    //    }

    //    else {
    //        $(".fixed-top").slideDown(100, function () {
    //            // Animation complete
    //        });

    //    }
    //});

});
function showLoader(text) {
    $(".loader__label").text(text);
    $(".main-loader").show();
}
function hideLoader() {
    $(".main-loader").hide();
}
function loginPage() {
    window.location.replace("signin.html?" + window.location.href);
}

function signUpPage() {
    window.location.replace("signup.html?");
}
function CheckPasswordStrength(password) {
    var password_strength = document.getElementById("password_strength");


    //if textBox is empty
    if (password.length == 0) {
        password_strength.innerHTML = "";
        return;
    }

    //Regular Expressions
    var regex = new Array();
    regex.push("[A-Z]"); //For Uppercase Alphabet
    regex.push("[a-z]"); //For Lowercase Alphabet
    regex.push("[0-9]"); //For Numeric Digits
    regex.push("[$@$!%*#?&]"); //For Special Characters

    var passed = 0;

    //Validation for each Regular Expression
    for (var i = 0; i < regex.length; i++) {
        if ((new RegExp(regex[i])).test(password)) {
            passed++;
        }
    }

    //Validation for Length of Password
    if (passed > 2 && password.length > 8) {
        passed++;
    }

    //Display of Status
    var color = "";
    var passwordStrength = "";
    switch (passed) {
        case 0:
            break;
        case 1:
            passwordStrength = "Password is Weak.";
            color = "Red";
            break;
        case 2:
            passwordStrength = "Password is Good.";
            color = "darkorange";
            break;
        case 3:
            break;
        case 4:
            passwordStrength = "Password is Strong.";
            color = "Green";
            break;
        case 5:
            passwordStrength = "Password is Very Strong.";
            color = "darkgreen";
            break;
    }
    password_strength.innerHTML = passwordStrength;
    password_strength.style.color = color;
}