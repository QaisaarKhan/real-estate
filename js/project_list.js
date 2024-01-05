$(document).ready(function () {
    var obj = null;
    var counter = 0;
    showLoader("Loading");
    firebase.database().ref("testProjects").once('value', function (projects) {
        projects.forEach(function (project) {
            var _upk = "";
            var high_text = [];
            project.child("highlights").forEach(function (high) {
                high_text.push(high.key.toLowerCase());
            });



            _upk = highlight(project.val().title, high_text);
            if ((counter % 2) == 0 || counter == 0) {
                obj = '<div class="col-md-12"><div class="row p-t-5p video-row" ><div class="col-md-5 p-tb-30 " style="z-index:10"><div class="overlap-video-ltr "><div class="video-wraper " style="background-image:url(' + project.val().images.banner + ');background-size:cover;background-position:center"><img src="" class="img-fluid mx-auto d-block" /></div></div></div><div class="col-md-7 video-box-text-ltr p-75-video-ltr"><h3 class="pro-info-title S2_title ">' + _upk + '</h3><br/>'
                    + '<p class="S2_text">' + project.val().sections.section0.description + '</p><h5><a href="./project.html?key=' + project.key + '">View Project</a></div></div></div><br/>';
                $(".section-project").append(obj);
            }
            else {
                obj = '<div class="col-md-12"><div class="row p-t-5p video-row" ><div class="col-md-7 video-box-text p-75-video"><h3 class="pro-info-title S2_title ">' + _upk + '</h3><br/>'
                    + '<p class="S2_text">' + project.val().sections.section0.description + '</p><h5><a href="./project.html?key=' + project.key + '">View Project</a></div><div class="col-md-5 p-tb-30 " style="z-index:10"><div class="overlap-video "><div class="video-wraper " style="background-image:url(' + project.val().images.banner + ');background-size:cover;background-position:center"></div></div></div></div></div><br/>';

                $(".section-project").append(obj);

            }
            counter++;
            hideLoader();

        });
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