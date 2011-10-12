      var map;
      var y=38.898590;
      var x=-77.035971;
	  var right=false;
	  var left=false;
	  var down=false;
	  var up=false;
	  var players={};
      function initialize() {
        var myOptions = {
          zoom: 19,
          center: new google.maps.LatLng(y, x),
    	  disableDefaultUI: true,
		  panControl: false,
		  zoomControl: false,
		  mapTypeControl: false,
		  scaleControl: false,
		  streetViewControl: false,
		  overviewMapControl: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById('map_canvas'),
            myOptions);
        google.maps.event.addListener(map, 'zoom_changed', function() {
        	if(map.getZoom()!=19){
        	map.setZoom(19);}
        });
        google.maps.event.addListener(map, 'drag', function() {
        	var setlocation = new google.maps.LatLng(y, x);
        	map.setCenter(setlocation);
        });
        keycontrols();
	    
	    socket.on('player',function(json){
	    	players[json.z]={'x':json.x,'y':json.y};
    	});
      }
      google.maps.event.addDomListener(window, 'load', initialize);