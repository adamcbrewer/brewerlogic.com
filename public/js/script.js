;(function(window, document, undefined){

	window.Site = {
		basePath: document.body.getAttribute('data-base-url'),
		userAgent: navigator.userAgent,
		platform: navigator.platform
	};

	var b = document.documentElement;
	b.setAttribute("data-useragent", Site.userAgent);
	b.setAttribute("data-platform", Site.platform);


	// Dollar method
	// Returns an element by ID
	var $ = function (id) {
		return document.getElementById.apply(document, arguments);
	}

	// Bling-Bling method
	// Returns array of nodes found by QSA
	var $$ = function(selector) {
		return document.querySelectorAll.apply(document, arguments);
	}

	var toggles = $$('[data-toggle-target]'),
		i = 0;
	for ( i; i < toggles.length; i++ ) {
		toggles[i].addEventListener('click', function (evt) {
			console.log(evt.target);
		});
	}


}(window, document));
