// Your code starts here

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