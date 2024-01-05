$(document).ready(function () {
    var obj = null;

    showLoader("Loading");
    var url = document.URL;
    var payload_temp = url.split("=");
    var key = payload_temp[1];

    firebase.database().ref("testProjects/" + key).once('value', function (project) {

        console.log(project.val().latitude);
        console.log(project.val().longitude);

        var uluru = { lat: parseFloat(project.val().latitude), lng: parseFloat(project.val().longitude) };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: uluru
        });
        var marker = new google.maps.Marker({
            position: uluru,
            map: map,
            title: project.val().title

        });
        var _upk = "";
        var high_text = [];
        project.child("highlights").forEach(function (high) {
            high_text.push(high.key.toLowerCase());
        });
        $("#hidden_info").val(project.val().title);
        $(".project-title").text(project.val().title);
        $(".project-tag").text(project.val().tagLine);
        $(".project-tag").text(project.val().tagLine);
        var img = 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.80),rgba(0, 0, 0, 0.50)), url(' + project.val().images.banner + ')';
        $(".bg-image-project").css("background-image", img);
        var counter_sec = 0;
        var _sections = project.child("sections");
        _sections.forEach(function (section) {
            _upk = highlight(section.val().title, high_text);
            //consoleole.log(_upk);

            if (section.val().type == "img") {
                if (counter_sec % 2 == 0) {
                    if (counter_sec == 0) {
                        obj = '<div class="col-md-12"><div class="row p-t-5p video-row" ><div class="col-md-5 p-tb-30" style="z-index:10"><div class="overlap-video-ltr "><div class="video-wraper " style="background-image:url(' + section.val().image + ');background-size:cover;background-position:center"><img src="" class="img-fluid mx-auto d-block" /></div></div></div><div class="col-md-7 video-box-text-ltr p-75-video-ltr"><h3 class="pro-info-title S2_title ">' + _upk + '</h3><br/>'
                            + '<p class="S2_text">' + section.val().description + '</p><div class="row p-t-5p items-dwnl"></div></div></div></div><br/>';
                    }
                    else {
                        obj = '<div class="col-md-12"><div class="row p-t-5p video-row" ><div class="col-md-5 p-tb-30 " style="z-index:10"><div class="overlap-video-ltr "><div class="video-wraper " style="background-image:url(' + section.val().image + ');background-size:cover;background-position:center"><img src="" class="img-fluid mx-auto d-block" /></div></div></div><div class="col-md-7 video-box-text-ltr p-75-video-ltr"><h3 class="pro-info-title S2_title ">' + _upk + '</h3><br/>'
                            + '<p class="S2_text">' + section.val().description + '</p></div></div></div><br/>';
                    }

                }

                else {
                    obj = '<div class="col-md-12"><div class="row p-t-5p video-row" ><div class="col-md-7 video-box-text p-75-video"><h3 class="pro-info-title S2_title ">' + _upk + '</h3><br/>'
                        + '<p class="S2_text">' + section.val().description + '</p></div><div class="col-md-5 p-tb-30 " style="z-index:10"><div class="overlap-video "><div class="video-wraper " style="background-image:url(' + section.val().image + ');background-size:cover;background-position:center"></div></div></div></div></div><br/>';
                }
                //obj = '<div class="row h-40vh p-t-5p"><div class="col-md-4 S1_img"><img src="' + section.val().image + '" class="img-fluid mx-auto d-block h-100p" />' +
                //    '</div ><div class="col-md-7 p-50  "><h3 class="pro-info-title S1_title">' + _upk + '</h3><br/><p class="S1_text">' + section.val().description + '</p></div></div><br/>';

                $(".section-project").append(obj);
            }
            else {
                if (counter_sec % 2 == 0) {
                    if (counter_sec == 0) {

                        obj = '<div class="col-md-12"><div class="row p-t-5p video-row" ><div class="col-md-5" style="z-index:10" ><div class="overlap-video-ltr " style="height:97%;"><div class="video-wraper "><div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="' + section.val().url + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div></div></div></div><div class="col-md-7 video-box-text-ltr p-75-video-ltr"><h3 class="pro-info-title S2_title ">' + _upk + '</h3><br/>'
                            + '<p class="S2_text">' + section.val().description + '</p><div class="row p-t-5p items-dwnl"></div></div>' +
                            '</div></div><br/>';
                        $(".section-project").append(obj);
                    } else {

                        obj = '<div class="col-md-12"><div class="row p-t-5p video-row" ><div class="col-md-5" style="z-index:10" ><div class="overlap-video-ltr " style="height:97%;"><div class="video-wraper "><div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="' + section.val().url + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div></div></div></div><div class="col-md-7 video-box-text-ltr p-75-video-ltr"><h3 class="pro-info-title S2_title ">' + _upk + '</h3><br/>'
                            + '<p class="S2_text">' + section.val().description + '</p></div>' +
                            '</div></div><br/>';
                        $(".section-project").append(obj);
                    }
                }

                else {

                    obj = '<div class="col-md-12"><div class="row p-t-5p video-row" ><div class="col-md-7 video-box-text p-75-video"><h3 class="pro-info-title S2_title ">' + _upk + '</h3><br/>'
                        + '<p class="S2_text">' + section.val().description + '</p></div><div class="col-md-5" style="z-index:10"><div class="overlap-video " style="height:97%;"><div class="video-wraper ">' +
                        '<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="' + section.val().url + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div></div></div></div></div></div><br/>';

                    $(".section-project").append(obj);
                }
            }
            counter_sec++;
        });
        _upk = highlight(project.val().around.title, high_text);

        $(".S3_title").html(_upk);

        $(".S3_text").text(project.val().around.description);
        console.log(project.val());
        project.child('facilities').forEach(function (facility) {
            var fact = facility.key.toLowerCase();
            fact = fact.replace(" ", "-");
            if (fact.indexOf("school") > -1) { fact = "school";}
            $("#factList").append('<div class="item"><div class="pad15" ><img src="./img/icons/' + fact + '.png" height="64"  /><br /><p class="lead">' + facility.key + '</p></div ></div>');

        });
        ResCarouselSize();

        project.child('download').forEach(function (d_item) {
            //consoleole.log(d_item.val());
            $(".items-dwnl").append('<div class="col"><a href="' + d_item.val().url + '" class="item-link">' + d_item.val().text + '</a> </div>')
        });
        hideLoader();
        var f1 = true;
        project.child('images/slider').forEach(function (image) {
            if (f1) {
                thumbdata = '<div class="carousel-item active">';
                $("#imageslider").append('<div class="carousel-item active"><img class="d-block w-100-c" src= "' + image.val() + '" alt= "First slide"></div>');
                f1 = false;
            }
            else {

                $("#imageslider").append('<div class="carousel-item"><img class="d-block w-100-c" src= "' + image.val() + '" alt= "First slide"></div>');
            }
        });

        project.child('images/info').forEach(function (image) {
            $(".S3_img").append('<div class="bg-overlay-pro upk-margin-featured" style="background-image:url(' + image.val() + ')"">' +
                '<div class="text-overlay"><span class="upk-title-1"></span><span class="upk-title-2"></span></div></div>');

        });

    });
    $('.leftLst, .rightLst').click(function () {
        var condition = $(this).hasClass("leftLst");
        if (condition)
            click(0, this);
        else
            click(1, this)
    });
});
function highlight(text, _texts) {
    var test = text.toLowerCase();
    for (i = 0; i < _texts.length; i++) {

        var pos = test.search(_texts[i]);
        if (pos > 0) {
            var _end = _texts[i].length;
            var b = '</span>';
            text = [text.slice(0, pos + _end), b, text.slice(pos + _end)].join('');
            //consoleole.log(text);

            b = '<span class="upk-popup">'
            text = [text.slice(0, pos), b, text.slice(pos)].join('');
            //consoleole.log(text);
            return text;

        }
    }
    return text;
}
var itemsMainDiv = ('.MultiCarousel');
var itemsDiv = ('.MultiCarousel-inner');
var itemWidth = "";



