/**
 * Draw grid
 */
function drawGrid(){
	if( !grid ){ return; }

	var canvasMiddle = height/2;

	context.beginPath();

	// draw horizontal line
	context.moveTo( 0, canvasMiddle ); 
	context.lineTo( width, canvasMiddle );
	
	// draw vertical lines using sine and cosine functions
	for (var angle = 0; angle <= width ; angle += Math.PI/2 ) {
		if( Math.abs( Math.sin( angle ) ) === 1 || Math.abs( Math.cos( angle ) ) === 1 ){
			context.moveTo( Math.floor( angle * offset.angle + offset.x ) , 0 );
			context.lineTo( Math.floor( angle * offset.angle + offset.x ) , height );
		}	
	}

	context.stroke();
}