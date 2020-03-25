// Your code starts here
$(document).ready(function() {

    //loop through and grab all the data, putting them in an array
    //use the array (not ajax) to create the elements

    $.ajax("api/pokemon",
        {
            dataType: 'json',
            success: function(data) {
                console.log("success");
                for (var pokenum = 1; pokenum <= 151; pokenum++) {
                    $(".pokemon-flex").append(
                        `<div class="pokemon">
                            <h2>${data[pokenum-1].name}</h2>
                            <img class = "pokeimage" src="${data[pokenum-1].image_url}" />
                        </div>`
                    );
                }
                $(".pokemon")
                    .mouseenter(function() {
                        $(this).css("background-color", "lightblue");
                    })
                    .mouseleave(function() {
                        $(this).css("background-color", "white");
                    })
            }
        });
    });
    