ResCarouselSize();




$(window).resize(function () {
    ResCarouselSize();
});

//this function define the size of the items
function ResCarouselSize() {
    var incno = 0;
    var dataItems = ("data-items");
    var itemClass = ('.item');
    var id = 0;
    var btnParentSb = '';
    var itemsSplit = '';
    var sampwidth = $(itemsMainDiv).width();
    var bodyWidth = $('body').width();
    $(itemsDiv).each(function () {
        id = id + 1;
        var itemNumbers = $(this).find(itemClass).length;
        btnParentSb = $(this).parent().attr(dataItems);
        itemsSplit = btnParentSb.split(',');
        $(this).parent().attr("id", "MultiCarousel" + id);


        if (bodyWidth >= 1200) {
            incno = itemsSplit[3];
            itemWidth = sampwidth / incno;
        }
        else if (bodyWidth >= 992) {
            incno = itemsSplit[2];
            itemWidth = sampwidth / incno;
        }
        else if (bodyWidth >= 768) {
            incno = itemsSplit[1];
            itemWidth = sampwidth / incno;
        }
        else {
            incno = itemsSplit[0];
            itemWidth = sampwidth / incno;
        }
        $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
        $(this).find(itemClass).each(function () {
            $(this).outerWidth(itemWidth);
        });

        $(".leftLst").addClass("over");
        $(".rightLst").removeClass("over");

    });
}


//this function used to move the items
function ResCarousel(e, el, s) {
    var leftBtn = ('.leftLst');
    var rightBtn = ('.rightLst');
    var translateXval = '';
    var divStyle = $(el + ' ' + itemsDiv).css('transform');
    var values = divStyle.match(/-?[\d\.]+/g);
    var xds = Math.abs(values[4]);
    if (e == 0) {
        translateXval = parseInt(xds) - parseInt(itemWidth * s);
        $(el + ' ' + rightBtn).removeClass("over");

        if (translateXval <= itemWidth / 2) {
            translateXval = 0;
            $(el + ' ' + leftBtn).addClass("over");
        }
    }
    else if (e == 1) {
        var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
        translateXval = parseInt(xds) + parseInt(itemWidth * s);
        $(el + ' ' + leftBtn).removeClass("over");

        if (translateXval >= itemsCondition - itemWidth / 2) {
            translateXval = itemsCondition;
            $(el + ' ' + rightBtn).addClass("over");
        }
    }
    $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
}

//It is used to get some elements from btn
function click(ell, ee) {
    var Parent = "#" + $(ee).parent().attr("id");
    var slide = $(Parent).attr("data-slide");
    ResCarousel(ell, Parent, slide);
}
