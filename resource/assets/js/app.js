window.$ = window.jQuery = require("jquery");

/////////////////////// HAMBURGER MENU ///////////////////////

$(".menu").hide();

$(document).ready(function() {
  $(".hamburger-menu").click(function(){
    $(".bar").toggleClass("animate");
    $(".menu").slideToggle("default","linear");
  });

});
