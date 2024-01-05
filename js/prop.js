var search = firebase.database().ref("search").push();
var coutneProp = 0;
var _total_per_page = 12;
var _currentPage = 1;
var _total = 0; var markers = [];//some array
var map;
$(window).on('load', function () {
    //my logic here
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: { lat: -34.397, lng: 150.644 }
    });
});
$(document).ready(function () {
    var markers = [];//some array
    $(".sin").hide();
    var search_id = search.key;
    var bounds = new google.maps.LatLngBounds();
    coutneProp = 0;
    var typeFilters = [];
    var urlflag = true;
    var availableTags = [];
    var city, purpose = null;
    var notPaged = true;

    //var queryText = "da";
    //var end = queryText + "\uf8ff";
    //firebase.database().ref("properties/Dubai/sale").orderByChild("title").startAt("[a-zA-Z0-9]*").endAt(queryText).once('value', function (propertyObj) {

    //    console.log(propertyObj.val());

    //});

    $("#mapView").on('click', function () {
        $("#map").toggle();
        $("#mapViewlabel").toggleClass("active-map");
    });
    firebase.database().ref("cities").once('value', function (cityList) {
        cityList.forEach(function (city) {
            availableTags.push(city.key);
        });
        console.log(availableTags);
        $("#searcbar-g").autocomplete({
            source: availableTags
        });

    });


    var checks = [];

    var myMap = new Map();
    var data = [];
    var mapValue = [];
    var filterd = 0;
    urlflag = false;
    var url = document.URL;
    var filters = url.split('?');
    if (filters.length > 1) {
        var params = filters[1];
        if (params.length > 0) {
            var t1 = params.split('&');

            var keyword_t = t1[0].split('=');
            var keyword = keyword_t[1];
            $("#searchbar-key").val(keyword);

            var city_t = t1[1].split('=');
            var city = city_t[1];
            $("#searcbar-g").val(city);

            var purpose_t = t1[2].split('=');
            var purpose = purpose_t[1];
            $("#purpose-bar").val(purpose);
            if (t1.length > 3) {
                var checks_t = t1[3].split('=');
                checks = checks_t[1].split(',');

            }
            console.log(checks);
            if (checks.length > 0 && checks[0] !== "null") {


                for (i = 0; i < checks.length; i++) {
                    $('.ccd').find('.bar-check').each(function () {
                        var ccd_val = $(this).val();
                        if (ccd_val == checks[i]) {
                            $(this).prop("checked", true);
                            typeFilters.push(checks[i]);

                        }
                    });
                    search.set({ "keyword": $("#searchbar-key").val(), "index": $("#purpose-bar").val(), "type": $("#searcbar-g").val(), "start": (_currentPage - 1) * _total_per_page, "size": _total_per_page });

                    size_min = parseInt($("#min").val());


                    size_max = parseInt($("#max").val());


                    price_min = parseInt($("#min_price").val());


                    price_max = parseInt($("#max_price").val());

                    //firebase.database().ref("properties/" + city + "/" + purpose).orderByChild("type").equalTo(checks[i].toString()).once('value', function (propertyObj) {

                    //    propertyObj.forEach(function (property) {
                    //        data.push(property.val());

                    //    });

                    //    myMap.set(data[data.length - 1].type, { 'start': data.length - 1, 'total': propertyObj.numChildren() });
                    //    console.log(data);
                    //    console.log(myMap);

                    //}).then(function () {
                    //    filterd++;
                    //    if (checks.length == filterd) {
                    //        data = _.sortBy(data, 'type');
                    //        for (o = 0; o < data.length; o++) {
                    //            var obj = '<div class="property-disp-box upk-margin-featured class' + data[o].type + '">' +
                    //                '<div class="col-md-12 zero-side-padding tile-image" style= "background-image:url(' + data[o].images.image0 + ');background-size:cover" ></div>' +
                    //                '<div class="col-md-12 p-t-25 inline-flex"><div class="col-md-6 zero-side-padding">' +
                    //                '<h6>' + data[o].title + '</h6></div>' +
                    //                '<div class="col-md-6 zero-side-padding text-right">' +
                    //                '<h6><b>' + data[o].priceUnit + ' ' + parseInt(data[o].price).toLocaleString('en-EG') + '</b></h6></div></div>' +
                    //                '<div class="col-md-12  inline-flex p-t-10 desc-box">' +
                    //                '<span class="p-lr-5">' + data[o].rooms + ' bed, ' + data[o].bath + ' bath, ' + data[o].kitchen + ' kitchen </span></div>' +
                    //                '<div class="col-md-12  d-flex justify-content-center p-t-25">' +
                    //                '<button class="btn btn-primary upk-button " onClick="viewProperty(this)" value="' + data[o].key + '" city="' + data[o].city + '" purpose="' + data[o].purpose + '">View</button></div></div >';
                    //            $("#property-div").append(obj);

                    //        }
                    //    }
                    //});

                }
            }
            else {
                search.set({ "keyword": $("#searchbar-key").val(), "index": $("#purpose-bar").val(), "type": $("#searcbar-g").val(), "start": (_currentPage - 1) * _total_per_page, "size": _total_per_page });

                size_min = parseInt($("#min").val());


                size_max = parseInt($("#max").val());


                price_min = parseInt($("#min_price").val());


                price_max = parseInt($("#max_price").val());
                //firebase.database().ref("properties/" + city + "/" + purpose).once('value', function (propertyObj) {
                //    $("#property-div").empty();
                //    propertyObj.forEach(function (property) {
                //        console.log(property.val());
                //        var obj = '<div class="property-disp-box upk-margin-featured class' + property.val().type + '">' +
                //            '<div class="col-md-12 zero-side-padding tile-image" style= "background-image:url(' + property.val().images.image0 + ');background-size:cover" ></div>' +
                //            '<div class="col-md-12 p-t-25 inline-flex"><div class="col-md-6 zero-side-padding">' +
                //            '<h6>' + property.val().title + '</h6></div>' +
                //            '<div class="col-md-6 zero-side-padding text-right">' +
                //            '<h6><b>' + property.val().priceUnit + ' ' + parseInt(property.val().price).toLocaleString('en-EG') + '</b></h6></div></div>' +
                //            '<div class="col-md-12  inline-flex p-t-10 desc-box">' +
                //            '<span class="p-lr-5">' + property.val().rooms + ' bed, ' + property.val().bath + ' bath, ' + property.val().kitchen + ' kitchen </span></div>' +
                //            '<div class="col-md-12  d-flex justify-content-center p-t-25">' +
                //            '<button class="btn btn-primary upk-button " onClick="viewProperty(this)" value="' + property.key + '" city="' + property.val().city + '" purpose="' + property.val().purpose + '">View</button></div></div >';
                //        $("#property-div").append(obj);
                //    });
                //});
            }

        }
    }

    var total_filter = 0;
    $(".bar-check").on('change', function () {
        if ($(this).is(':checked')) {
            var checkValue = $(this).val();
            typeFilters.push(checkValue);
            //total_filter++;

            //var city = $("#searcbar-g").val();
            //var purpose = $("#purpose-bar").val();
            //var checkValue = $(this).val();
            //console.log($(this).val());
            //firebase.database().ref("properties/" + city + "/" + purpose).orderByChild("type").equalTo($(this).val()).once('value', function (propertyObj) {

            //    propertyObj.forEach(function (property) {
            //        data.push(property.val());

            //    });
            //    myMap.set(checkValue, { 'start': data.length - 1, 'total': propertyObj.numChildren() });
            //    filterd++;
            //    console.log(data);


            //});
        }
        else {
            var checkValue = $(this).val();

            var checkValue = $(this).val();
            var pos = typeFilters.indexOf(checkValue);
            if (pos > -1) {
                typeFilters.splice(pos, 1);
            }
            //if (myMap.has(checkValue)) {
            //    filterd--;
            //    total_filter--;
            //    var obj = myMap.get($(this).val());
            //    console.log(obj);
            //    data.splice(obj.start, obj.total);
            //    console.log(data);
            //    myMap.delete(checkValue);
            //}
        }
        console.log(typeFilters);
    });


    $(".bb2").on('change', function () {
        console.log("new");
        search.set({ "keyword": $("#searchbar-key").val(), "index": $("#purpose-bar").val(), "type": $("#searcbar-g").val(), "start": (_currentPage - 1) * _total_per_page, "size": _total_per_page });
        data = [];
        size_min = parseInt($("#min").val());
        size_max = parseInt($("#max").val());
        price_min = parseInt($("#min_price").val());
        price_max = parseInt($("#max_price").val());
        $("#property-div").empty();


    });

    $(".search-g").on('click', function () {
        markers = [];//some array
        bounds = new google.maps.LatLngBounds();
        $(".pagination").empty();
        notPaged = true;

        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: { lat: -34.397, lng: 150.644 }
        });

        showLoader("Searching");
        search.set({ "keyword": $("#searchbar-key").val(), "index": $("#purpose-bar").val(), "type": $("#searcbar-g").val(), "start": (_currentPage - 1) * _total_per_page, "size": _total_per_page });

        data = [];
        coutneProp = 0;
        size_min = parseInt($("#min").val());


        size_max = parseInt($("#max").val());


        price_min = parseInt($("#min_price").val());


        price_max = parseInt($("#max_price").val());


        $("#property-div").empty();

        city = $("#searcbar-g").val();
        purpose = $("#purpose-bar").val();
        //if (myMap.size > 0 || total_filter > 0) {
        //    while (total_filter !== filterd) { }
        //    console.log("check filter");
        //    data = _.sortBy(data, 'type');
        //    for (o = 0; o < data.length; o++) {
        //        var obj = '<div class="property-disp-box upk-margin-featured class' + data[o].type + '">' +
        //            '<div class="col-md-12 zero-side-padding tile-image" style= "background-image:url(' + data[o].images.image0 + ');background-size:cover" ></div>' +
        //            '<div class="col-md-12 p-t-25 inline-flex"><div class="col-md-6 zero-side-padding">' +
        //            '<h6>' + data[o].title + '</h6></div>' +
        //            '<div class="col-md-6 zero-side-padding text-right">' +
        //            '<h6><b>' + data[o].priceUnit + ' ' + parseInt(data[o].price).toLocaleString('en-EG') + '</b></h6></div></div>' +
        //            '<div class="col-md-12  inline-flex p-t-10 desc-box">' +
        //            '<span class="p-lr-5">' + data[o].rooms + ' bed, ' + data[o].bath + ' bath, ' + data[o].kitchen + ' kitchen </span></div>' +
        //            '<div class="col-md-12  d-flex justify-content-center p-t-25">' +
        //            '<button class="btn btn-primary upk-button " onClick="viewProperty(this)" value="' + data[o].key + '" city="' + data[o].city + '" purpose="' + data[o].purpose + '">View</button></div></div >';
        //        $("#property-div").append(obj);

        //    }

        //} else {
        //    firebase.database().ref("properties/" + city + "/" + purpose).once('value', function (propertyObj) {

        //        propertyObj.forEach(function (property) {
        //            console.log(property.val());
        //            var obj = '<div class="property-disp-box upk-margin-featured class' + property.val().type + '">' +
        //                '<div class="col-md-12 zero-side-padding tile-image" style= "background-image:url(' + property.val().images.image0 + ');background-size:cover" ></div>' +
        //                '<div class="col-md-12 p-t-25 inline-flex"><div class="col-md-6 zero-side-padding">' +
        //                '<h6>' + property.val().title + '</h6></div>' +
        //                '<div class="col-md-6 zero-side-padding text-right">' +
        //                '<h6><b>' + property.val().priceUnit + ' ' + parseInt(property.val().price).toLocaleString('en-EG') + '</b></h6></div></div>' +
        //                '<div class="col-md-12  inline-flex p-t-10 desc-box">' +
        //                '<span class="p-lr-5">' + property.val().rooms + ' bed, ' + property.val().bath + ' bath, ' + property.val().kitchen + ' kitchen </span></div>' +
        //                '<div class="col-md-12  d-flex justify-content-center p-t-25">' +
        //                '<button class="btn btn-primary upk-button " onClick="viewProperty(this)" value="' + property.key + '" city="' + property.val().city + '" purpose="' + property.val().purpose + '">View</button></div></div >';
        //            $("#property-div").append(obj);
        //        });
        //    });
        //}
    });
    //firebase.database().ref("properties").limitTo(page).once('value', function (propertyObj) {
    //    propertyObj.forEach(function (property) {
    //        console.log(property.val());
    //        var obj = '<div class="property-disp-box upk-margin-featured class' + property.val().type + '">' +
    //            '<div class="col-md-12 zero-side-padding tile-image" style= "background-image:url(' + property.val().images.image0 + ');background-size:cover" ></div>' +
    //            '<div class="col-md-12 p-t-25 inline-flex"><div class="col-md-8 zero-side-padding">' +
    //            '<h6>' + property.val().title + '</h6></div>' +
    //            '<div class="col-md-4 zero-side-padding text-right">' +
    //            '<h6><b>' + property.val().priceUnit + ' ' + property.val().price + '</b></h6></div></div>' +
    //            '<div class="col-md-12  inline-flex p-t-10">' +
    //            '<span class="p-lr-5">' + property.val().description + '</span></div>' +
    //            '<div class="col-md-12  d-flex justify-content-center p-t-25">' +
    //            '<button class="btn btn-primary upk-button " onClick="viewProperty(this)" value="' + property.key + '">View</button></div></div >';
    //        $("#property-div").append(obj);
    //    });
    //});
    firebase.database().ref("searchResultCount/" + search_id).on('child_added', function (propertyCount) {
        firebase.database().ref("searchResultCount/" + search_id + "/" + propertyCount.key).set(null);
        _total = propertyCount.val();
        if (_total == 0) {
            $("#property-div").text('No results found.');
            $(".sin").hide();

        } else {
            $("#page_total").text(((_total > _currentPage * _total_per_page) ? _currentPage * _total_per_page : _total)); $("#result_total").text(_total);

        }

        hideLoader();
        if (notPaged) {

            //$(".pagination").append('<li class="page-item disabled "><a class="page-link " href="#" audi="prev"  onClick="changePage(this)">Previous</a></li>')

            for (i = 1; i <= Math.ceil(propertyCount.val() / _total_per_page); i++) {
                notPaged = false;

                $(".pagination").append('<li class="page-item"><a class="page-link" href="#" audi="' + i + '" onClick="changePage(this)">' + i + '</a></li>')
            }
            $(".pagination").append('<li class="page-item next-page"><a class="page-link" href="#" audi="next"  onClick="changePage(this)">Next</a></li>')
            if (data.length == 0) { $(".pagination").hide(); }
        }
    });
    firebase.database().ref("searchResult/" + search_id).on('child_added', function (property) {
        var tt = property.val();


        console.log("city" + $("#searcbar-g").val().toLowerCase());
        if ((property.val().resultType == "property") &&
            (typeFilters.indexOf((property.val().type).toString()) > -1 || typeFilters.length == 0 || typeFilters.indexOf((property.val().subType).toString()) > -1) &&

            (((parseInt(property.val().price)) >= price_min) || ($("#min_price").val() == "") || (price_min == 0)) && (((parseInt(property.val().price)) <= price_max) || ($("#max_price").val() == "") || (price_max == 0)) &&
            (((parseInt(property.val().landArea)) >= size_min) || ($("#min").val() == "") || (size_min == 0)) && (((parseInt(property.val().landArea)) <= size_max) || ($("#max").val() == "") || (size_max == 0))
            && ($("#size_unit").val() == 0 || $("#size_unit").val() == (property.val().unit) || ($("#min").val() == "") || (size_min == 0) || ($("#max").val() == "") || (size_max == 0))
            && ((property.val().city.toLowerCase() == $("#searcbar-g").val().toLowerCase()) || ($("#searcbar-g").val().toLowerCase() == "") || ($("#searcbar-g").val().toLowerCase() == null))
            && ((property.val().purpose == $("#purpose-bar").val()))

        ) {
            data.push(property.val());

            var uluru = { lat: parseFloat(property.val().latitude), lng: parseFloat(property.val().longitude) };
            var infowindow = new google.maps.InfoWindow({
                maxWidth: 320,
                content: '<div class="property-disp-box " style="width:auto;height:auto;margin-bottom:10px;margin-left:15px;">' +
                //'<div class="col-md-12 zero-side-padding " style= "background-image:url(' + property.val().images.image0 + ');background-size:cover" ></div>' +
                '<div class="col-md-12 p-t-25 inline-flex"><div class="col-md-12 zero-side-padding text-center">' +
                '<h6><b>' + property.val().title + '</b></h6><h6>' + property.val().location + '</h6></div>' +
                '</div><div class="col-md-12 zero-side-padding text-center">' +
                '<h6><b>' + property.val().priceUnit + ' ' + parseInt(property.val().price).toLocaleString('en-EG') + '</b></h6></div>' +
                '<div class="col-md-12 text-center"> ' + property.val().rooms + ' bed, ' + property.val().bath + ' bath, ' + property.val().kitchen + ' kitchen </div>' +
                '<div class="col-md-12  d-flex justify-content-center p-t-25">' +
                '<button class="btn btn-primary upk-button " onClick="viewProperty(this)" value="' + property.val().key + '" city="' + property.val().city + '" purpose="' + property.val().purpose + '">View</button></div></div >'


            });
            var marker = new google.maps.Marker({
                position: uluru,
                map: map,
                title: property.val().title

            });
            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });
            if (coutneProp < 1) {
                infowindow.open(map, marker);
            }
            markers.push(marker)//some array
            for (var i = 0; i < markers.length; i++) {
                bounds.extend(markers[i].getPosition());
            }
            map.fitBounds(bounds);

            var obj = '<div class="property-disp-box upk-margin-featured class' + property.val().type + '">' +
                '<div class="col-md-12 zero-side-padding tile-image" style= "background-image:url(' + property.val().images.image0 + ');background-size:cover" ><div class="d-flex justify-content-center"><span class="top-notch " style="color:white">Property</span></div></div>' +
                '<div class="col-md-12 p-t-25 inline-flex" style="height:65px;" ><div class="col-md-6 zero-side-padding">' +
                '<h6 style="text-transform:uppercase;font-weight:500 !important">' + property.val().title + '</h6></div>' +
                '<div class="col-md-6 zero-side-padding text-right">' +
                '<h6><b>' + property.val().priceUnit + ' ' + parseInt(property.val().price).toLocaleString('en-EG') + '</b></h6></div></div>' +
                '<div class="col-md-12  inline-flex p-t-10 desc-box">' +
                '<span class="p-lr-5">' + property.val().rooms + ' bed, ' + property.val().bath + ' bath, ' + property.val().kitchen + ' kitchen </span></div>' +
                '<div class="col-md-12  d-flex justify-content-center">' +
                '<button class="btn btn-primary upk-button " onClick="viewProperty(this)" value="' + property.val().key + '" city="' + property.val().city + '" purpose="' + property.val().purpose + '">View</button></div></div >';
            $("#property-div").append(obj);
            if (data.length > 0) {
                $("#result_total").text(_total);
                $(".sin").show();
                $(".pagination").show();
                $("#_total").text(((_currentPage - 1) * _total_per_page) + 1);
                $("#page_total").text(((_total > _currentPage * _total_per_page) ? _currentPage * _total_per_page : _total));
            }


        } else if ((property.val().resultType == "project") && (((parseInt(property.val().price)) >= price_min) || ($("#min_price").val() == "") || (price_min == 0)) && (((parseInt(property.val().price)) <= price_max) || ($("#max_price").val() == "") || (price_max == 0))) {
            data.push(property.val());

            var uluru = { lat: parseFloat(property.val().latitude), lng: parseFloat(property.val().longitude) };
            var infowindow = new google.maps.InfoWindow({
                maxWidth: 320,
                content: '<div class="property-disp-box " style="width:auto;height:auto;margin-bottom:10px;margin-left:15px;">' +
                //'<div class="col-md-12 zero-side-padding " style= "background-image:url(' + property.val().images.image0 + ');background-size:cover" ></div>' +
                '<div class="col-md-12 p-t-25 inline-flex"><div class="col-md-12 zero-side-padding text-center">' +
                '<h6><b>' + property.val().title + '</b></h6><h6>' + property.val().location + '</h6></div>' +
                '</div><div class="col-md-12 zero-side-padding text-center">' +
                '<h6><b>' + property.val().priceUnit + ' ' + parseInt(property.val().price).toLocaleString('en-EG') + '</b></h6></div>' +
                '<div class="col-md-12 text-center"> ' + property.val().tagLine + '</div>' +
                '<div class="col-md-12  d-flex justify-content-center p-t-25">' +
                '<button class="btn btn-primary upk-button " onClick="viewProject(this)" value="' + property.val().key + '" >View</button></div></div >'


            });
            var marker = new google.maps.Marker({
                position: uluru,
                map: map,
                title: property.val().title

            });
            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });
            markers.push(marker)//some array
            for (var i = 0; i < markers.length; i++) {
                bounds.extend(markers[i].getPosition());
            }
            if (coutneProp < 1) {
                infowindow.open(map, marker);
            }
            map.fitBounds(bounds);

            var obj = '<div class="property-disp-box upk-margin-featured class' + property.val().type + '">' +
                '<div class="col-md-12 zero-side-padding tile-image" style= "background-image:url(' + property.val().images.image0 + ');background-size:cover" ><div class="d-flex justify-content-center"><span class="top-notch " style="color:white">Project</span></div></div>' +
                '<div class="col-md-12 p-t-25 inline-flex" style="height:65px;" ><div class="col-md-6 zero-side-padding">' +
                '<h6 style="text-transform:uppercase;font-weight:500 !important">' + property.val().title + '</h6></div>' +
                '<div class="col-md-6 zero-side-padding text-right">' +
                '<h6><b>' + property.val().priceUnit + ' ' + parseInt(property.val().price).toLocaleString('en-EG') + '</b></h6></div></div>' +
                '<div class="col-md-12  inline-flex p-t-10 desc-box">' +
                '<span class="p-lr-5">' + property.val().tagLine + '</span></div>' +
                '<div class="col-md-12  d-flex justify-content-center">' +
                '<button class="btn btn-primary upk-button " onClick="viewProject(this)" value="' + property.val().key + '" >View</button></div></div >';
            $("#property-div").append(obj);
            if (data.length > 0) {
                $("#result_total").text(_total);
                $(".sin").show();
                $(".pagination").show();
                $("#_total").text(((_currentPage - 1) * _total_per_page) + 1);
                $("#page_total").text(((_total > _currentPage * _total_per_page) ? _currentPage * _total_per_page : _total));
            }

        }
        if (data.length == 0) {
            $("#property-div").text('No results found.');
            $(".pagination").hide();
            $(".sin").hide();

        }
        firebase.database().ref("searchResult/" + search_id + "/" + property.key).set(null);
        coutneProp++;
    });

    $("#t_type").on('change', function () {
        console.log(data);
        var filter_val = $(this).val();
        switch (filter_val) {
            //case "1": {

            //}
            //    break;
            //case "2": {

            //}
            //    break;
            case "4": {

                $("#property-div").empty();

                var sorted_list = (_.sortBy(data, 'price'));
                console.log(sorted_list);
                for (p = 0; p < sorted_list.length; p++) {
                    if (sorted_list[p].resultType == "property") {

                        var obj = '<div class="property-disp-box upk-margin-featured class' + sorted_list[p].type + '">' +
                            '<div class="col-md-12 zero-side-padding tile-image" style= "background-image:url(' + sorted_list[p].images.image0 + ');background-size:cover" ><div class="d-flex justify-content-center"><span class="top-notch " style="color:white">Property</span></div></div>' +
                            '<div class="col-md-12 p-t-25 inline-flex" style="height:65px;" ><div class="col-md-6 zero-side-padding">' +
                            '<h6 style="text-transform:uppercase;font-weight:500 !important">' + sorted_list[p].title + '</h6></div>' +
                            '<div class="col-md-6 zero-side-padding text-right">' +
                            '<h6><b>' + sorted_list[p].priceUnit + ' ' + parseInt(sorted_list[p].price).toLocaleString('en-EG') + '</b></h6></div></div>' +
                            '<div class="col-md-12  inline-flex p-t-10 desc-box">' +
                            '<span class="p-lr-5">' + sorted_list[p].rooms + ' bed, ' + sorted_list[p].bath + ' bath, ' + sorted_list[p].kitchen + ' kitchen </span></div>' +
                            '<div class="col-md-12  d-flex justify-content-center p-t-25">' +
                            '<button class="btn btn-primary upk-button " onClick="viewProperty(this)" value="' + sorted_list[p].key + '" city="' + sorted_list[p].city + '" purpose="' + sorted_list[p].purpose + '">View</button></div></div >';
                        $("#property-div").append(obj);
                        if (data.length > 0) {
                            $(".sin").show();

                            $("#result_total").text(_total);
                            $("#_total").text(((_currentPage - 1) * _total_per_page) + 1);

                            $("#page_total").text(((_total > _currentPage * _total_per_page) ? _currentPage * _total_per_page : _total));
                        } else {
                            $(".sin-text").hide();
                        }
                    } else {
                        var obj = '<div class="property-disp-box upk-margin-featured class' + sorted_list[p].type + '">' +
                            '<div class="col-md-12 zero-side-padding tile-image" style= "background-image:url(' + sorted_list[p].images.image0 + ');background-size:cover" ><div class="d-flex justify-content-center"><span class="top-notch " style="color:white">Project</span></div></div>' +
                            '<div class="col-md-12 p-t-25 inline-flex" style="height:65px;" ><div class="col-md-6 zero-side-padding">' +
                            '<h6 style="text-transform:uppercase;font-weight:500 !important">' + sorted_list[p].title + '</h6></div>' +
                            '<div class="col-md-6 zero-side-padding text-right">' +
                            '<h6><b>' + sorted_list[p].priceUnit + ' ' + parseInt(sorted_list[p].price).toLocaleString('en-EG') + '</b></h6></div></div>' +
                            '<div class="col-md-12  inline-flex p-t-10 desc-box">' +
                            '<span class="p-lr-5">' + sorted_list[p].tagLine + '</span></div>' +
                            '<div class="col-md-12  d-flex justify-content-center p-t-25">' +
                            '<button class="btn btn-primary upk-button " onClick="viewProject(this)" value="' + sorted_list[p].key + '" >View</button></div></div >';
                        $("#property-div").append(obj);
                        if (data.length > 0) {
                            $(".sin").show();

                            $("#result_total").text(_total);
                            $("#_total").text(((_currentPage - 1) * _total_per_page) + 1);

                            $("#page_total").text(((_total > _currentPage * _total_per_page) ? _currentPage * _total_per_page : _total));
                        } else {
                            $(".sin-text").hide();
                        }
                    }
                }

                break;
            }
            case "3": {
                var sorted_list = (_.sortBy(data, 'price'));
                console.log(sorted_list);
                $("#property-div").empty();

                for (p = (sorted_list.length - 1); p >= 0; p--) {
                    if (sorted_list[p].resultType == "property") {
                        var obj = '<div class="property-disp-box upk-margin-featured class' + sorted_list[p].type + '">' +
                            '<div class="col-md-12 zero-side-padding tile-image" style= "background-image:url(' + sorted_list[p].images.image0 + ');background-size:cover" ><div class="d-flex justify-content-center"><span class="top-notch " style="color:white">Property</span></div></div>' +
                            '<div class="col-md-12 p-t-25 inline-flex" style="height:65px;" ><div class="col-md-6 zero-side-padding">' +
                            '<h6 style="text-transform:uppercase;font-weight:500 !important">' + sorted_list[p].title + '</h6></div>' +
                            '<div class="col-md-6 zero-side-padding text-right">' +
                            '<h6><b>' + sorted_list[p].priceUnit + ' ' + parseInt(sorted_list[p].price).toLocaleString('en-EG') + '</b></h6></div></div>' +
                            '<div class="col-md-12  inline-flex p-t-10 desc-box">' +
                            '<span class="p-lr-5">' + sorted_list[p].rooms + ' bed, ' + sorted_list[p].bath + ' bath, ' + sorted_list[p].kitchen + ' kitchen </span></div>' +
                            '<div class="col-md-12  d-flex justify-content-center p-t-25">' +
                            '<button class="btn btn-primary upk-button " onClick="viewProperty(this)" value="' + sorted_list[p].key + '" city="' + sorted_list[p].city + '" purpose="' + sorted_list[p].purpose + '">View</button></div></div >';
                        $("#property-div").append(obj);
                        $("#result_total").text(data.length);
                        $("#_total").text(((_currentPage - 1) * _total_per_page) + 1);

                        $("#page_total").text(((_total > _currentPage * _total_per_page) ? _currentPage * _total_per_page : _total));
                    }
                    else {
                        var obj = '<div class="property-disp-box upk-margin-featured class' + sorted_list[p].type + '">' +
                            '<div class="col-md-12 zero-side-padding tile-image" style= "background-image:url(' + sorted_list[p].images.image0 + ');background-size:cover" ><div class="d-flex justify-content-center"><span class="top-notch " style="color:white">Project</span></div></div>' +
                            '<div class="col-md-12 p-t-25 inline-flex" style="height:65px;" ><div class="col-md-6 zero-side-padding">' +
                            '<h6 style="text-transform:uppercase;font-weight:500 !important">' + sorted_list[p].title + '</h6></div>' +
                            '<div class="col-md-6 zero-side-padding text-right">' +
                            '<h6><b>' + sorted_list[p].priceUnit + ' ' + parseInt(sorted_list[p].price).toLocaleString('en-EG') + '</b></h6></div></div>' +
                            '<div class="col-md-12  inline-flex p-t-10 desc-box">' +
                            '<span class="p-lr-5">' + sorted_list[p].tagLine + '</span></div>' +
                            '<div class="col-md-12  d-flex justify-content-center p-t-25">' +
                            '<button class="btn btn-primary upk-button " onClick="viewProject(this)" value="' + sorted_list[p].key + '" >View</button></div></div >';
                        $("#property-div").append(obj);
                        if (data.length > 0) {
                            $(".sin").show();

                            $("#result_total").text(_total);
                            $("#_total").text(((_currentPage - 1) * _total_per_page) + 1);

                            $("#page_total").text(((_total > _currentPage * _total_per_page) ? _currentPage * _total_per_page : _total));
                        } else {
                            $(".sin-text").hide();
                        }
                    }
                }
            }
                break;

            default:
                {

                    var sorted_list = data;
                    $("#property-div").empty();

                    for (p = 0; p < sorted_list.length; p++) {
                        if (sorted_list[p].resultType == "property") {

                            var obj = '<div class="property-disp-box upk-margin-featured class' + sorted_list[p].type + '">' +
                                '<div class="col-md-12 zero-side-padding tile-image" style= "background-image:url(' + sorted_list[p].images.image0 + ');background-size:cover" ><div class="d-flex justify-content-center"><span class="top-notch " style="color:white">Property</span></div></div>' +
                                '<div class="col-md-12 p-t-25 inline-flex" style="height:65px;" ><div class="col-md-6 zero-side-padding">' +
                                '<h6 style="text-transform:uppercase;font-weight:500 !important">' + sorted_list[p].title + '</h6></div>' +
                                '<div class="col-md-6 zero-side-padding text-right">' +
                                '<h6><b>' + sorted_list[p].priceUnit + ' ' + parseInt(sorted_list[p].price).toLocaleString('en-EG') + '</b></h6></div></div>' +
                                '<div class="col-md-12  inline-flex p-t-10 desc-box">' +
                                '<span class="p-lr-5">' + sorted_list[p].rooms + ' bed, ' + sorted_list[p].bath + ' bath, ' + sorted_list[p].kitchen + ' kitchen </span></div>' +
                                '<div class="col-md-12  d-flex justify-content-center p-t-25">' +
                                '<button class="btn btn-primary upk-button " onClick="viewProperty(this)" value="' + sorted_list[p].key + '" city="' + sorted_list[p].city + '" purpose="' + sorted_list[p].purpose + '">View</button></div></div >';
                            $("#property-div").append(obj);
                            if (data.length > 0) {
                                $(".sin").show();
                                $("#result_total").text(_total);
                                $("#_total").text(((_currentPage - 1) * _total_per_page) + 1);
                                $("#page_total").text(((_total > _currentPage * _total_per_page) ? _currentPage * _total_per_page : _total));
                            } else {
                                $(".sin").hide();
                            }
                        } else {
                            var obj = '<div class="property-disp-box upk-margin-featured class' + sorted_list[p].type + '">' +
                                '<div class="col-md-12 zero-side-padding tile-image" style= "background-image:url(' + sorted_list[p].images.image0 + ');background-size:cover" ><div class="d-flex justify-content-center"><span class="top-notch " style="color:white">Project</span></div></div>' +
                                '<div class="col-md-12 p-t-25 inline-flex" style="height:65px;" ><div class="col-md-6 zero-side-padding">' +
                                '<h6 style="text-transform:uppercase;font-weight:500 !important">' + sorted_list[p].title + '</h6></div>' +
                                '<div class="col-md-6 zero-side-padding text-right">' +
                                '<h6><b>' + sorted_list[p].priceUnit + ' ' + parseInt(sorted_list[p].price).toLocaleString('en-EG') + '</b></h6></div></div>' +
                                '<div class="col-md-12  inline-flex p-t-10 desc-box">' +
                                '<span class="p-lr-5">' + sorted_list[p].tagLine + '</span></div>' +
                                '<div class="col-md-12  d-flex justify-content-center p-t-25">' +
                                '<button class="btn btn-primary upk-button " onClick="viewProject(this)" value="' + sorted_list[p].key + '" >View</button></div></div >';
                            $("#property-div").append(obj);
                            if (data.length > 0) {
                                $(".sin").show();

                                $("#result_total").text(_total);
                                $("#_total").text(((_currentPage - 1) * _total_per_page) + 1);

                                $("#page_total").text(((_total > _currentPage * _total_per_page) ? _currentPage * _total_per_page : _total));
                            } else {
                                $(".sin-text").hide();
                            }
                        }
                    }
                }

        }



    });

    $("#reset_filter").on('click', function () {
        $("#min_price").val("");
        $("#max_price").val("");
        $("#size_unit").val(0);

        $("#min").val("");
        $("#max").val("");

    });
});

