// Your code starts here
$(document).ready(function() {

    //loop through and grab all the data, putting them in an array
    //use the array (not ajax) to create the elements

    var pokemonData;

    $.ajax("api/pokemon",
        {
            dataType: 'json',
            success: function(data) {

                pokemonData = data;

                for (var pokenum = 1; pokenum <= 151; pokenum++) {

                    $(".pokemon-flex").append(
                        `<div class="pokemon" id="${pokemonData[pokenum-1].id}">
                            <h2 class="pokename">${pokemonData[pokenum-1].id}</h2>
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

            console.log(pokemonData[id-1]);

            return pokemonData[id-1];

        }

//takes an array of types and outputs a string of formatted list items to append
        function listMaker(typeArray) {
            var typeString = "";
            for (var i = 0; i < typeArray.length; i++) {
                typeString += `<li>${typeArray[i]}</li>
                `;
            }
            return typeString;
        }

//takes an array of evolution information and returns rows to be inserted into a table
        function tableRowMaker(evolutionArray) {
            var tableString = "";

            for (var x = 0; x < evolutionArray.length; x++) {
                tableString += 
                    `<tr>
                        <td class="evolution-link">${evolutionArray[x].to}</td>
                        <td>${evolutionArray[x].level}</td>
                        <td>${evolutionArray[x].method}</td>
                    </tr>
                    `;
            }

            return tableString;

        }

//Creates a large modal for all pokemon details, or minimizes it.
        function toggleDetails() {

            console.log($(this).attr("id"));
            var currentPokemon = pokeHelper($(this).attr("id"));

            $('.modal-bg').toggle();
            $('.modal').toggle();

            //appends correct information to "types" section
            $('.modal-typelist').append(listMaker(currentPokemon.types));

            //inserts correct evolution info into table if not empty. If empty, hides table.
            

            //creates the table for evolutions for a given pokemon, or hides the table altogether
            var tableString = "";
            if (currentPokemon.evolutions.length != 0) {
                $('.modal-evolution-table').append(tableRowMaker(currentPokemon.evolutions));
            }
            else {
                $('.modal-evolution-table').hide();
            }


            $(this).find('.pokedetails').toggle();
            $(".modal-bg").toggle();

            if ($(this).css("height") === "200px") {

                //turn the pokemon element into a modal
                $(this)
                    .off("mouseenter");

                    
                //turn off scrolling
                $("html, body").css("overflow","hidden");

            }
            else {

                //return the element to normal
                $(this)
                    .on("mouseenter", this, pokehoverEnter);

            
                //turn on scrolling
                $("html, body").css("overflow","auto");

            }
            
        }


    

    });
    