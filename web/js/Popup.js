/**
 * Created by dmitry on 4/6/15.
 */

var Popup = {
	show:function (params) {
		var self = this;
		if (params.url) {
			$.ajax({
				url:params.url,
				data: params.data || {},
				method:params.data ? 'POST' : 'GET',
				success:function (response) {
					self.showPopup(response, params);
				}
			});
		} else {
			self.showPopup(params.content, params);
		}
	},
	showPopup:function(content, params) {
		var popup = $(content);
		popup.appendTo($('.pontoon-working-area'));
		popup.find('.btn-close').click(function () {
			$(this).parents('.pontoon-overlay').remove();
		});

		if (params.parent)
			params.parent.remove();

		if (params.callback)
			params.callback(popup);

	}
};