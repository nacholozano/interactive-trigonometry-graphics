/**
 * Function to throttle another function
 * throttleVar: throttle object property
 * fn: function to throttle
 * time: throttle time (optional)
 */
function throttleFunction( throttleVar, fn, time ){
	clearTimeout( throttle[ throttleVar ] );
	throttle[ throttleVar ] = setTimeout(fn, time || throttle.time);
}