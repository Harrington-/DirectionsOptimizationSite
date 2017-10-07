// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.
// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
var placeSearch, start;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

function initStartAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    start = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */
        (document.getElementById('start')), {
            types: ['geocode']
        });

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    start.addListener('place_changed', fillInStartAddress);
}

function fillInStartAddress() {
    // Get the place details from the autocomplete object.
    var placeStart = start.getPlace();

    for (var component in componentForm) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
    }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < placeStart.address_components.length; i++) {
        var addressType = placeStart.address_components[i].types[0];
        if (componentForm[addressType]) {
            var val = placeStart.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
        }
    }
}

// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var placeFinishSearch, finish;
var componentFinishForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    finish = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */
        (document.getElementById('finish')), {
            types: ['geocode']
        });

    // When the user selects an address from the dropdown, populate the address
    // fields in the form.
    finish.addListener('place_changed', fillInAddress);
	initStartAutocomplete();
}

function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = finish.getPlace();

    for (var component in componentFinishForm) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
    }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentFinishForm[addressType]) {
            var val = place.address_components[i][componentFinishForm[addressType]];
            document.getElementById(addressType).value = val;
        }
    }
}
$(document).ready(function(){
    var date_input=$('input[name="date"]'); //our date input has the name "date"
    var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
    var options={
    format: 'mm/dd/yyyy',
    container: container,
    todayHighlight: true,
    autoclose: true,
    time: true,
    };
    date_input.datepicker(options);
})
$('#basic_example_4').timepicker({
	regional: 'en',
});