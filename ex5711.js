

$(document).ready(function() { 
    if (Modernizr.geolocation){
         //Creamos la variable map en el identificador "map" del div
         var map = L.map('map');

         // add an OpenStreetMap tile layer
         L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
             attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
             maxZoom: 18
         }).addTo(map);
          
         map.locate({setView: true, maxZoom: 16, enableHighAccuracy: true});
       
         
         function onLocationFound(e) {
            var radius = e.accuracy / 2;
            //console.log(L.marker(e.latlng).getLatLng());
            L.marker(e.latlng).addTo(map).bindPopup("You are within " + radius + " meters from this point").openPopup();
            L.circle(e.latlng, radius).addTo(map);
         }
         map.on('locationfound', onLocationFound);
       
         function onLocationError(e) {
            alert(e.message);
         }
         map.on('locationerror', onLocationError);

         var popup = L.popup();
         function onMapClick(e) {
            popup.setLatLng(e.latlng).setContent("You clicked the map at " + e.latlng.toString()).openOn(map);  
         }
         map.on('click', onMapClick);
    } else {
        //alert("Formato no soportado");
        ;(function(geolocation){
 
            if (geolocation) return;
               var cache;
               geolocation = window.navigator.geolocation = {};
               geolocation.getCurrentPosition = function(callback){
               if (cache) callback(cache);
                 $.getScript('//www.google.com/jsapi',function(){
                 // sometimes ClientLocation comes back null
                 if (google.loader.ClientLocation) {
                  cache = {
                    coords : {
                     "latitude": google.loader.ClientLocation.latitude,
                     "longitude": google.loader.ClientLocation.longitude
                    }
                  };
                 }
                 callback(cache);
                 });
                };
                geolocation.watchPosition = geolocation.getCurrentPosition;
                
                })(navigator.geolocation);
                
               // usage
               navigator.geolocation.watchPosition(function(pos){
                    //console.log("I'm located at ",pos.coords.latitude,' and ',pos.coords.longitude);

                    var map = L.map('map').setView([pos.coords.latitude, pos.coords.longitude], 15);

                   // add an OpenStreetMap tile layer
                   L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                       attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                   }).addTo(map);

                   // add a marker in the given location, attach some popup content to it and open the popup
                   //L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map).bindPopup(Estamos Aqui).openPopup();
                   L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map).bindPopup('Estamos Aquí!!!!').openPopup();
               
               });  
    }  
});
