function initMap() {
    var myLatLng = {lat: evento.lat, lng: evento.log};
  
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 18,
      center: myLatLng
    });
  
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Hello World!'
    });
  }



  