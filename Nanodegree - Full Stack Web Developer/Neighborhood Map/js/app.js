// The viewmodel managed with Knockout
var viewModel = function() {
    var self = this;
    // Hardcoded locations to be highlighted
    self.chosenLocations = ko.observableArray([
                                {address:"Pariser Platz, 10117 Berlin, Deutschland",
                                 title: "Brandenburger Tor"},
                                {address:"Panoramastraße 1A, 10178 Berlin, Deutschland",
                                 title: "Berliner Fernsehturm"},
                                {address:"Freizeitgelände Tempelhofer Feld, 12101 Berlin, Deutschland",
                                 title: "Tempelhofer Flughafen"},
                                {address:"Trebbiner Str. 9, 10963 Berlin, Deutschland",
                                 title: "Technisches Museum"},
                                {address:"Kaiserswerther Str. 16-18, 14195 Berlin, Deutschland",
                                 title: "Freie Universität Berlin"},
                                {address:"Reichstagsgebäude, Platz der Republik 1, 10557 Berlin, Deutschland",
                                 title: "Reichstag"},
                                {address:"Bundeskanzleramt Berlin, 10557 Berlin, Deutschland",
                                 title: "Bundeskanzleramt"},
                                {address:"Südtorweg, 14053 Berlin, Deutschland",
                                 title: "Olympiastadion"}]);
    self.locations = ko.observableArray([]);
    self.filterVisible = ko.observable(false);
    self.toggleFilter = function() {
        vm.filterVisible(!vm.filterVisible());
    }
};

var vm = new viewModel();
ko.applyBindings(vm);

var map;
var geocoder
var largeInfowindow;
var bounds;

// Callback function for the Maps API
function initMap() {
    // Initializing all subsequently used Objects
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 52.520007, lng: 13.404954},
        zoom: 12
        });
    bounds = new google.maps.LatLngBounds();
    largeInfowindow = new google.maps.InfoWindow();
    geocoder = new google.maps.Geocoder();

    // Set markes and all pertaining logic
    setMarkers(geocoder);
}

// Error handler for all embedded libraries
function mapsApiError() {
    setTimeout(function(){ window.location.reload(); }, 3000);
    alert("One of the Required APIs couldn't be Loaded.\n Reloading the page in 3 Secs ...")
}

function setMarkers(geocoder) {
    // Function to create unique styles for the markers
    function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
            'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
            '|40|_|%E2%80%A2',
            new google.maps.Size(25, 35),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 35),
            new google.maps.Size(25,35));
        return markerImage;
    }

    var defaultIcon = makeMarkerIcon('0091ff');
    var highlightedIcon = makeMarkerIcon('FFFF24');

    // interating over all chosen Locations
    for (var i = 0; i < vm.chosenLocations().length; i++) {
        geocoder.geocode(
            { address: vm.chosenLocations()[i].address,
              componentRestrictions: {locality: 'Berlin'}
            }, (function(i) {
                return function(results, status) {
                var location = {id: i,
                                // Knockout needed for filter functions
                                visible: ko.observable(true),
                                position: {lat: results[0].geometry.location.lat(),
                                           lng: results[0].geometry.location.lng()},
                                title: vm.chosenLocations()[i].title,
                                address: results[0].formatted_address,
                                placeID: results[0].place_id};

                // setting marker
                var marker = new google.maps.Marker({
                    position: location.position,
                    map: map,
                    title: location.title,
                    icon: defaultIcon,
                    animation: google.maps.Animation.DROP
                });

                // creating all needed Event listeners
                marker.addListener('click', function() {
                    populateInfoWindow(location, largeInfowindow);

                    for (var i = 0; i < vm.locations().length; i++) {
                        vm.locations()[i].marker.setAnimation(null);
                    }
                    this.setAnimation(google.maps.Animation.BOUNCE);

                    map.setCenter(this.position);
                });

                marker.addListener('mouseover', function() {
                    this.setIcon(highlightedIcon);
                });
                marker.addListener('mouseout', function() {
                    this.setIcon(defaultIcon);
                });

                // adding the marker to the location object
                location.marker = marker;
                // hooking up a handler in order to rerender all markers according to their visibility
                // whenever any location visibility is modified
                location.visible.subscribe(function() {
                    for (var i = 0; i < vm.locations().length; i++) {
                        vm.locations()[i].marker.setVisible(vm.locations()[i].visible());
                    }
                })

                vm.locations.push(location);

                // fitting the page to my markers
                bounds.extend(marker.position);
                if (vm.locations().length == vm.chosenLocations().length) {
                    map.fitBounds(bounds);
                }
            }})(i));
    }
}

function populateInfoWindow(location, infowindow) {
    // setting the infowindow to the clicked marker
    infowindow.marker = location.marker;

    // getting additional information from google places and wikipedia to populate the infoWindow
    var service = new google.maps.places.PlacesService(map);
    service.getDetails({
        placeId: location.placeID
    }, function(place, status) {
        var innerHTML = '<div>';
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            if (place.name) {
                innerHTML += '<strong>' + place.name + '</strong>';
            }
            if (place.formatted_address) {
                innerHTML += '<br>' + place.formatted_address;
            }
            if (place.formatted_phone_number) {
                innerHTML += '<br>' + place.formatted_phone_number;
            }
            if (place.opening_hours) {
                innerHTML += '<br><br><strong>Hours:</strong><br>' +
                    place.opening_hours.weekday_text[0] + '<br>' +
                    place.opening_hours.weekday_text[1] + '<br>' +
                    place.opening_hours.weekday_text[2] + '<br>' +
                    place.opening_hours.weekday_text[3] + '<br>' +
                    place.opening_hours.weekday_text[4] + '<br>' +
                    place.opening_hours.weekday_text[5] + '<br>' +
                    place.opening_hours.weekday_text[6];
            }
            if (place.photos) {
                innerHTML += '<br><br><img src="' + place.photos[0].getUrl(
                    {maxHeight: 100, maxWidth: 200}) + '">';
            }
        }
        innerHTML += '<div class="articles"></div></div>';
        infowindow.setContent(innerHTML);

        // after the google places call has ended (whether successful or not) we make the wikipeida ajax call
        var wikiUrl = "http://en.wikipedia.org/w/api.php?action=opensearch&search=" + 
            location.title + "&format=json&callback=wikiCallback";

        $.ajax({
            url: wikiUrl,
            dataType: "jsonp",
            success: function(response) {
                $(".articles").html("<a href="+response[3][0]+">Wikipedia Article</a>")
            },
            error: function() {
                $(".articles").html("<p>Couldn't retrieve any Wikipedia Articles!!!</p>")
            }
        })
    })

    infowindow.open(map, location.marker);

    // Make sure the marker property is cleared if the info window is closed.
    infowindow.addListener('closeclick',function(){
        infowindow.setMarker = null;
    });
}

// Create a function which returns true when location. id is equal to id 
// we need this function in order to find the appropriate location 
// to link the list items to the markers on the map
function checkID(id) {
    return function(location) {
        return location.id == id
    }
}

// The function with which we link the list events to the marker events
function linkToClickEvent(id) {
    var location = vm.locations().find(checkID(id))

    google.maps.event.trigger(location.marker, 'click');
}

function linkToMouseOverEvent(id) {
    var location = vm.locations().find(checkID(id))

    google.maps.event.trigger(location.marker, 'mouseover');
}

function linkToMouseOutEvent(id) {
    var location = vm.locations().find(checkID(id))

    google.maps.event.trigger(location.marker, 'mouseout');
}