function viewProperty(obj) {
    console.log(obj);
    var city = $(obj).attr('city');
    var purpose = $(obj).attr('purpose');

    var payload = "key=" + $(obj).val() + "&city=" + city.toLowerCase() + "&purpose=" + purpose;
    var win = window.open("propview.html?" + payload, '_blank');
    win.focus();
}
function viewProject(obj) {
    console.log(obj);

    var payload = "key=" + $(obj).val();
    var win = window.open("project.html?" + payload, '_blank');
    win.focus();
}

function changePage(obj) {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: { lat: -34.397, lng: 150.644 }
    });
    markers = [];//some array
    bounds = new google.maps.LatLngBounds();


    showLoader("Searching");
    $(".disabled").removeClass("disabled");
    var page = $(obj).attr("audi");
    if (page == "next") {
        search.set({ "keyword": $("#searchbar-key").val(), "index": $("#purpose-bar").val(), "type": $("#searcbar-g").val(), "start": (_currentPage) * _total_per_page, "size": _total_per_page });
        _currentPage = parseInt(_currentPage) + 1;
        $("#property-div").empty();


    }
    else {
        search.set({ "keyword": $("#searchbar-key").val(), "index": $("#purpose-bar").val(), "type": $("#searcbar-g").val(), "start": (page - 1) * _total_per_page, "size": _total_per_page });
        $("#property-div").empty();
        _currentPage = page;
    }
    if (parseInt(_currentPage) == Math.ceil(_total / _total_per_page)) { $(".next-page").addClass("disabled"); }
    if (parseInt(_currentPage) == 1) { $(".prev-page").addClass("disabled"); }

}