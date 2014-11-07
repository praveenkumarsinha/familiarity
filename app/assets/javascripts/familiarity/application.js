// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require ../familiarity/jquery.cookie
//= require ../familiarity/jquery.tooltipster
//= require_tree .


$(document).on("page:change", function () {
    var familiarity = new Familiarity();
    if (typeof $.cookie('familiarity') == "undefined") {
        familiarity.familiarityView(true);
        console.log($.cookie('familiarity', new Date(), {
            path: window.location.pathname,
            expires: 0.001 //TODO: This should be no of days and should be set to some valid tangible figure
        }));
    }
});