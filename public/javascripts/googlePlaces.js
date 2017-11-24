var myName;
var myPlaceId;
var myAddress;
var myWebiste;
var myGeometry;

function rate() {
  document.querySelector('#formRest').submit();
}
function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 40.4893538, lng: -3.6827461},
          zoom: 10,
          mapTypeId: 'roadmap'
        });

        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);

        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            console.log(place);
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
            var contentString = `
              <div class="card infowindow" >
                <strong>${place.name}</strong>
                <div>${place.vicinity}</div>
                <a href="${place.website}" target="_blank">${place.website}</a>
                <div class="stars">
            `;

            for(let i = 1; i < place.rating; i++) {
              contentString = contentString + '<img src="/images/star.png" width="20px">';
            }

            contentString = contentString + '</div><a onclick="rate()" class="rate">Add to wanna go</a></div>';

            var infowindow = new google.maps.InfoWindow({
                      content: contentString,
                      maxWidth: 300
                    });

                    var marker = (new google.maps.Marker({
                      map: map,
                      icon: icon,
                      title: place.name,
                      position: place.geometry.location,
                      place: place.place_id
                    }));

                    myPlaceId= place.place_id;
                    myName = place.name;
                    myAddress = place.formatted_address;
                    myType = place.types[0];
                    myWebsite = place.website;

                    document.getElementById("idRest").value = myPlaceId;
                    document.getElementById("nameRest").value = myName;
                    document.getElementById("addressRest").value = myAddress;
                    document.getElementById("typeRest").value = myType;
                    document.getElementById("webRest").value = myWebsite;

                    marker.addListener('click', function() {
                      infowindow.open(map, marker);
                    });


            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
      }
