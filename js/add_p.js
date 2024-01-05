

var images_ci = [];
var imageName_ci = [];
var images = [];
var imageName = [];
var _total_upload = 0;
var _total_uploaded = 0;
var uploded = [];
var project_object = {};
var facility = {};
var storageRef = firebase.storage().ref();
var newProp = null;
var total, uploadedct = 0;
var banner_image = null;

var brochure_link = null;
$(document).ready(function () {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            uid = user.uid;
            console.log("signed in");
            $(".userloginBox").fadeOut();

            $("#signUP").hide();
            $("#property_add").show();
            $(".passwords").hide();

            // ...
        } else {
            // User is signed out.
            // ...
            alert("Please Sign In");
            window.location = "./signin.html?" + window.location.href;

        }
        // ...
    });


    newProp = firebase.database().ref("testProjects/").push();


    $(".facility-list").focus(function () {
        if (document.getElementById('facility-list').value === '') {
            document.getElementById('facility-list').value += '> ';
        }
    });
    $(".facility-list").keyup(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            document.getElementById('facility-list').value += '> ';
        }
        var txtval = document.getElementById('facility-list').value;
        if (txtval.substr(txtval.length - 1) == '\n') {
            document.getElementById('facility-list').value = txtval.substring(0, txtval.length - 1);
        }
    });


    firebase.database().ref("facilities").once('value', function (fac) {
        fac.forEach(function (facility) {
            $(".ci-checks").append('<div class="custom-control  custom_ci custom-checkbox upk-margin "><input type="checkbox" class="checkbox custom-control-input bar-check" onClick="addFacility(this)"  id="' + facility.key + '"  mqm="' + facility.key + '">' +
                '<label class="custom-control-label ci_check" for="' + facility.key + '">' + facility.key + '</label></div>');
        });
    });




    firebase.database().ref("cities").once('value', function (cityList) {
        cityList.forEach(function (city) {
            $("#city").append("<option value=" + city.key.toLowerCase() + ">" + city.key + "</option>");
        });
    });

    $("#add-image-sec").click(function () {
        var obj = '<div class="col-md-12 addons image-sec"><div class="sec-header"><span class="float-right" style="cursor:pointer"><a onClick="deleteSection(this)"><i class="fa fa-times"></i></a></span><h5>Image Section</h5></div ><br /><div class="form-group col-md-12">'
            + '<label for="">Section Title : <span style="color:red">*</span></label><input type="text" class="form-control property-field title" id="" placeholder="Enter Section Title"></div>'
            + '<div class="form-group col-md-12"><label for="">Section Detail : <span style="color:red">*</span></label>' +
            '<textarea type="text" class="form-control property-field description " rows="6" id="" placeholder="Enter Section Description"></textarea>'
            + '</div><div class="form-group col-md-12"><label for="">Image: <span style="color:red">*</span></label><input type="file" accept=".png,.jpg,.jpeg" class="form-control property-field sec-image" id="" placeholder="" /></div></div>';
        $(".section").append(obj);
    });



    $("#add-video-sec").click(function () {
        var obj = '<div class="col-md-12 addons video-sec"><div class="sec-header"><span class="float-right" style="cursor:pointer"><a onClick="deleteSection(this)"><i class="fa fa-times"></i></a></span><h5>Video Section</h5></div ><br /><div class="form-group col-md-12">'
            + '<label for="">Section Title : <span style="color:red">*</span></label><input type="text" class="form-control property-field title" id="" placeholder="Enter Section Title"></div>'
            + '<div class="form-group col-md-12"><label for="">Section Detail : <span style="color:red">*</span></label>'
            + '<textarea type="text" class="form-control property-field description" rows="6" id="" placeholder="Enter Section Description"></textarea>'
            + '</div><div class="form-group col-md-12"><label for="">Video Link: <span style="color:red">*</span></label><input type= "url" class="form-control property-field sec-url" id= "" placeholder= "Enter video url here" /></div></div>';
        $(".section").append(obj);
    });

    //read image by class name
    $("#b_link").on('change', function () {
        console.log($(this).val());
        var file1 = document.querySelector('#b_link');
        console.log(file1);
        var file = file1.files[0];
        var reader = new FileReader();

        reader.addEventListener("load", function () {
            brochure_link = event.target.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
            //console.log(reader.readAsDataURL(file));
        }
    });



    //read image by class name
    $("#b_image").on('change', function () {
        console.log($(this).val());
        var file1 = document.querySelector('#b_image');
        console.log(file1);
        var file = file1.files[0];
        var reader = new FileReader();

        reader.addEventListener("load", function () {
            banner_image = event.target.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
            //console.log(reader.readAsDataURL(file));
        }
    });



    //username, phoneno, email
    project_object = {};
    var high = {};
    var section = {};

    $("#project_add").click(function (e) {
        e.preventDefault();
        showLoader("Saving");
        var city = $("#city").val();
        var address = $("#location").val();
        var city = $("#city").val();
        var location = $("#location").val();
        var country = $("#country").val();
        var title = $("#p_title").val();
        var tagline = $("#p_tagline").val();
        var lat = $("#lat").val();
        var lng = $("#lng").val();
        var f_list = $("#facility-list").val();
        var c_info = $("#c_info").val();
        var keywords = $("#keywords").val();
        var s_price = $("#s_price").val();

        if (location.length == 0) { $.notify("Enter location", "error"); hideLoader(); return; }
        else if (lat.length == 0) { $.notify("Enter location Coordinates", "error"); hideLoader(); return; }
        else if (lng.length == 0) { $.notify("Enter location Coordinates", "error"); hideLoader(); return; }
        else if (city.length == 0 || city == "Select a City") { $.notify("Select city", "error"); hideLoader(); return; }
        else if (country.length == 0 || country == "Select a Country") { $.notify("Select country", "error"); hideLoader(); return; }
        else if (title.length == 0) { $.notify("Enter title", "error"); hideLoader(); return; }
        else if (banner_image == null) { $.notify("Upload Banner Image", "error"); hideLoader(); return; }

        var ban_ref = null;
        var imageRef = storageRef.child('testProjects/' + newProp.key + '/' + "banner");
        imageRef.putString(banner_image, 'data_url').then(function (snapshot) {
            ban_ref = snapshot.downloadURL;

            uploded = [];

            //contact_firstname = $("#first_name").val();
            //contact_lastname = $("#last_name").val();
            //contact_email = $("#email").val();
            //phone_code = $("#code").val();
            //contact_phone = $("#phone_no").val();
            //country/city/purpose

            var high_list = '';
            if (keywords !== '') {
                high_list = keywords.split(",");
                for (p = 0; p < high_list.length; p++) {
                    high[high_list[p]] = true;
                }
            }

            var section_counter = 0;
            $(".section").find(".addons").each(function () {
                if ($(this).hasClass("image-sec")) {
                    total++;
                    var temp = {};
                    var index = $(".addons").index(this);
                    temp['title'] = ($(this).find(".title").val());
                    temp['description'] = ($(this).find(".description").val());
                    var file1 = document.querySelector('.sec-image');
                    $(this).find(".sec-image").each(function () {
                        var file = this.files[0];
                        var reader = new FileReader();
                        reader.onload = function (event) {
                            // The file's text will be printed here
                            uploadImageSection(event.target.result, "sections/section" + index + "/image", "section" + index, newProp.key, true);
                            uploadedct++;
                            //temp['image'] = event.target.result;
                        };
                        reader.readAsDataURL(file);
                    });
                    temp['type'] = "img";

                    section['section' + section_counter] = temp;
                    section_counter++;
                }
                else {
                    var temp = {};
                    temp['title'] = ($(this).find(".title").val());
                    temp['description'] = ($(this).find(".description").val());
                    temp['url'] = ($(this).find(".sec-url").val());
                    temp['type'] = "vid";
                    section['section' + section_counter] = temp;

                    section_counter++;
                }
            });


            project_object = {
                "title": title,
                "tagLine": tagline,
                "latitude": lat,
                "longitude": lng,
                "images": {
                    "banner": ban_ref
                },
                "city": city,
                "country": country,
                "address": address,
                "highlights": high,
                "facilities": facility,
                "facilityList": f_list,
                "around": {
                    "title": "Around " + title,
                    "description": c_info
                },
                "price": s_price,
                "tagLine": tagline,
                "sections": section,
                "download": {
                    "item1": {
                        "text": "Download Brochure"

                    }
                }


            }

            newProp.set(project_object);
            if (brochure_link !== null) {
                uploadImageSection(brochure_link, "download/item1/url", "broucher", newProp.key, true);
            }
            for (i = 0; i < images.length; i++) {
                uploadImageSection(images[i], "images/slider/image" + i, imageName[i], newProp.key, true);
            }

            for (i = 0; i < images_ci.length; i++) {
                uploadImageSection(images_ci[i], "images/info/image" + i, imageName_ci[i], newProp.key, true);
            }


        });

    });

});

function uploadImageSection(imageURL, ref, imageName, id, set) {
    _total_upload++;
    var imageRef = storageRef.child('testProjects/' + id + '/' + imageName);

    imageRef.putString(imageURL, 'data_url').then(function (snapshot) {
        d_url = snapshot.downloadURL;
        if (set) {
            firebase.database().ref("testProjects/" + id + "/" + ref).set(snapshot.downloadURL);
        }
        _total_uploaded++;
        if (_total_upload == _total_uploaded) {
            hideLoader();
            window.location = "./_admin.html";
        }
    });

}


function addFacility(obj) {
    console.log("check click");

    if ($(obj).is(':checked')) {
        var chkVal = $(obj).attr('mqm');
        console.log(chkVal);
        facility[chkVal] = true;
    }
    else {

        var chkVal = $(obj).attr('mqm');
        //delete facility.chkVal;
    }
}

function deleteSection(obj) {
    uploadedct--;
    total--;
    $(obj).closest(".addons").remove();
}
