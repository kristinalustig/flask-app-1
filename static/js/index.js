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

                console.log("success");
                for (var pokenum = 1; pokenum <= 151; pokenum++) {

                    //creates the string for the types unordered list
                    var typeString = "";
                    for (var i = 0; i < data[pokenum-1].types.length; i++) {
                        typeString += `<li>${data[pokenum-1].types[i]}</li>
                        `;
                    }

                    //creates the table for evolutions for a given pokemon, or "none"
                    var tableString = "";
                    if (data[pokenum-1].evolutions.length != 0) {
                        tableString = 
                            `<table>
                                <tr>
                                    <th>Name</th>
                                    <th>Level</th>
                                    <th>Method</th>
                                </tr>
                                `;

                        for (var x = 0; x < data[pokenum-1].evolutions.length; x++) {
                            tableString += 
                                `<tr>
                                    <td class="evolution-link">${data[pokenum-1].evolutions[x].to}</td>
                                    <td>${data[pokenum-1].evolutions[x].level}</td>
                                    <td>${data[pokenum-1].evolutions[x].method}</td>
                                </tr>
                                `;
                        }
                        tableString += `</table>`;
                    }
                    else {
                        tableString = "None.";
                    }

                    var pokemonName = data[pokenum-1].name;
                    $(".pokemon-flex").append(
                        `<div class="pokemon" id="${pokemonName}">
                            <h2 class="pokename">${pokemonName}</h2>
                            <img class = "pokeimage" src="${data[pokenum-1].image_url}" />
                            <div class="pokedetails">
                                <h2>Type(s)</h2>
                                    <ul>
                                    ${typeString}
                                    </ul>
                                <h2>Description</h2>
                                <p>${data[pokenum-1].description}</p>
                                <h2>Evolution(s)</h2>
                                    ${tableString}
                                <p class="dismiss-message">Click anywhere to dismiss.</p>
                            </div>
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

            return pokemonData[id-1];
            
        }

//Creates a large modal for all pokemon details, or minimizes it.
        function toggleDetails() {


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
    