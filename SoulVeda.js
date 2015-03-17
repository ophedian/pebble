var SoulVeda = (function (app) {

	// pads numbers
	app.leftPadNumber = function (number) {
		number = number || 0;
		var digit = parseInt(number, 10);
		return (digit < 10) ? ("0" + digit) : digit;
	};

	// ISO Date Format
	app.toIsoDateOnly = function (date) {
		date = date || new Date();
		var month = date.getMonth() + 1;
		var cleanDate = date.getFullYear() + '-' + month + '-' + date.getDate();
		return cleanDate;
	};

	// ISO Full Date Format
	app.toIsoDateTime = function (date) {
		date = date || new Date();
		var month = date.getMonth() + 1;
		var cleanDate = date.getFullYear() + '-' + month + '-' + date.getDate();
		cleanDate += 'T' + app.leftPadNumber(date.getHours()) + ':' + app.leftPadNumber(date.getMinutes()) + ':' + app.leftPadNumber(date.getSeconds());
		return cleanDate;
	}

	// ISO Date and Hour Only
	app.toIsoDateHourOnly = function (date) {
		date = date || new Date();
		var month = date.getMonth() + 1;
		var cleanDate = date.getFullYear() + '-' + month + '-' + date.getDate();
		cleanDate += 'T' + app.leftPadNumber(date.getHours()) + ':00:00';
		return cleanDate;
	};

	return app;
}
	(SoulVeda || {}));

this.exports = SoulVeda;
