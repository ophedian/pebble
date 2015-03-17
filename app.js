var UI = require('ui');
var weather = require("Weather");
var path = require("LifePath");

// create the initial menu
var mainMenu = new UI.Menu({
		sections : [{
				items : [{
						title : "Weather",
						icon : 'images/menu_icon.png',
						subtitle : "What To Wear"
					}, {
						title : "Lucky Day",
						subtitle : "Feeling lucky"
					}
				]
			}
		]
	});

// Create event handlers for the menu
mainMenu.on("select", function (e) {
	console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
	console.log('The item is titled "' + e.item.title + '"');

	switch (e.itemIndex) {
	case 0:
		weather.show();
		break;
	case 1:
		path.showMenu();
		break;
	}
});

mainMenu.show();
