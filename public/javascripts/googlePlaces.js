var myName;
var myPlaceId;
var myAddress;
var myWebiste;
var myGeometry;

function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.8688, lng: 151.2195},
          zoom: 13,
          mapTypeId: 'roadmap'
        });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };
            placeMyID = place.place_id;
            var contentString = ('<div><strong>' + place.name + '</strong><br>' +
                            'Place ID: ' + place.place_id + '<br>' +
                            place.formatted_address + '</div>');

            var infowindow = new google.maps.InfoWindow({
                      content: contentString
                    });

                    var marker = (new google.maps.Marker({
                      map: map,
                      icon: icon,
                      title: place.name,
                      position: place.geometry.location,
                      place: place.place_id
                    }));

                    console.log(place);

                    myPlaceId= place.place_id;
                    myName = place.name;
                    myAddress = place.formatted_address;
                    myGeometry = place.geometry.location;
                    myWebiste = place.website;

                    document.getElementById("idRest").value = myPlaceId;
                    document.getElementById("nameRest").value = myName;
                    document.getElementById("addressRest").value = myAddress;
                    document.getElementById("geometryRest").value = myGeometry;
                    document.getElementById("webRest").value = myWebsite;

                    marker.addListener('click', function() {
                      infowindow.open(map, marker);
                    });

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
      }
