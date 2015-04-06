/**
 * Created by dmitry on 4/6/15.
 */

var Popup = {
	show:function (url, params) {
		$.ajax({
			url:url,
			data: params.data || {},
			method:params.data ? 'POST' : 'GET',
			success:function (response) {
				var popup = $(response);
				popup.appendTo($('.pontoon-working-area'));
				popup.find('.btn-close').click(function () {
					$(this).parents('.pontoon-overlay').remove();
				});
				if (params.callback)
					params.callback(popup);
			}
		});
	}
};