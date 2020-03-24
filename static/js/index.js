// Your code starts here
$(document).ready(function() {

    $(".pokemon")
        .mouseenter(function() {
            $(this).css("background-color", "lightblue");
        })
        .mouseleave(function() {
            $(this).css("background-color", "white");
        })
});