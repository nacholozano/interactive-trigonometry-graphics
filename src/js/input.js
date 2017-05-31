function updateSpeedInput(){
	speedInput.value = speed;
	speedInput.placeholder = 'Default: '+iniSpeed;
}

function updateZoomInput(){
	zoomInput.value = offset.angle;
	zoomInput.placeholder = 'Default: '+iniOffsetAngle+' Min: '+offset.minAngle;
}

function updateGridInput(){
	toggleGridInput.checked = grid;
}

function changeSpeed(){
	var nextSpeed = +speedInput.value;
	speed = nextSpeed ? nextSpeed : iniSpeed;
}

/**
 * Update zoom event listener
 */
function changeZoom(){
	throttleFunction( 'zoomInput', setZoom );
}

/**
 * Update zoom 
 */
function setZoom(){
	/*var nextZoom = +zoomInput.value;
	offset.angle = nextZoom && nextZoom >= offset.minAngle ? nextZoom : iniOffsetAngle;
	draw();*/

	var zoom = zoomInput.value && zoomInput.value > offset.minAngle ? Math.floor(zoomInput.value) : offset.minAngle;

	if( !animation ){
		offset.angle = zoom;
		draw();
	}else{
		zoomValues.new = zoom;
	}
}