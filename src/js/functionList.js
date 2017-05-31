/**
 * Create a list to show, hide or highlight graphics
 */
function functionList(){
	
	var container = document.createElement("div"),
		p = null,
		label = null,
		input = null,
		span = null;

	container.className = 'collection';

	for( var i = 0; i < graphics.length; i++ ){
		p = document.createElement("p");
		p.className = 'collection-item';
		p.setAttribute('data-index', i);
		p.setAttribute('data-action', 'select-function');

		if( graphics[i].checked ){
			p.classList.toggle('checked');
		}

		label = document.createElement("label");
		label.appendChild( document.createTextNode( graphics[i].name ) );
		label.setAttribute('data-index', i);
		label.setAttribute('data-action', 'check-function');
		label.setAttribute('for', 'checkbox-'+i);

		input = document.createElement("input");
		input.type = 'checkbox';
		input.checked = graphics[i].checked;
		input.className = 'filled-in';
		input.setAttribute('id', 'checkbox-'+i);

		span = document.createElement("span");
		span.className = "color";
		span.style.backgroundColor = graphics[i].color;

		p.appendChild(input);
		p.appendChild(label);
		p.appendChild(span);

		container.appendChild(p);
	}
	
	container.addEventListener('click', controlFunctionItemClick);
	list.appendChild(container);
}

/**
 * Control which function to call when interacting with the list of functions
 */
function controlFunctionItemClick(event){
	event.stopPropagation();
	var target = event.target,
		index = target.getAttribute('data-index');

	if( !index ){
		return;
	}
	index = +index;
	
	if( target.getAttribute('data-action') === 'check-function' ){
		toggleFunction( index, target, event );
	}else if( target.getAttribute('data-action') === 'select-function' ){
		highlightFunction( index, target );
	}
}

/**
 * Check/Uncheck selected function
 */
function toggleFunction( index, target, event ){
	var x = graphics.filter(function(graph){
		return graph.checked;
	});

	if ( x.length === 1 && graphics[index].checked ){
		event.preventDefault();
		return;
	}

	graphics[ index ].checked = !graphics[ index ].checked;
	draw();
	target.parentNode.classList.toggle('checked');
}

/**
 * Highlight selected graphic
 */
function highlightFunction( index, target ){
	if( !graphics[ index ].checked ){
		return;
	}

	// Click on the selected graphic
	if( graphics[ index ].selected ){
		target.classList.remove( 'selected' );
		graphics[ index ].selected = !graphics[ index ].selected;
		lastGraphicSelected = null;

	// Click on a not selected graphic
	}else{
		var x = document.getElementsByClassName('selected')[0];
		if( x ){
			x.classList.remove('selected');
			graphics[ lastGraphicSelected ].selected = !graphics[ lastGraphicSelected ].selected;
		}
		target.classList.add('selected');
		graphics[ index ].selected = !graphics[ index ].selected;
		lastGraphicSelected = index;
	}
	
	draw();
}


/**
 * Check if any graphic is checked
 */
/*function isEmpty(){
	return graphics.filter( getCheckedGraphics ).length === 0 ? true : false;	
}*/
/*function getCheckedGraphics( graph ){
	return graph.checked;
}*/