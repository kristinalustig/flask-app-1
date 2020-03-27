// Your code starts here

$(document).ready(function() {

    var currentUrl = $(location).attr('href');
    var currentId = currentUrl.slice(currentUrl.lastIndexOf("/")+1);
    console.log(currentId);

    $.ajax(`api/pokemon/${currentId}`, 
    {

        datatype: 'JSON',
        success: function(data) {

             //populate the pokemon's name
            $(".pokename").text(data.name);
            
            //populate the description
            $(".pokedescription").text(data.description);

            //populates the image URL
            $(".pokeimage").attr("src",data.image_url);

            //appends correct information to "types" section
            $('.typelist').append(listMaker(data.types));    

            //creates the table for evolutions for a given pokemon
            if (data.evolutions.length != 0) {
                $('.evolution-table').append(tableRowMaker(data.evolutions));
            }

        }

    });

});

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
                <td class="evolution-link"><a href="/${evolutionArray[x].id}">${evolutionArray[x].to}</a></td>
                <td>${evolutionArray[x].level}</td>
                <td>${evolutionArray[x].method}</td>
            </tr>
            `;
    }

    return tableString;

}