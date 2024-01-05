$(document).ready(function () {
    showLoader("Loading");
    var url = document.URL;
    var payload_temp = url.split("?");
    var payload = payload_temp[1].split("&");

    var city_temp = payload[1].split("=");
    var city = city_temp[1];
    var purpose_temp = payload[2].split("=");
    var purpose = purpose_temp[1];
    var key_temp = payload[0].split("=");
    var key = key_temp[1];


    firebase.database().ref("properties/" + city + "/" + purpose + "/" + key).once('value', function (property) {
        console.log(property.val());
        $(".prop-title").append('<h1 class="text-middle">' + property.val().title + '</h1>');
        $(".breadcrumb").append('<li class="breadcrumb-item active">' + property.val().title + '</li>');
        $(".price").text(parseInt(property.val().price).toLocaleString('en-EG') + " " + property.val().priceUnit);
        $(".size").text(property.val().landArea + " " + property.val().unit);
        $(".overview").text((property.val().description).replace(".","\n"));
        $(".contact-name").text(property.val().contactInfo.firstName + " " + property.val().contactInfo.lastName);
        $(".contact-phone").text(property.val().contactInfo.phone);
        $(".prop-addr").text(property.val().location);


        hideLoader();
        var f1 = true;
        var f4 = 0;
        var thumbdata = '';
        var addedImage = 0;
        var imageBase = [];

        var t_image = property.child("images").numChildren();
        property.child("images").forEach(function (image) {
            addedImage++;
            if (f1) {
                $(".bg-image-login").css("background-image", 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(140, 130, 89, 0.43)), url(' + image.val() + ')')

                thumbdata = '<div class="carousel-item active">';
                $("#imageslider").append('<div class="carousel-item active"><img class="d-block w-100" src= "' + image.val() + '" alt= "First slide"></div>');
                f1 = false;
            }
            else {

                $("#imageslider").append('<div class="carousel-item"><img class="d-block w-100" src= "' + image.val() + '" alt= "First slide"></div>');
            }

            if (f4 < 4) {
                if (imageBase.length < 4) {
                    imageBase.push(image.val());
                }

                thumbdata = thumbdata + '<img src="' + image.val() + '" data-target="#carouselExampleControls" data-slide-to="' + (addedImage - 1) + '" height="90" width="150" class="thumbnail-img " />';
                f4++;
            }
            else if (addedImage > 4) {
                for (p = 0; p < (f4 % 4); p++) {
                    thumbdata = thumbdata + '<img src="' + imageBase[p] + '" data-target="#carouselExampleControls" data-slide-to="' + p + '" height="90" width="150" class="thumbnail-img " />';
                }
                $("#thumbslider").append(thumbdata + '</div>');
                thumbdata = '<div class="carousel-item ">';
                f4 = 0;
            }
            if (t_image == addedImage) {
                if (addedImage > 4) {
                    for (p = 0; p < (f4 % 4); p++) {
                        thumbdata = thumbdata + '<img src="' + imageBase[p] + '" data-target="#carouselExampleControls" data-slide-to="' + p + '" height="90" width="150" class="thumbnail-img " />';
                    }
                }
                $("#thumbslider").append(thumbdata + '</div>');

            }

        });

    });

});