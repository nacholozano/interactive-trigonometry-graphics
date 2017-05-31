function initRandom(){
	offset.angle = getRandomInt(200, 70);
	random.rotation.value = getRandomFloat(1, 0);
}

/**
 * Get random but limited value for specific random object
 * randomObject: object from random object
 * currentValue: current value
 * additionalCondition: additional condition to reset counter property in 'randomObject' (optional)
 * 
 * TODO: Improve this function with sine function values (1,-1)
 */
function randomness( randomObject, currentValue, additionalCondition ){
	var result = null,
		// Condition to restart de counter property from 'randomObject'
		// The condition always is a limit plus some additional condition if needed
		condition = additionalCondition ?
			randomObject.counter > getRandomInt( randomObject.maxRandom, randomObject.minRandom) || additionalCondition() :
			randomObject.counter > getRandomInt( randomObject.maxRandom, randomObject.minRandom);
	
	
	if( condition ){
		randomObject.increment = !randomObject.increment;
		randomObject.counter = 0;
	}

	result = randomObject.increment ? 
		currentValue + randomObject.steps : 
		currentValue - randomObject.steps;
	
	randomObject.counter++;
	return result;
}


function animateRandom(){
    iniCanvas();
    rotateCanvas( random.rotation.value );
    draw();

	animationRandomInProgress(true);

    random.rotation.value = randomness( random.rotation, random.rotation.value );
    offset.angle = Math.floor( randomness( random.zoom, offset.angle, zoomRandomCondition ) );
    currentAngle = randomness( random.angle, currentAngle, angleRandomCondition );
    range.value = currentAngle;

    randomGrid();

    requestAnimation = requestAnimationFrame( animateRandom );
}

function angleRandomCondition(){
	return currentAngle < 0;
}

function zoomRandomCondition(){
	return offset.angle < random.zoom.minAngle || offset.angle > random.zoom.maxAngle;
}

function randomGrid(){
	if( random.grid.counter > getRandomInt(500, 60) ){
		if( getRandomInt(100, 0) > 100/3 ){
			grid = !grid;
		}
		random.grid.counter = 0;
	}

	random.grid.counter++;
}


/**
 * Get random numbers
 */
function getRandomInt(max, min){
	return (Math.random() * (max - min)) + min;
}

function getRandomFloat(max, min){
	return Math.floor(Math.random() * (max - min)) + min;
}