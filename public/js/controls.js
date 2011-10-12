function keycontrols(){
        $(document).keydown(function(e){
    if (e.keyCode == 37) { 
		left=true;
    }
    if (e.keyCode == 38) { 
		up=true;
    }
    if (e.keyCode == 40) { 
		down=true;
    }
    if (e.keyCode == 39) { 
		right=true;
    }
	});
        $(document).keyup(function(f){
    if (f.keyCode == 37) { 
		left=false;
    }
    if (f.keyCode == 38) { 
		up=false;
    }
    if (f.keyCode == 40) { 
		down=false;
    }
    if (f.keyCode == 39) { 
		right=false;
    }
	});
	window.setInterval(move,50);
	function move(){
    if(left){
		x-=.00001;
    }
    if(up){
		y+=.00001;
    }
    if(down){
		y-=.00001;
    }
    if(right){
		x+=.00001;
    }
    	var setlocation = new google.maps.LatLng(y, x);
    	map.setCenter(setlocation);
   }
}