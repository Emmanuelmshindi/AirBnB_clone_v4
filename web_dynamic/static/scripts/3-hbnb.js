$(document).ready(function () {
    // Create array to store amenity IDs
    let amenityIDs = [];

    //Listen for changes in the input checkbox tags
    $('input[type="checkbox"]'.change(function() {
        //Check amenity ID associated with the checkbox
        let amenityID = $(this).data('id');

        if ($(this).prop('checked')) {
            //Checkbox is checked, add the amenity ID to the array
            amenityIDs.push(amenityID);
        } else {
            //Checkbox is unchecked, remove the amenity ID from the array
            let index = amenityIDs.indexOf(amenityIDs);
            if (index !== -1) {
                amenityIDs.splice(index, 1);
            }
        }

        //Update the h4 tag inside the div 'Amenities' with the list of Amenity IDs
        $('div#Amenities h4').text('Amenities: ' + amenityIDs.join(', '));
    });
});


$(document).ready(function () {
    //Create a get request to the api
    $.get("http://0.0.0.0:5001/api/v1/status/", function(data, textStatus) {
        $('div#api_status').toggleClass('available', data == 'OK');
    });
});

$(document).ready(function () {
    //Fetch places and create an article tag representing a Place in the section.places
    $.post("http://0.0.0.0:5001/api/v1/places_search/",
    "Content-Type: application/json" -d '{}',
    function(data) {
      let places = data.places;

      $.each(places, function(index, place) {
        // Create article element for each place
        const article = $('<article></article>');

        // Create and append elements for the title box
        const titleBox = $('<div class="title_box"></div>');
        const title = $('<h2>' + place.name + '</h2>');
        const priceByNight = $('<div "class=price_by_night">' + place.price_by_night + '</div>');
        titleBox.append(title, priceByNight);

        // Create and append elements for the information
        const information = $('<div class="information">' + place.information + '</div>');
        const maxGuest = $('<div class="max_guest">' + place.max_guest + ' Guest' + (place.max_guest !== 1 ? 's' : '') + 'div');
        const numberRooms = $('<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>');
        const numberBathrooms = $('<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '')                                   + '</div>');
        information.append(maxGuest, numberRooms, numberBathrooms);

        // Create and append description
        const description = $('<div class="description">' + place.description + '<div>');

        // Append all elements to the article element
        article.append(titleBox, information, description);

        // Append article to places section
        $('section.places').append(article);
      });
    }, 'json')
    });
