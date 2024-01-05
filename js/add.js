

var images = [];
var imageName = [];
var uploded = []; var property_object = {};
var ccdf = {};
var storageRef = firebase.storage().ref();
var newProp = null;



var phonefi = false;
$(document).ready(function () {
    $(".vmbs").hide();
    var purpose,
        type,
        sub_type,
        city,
        location,
        country,
        title,
        description,
        price_unit,
        price,
        size_unit,
        size,
        expiry_date,
        owner_name,
        owner_contact,
        contact_firstname,
        contact_lastname,
        contact_email,
        postal_code,
        bath,
        kitchen,
        rooms,
        lat, lng,
        contact_phone,
        password,
        confirm_password,
        cnic,
        phone_code = null;
    purpose = "";
    $('.house').hide();


    firebase.database().ref("cities").once('value', function (cityList) {
        cityList.forEach(function (city) {
            $("#city").append("<option value=" + city.key.toLowerCase() + ">" + city.key + "</option>");
        });
    });

    //username, phoneno, email
    var user_object = {};

    property_object = {};


    $(".button-checkbox ").on("click", function () {

        if ($(this).attr("type") === "radio") {
            $(this).parent().siblings().removeClass("isSelected");

        }

        $(this).parent().toggleClass("isSelected");


        if ($(this).parent().parent().hasClass("purpose")) {
            purpose = $(this).val();

        }

    });

    $('#property_type').on('change', function () {

        type = $(this).val();
        if (type == 1) {
            $('.commercial').hide();
            $('.residential').show();
        }
        else if (type == 2) {
            $('.residential').hide();
            $('.commercial').show();
        }
        console.log(type);
    });

    $('.property_type_sub').on('change', function () {

        type = $(this).val();
        if (type == "house" || type == "flat") {
            $('.house').show();
        }
        else {
            $('.house').hide();
        }
        console.log(type);

    }); $("#property_add").on('click', function () {
        uploded = [];

        type = $('#property_type').val();
        city = $("#city").val();
        location = $("#location").val();
        country = $("#country").val();
        title = $("#p_title").val();
        description = $("#p_desc").val();
        price_unit = $("#unit").val();
        price = $("#price").val();
        size_unit = $("#p_unit").val();
        size = $("#p_size").val();
        expiry_date = $("#expiry_date").val();
        owner_name = $("#owner_name").val();
        owner_contact = $("#owner_phone").val();
        contact_firstname = $("#first_name").val();
        contact_lastname = $("#last_name").val();
        contact_email = $("#email").val();
        phone_code = $("#code").val();
        contact_phone = $("#phone_no").val();
        password = $("#password").val();
        confirm_password = $("#c_password").val();
        cnic = $("#owner_cnic").val();
        bath = $("#bath").val();
        kitchen = $("#kitchen").val();
        rooms = $("#rooms").val();
        sub_type = $('.property_type_sub').val();

        lat = $('#lat').val();

        lng = $('#lon').val();

        console.log(uid);
        console.log(images);
        var eflag = validate(contact_email);


        if (purpose == "" || purpose == null) { $.notify("Select purpose", "error"); return; }
        else if (type.length == 0) { $.notify("Select type", "error"); return; }
        else if (sub_type.length == 0) { $.notify("Select Sub type", "error"); return; }
        else if (city.length == 0 || city == "Select a City") { $.notify("Select city", "error"); return; }
        else if (location.length == 0) { $.notify("Enter location", "error"); return; }
        else if (country.length == 0 || country == "Select a Country") { $.notify("Select country", "error"); return; }
        else if (title.length == 0) { $.notify("Enter title", "error"); return; }
        else if (description.length == 0) { $.notify("Enter description", "error"); return; }
        else if (price_unit.length == 0) { $.notify("Enter price Unit", "error"); return; }
        else if (price.length == 0) { $.notify("Enter price", "error"); return; }
        else if (size_unit.length == 0) { $.notify("Select price unit", "error"); return; }
        else if (size.length == 0) { $.notify("Enter size", "error"); return; }
        else if (expiry_date.length == 0) { $.notify("Select expiry date", "error"); return; }
        else if (contact_firstname.length == 0) { $.notify("Enter first name", "error"); return; }
        else if (contact_lastname.length == 0) { $.notify("Enter last name", "error"); return; }
        else if (contact_email.length == 0) { $.notify("Enter email", "error"); return; }
        else if (contact_phone.length == 0) { $.notify("Enter Phone No.", "error"); return; }
        else if (cnic.length == 0) { $.notify("Ente CNIC", "error"); return; }
        //else if (phone_code.length == 0) { $.notify("Enter Phone Code", "error"); return; }
        else if (!eflag) { $.notify("Enter Valid Email", "error"); return; }

        if (sub_type == "house" || sub_type == "flat") {
            if (bath.length == 0) { $.notify("Select purpose", "error"); return; }
            else if (kitchen.length == 0) { $.notify("Select kitchen", "error"); return; }
            else if (rooms.length == 0) { $.notify("Select rooms", "error"); return; }
            else if (images.length == 0) { $.notify("Upload Images", "error"); return; }

        }
        showLoader("Saving");

        //country/city/purpose
        newProp = firebase.database().ref("properties/" + city + "/" + purpose).push();

        property_object = {
            "type": type,
            "subType": sub_type,
            "purpose": purpose,
            "city": city,
            "country": country,
            "title": title,
            "description": description,
            "landArea": size,
            "unit": size_unit,
            "expiry": expiry_date,
            "location": location,
            "timestamp": new Date().toISOString(),
            "price": price,
            "priceUnit": price_unit,
            "min-share-holder": 1,
            "maxShareHolder": 4,
            "contactInfo": {
                "phone": phone_code + contact_phone,
                "email": contact_email,
                "firstName": contact_firstname,
                "lastName": contact_lastname,
                "cnic": cnic

            },
            "latitude": lat,
            "longitude": lng,
            "ownerInfo": {
                "name": owner_name,
                "phone": owner_contact
            },
            "verificationStatus": true,
            "createdBy": uid,
            "key": newProp.key,
            "bath": bath,
            "kitchen": kitchen,
            "rooms": rooms

        }
        console.log(images);


        console.log(imageName);
        //newProp.set(property_object);
        for (i = 0; i < images.length; i++) {
            uploadImage(images[i], newProp.key, imageName[i], i, purpose, city);
        }
    });

    $("#signUP").on('click', function () {

        uploded = [];
        city = $("#city").val();
        location = $("#location").val();
        country = $("#country").val();
        title = $("#p_title").val();
        description = $("#p_desc").val();
        price_unit = $("#unit").val();
        price = $("#price").val();
        size_unit = $("#p_unit").val();
        size = $("#p_size").val();
        expiry_date = $("#expiry_date").val();
        owner_name = $("#owner_name").val();
        owner_contact = $("#owner_phone").val();
        contact_firstname = $("#first_name").val();
        contact_lastname = $("#last_name").val();
        contact_email = $("#email").val();
        phone_code = $("#code").val();
        contact_phone = $("#phone_no").val();
        password = $("#password").val();
        confirm_password = $("#c_password").val();
        cnic = $("#owner_cnic").val();
        bath = $("#bath").val();
        kitchen = $("#kitchen").val();
        rooms = $("#rooms").val();
        sub_type = $('.property_type_sub').val();

        lat = $('#lat').val();

        lng = $('#lon').val();

        if (purpose == "" || purpose == null) { $.notify("Select purpose", "error"); return; }
        else if (type.length == 0) { $.notify("Select type", "error"); return; }
        else if (sub_type.length == 0) { $.notify("Select Sub type", "error"); return; }
        else if (city.length == 0 || city == "Select a City") { $.notify("Select city", "error"); return; }
        else if (location.length == 0) { $.notify("Enter location", "error"); return; }
        else if (country.length == 0 || country == "Select a Country") { $.notify("Select country", "error"); return; }
        else if (title.length == 0) { $.notify("Enter title", "error"); return; }
        else if (description.length == 0) { $.notify("Enter description", "error"); return; }
        else if (price_unit.length == 0) { $.notify("Enter price Unit", "error"); return; }
        else if (price.length == 0) { $.notify("Enter price", "error"); return; }
        else if (size_unit.length == 0) { $.notify("Select price unit", "error"); return; }
        else if (size.length == 0) { $.notify("Enter size", "error"); return; }
        else if (expiry_date.length == 0) { $.notify("Select expiry date", "error"); return; }
        else if (contact_firstname.length == 0) { $.notify("Enter first name", "error"); return; }
        else if (contact_lastname.length == 0) { $.notify("Enter last name", "error"); return; }
        else if (contact_email.length == 0) { $.notify("Enter email", "error"); return; }
        else if (contact_phone.length == 0) { $.notify("Enter Phone No.", "error"); return; }
        else if (cnic.length == 0) { $.notify("Ente CNIC", "error"); return; }
        //else if (phone_code.length == 0) { $.notify("Enter Phone Code", "error"); return; }
        else if (!eflag) { $.notify("Enter Valid Email", "error"); return; }

        if (sub_type == "house" || sub_type == "flat") {
            if (bath.length == 0) { $.notify("Select purpose", "error"); return; }
            else if (kitchen.length == 0) { $.notify("Select kitchen", "error"); return; }
            else if (rooms.length == 0) { $.notify("Select rooms", "error"); return; }
            else if (images.length == 0) { $.notify("Upload Images", "error"); return; }

        }

        if (password == confirm_password) {
            if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[a-z]/.test(password)) {

                firebase.auth().createUserWithEmailAndPassword(contact_email, password).then(function (user) {
                    uid = user.uid;

                    console.log(uid);
                    newProp = firebase.database().ref("properties/" + city + "/" + purpose).push();

                    property_object = {
                        "type": type,
                        "subType": sub_type,
                        "purpose": purpose,
                        "city": city,
                        "country": country,
                        "title": title,
                        "description": description,

                        "latitude": lat,
                        "longitude": lng,
                        "landArea": size,
                        "unit": size_unit,
                        "expiry": expiry_date,
                        "location": location,
                        "timestamp": new Date().toISOString(),
                        "price": price,
                        "priceUnit": price_unit,
                        "min-share-holder": 1,
                        "maxShareHolder": 4,
                        "contactInfo": {
                            "phone": phone_code + contact_phone,
                            "email": contact_email,
                            "firstName": contact_firstname,
                            "lastName": contact_lastname,
                            "cnic": cnic

                        },
                        "ownerInfo": {
                            "name": owner_name,
                            "phone": owner_contact
                        },
                        "verificationStatus": true,
                        "createdBy": uid,
                        "key": newProp.key,
                        "bath": bath,
                        "kitchen": kitchen,
                        "rooms": rooms

                    }


                    console.log(imageName);
                    //newProp.set(property_object);
                    for (i = 0; i < images.length; i++) {
                        uploadImage(images[i], newProp.key, imageName[i], i, purpose, city);
                    }

                }).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ...
                });
            } else {
                $.notify("Password must contain one uppercase, one lowercase and a number", "error");
            }
        }

    });


});

function uploadImage(imageURL, parentKey, imageName, counter, purpose, city, country) {
    var imageRef = storageRef.child('Properties/' + parentKey + '/' + imageName);

    imageRef.putString(imageURL, 'data_url').then(function (snapshot) {
        //firebase.database().ref("properties/"+ city + "/" + purpose + "/" + parentKey + "/images/image" + counter).set(snapshot.downloadURL);
        uploded.push(parentKey);
        ccdf["image" + counter] = snapshot.downloadURL;
        if (uploded.length == images.length) {
            property_object["images"] = ccdf;
            newProp.set(property_object);
            hideLoader();
            alert("Property added.");
            window.location = "./add.html";

        }
    });

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