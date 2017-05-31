function drawCircle( ){
	
	context.beginPath();

	context.arc(circle.centerX,circle.centerY,circle.radius,circle.start,circle.finnish);

	context.moveTo(circle.centerX, circle.centerY-circle.radius);
	context.lineTo(circle.centerX, circle.centerY+circle.radius);

	context.moveTo(circle.centerX-circle.radius, circle.centerY);
	context.lineTo(circle.centerX+circle.radius, circle.centerY);

	context.stroke();
}

function updateCircle(angle){
	var x = circle.centerX + Math.cos( angle )*circle.radius,
		y = circle.centerY + Math.sin( angle )*circle.radius;
		
	context.beginPath();

	context.moveTo(circle.centerX, circle.centerY);
	context.lineTo(x, y);	
	context.lineTo(x, circle.centerY);

	context.arc(x,y,1,circle.start,circle.finnish);
	context.fill(); 

	context.stroke();
}