// Your code starts here
$(document).ready(function() {

    var pokemonData;

    $.ajax("api/pokemon",
        {
            dataType: 'json',
            success: function(data) {

                pokemonData = data;

                for (var pokenum = 1; pokenum <= 151; pokenum++) {

                    $(".pokemon-flex").append(
                        `<div class="pokemon" id="${pokemonData[pokenum-1].id}">
                            <h2 class="pokename">${pokemonData[pokenum-1].name}</h2>
                            <img class = "pokeimage" src="${data[pokenum-1].image_url}" />
                        </div>`
                    );

                }
                $(".pokemon")
                    .mouseenter(pokehoverEnter)
                    .mouseleave(pokehoverLeave)
                    .click(toggleDetails);
                $(".evolution-link")
                    .click(navigateToEvolution);

            }
    });

    $(".modal")
        .click(toggleDetails);


//click handlers
    function pokehoverEnter() {
        $(this).css("background-color", "lightblue");
    }

    function pokehoverLeave() {
        $(this).css("background-color", "white");
    }

//brings you from the evolution you click on to the relevant other popup.
    function navigateToEvolution(event) {

        //don't trigger the parent click
        event.stopPropagation();

        //identify the destination
        var navigationTarget = $(this).text();
        console.log("clicked " + navigationTarget);

        //close the current window
        console.log("close " + $(this).closest(".pokemon").find(".pokename").text());
        toggleDetails($(this).closest(".pokemon"));
        //$(this).closest(".pokemon").toggleDetails;

        //open the new window
        //$(document.getElementById(navigationTarget)).toggleDetails;
    }

//helper function - given an ID, return that pokemon's data
    function pokeHelper(id) {

        return pokemonData[id-1];

    }

//takes an array of types and outputs a string of formatted list items to append
    function listMaker(typeArray) {
        var typeString = "";
        for (var i = 0; i < typeArray.length; i++) {
            typeString += `<li class="type-item">${typeArray[i]}</li>
            `;
        }
        return typeString;
    }

//takes an array of evolution information and returns rows to be inserted into a table
    function tableRowMaker(evolutionArray) {
        var tableString = "";

        for (var x = 0; x < evolutionArray.length; x++) {
            tableString += 
                `<tr class="evolution-item">
                    <td class="evolution-link">${evolutionArray[x].to}</td>
                    <td>${evolutionArray[x].level}</td>
                    <td>${evolutionArray[x].method}</td>
                </tr>
                `;
        }

        return tableString;

    }

//Populates the modal with information and toggles it.
    function toggleDetails() {

        $('.modal-bg').toggle();
        $('.modal').toggle();

        var currentPokemon = pokeHelper($(this).attr("id"));

        //only do all this stuff if we're displaying the modal, not hiding it

        if ($('.modal').css("display") === "none") {

            //turn on scrolling
            $("html, body").css("overflow","auto");

            //remove elements from type + evolution
            $('.evolution-item').remove();
            $('.type-item').remove();

        }
        else {

            //populate the pokemon's name
            $(".modal-pokename").text(currentPokemon.name);
            
            //populate the description
            $(".modal-pokedescription").text(currentPokemon.description);

            //turn off scrolling
            $("html, body").css("overflow","hidden");

            $(".modal-pokeimage").attr("src",currentPokemon.image_url);

            //appends correct information to "types" section
            $('.modal-typelist').append(listMaker(currentPokemon.types));    

            //creates the table for evolutions for a given pokemon, or hides the table altogether
            if (currentPokemon.evolutions.length != 0) {
                $('.modal-evolution-table').append(tableRowMaker(currentPokemon.evolutions));
            }
            else {
                $('.modal-evolution-table').hide();
            }
            
        }
        
    }

});
