var FWT = function() {
	this.triMask = new this.TriMask();
	this.flightsMap = new this.FlightsMap();

	window.fitText( document.querySelectorAll('[data-fittext]'), 1.7 );	
}