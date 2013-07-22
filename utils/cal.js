var Cal = function () {
	this._date = new Date();
};
(function () {

	var _weekly = {
		'Mon' : 1,
		'Tue' : 2,
		'Wed' : 3,
		'Thu' : 4,
		'Fri' : 5,
		'Sat' : 6,
		'Sun' : 0
		},
		_weeklyArray = ['Sun' ,'Mon' ,'Tue' ,'Wed' ,'Thu' ,'Fri' ,'Sat'];

	//是否闰年
	function _isLeapYear(iYear) {

		if (iYear % 4 == 0 && iYear % 100 != 0) {
			return true;
		} else {
			if (iYear % 400 == 0) {
				return true;
			} else {
				return false;
			}
		}
	}

	function _coutMonth (year, month) {
		var _d = new Date();
		_d.setYear(year);
		_d.setMonth(month);
		_days = _d.setDate(0);
		return _d.getDate();
	}


	function _getWeek (date) {
		var dateStr = date.toGMTString();
		return dateStr.split(',')[0];
	}
	Cal.prototype.getData = function () {
		this.getDataByDate(this._date);
	}
	Cal.prototype.getDataPlusOne = function () {

	}
	Cal.prototype.getDataByDate = function (date) {
		return {
			cur 	: date,
			year 	: date.getFullYear(),
			month 	: date.getMonth() + 1,
			day 	: date.getDate(),
			days 	: _coutMonth(date.getFullYear(),date.getMonth()),
			week 	: _getWeek(date)
		}
	}
	Cal.prototype.getByYearAndMonth = function (year, month) {
		var _d = new Date();
			_d.setYear(year);
			_.setMonth(month);
		this.getDataBy(_d)
	}
	Cal.prototype.getWeek = function () {
		return _getWeek(this._date);
	}
	Cal.prototype.getBeginWeek = function (date) {
		var _d = new Date(date);
			_d.setDate(1);
		return _getWeek(_d);
	}
	Cal.prototype.weekly = _weeklyArray;

	Cal.prototype.to2dArray = function (date) {
		var _data = this.getDataByDate(date),
			_begin = _weekly[this.getBeginWeek(date)],
			columnNumber = 7,
			allDayNumer = _data.days + _begin,
			index = 0,
			days2dArray = [],
			arrTemp = [];

		for (var i = 0; i < allDayNumer; i++) {
			if (i % 7 === 0) {
				arrTemp = [];
				days2dArray.push(arrTemp);
			}
			if (i >= _begin) {
				index ++;
				arrTemp.push(index);
			}
			else arrTemp.push(null)
		}
		return days2dArray;

	}
})(Cal);