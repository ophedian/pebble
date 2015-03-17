var UI = require('ui');
var ajax = require('ajax');
var Vector2 = require('vector2');

//create the weather object
var weather = {};
var splashWindow = {};

// Handles parsing the JSON into menu key/value pairs
var parseFeed = function (data, quantity) {
	var items = [];
	for (var i = 0; i < quantity; i++) {

		// Temperature
		var temp = data.list[i].main.temp;

		// Always upper case the description string
		var title = data.list[i].weather[0].main;
		title = title.charAt(0).toUpperCase() + title.substring(1);

		// Get date/time substring
		var time = data.list[i].dt_txt;
		time = time.substring(time.indexOf('-') + 1, time.indexOf(':') + 3);

		// Add to menu items array
		items.push({
			title : title,
			subtitle : time,
			temp : temp
		});
	}

	// Finally return the menu items
	return items;
};

// gets the latest weather and shows it in a menu format
weather.update = function () {
	// Make request to openweathermap.org
	ajax({
		url : 'http://api.openweathermap.org/data/2.5/forecast?q=Atlanta&units=imperial',
		type : 'json'
	},
		function (data) {
		// Create an array of Menu items
		var menuItems = parseFeed(data, 10);
		var weatherForecast = new UI.Menu({
				sections : [{
						items : []
					}
				]
			});

		// add weather items to the UI
		console.log("Entering the weather loop");
		for (var i = 0; i < menuItems.length; i++) {
			weatherForecast.item(0, i, {
				title : menuItems[i].title + " " + menuItems[i].temp,
				subtitle : menuItems[i].subtitle
			});
		}
		console.log("I am done with the weather loop");
		splashWindow.hide();
		weatherForecast.show();
	},
		function (error) {
		console.log('Download failed: ' + error);
	});
};

// adds the weather show functionality
weather.show = function () {
	// Show splash screen while waiting for data
	splashWindow = new UI.Window();

	// Text element to inform user
	var text = new UI.Text({
			position : new Vector2(0, 0),
			size : new Vector2(144, 168),
			text : 'Downloading weather data...',
			font : 'GOTHIC_28_BOLD',
			color : 'black',
			textOverflow : 'wrap',
			textAlign : 'center',
			backgroundColor : 'white'
		});

	// Add to splashWindow and show
	splashWindow.add(text);
	splashWindow.show();

	weather.update();
};

this.exports = weather;
