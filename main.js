(function (){

	var cal = new Cal(),
		today = new Date(),
		data = cal.getDataByDate(today),
		days2dArray = cal.to2dArray(today),
		weekLength = 7,
		_data = window.localStorage.getItem('couter_save_data'),
		_maxLevel = 5,
		levelMap = {
			1 : 'level1',
			2 : 'level2',
			3 : 'level3',
			4 : 'level4',
			5 : 'level5'
		}

	var model = {
		'data' : _data ? JSON.parse(_data) : {},
		'save' : function (key, value, callback) {
			this.data[key] = value;
			this.update();
			callback && callback();
		},
		'get' : function (key) {
			return this.data[key];
		},
		'delete' : function (key, callback) {
			this.data[key] = null;
			this.update();
			callback && callback();
		},
		update : function () {
			window.localStorage.setItem('couter_save_data', JSON.stringify(this.data));
		}
	}

	var main = {

		init : function () {
			$('#container').html($("#template").html());
			this.renderCal(days2dArray);
			this.initEvents();
		},
		renderCal : function (dataArray) {

			var tableStr = '',
				weeklyStr = '<tr>',
				todayStr = data.year + '/' + data.month + '/' + data.day,
				weekly = cal.weekly,
				curDateStr = '',
				btnStr = '<div class="btn-group edit-icons" style="visibility:hidden;">' + 
					'<button class="btn btn-mini edit-plus"><i class="icon-plus"></i></button>' + 
					'<button class="btn btn-mini edit-minus"><i class="icon-minus"></i></button>'
			
			/*表头*/
			for (var i = 0; i < weekly.length; i ++) {
				weeklyStr += '<th>' + weekly[i] + '</th>';
			}
			weeklyStr += '</tr>';
			tableStr += weeklyStr;

			/*日期*/
			for (var i = 0; i < dataArray.length; i ++) {
				var tupleArray = dataArray[i],
					tupleRowStr = '<tr>';
				for (var j = 0; j < weekLength; j ++) {
					if (tupleArray[j] !== undefined && tupleArray[j] !== null) {
						curDateStr = data.year + '/' + data.month + '/' + tupleArray[j];
						var tupleClass = (curDateStr === todayStr) ? 'cur' : '',
							levelData = model.get(curDateStr) || 0;
							
						if (levelData > _maxLevel) levelData = _maxLevel;
						var levelClass = levelMap[levelData] ? levelMap[levelData]  : '';

						tupleRowStr += '<td class="' + tupleClass + ' ' + levelClass + '" data-level="' + levelClass + 
										'" data-date="' + curDateStr + '"><center>' + 
										tupleArray[j] + '</center><center>' + btnStr + '</center></td>'
					} else {
						tupleRowStr += '<td></td>'
					}
				}
				tupleRowStr += '</tr>';
				tableStr += tupleRowStr;
			}
			$('#calTable').html(tableStr);

			$('#dispDate').html('今天 ' + todayStr + '  ' + data.week)
		},
		initEvents : function () {
			var _this = this;
			$('#showEditsBtn').on('click', function (e) {
				var $tar = $('#showEditsBtn');
				if ($tar.data('isShow') !== 'true') {
					$('.edit-icons').css('visibility', 'visible')
					$tar.data('isShow', 'true')
				} else {
					$('.edit-icons').css('visibility', 'hidden')
					$tar.data('isShow', 'false')
				}
			})

			$('.edit-plus').on('click', function (e) {
				var $tarTd = _this._getParent($(e.target)),
					date = $tarTd.data('date'),
					level = model.get(date);

					if (level === null || level === undefined) {
						level = 0;
					}
					level ++;
					model.save(date, level, function () {
						_this.updateDataCallback(date, level, $tarTd);
					});

			})
			$('.edit-minus').on('click', function (e) {
				var $tarTd = _this._getParent($(e.target)),
					date = $tarTd.data('date'),
					level = model.get(date);
					if (level === null || level === undefined) {
						level = 0;
					}
					level --;
					if (level < 0) level = 0;
					model.save(date, level, function () {
						_this.updateDataCallback(date, level, $tarTd);
					});
			})
			
		},
		updateDataCallback : function (date, level, $tar) {
			if (level >= _maxLevel) level = _maxLevel;
			var levelClass = levelMap[level]  || '';
			$tar.removeClass($tar.data('level')).addClass(levelClass).data('level', levelClass);
		},
		_getParent : function ($tar) {
			var $parent = $tar.parent().parent().parent();
			if ($parent.data('date')) return $parent;
			else return $parent.parent();
		}
	}
	

	/*
	*
	*/
	main.init();
})()