
var config = {
    apiKey: "AIzaSyATKphkaqCJ9T3XZba4VOPQ8EnAgjPYBS4",
    authDomain: "united-property-kingdom.firebaseapp.com",
    databaseURL: "https://united-property-kingdom.firebaseio.com",
    projectId: "united-property-kingdom",
    storageBucket: "united-property-kingdom.appspot.com",
    messagingSenderId: "670945442306"
};
firebase.initializeApp(config);
var phonefi = false;
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
$(document).ready(function () {
    $(".vmbs").hide();
    var scrolli = $(window).scrollTop();
    if (scrolli > 50) {
        $('.nav-full').attr("height", "40");
        $('nav').addClass('shrink');
        $('.nav-full').attr("src", "./img/logo_sm_half.png");
        $(".arrow").fadeOut();

    }

    var contact_firstname,
        contact_lastname,
        contact_email,
        postal_code,
        contact_phone,
        password,
        confirm_password,
        cnic = null;
    $("#signup").on('click', function () {
        contact_firstname = $("#first_name").val();
        contact_lastname = $("#last_name").val();
        contact_email = $("#email").val();
        phone_code = $("#code").val();
        contact_phone = $("#phone_no").val();
        password = $("#password").val();
        confirm_password = $("#c_password").val();
        cnic = $("#owner_cnic").val();
        var regex = new RegExp('^(?=.*[A - Z])(?=.*[a - z])(?=.*\d).*$');
        var eflag = validate(contact_email);
        if (contact_email !== '' && eflag && contact_phone !== '' && contact_firstname !== '' && contact_lastname !== '') {
            if (password == confirm_password) {
                if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[a-z]/.test(password)) {

                    if (phonefi) {
                        showLoader("Signing Up");
                        firebase.auth().createUserWithEmailAndPassword(contact_email, password).then(function (user) {
                            console.log(user);
                            firebase.database().ref("users/" + user.uid).set({
                                "firstName": contact_firstname,
                                "lastName": contact_lastname,
                                "phoneNumber": contact_phone,
                                "cnic": cnic,
                                "email": contact_email
                            }).then(function () {
                                hideLoader();
                                // Update successful.
                                setTimeout('', 10000);

                                window.open("./index.html", "_self");
                            }).catch(function (error) {
                                // An error happened.

                            });
                            $.notify("Successful, Redirecting to Login", "success");



                        }).catch(function (error) {
                            $.notify(error.message, "error");
                        });
                    } else {
                        $.notify("Verify phone number", "error");
                    }


                }
                else {
                    $.notify("Password must contain one uppercase, one lowercase and a number", "error");
                }

            } else {
                $.notify("Password does not match", "error");

            }
        }
        else {
            $.notify("All fields are required", "error");
        }
    });
});

function myFunction() {
    window.confirmationResult.confirm(document.getElementById("verificationcode").value)
        .then(function (result) {
            $("#verifyBtn").css("background-color", "green");
            $.notify("Verification successfull", "success");

            phonefi = true;
        }, function (error) {
            $("#verifyBtn").css("background-color", "red");
            phonefi = false;

            $notify("Verification unsuccessful", "error");
        });
}


function myFunctionSend() {
    var contact_phone = $("#phone_no").val();
    if (contact_phone != '') {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

        firebase.auth().signInWithPhoneNumber(contact_phone, window.recaptchaVerifier)
            .then(function (confirmationResult) {
                $.notify("Verfication code sent to provided number", "info");

                $(".vmbs").show();
                $(".vmbc").hide();


                window.confirmationResult = confirmationResult;
            });
    } else {
        $.notify("Please enter number", "error");

    }
}
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function validate(email) {
    if (validateEmail(email)) {
        $("#result").text(email + " is valid :)");
        $("#result").css("color", "green");
        return true;
    } else {
        $("#result").text(email + " is not valid :(");
        $("#result").css("color", "red");
        return false;

    }

}
function showLoader(text) {
    $(".loader__label").text(text);
    $(".main-loader").show();
}
function hideLoader() {
    $(".main-loader").hide();
}