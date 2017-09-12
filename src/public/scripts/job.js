$(document).ready(function() {
    "use strict";

    var jobList = $("#jobList");
    var jobInfo = $("#jobInfo");


    var toggleBtnJobList = $("#toggleBtnJobList");
    toggleBtnJobList.on("click", function() {
        jobList.toggle(500);

        if (toggleBtnJobList.text() == "Display Jobs") toggleBtnJobList.text("Hide Jobs");
        else toggleBtnJobList.text("Display Jobs");
    });

    var toggleBtnJobInfo = $("#toggleBtnJobInfo");
    toggleBtnJobInfo.on("click", function() {
        jobInfo.toggle(500);

        if (toggleBtnJobInfo.text() == "More Job Info") toggleBtnJobInfo.text("Hide Job Info");
        else toggleBtnJobInfo.text("More Job Info");
    });


    /*Job Amount*/
    function setBarWidth(dataElement, barElement, cssProperty, barPercent) {
        var listData = [];
        $(dataElement).each(function() {
            listData.push($(this).html());
        });
        var listMax = Math.max.apply(Math, listData);
        $(barElement).each(function(index) {
            $(this).css(cssProperty, (listData[index] / listMax) * barPercent + "%");
        });
    }
    setBarWidth(".style-1 span", ".style-1 em", "width", 100);
    setBarWidth(".style-2 span", ".style-2 span", "width", 55);

});


