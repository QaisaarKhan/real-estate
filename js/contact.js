
$(document).ready(function () {
    $("#submit").on('click', function () {
        var url = document.URL;

        showLoader("Sending");

        var no = $("#no").val();

        var name = $("#first_name").val();
        var email = $("#email").val();
        var query = $("#query").val();
        var hidden_info = $("#hidden_info").val();
        var eflag = validate(email);
        if (hidden_info == "") {
            hidden_info = "Contact Us"
        }
        var ppd = "";
        if (url.indexOf("contact") > -1 || url.indexOf("agent") > -1) {
            ppd = "";
        } else {
            ppd = "For project " + hidden_info;
        }
        var response = grecaptcha.getResponse();
        //&& response.length !== 0
        console.log(eflag);
        if (name.length > 0 && email.length > 0 && query.length > 0 && eflag) {
            emailjs.send("gmail", "template_H5DdyScf", {
                from_name: name,
                message_html: ppd + query,
                reply_to: email,
                from_contact: no

            }).then(
                function (response) {
                    console.log("SUCCESS", response);
                    hideLoader();

                    $(".alert-success").show();
                },
                function (error) {
                    console.log("FAILED", error);
                    $(".alert-danger").show();
                    hideLoader();

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
