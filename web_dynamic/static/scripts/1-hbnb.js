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
