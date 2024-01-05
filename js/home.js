$(document).ready(function () {
    var availableTags = [];


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
    $(".bar-check").on('change', function () {
        if ($(this).is(':checked')) {
            checks.push($(this).val())
        }
        else {
            var pos = checks.indexOf($(this).val());
            checks.splice(pos, 1);
        }

        console.log(checks);
    });
    $(".search-g").on('click', function () {
        var keyword = $("#searchbar-key").val();
        var city = $("#searcbar-g").val();
        var purpose = $("#purpose-bar").val();
        var filters = checks.join(',');
        if (filters == "") { filters = null; }
        var payload = "keyword=" + keyword +"&city=" + city + "&purpose=" + purpose + "&filters=" + filters;
        var win = window.open("properties.html?" + payload, '_blank');
        win.focus();

    });
});