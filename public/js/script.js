/**
 * Author:
 *
 */

// Semi-colon for concatenation safety
;(function(M, window, document, undefined){

	/**
	 * Name-spacing
	 *
	 * Here we have to specifially define which
	 * objects belong in the global object
	 *
	 */
	window.Site = {
		basePath: document.body.getAttribute('data-base-url'),
		userAgent: navigator.userAgent,
		platform: navigator.platform
	};


	/**
	 * User-agenct data-attributes
	 *
	 * Add a data-attribute of the user-agent to <html> - very useful and worthwhile
	 * Target with: html[data-useragent*="Chrome/13.0"][data-platform="Win32"]
	 *
	 */
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






}(Modernizr, window, document));
