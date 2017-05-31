
	/**
	 * DOM elements
	 */
var canvas = document.getElementById('canvas'),
	header = document.getElementById('header'),
	intro = document.getElementById('intro'),
	list = document.getElementById('list');
	initDimensions();

	/**
	 * Inputs
	 */
var range = document.getElementById('angle'),
	speedInput = document.getElementById('speed'),
	toggleGridInput = document.getElementById('toggle-grid'),
	zoomInput = document.getElementById('zoom'),
	/**
	 * Buttons
	 */
	animateBtn = document.getElementById('animate'),
	stopBtn = document.getElementById('stop'),
	restartBtn = document.getElementById('restart'),
	randomBtn = document.getElementById('random'),
	/**
	 * Canvas info
	 */
	context = canvas.getContext('2d'),
	/**
	 * Initial values
	 */
	angle = 0,
	iniSpeed = 0.05,
	speed = iniSpeed,
	speedBase = 0.06,
	iniOffsetAngle = 80,
	throttleTime = 300,
	grid = false,
	currentAngle = null,
	requestAnimation = null,
	lastGraphicSelected = null,
	animation = false,

	/**
	 * To animate zoom change
	 */
	zoomValues = {
		previous: iniOffsetAngle,
		new: iniOffsetAngle
	}
	/**
	 * Object to save throttle timeouts
	 * See: throttleFunction
	 */
	throttle = {
		time: 300, //Default throttle
		zoomInput: null,
		scroll: null,
		resize: null
	},
	/**
	 * Offset values
	 */
	offset = {
		y: height/2,
		x: 20,
		angle: iniOffsetAngle,
		minAngle: 20
	},
	
	marker = {
		radius: 20
	},

	graphicStyle = {
		width: 3,
		highlightMult: 2.5
	},
	circle = {
		centerX: 150,
		centerY: 300,
		radius: 100,
		start: 0,
		finnish: 2*Math.PI
	},
	/**
	 * Object to save random button configuration
	 */
	random = {
		zoom: {
			counter: 0,
			increment: true,
			minAngle: 30,
			maxAngle: 200,
			steps: 5,
			maxRandom: 300,
			minRandom: 60,
		},
		rotation: {
			counter: 0,
			increment: true,
			steps: 0.05,
			value: null,
			maxRandom: 200,
			minRandom: 60,
		},
		grid: {
			counter: 0
		},
		angle: {
			counter: 0,
			increment: true,
			steps: 0.05,
			maxRandom: 700,
			minRandom: 360,
		}
	},
	/**
	 * List of graphics
	 */
	graphics = [
		{	
			name: 'Sine',
			fn: Math.sin,
			color: 'red',
			checked : true,
			selected: false,
		},
		{	
			name: 'Cosecant',
			fn: function(angle){
				return 1/Math.sin(angle);
			},
			color: 'black',
			checked : false,
			selected: false
		},
		{
			name: 'Cosine',
			fn: Math.cos,
			color: 'blue' , 
			checked : false,
			selected: false
		},
		{
			name: 'Secant',
			fn: function(angle){
				return 1/Math.cos(angle);
			},
			color: 'purple' , 
			checked : false,
			selected: false
		},
		{
			name: 'Tangent',
			fn: Math.tan,
			color: 'green' , 
			checked : false,
			selected: false
		},
		{
			name: 'Cotangent',
			fn: function(angle){
				return 1/Math.tan(angle);
			},
			color: 'orange' , 
			checked : false,
			selected: false
		}
	];

/**
 * Events
 */
range.addEventListener('input', render);
animateBtn.addEventListener('click', animate);
stopBtn.addEventListener('click', stopAnimation);
restartBtn.addEventListener('click', restart);
speedInput.addEventListener('input', changeSpeed);
toggleGridInput.addEventListener('change', toggleGrid);
zoomInput.addEventListener('input', changeZoom);
window.addEventListener('scroll', watchScroll);
window.addEventListener('resize', resize);

randomBtn.addEventListener('click', function random(){
	context.save();
	animationInProgress( true );
	stopBtn.disabled = true;
	initRandom();
	animateRandom();
});

initData();
functionList();
draw();

/**
 * Rotate canvas
 * 
 * TODO: Not rotate canvas, just change the position of the initial point
 */
function rotateCanvas( angle ){
	context.translate( width/2, height/2 );
	context.rotate( angle * ( Math.PI / 180 ) );
	context.translate( -width/2, -height/2 );
}

function render(){
	if ( !outCanvasRight() ){
		draw();
	}
	currentAngle = +range.value;
}

function draw(){
	iniCanvas();
	drawGrid();
	drawGraphics( graphics );
	
	// TODO circular representation for the trigonometry functions 
	/*drawCircle();
	updateCircle(currentAngle);*/
}

function initData(){
	currentAngle = range.value = 0;
	updateSpeedInput();
	updateZoomInput();
	updateGridInput();
	animationInProgress( false );
}

/**
 * Set animation status
 */
function animationInProgress( inProgress ){
	var buttons = [
		randomBtn, 
		//stopBtn, 
		animateBtn, 
		range
	]

	if( inProgress ){
		disableButtons( buttons );
		enableButton(stopBtn);
	}else{
		enableButtons( buttons );
		disableButton(stopBtn);
	}

}

/**
 * Set random animation status
 */
function animationRandomInProgress( inProgress ){

	var buttons = [
		speedInput,
		toggleGridInput,
		zoomInput
	]

	if( inProgress ){
		disableButtons( buttons );
	}else{
		enableButtons( buttons );
	}

}

/**
 * Initialize canvas
 * 
 * TODO: Don't clear space doesn`t belong the canvas ( rotateCanvas TODO will accomplish this )
 */
function iniCanvas(){
	var spaceToErase = width > height ? width : height,
		initialPoint = -spaceToErase,
		finalPoint = spaceToErase*2.2;

	context.clearRect(initialPoint, initialPoint, finalPoint, finalPoint);
}