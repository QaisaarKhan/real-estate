//$(document).ready(function () {

//    var contact_firstname,
//        contact_lastname,
//        contact_email,
//        postal_code,
//        contact_phone,
//        password,
//        confirm_password,
//        cnic = null;

//    $("#signup").on('click', function () {
//        contact_firstname = $("#first_name").val();
//        contact_lastname = $("#last_name").val();
//        contact_email = $("#email").val();
//        phone_code = $("#code").val();
//        contact_phone = $("#phone_no").val();
//        password = $("#password").val();
//        confirm_password = $("#c_password").val();
//        postal_code = $("#postal_code").val();
//        cnic = $("#owner_cnic").val();

//        var obj = {
//            "firstName": contact_firstname,
//            "lastName": contact_lastname,
//            "email": contact_email,
//            "phoneCode": phone_code,
//            "phone": contact_phone,
//            "cnic": cnic
//        };


//        if (password == confirm_password) {
//            firebase.auth().createUserWithEmailAndPassword(contact_email, password).then(function (user) {
//                firebase.database().ref("agents/" + user.uid).set(obj);

//                alert("Successful, Redirecting to Login");
//                setTimeout('', 5000);
//                window.open("./index.html", "_self");

//            });
//        }
//    });
//});


$(document).ready(function () {

    $("#submit").on('click', function () {

        var name = $("#first_name").val();
        var email = $("#email").val();
        var no = $("#no").val();

        var query = $("#query").val();
        var eflag = validate(email);
        console.log(eflag);
        var response = grecaptcha.getResponse();


        //reCaptch verified
        if (name.length > 0 && email.length > 0 && query.length > 0 && eflag && response.length !== 0) {
            emailjs.send("gmail", "template_H5DdyScf", {
                from_name: name,
                message_html: query,
                from_contact: no,
                reply_to: email

            }).then(
                function (response) {
                    console.log("SUCCESS", response);
                },
                function (error) {
                    console.log("FAILED", error);
                }
                );
        }
        else {
            if (!eflag) { alert("enter a valid email address"); }
        }
    });
});
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

    return false;
}
