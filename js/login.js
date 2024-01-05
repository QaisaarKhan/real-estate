$(document).ready(function () {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            console.log(user);
            uid = user.uid;
            $(".userloginBox").fadeOut();

            $("#signUP").hide();
            $("#property_add").show();
            $(".passwords").hide();
            console.log("user successfully Ssigned in ");
            var redirect = window.location.href.split("?");
            var tep = redirect[1] + "?";
            if (redirect.length > 1) {
                for (i = 2; i < redirect.length; i++) {
                    tep = tep + redirect[i];
                }
                window.location = tep;

            }
            else {

                window.location = "./index.html";
                hideLoader();
            }

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
});