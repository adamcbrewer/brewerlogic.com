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



	var toggles = $$('[data-toggle]'),
		toggleTargets = $$('[data-toggle-target]'),
		toggleAbout = $$('[data-toggle-about]'),
		targetAbout = $$('[data-target="about"]'),
		workItems = $$('.work-item'),
		i = 0;



	document.addEventListener('keyup', function (evt) {
		if ( evt.keyCode === 27 ) {
			closeOthers(null);
			if ( window.arnie.audio ) {
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
			var target = this.getAttribute('data-toggle'),
				targetEl = $$('[data-toggle-target="'+target+'"]')[0];
			// load in images if we're opening for the first time
			// and only open te section when that's happened
			if ( targetEl.classList.contains('closed') && ! targetEl.classList.contains('images-loaded') ) {
				targetEl.classList.add('loading');
				setTimeout(function () {
					loadImages(target, targetEl, function () {
						targetEl.classList.add('images-loaded');
						targetEl.classList.remove('loading');
					});
				}, 2000);
			} else {

			}
			targetEl.classList.toggle('closed');
			// window.location.hash = targetEl.id;
			closeOthers(targetEl);
		});
	}


	/**
	 * Close all the sections when the page has loaded
	 *
	 */
	i = 0;
	for (i; i < workItems.length; i++ ) {
		workItems[i].classList.add('closed');
	}



	function closeOthers ( avoidEl ) {
		var i = 0;
		for ( i; i < toggleTargets.length; i++ ) {
			var targetEl = toggleTargets[i];
			if ( targetEl != avoidEl ) targetEl.classList.add('closed');
		}
		// close the about section
		targetAbout[0].classList.add('closed');
	};


	function loadImages ( target, container, callback ) {
		Zepto.get('/projects/' + target, function (resp) {
			var imgCont = container.querySelectorAll('[data-view="images"]')[0]
			imgCont.innerHTML = resp;
			ImagesLoaded( imgCont ).done(callback);
		});
	};

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

	console.log('↑ ↑ ↓ ↓ ← → ← → B A … It\'s showtime!');

}(window, document));
