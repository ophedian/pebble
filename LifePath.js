var UI = require('ui');
var SoulVeda = require('SoulVeda');
var ajax = require('ajax');
var Vector2 = require('vector2');

var LifePath = (function (lifePath) {
	var basePath = 'https://www.trinecast.com/api/lifepath';

	// retrieves JSON for a lifepath given a fullpath
	// the path must include the required querystring for that call
	lifePath.getLifePath = function (fullPath) {
		console.log(fullPath);
		ajax({
			url : fullPath,
			type : 'json',
		},
			function (data) {
			lifePath.showPathInfo(data);
		},
			function (error) {
			lifePath.showErrorInfo(error);
		});
	};

	// shows the life path information
	lifePath.showPathInfo = function (data) {
		console.log(data);

		var wind = new UI.Window({
				scrollable : true,
				fullscreen : true
			});

		var titleField = new UI.Text({
				position : new Vector2(0, 0),
				size : new Vector2(144, 20),
				font : 'gothic-18-bold',
				text : 'Life Path: ' + data.data.number
			});
		var keywordsField = new UI.Text({
				position : new Vector2(0, 21),
				size : new Vector2(144, 120),
				font : 'gothic-18-bold',
				text : 'Life Path: ' + data.data.lifePathKeywords
			});
		wind.add(titleField);
		wind.add(keywordsField);
		wind.show();
	};

	// shows the error message if lifepath information could be displayed
	lifePath.showErrorInfo = function (error) {
		console.log(error);
		var card = new UI.Card();
		card.title('ooops, our bad');
		card.subtitle('Error happened');
		card.body(error);
		card.show();
	};

	// Gets the lifepath for today: date only
	lifePath.getPathInfoForToday = function () {
		var fullPath = basePath + '?date=' + SoulVeda.toIsoDateOnly();
		lifePath.getLifePath(fullPath);
	};

	// Gets the life path for today including hour only
	lifePath.getPathInfoForHour = function () {
		var fullPath = basePath + '?date=' + SoulVeda.toIsoDateHourOnly();
		lifePath.getLifePath(fullPath);
	};

	// Shows the life path menu
	lifePath.showMenu = function () {
		var pathMenu = new UI.Menu({
				sections : [{
						items : [{
								title : 'Today',
								subtitle : 'Todays Life path'
							}, {
								title : 'Now',
								subtitle : 'Now LifePath'
							}
						]
					}
				]
			});
		pathMenu.on('select', function (e) {
			switch (e.itemIndex) {
			case 0:
				console.log('Selected today');
				lifePath.getPathInfoForToday();
				break;
			case 1:
				console.log('Selected Now');
				lifePath.getPathInfoForHour();
				break;
			}
		});
		pathMenu.show();
	};
	//return self reference
	return lifePath;

}
	(LifePath || {}));
this.exports = LifePath;
