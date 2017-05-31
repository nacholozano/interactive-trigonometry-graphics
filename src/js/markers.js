/**
 * Draw marker
 */
function drawMarker( fn ){
	var x = Math.floor( currentAngle * offset.angle ),
		y = Math.floor( fn.fn(currentAngle) * offset.angle );

	context.beginPath();
	context.fillStyle = fn.color;
	context.arc(x+offset.x, y+offset.y, marker.radius, 0, circle.finnish, false);
	context.fill();
}