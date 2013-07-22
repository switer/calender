(function (){

	var cal = new Cal(),
		today = new Date(),
		data = cal.getDataByDate(today),
		days2dArray = cal.to2dArray(today),
		weekLength = 7;

	var main = {

		init : function () {
			$('#container').html($("#template").html());
			this.renderCal(days2dArray);
			this.initEvents();
		},
		renderCal : function (dataArray) {
			var tableStr = '',
				weeklyStr = '<tr>',
				todayStr = data.year + ' / ' + data.month + ' / ' + data.day,
				weekly = cal.weekly,
				curDateStr = '',
				btnStr = '<div class="btn-group edit-icons" style="visibility:hidden;">' + 
					'<button class="btn btn-mini"><i class="icon-plus"></i></button>' + 
					'<button class="btn btn-mini"><i class="icon-minus"></i></button>'
			for (var i = 0; i < weekly.length; i ++) {
				weeklyStr += '<th><div>' + weekly[i] + '</div></th>';
			}
			weeklyStr += '</tr>';
			tableStr += weeklyStr;

			for (var i = 0; i < dataArray.length; i ++) {
				var tupleArray = dataArray[i],
					tupleRowStr = '<tr>';
				for (var j = 0; j < weekLength; j ++) {
					if (tupleArray[j] !== undefined && tupleArray[j] !== null) {
						curDateStr = data.year + ' / ' + data.month + ' / ' + tupleArray[j];
						var tupleClass = (curDateStr === todayStr) ? 'cur' : '';
						tupleRowStr += '<td class=' + tupleClass + '><center>' + tupleArray[j] + '</center>' + btnStr + '</td>'
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
			$('#showEditsBtn').on('click', function (e) {
				console.log('click');
				var $tar = $('#showEditsBtn');
				if ($tar.data('isShow') !== 'true') {
					$('.edit-icons').css('visibility', 'visible')
					$tar.data('isShow', 'true')
				} else {
					$('.edit-icons').css('visibility', 'hidden')
					$tar.data('isShow', 'false')
				}
			})
		}
	}
	

	/*
	*
	*/
	main.init();
})()