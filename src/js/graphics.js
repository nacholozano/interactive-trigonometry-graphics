/**
 * Draw graphic
 */
function drawGraphic( graphic ){
	var angle = 0,
		x = null;
		y = null;
	
	context.fillStyle = graphic.color;

	for (; x <= width ; angle += speedBase) {
		// Paint every dot to make the graphic
		x = Math.floor( angle * offset.angle );
		y = Math.floor( graphic.fn(angle) * offset.angle );

		// Set graphic style
		if( !graphic.selected ){
			context.fillRect(x+offset.x, y+offset.y, graphicStyle.width, graphicStyle.width);
		}else{
			context.fillRect(x+offset.x, y+offset.y, graphicStyle.width*graphicStyle.highlightMult, graphicStyle.width*graphicStyle.highlightMult);
		}
	}	

}

/**
 * Draw graphics
 */
function drawGraphics( functions ){
	var blank = true,
		selectedGraphic = null; // Store last graphic to be drawn

	for( var i = 0; i < functions.length ; i++ ){
		var fn = functions[i];
		if( fn.checked ){
			blank = false;

			// Set last graphic to be drawn
			if( fn.selected ){
				selectedGraphic = fn;
			}else{
				drawGraphic( fn );
				drawMarker( fn );
			}
		}
	}

	// Draw last graphic
	if( selectedGraphic ){
		drawGraphic( selectedGraphic );
		drawMarker( selectedGraphic );
	}

	// Show message if not graphic is selected
	if( blank ){
		context.fillStyle = 'black';
		context.font = "60px Arial";
		context.fillText("No graphics", 10, 90, 200);
		stopAnimation();
	}
}