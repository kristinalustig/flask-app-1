// Your code starts here
$(document).ready(function() {

    $.ajax("api/pokemon",
        {
            dataType: 'json',
            success: function(data) {

                for (var pokenum = 1; pokenum <= 151; pokenum++) {

                    var pokemonInfo = data[pokenum-1];

                    $(".pokemon-flex").append(
                        `<a class="pokemon" id="${pokemonInfo.id}" href="/${pokemonInfo.id}">
                            <h2 class="pokename">${pokemonInfo.name}</h2>
                            <img class = "pokeimage" src="${pokemonInfo.image_url}" />
                        </a>`
                    );

                }
                $(".pokemon")
                    .mouseenter(pokehoverEnter)
                    .mouseleave(pokehoverLeave)
                
            }
    });

//click handlers
    function pokehoverEnter() {
        $(this).css("background-color", "lightblue");
    }

    function pokehoverLeave() {
        $(this).css("background-color", "white");
    }
});