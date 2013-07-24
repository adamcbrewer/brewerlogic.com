;(function(window, document, undefined){

	window.Site = {
		basePath: document.body.getAttribute('data-base-url'),
		userAgent: navigator.userAgent,
		platform: navigator.platform
	};

	var b = document.documentElement;
	b.setAttribute("data-useragent", Site.userAgent);
	b.setAttribute("data-platform", Site.platform);


	// Better (faster) touch event handling
	var clickEventType = ('ontouchstart' in window ? 'touchend' : 'click');


	/**
	 * Converts a URL query string to a javascript object
	 *
	 * @author Adam Brewer - @adamcbrewer - adamcbrewer.com
	 *
	 *		Usage: "?test=true&something=false".queryToObj(?);
	 *
	 *		Output: {test: true, something: false}
	 *
	 */
	String.prototype.queryToObj = function (strip) {
		strip = strip || '?';
		var string = this.replace(strip, ''),
			obj = {},
			queryParams = string.split('&'),
			i = 0,
			l = queryParams.length;
			for (i; i < l; i++) {
				var params = queryParams[i].split('='),
				k = params[0],
				v = params[1];
				obj[k] = v;
			}
		return obj;
	};


	/**
	 * Selector engine
	 *
	 */
	// Dollar method. Returns an element by ID
	var $ = function (id) {
		return document.getElementById.apply(document, arguments);
	};
	// Bling-Bling method. Returns array of nodes found by QSA
	var $$ = function(selector) {
		return document.querySelectorAll.apply(document, arguments);
	};



	/**
	 * Vars, gotta 'ave 'em!
	 *
	 */
	var toggles = $$('[data-toggle]'),
		toggleTargets = $$('[data-toggle-target]'),
		toggleAbout = $$('[data-toggle-about]'),
		targetAbout = $$('[data-target="about"]'),
		workItems = $$('.work-item'),
		i = 0;



	/**
	 * Keyboard events to remove/close anything we might want
	 *
	 */
	document.addEventListener('keyup', function (evt) {
		if ( evt.keyCode === 27 ) {
			closeOthers(null);
			if (supportsHistoryApi()) history.pushState({}, null, Site.basePath + "/");  // clear the history
			if ( window.arnie && window.arnie.audio ) {
				arnie.audio.parentNode.removeChild(arnie.audio);
				arnie.img.parentNode.removeChild(arnie.img);
			}
		}
	});



	/**
	 * Toggling the about section
	 *
	 */
	toggleAbout[0].addEventListener(clickEventType, function (evt) {
		evt.preventDefault();
		targetAbout[0].classList.toggle('closed');
		if ( targetAbout[0].classList.contains('closed') ) closeOthers(null);
	});


	/**
	 * Event listeners for toggling view states on portfolio items
	 *
	 */
	for ( i; i < toggles.length; i++ ) {
		toggles[i].addEventListener(clickEventType, function (evt) {
			if ( evt.target.href ) return; // don't do anything if we're clikcing links
			var target = this.getAttribute('data-toggle');
			openProject( target );
		});
	}


	/**
	 * History popstate listeners
	 *
	 */
	if ( supportsHistoryApi() ) {
		window.onpopstate = function (evt) {
			evt.preventDefault();
			var state = evt.state;
			if ( state && state.target ) {
				openProject( state.target );
			}
		}
	}


	/**
	 * Close all the sections when the page has loaded
	 *
	 */
	i = 0;
	for (i; i < workItems.length; i++ ) {
		workItems[i].classList.add('closed');
	}


	/**
	 * Open a project based on the target attr which
	 * is based off the projects.js object in settings
	 *
	 */
	function openProject ( target ) {
		var targetEl = $$('[data-toggle-target="'+target+'"]')[0];
		// load in images if we're opening for the first time
		// and only open te section when that's happened
		if ( targetEl.classList.contains('closed') && ! targetEl.classList.contains('images-loaded') ) {
			targetEl.classList.add('loading');
			loadImages(target, targetEl, function () {
				targetEl.classList.add('images-loaded');
				targetEl.classList.remove('loading');
			});
		}
		targetEl.classList.toggle('closed');
		closeOthers(targetEl);
		if (supportsHistoryApi()) history.pushState({ target: target }, target, Site.basePath + "?project=" + target);
	};


	function closeOthers ( avoidEl ) {
		var i = 0;
		for ( i; i < toggleTargets.length; i++ ) {
			var targetEl = toggleTargets[i];
			if ( targetEl != avoidEl ) targetEl.classList.add('closed');
		}
		// close the about section
		targetAbout[0].classList.add('closed');

		if (window.scroll) window.scroll(0, avoidEl.offsetTop);
	};


	/**
	 * load in the images for a project if opened for the first time
	 *
	 */
	function loadImages ( target, container, callback ) {
		Zepto.get('/projects/' + target, function (resp) {
			var imgCont = container.querySelectorAll('[data-view="images"]')[0]
			imgCont.innerHTML = resp;
			ImagesLoaded( imgCont ).done(callback);
		});
	};


	/**
	 * load the linked project on window load
	 *
	 */
	if ( window.onload === null ) {
		window.onload = function () {
			var queryString = window.location.search || null;
			if ( queryString && queryString.length ) {
				var query = queryString.queryToObj('?');
				if ( query.project ) openProject(query.project);
			}
		}
	}


	/**
	 * if browser haz History API
	 *
	 */
	function supportsHistoryApi () {
		return !! (window.history && history.pushState);
	}


	/**
	 * Konamin Code!
	 *
	 */
	var konami = function(f,a){document.onkeyup=function(e){/113302022928$/.test(a+=[((e||self.event).keyCode-37)])&&f()}}
	konami(function () {
		var arnie = window.arnie = {};
		arnie.audio = document.createElement('audio');
		arnie.audio.src = Site.basePath + "/audio/arnie.mp3";
		document.body.appendChild(arnie.audio);
		arnie.audio.play();
		arnie.img = document.createElement('img');
		arnie.img.src = Site.basePath + "/img/arnie.png";
		arnie.img.classList.add('arnie');
		document.body.appendChild(arnie.img);
		setTimeout(function () {
			arnie.img.classList.add('show');
		}, 200);
	});

	console.info("If you've found this you probably know what you're doing. Be sure to check out the humans.txt file for a technical breakdown of this site.");
	console.info("Also, give the Konami code a whirl and turn the volume up!");
	console.info("Konami Code - ↑ ↑ ↓ ↓ ← → ← → B A");

}(window, document));
