/**
 * Aniamte selected graphics
 */
function animate(){
	animation = true;
	/*if( isEmpty() ){
		animationInProgress( false );
		return;
	}*/
	animationInProgress( true );
	draw();

	if( outCanvasRight() && speed > 0 ){
		currentAngle = 0;
	}else if( outCanvasLeft() ){
		currentAngle = width / offset.angle;
	}

	if( zoomValues.previous < zoomValues.new ){
		zoomValues.previous = ++offset.angle;
	}else if( zoomValues.previous > zoomValues.new ){
		zoomValues.previous = --offset.angle;
	}
	
	range.value = currentAngle;
	currentAngle = +currentAngle + speed; 
	requestAnimation = requestAnimationFrame( animate );
}

/**
 * Stop animation
 */
function stopAnimation(){
	animation = false;
	updateGridInput();
	updateZoomInput();
	animationInProgress( false );
	cancelAnimationFrame( requestAnimation );
}

/**
 * Toggle grid
 */
function toggleGrid(){
	grid = !grid;
	draw();
}

/**
 * Check if current x is out the graphic
 */
function outCanvasRight(){
	var currentX = currentAngle * offset.angle;
	return currentX > ( width - marker.radius * 2 );
}

function outCanvasLeft(){
	var currentX = currentAngle * offset.angle;
	return currentX < ( 0 - marker.radius * 2 );
}

/**
 * Restart canvas
 */
function restart(){
	animation = false;
	context.restore();
	stopBtn.disabled = false;
	initData();
	draw();
	stopAnimation();
	animationRandomInProgress(false);
}