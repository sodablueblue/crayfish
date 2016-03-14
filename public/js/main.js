$(function(){
	$('#send').click(function(){
		$.post('http://localhost:7777/house/fetch', {
			xiaoqu: $('#xiaoqu').val(),
			test: 'test'
		}, function (data, textStatus){
			$('#resText').empty()
			$(data).each(function(index, item){
				var date = new Date(item.created * 1000);
				$('#resText').prepend(
					'<p>' + decodeURI(item.community) + '</p>' + 
					'<p>' + item.meanPrice + '元</p>' +
					'<p>' + date.toLocaleString() + '</p>' +
					'<hr/>');

			});
		});
		return false;
	});
});