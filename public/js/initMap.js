function initMap() {
    
    var myLatLng = {lat: mapa.lat, lng: mapa.log};
  
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 18,
      center: myLatLng
    });
  
    var myLatLng = {lat: mapa.lat, lng: mapa.log};

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Hello World!'
    });
  }

initMap()
  
  