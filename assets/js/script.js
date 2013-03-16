;(function(window, document, undefined){

	window.Site = {
		basePath: document.body.getAttribute('data-base-url'),
		userAgent: navigator.userAgent,
		platform: navigator.platform
	};

	var b = document.documentElement;
	b.setAttribute("data-useragent", Site.userAgent);
	b.setAttribute("data-platform", Site.platform);


	/**
	 * Your functions here
	 *
	 */


	var $body = $('body');

	$body.on('click', '.projectlist-item', function (evt) {
		$body.addClass('detail-open');
	});

	$body.on('keydown', function (evt) {
		var keycode = evt.keyCode;
		if (keycode === 27) $body.removeClass('detail-open');
	});


}(window, document));
