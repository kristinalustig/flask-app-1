// Your code starts here
$(document).ready(function() {

    var pokemonData;
    var currentPokemon;

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
        var destinationPokemon = pokeHelper(($(this).attr("id")).slice(1));

        //trigger the appropriate clicks
        $(document.getElementById(currentPokemon.id)).trigger('click');
        $(document.getElementById(destinationPokemon.id)).trigger('click');

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
                    <td class="evolution-link" id="e${evolutionArray[x].id}">${evolutionArray[x].to}</td>
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

        currentPokemon = pokeHelper($(this).attr("id"));

        //only populate all this stuff if we're displaying the modal, not hiding it

        if ($('.modal-bg').css("display") === "none") {

            //turn off the modal
            $('.modal-container').toggle();

            //turn on scrolling
            $("body").css("overflow-y","auto");

            //remove elements from type + evolution
            $('.evolution-item').remove();
            $('.type-item').remove();

        }
        else {

            //show the modal itself
            $('.modal-container').toggle();

            //turn off scrolling
            $("body").css("overflow-y","hidden");

            //populate the pokemon's name
            $(".modal-pokename").text(currentPokemon.name);
            
            //populate the description
            $(".modal-pokedescription").text(currentPokemon.description);

            //populates the image URL
            $(".modal-pokeimage").attr("src",currentPokemon.image_url);

            //appends correct information to "types" section
            $('.modal-typelist').append(listMaker(currentPokemon.types));    

            //creates the table for evolutions for a given pokemon
            if (currentPokemon.evolutions.length != 0) {
                $('.modal-evolution-table').append(tableRowMaker(currentPokemon.evolutions));
                $(".evolution-link").click(navigateToEvolution);
            }


            
        }
        
    }

});
