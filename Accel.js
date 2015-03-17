var Accel = require('ui/accel');
var UI = require('ui');

// initialize the Accel
	Accel.init();

	Accel.on('tap', function(e) {
		// Axis: [Z, Y, Z] Direction: [-1, 1] 
  console.log('Tap event on axis: ' + e.axis + ' and direction: ' + e.direction);
	});
	
	var wind = new UI.Window();
	wind.on('accelTap', function(e) {
 console.log('Tapped the window');
});

Accel.peek(function(e) {
  console.log('Current acceleration on axis are: X=' + e.accel.x + ' Y=' + e.accel.y + ' Z=' + e.accel.z);
});
	