var map;
var y=38.89859;
var x=-77.03597;
var right=false;
var left=false;
var down=false;
var up=false;
var players={};
	function initialize() {
	canvasObj="<canvas id='object_layer' height='"+window.innerHeight+"' width='"+window.innerWidth+"'></canvas>"
	$('#object_container').html(canvasObj)
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

}
google.maps.event.addDomListener(window, 'load', initialize);