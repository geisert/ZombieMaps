window.onload = function() {
	var kin = new Kinetic_2d("object_layer");
	var canvas = kin.getCanvas();
	var context = kin.getContext();
		socket.on('player',function(json){
			players[json.z]={'x':json.x,'y':json.y};
			context.beginPath();
			context.arc(canvas.width/2, canvas.height/2, 5, 0, 2 * Math.PI, false);
			context.fillStyle = "#8ED6FF";
			context.fill();
			context.lineWidth = 2;
			context.strokeStyle = "black";
			context.stroke();
			for(z in players){
				context.beginPath();
				context.arc((canvas.width/2-(x-players[z].x)*380000), (canvas.height/2+(y-players[z].y)*460000), 5, 0, 2 * Math.PI, false);
				context.fillStyle = "#8ED6FF";
				context.fill();
				context.lineWidth = 2;
				context.strokeStyle = "black";
				context.stroke();
				context.closepath();
			}
		});
		setInterval(function(){
			kin.clear();
		},100);
}
window.onresize=function(){
	canvasObj="<canvas id='object_layer' height='"+window.innerHeight+"' width='"+window.innerWidth+"'></canvas>"
	$('#object_container').html(canvasObj);
	var kin = new Kinetic_2d("object_layer");
	var canvas = kin.getCanvas();
	var context = kin.getContext();
	kin.setDrawStage(function() {
		this.clear();
	
		context.beginPath();
		context.arc(canvas.width/2, canvas.height/2, 5, 0, 2 * Math.PI, false);
		context.fillStyle = "#8ED6FF";
		context.fill();
		context.lineWidth = 2;
		context.strokeStyle = "black";
		context.stroke();
		context.closepath();
		for(z in players){
			alert(x);
			context.beginPath();
			context.arc((canvas.width/2+x-players[z].x), (canvas.height/2+y-players[z].y-10), 5, 0, 2 * Math.PI, false);
			context.fillStyle = "#8ED6FF";
			context.fill();
			context.lineWidth = 2;
			context.strokeStyle = "black";
			context.stroke();
			context.closepath();
		}
	});
}
