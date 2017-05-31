/**
 * setCanvasLocation event listener 
 */
function watchScroll(){
	throttleFunction( 'scroll', setCanvasLocation, 10 );
}

/**
 * Change canvas position if full canvas is not in the viewport
 */
function setCanvasLocation(){
	if( window.scrollY > canvasToTop ){
		intro.style.marginBottom = canvasComputedHeight;
		canvas.className = 'canvas-fixed z-depth-4';
	}else{
		intro.style.marginBottom = 0;
		canvas.className = '';
	}
}

function initDimensions(){
	width = canvas.width = window.innerWidth;
	height = canvas.height = window.innerHeight/1.3;
	canvasToTop = getCanvasToTop();
	canvasComputedHeight = getComputedStyle(canvas,null).height;
	canvasDimensions = canvas.getBoundingClientRect();
}

function resize(){
	initDimensions();
	offset.y = height/2;
	throttleFunction( 'resize', draw );
}

function getCanvasToTop(){
	return header.offsetHeight + intro.offsetHeight;
	//return canvas.getBoundingClientRect().top;
}