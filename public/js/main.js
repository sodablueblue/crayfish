$(function(){
	$('#send').click(function(){
		$.post('http://localhost:7777/house/fetch', {
			xiaoqu: $('#xiaoqu').val(),
			test: 'test'
		}, function (data, textStatus){
			// $('#resText').empty()
			// $(data).each(function(index, item){
			// 	var date = new Date(item.created * 1000);
			// 	$('#resText').prepend(
			// 		'<p>' + decodeURI(item.community) + '</p>' + 
			// 		'<p>' + item.meanPrice + '元</p>' +
			// 		'<p>' + date.toLocaleString() + '</p>' +
			// 		'<hr/>');

			// });
			var conv = convertData(data);
			$("#resText").empty();
			$("#resText").highcharts({
				chart: {
					type: 'line'
				},
				title: {
					text: decodeURIComponent(conv.community) + '均价趋势'
				},
				xAxis: {
					type: 'datetime',
					dateTimeLabelFormats: {
						day: '$e of $b'
					}
				},
				yAxis: {
					title: {
						text: '元'
					}
				},
				series:[{
					name: '链家',
					data: conv.data,
					pointStart: conv.pointStart * 1000,
					pointInterval: 12 * 3600 * 1000
				}]
			})
		});
		return false;
	});
});

function compare(a, b){
	return a.created - b.created
}

function convertData(data){
	var res = {
		community: '',
		data: [],
		pointStart: ''
	};

	data = data.sort(compare);

	$(data).each(function(index, item){
		if(index == 0) {
			res.community = item.community;
			res.data.push(Number(item.meanPrice));
			res.pointStart = item.created;
		}else{
				res.data.push(Number(item.meanPrice));
		}
	});
	return res;
}