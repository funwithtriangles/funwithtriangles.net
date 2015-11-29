var pathEls = document.querySelectorAll('svg #flights path');
var paths = [];
var transEndEventName = ('WebkitTransition' in document.documentElement.style) ? 'webkitTransitionEnd' : 'transitionend';

// Each path on the map
var Path = function(path, index) {

	var self = this;

	this.init = function() {

		this.length = path.getTotalLength();
		this.index = index;
		this.reset();

	}

	this.go = function() {
		this.reset();
		path.style.strokeDashoffset = self.length;
	}

	this.reset = function() {

		// Clear any previous transition
		path.style.transition = path.style.WebkitTransition = 'none';
		
		// Set up the starting positions
		path.style.strokeDasharray = this.length + ' ' + this.length;
		path.style.strokeDashoffset = -this.length;
		
		// Trigger a layout so styles are calculated & the browser
		// picks up the starting position before animating
		path.getBoundingClientRect();
		// Define our transition
		path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 1s ease-in-out';

	}
 
}

// Create new objects for each path tag in the svg
for (var i=0; i<pathEls.length; i++) {

	var path = new Path(pathEls[i]);
	path.init();

	paths.push(path);

}

// 3 counting vars, offset by 3
// Allowing for 3 paths to be animated at a time
var i = paths.length-1;
var j = paths.length-3;
var k = paths.length-5;

// Set off animations every second
var t = window.setInterval(function() {
	
	paths[i].go();
	paths[j].go();
	paths[k].go();

	i--; j--; k--;

	if (i < 0) {
		i = paths.length-1;
	}

	if (j < 0) {
		j = paths.length-1;
	}

	if (k < 0) {
		k = paths.length-1;
	}

}, 1000)


