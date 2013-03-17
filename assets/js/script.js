;(function(window, document, undefined){

	window.Site = {
		basePath: document.body.getAttribute('data-base-url'),
		userAgent: navigator.userAgent,
		platform: navigator.platform
	};

	var b = document.documentElement;
	b.setAttribute("data-useragent", Site.userAgent);
	b.setAttribute("data-platform", Site.platform);


	String.prototype.queryToObj = function (strip) {

		strip = strip || false;
		var queryParams,
			query = '',
			obj = {},
			i = 0,
			l;

		if (typeof strip === 'string') {
			query = this.replace(strip, '');
		}

		queryParams = query.split('&'),
		l = queryParams.length;

		for (i; i<l; i++) {
			var params = queryParams[i].split('='),
			k = params[0],
			v = params[1];
			obj[k] = v;
		}
		return obj;
	};

	// function getVendorPrefix() {
	// 	var regex = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/;
	// 	var someScript = document.getElementsByTagName('script')[0],
	// 		prop;
	// 	for (prop in someScript.style) {
	// 		if (regex.test(prop)) {
	// 			// test is faster than match, so it's better to perform
	// 			// that on the lot and match only when necessary
	// 			return prop.match(regex)[0];
	// 		}
	// 	}

	// 	// Nothing found so far?
	// 	return '';
	// }

	// var transEndEventNames = {
	// 	'WebkitTransition' : 'webkitTransitionEnd',
	// 	'MozTransition'    : 'transitionend',
	// 	'OTransition'      : 'oTransitionEnd',
	// 	'msTransition'     : 'MSTransitionEnd',
	// 	'transition'       : 'transitionend'
	// },
	// transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ];



	var B = {

		/**
		 * Ignition
		 *
		 */
		vroom: function (args) {

			args = args || false;
			if (args === false) {
				console.error("Douchebag supplied false arguments");
				return;
			}

			this.kickTires(args)
				.lightFires()
				.pedalToTheMetal();

			return this;

		},


		/**
		 * After setup and events have been declared, now we're good
		 * to fetch/process anything else we need.
		 *
		 */
		pedalToTheMetal: function () {

			$.get(Site.basePath + '/portfolio.php', this.readyWork);

			var githubApi = "https://api.github.com/users/adamcbrewer/repos?callback=?&type=owner";
			$.getJSON(githubApi, this.readyGit);

		},


		/**
		 * Porfolio work from local script is ready
		 *
		 */
		readyWork: function (data) {
			B.work = data.work;
			B.about = data.about;
			B['404'] = data['404'];
			B.hazWork = true;
			B.checkReadyState();
		},


		/**
		 * Specific function that Git repos have been fetched and
		 *
		 */
		readyGit: function (data) {
			// TODO
			B.hazGit = true;
			B.checkReadyState();
		},


		/**
		 * Process anything that needs to happen only after
		 * we have gotten all our porfolio work and
		 * external API data
		 *
		 */
		checkReadyState: function () {

			if (this.hazWork) {

				this.relax();

				if (this.deeplink) {
					this.openProject(this.deeplink);
				} else if (this.search) {
					var search = this.parseSearch(this.search);
					if (search.page) {
						this.openPage(search.page);
					}
					if (search.project) {
						this.openProject(search.project);
					}
				}
			}

		},


		/**
		 * Show the site is busy with something
		 *
		 */
		busy: function () {
			this.$body.addClass('busy');
		},


		/**
		 * Simmier down now. Whatevs.
		 *
		 */
		relax: function () {
			this.$body.removeClass('busy');
		},

		openProject: function (projectName) {

			this.busy();

			var that = this,
				project = this.work[projectName],
				html = '';

			if (project) {
				html = this.projectTmpl.render(project);
				this.pushState('project', projectName);
			} else {
				var num = Math.floor(Math.random() * this['404'].length);
				html = this.fourZeroFourTmpl.render(this['404'][num]);
				this.pushState('page', '404');
			}

			this.$detail.html(html);

			that.$body.addClass('detail-open');
			imagesLoaded(this.$detail[0], function () {
				that.relax();
				that.$detail.find('.project').removeClass('hide');
			});

		},

		/**
		 * Open specic sections within the site
		 *
		 */
		openPage: function (page) {

			page = page || false;

			this.busy();

			var content = this[page],
				html = '';

			if (page === 'work') {
				this.close(); // return to the default state
				this.pushState(false);
			} else if (page === '404') {
				this.openProject('wat');
				this.pushState(false);
			} else {
				if (page === 'about') {
					html = this.aboutTmpl.render(content);
					this.$detail.html(html);
					this.$body.addClass('detail-open');
					this.$detail.find('.hide').removeClass('hide');
					this.pushState('page', page);
				}
			}

			this.relax();

		},


		close: function () {
			this.$body.removeClass('detail-open');
			this.$detail.find('.project').addClass('hide');
			this.$detail.html('');
			this.pushState(false);
			window.scrollTo(0, 0);
		},

		/**
		 * Swtiching between view layouts
		 *
		 */
		toggleView: function () {
			this.$body.toggleClass('listview');
		},


		parseSearch: function (search) {
			var searchObj = search.queryToObj('?');
			return searchObj;
		},

		/**
		 * API to push states to the browser history
		 *
		 */
		pushState: function (key, value) {

			if (this.hasPushstate) {
				// Check if we're pushing an empty state
				// to the browser (return to root).
				// Also accounts for slashes and stuff

				if (arguments[0] === false || arguments[0] === true ) {
					var path = Site.basePath;
					if (path.substr(-1,1) !== '/') path += '/';
					window.history.pushState(null, '', path);
					return;
				}

				var search = window.location.search,
					query = search.queryToObj('?'),
					k,
					isInHistory = false;

				// account for an empty query
				search += (search.indexOf('?') == -1) ? '?' : '';

				for (k in query) {
					var ownProp = query.hasOwnProperty(k);
					if (ownProp) {
						if (query[k] === value) {
							isInHistory = true;
							break;
						}
					}
				}

				if (!isInHistory) {
					search = '?' + key + '=' + value;
					var stateData = {};
					stateData[key] = value;
					window.history.pushState(stateData, search, search);
				}
			}


		},

		/**
		 * Additional setup stuff
		 *
		 */
		kickTires: function (args) {

			this.$body = args.body;
			this.$detail = args.detail;
			this.projectTmpl = Hogan.compile(args.projectTmpl);
			this.fourZeroFourTmpl = Hogan.compile(args.fourZeroFourTmpl);
			this.aboutTmpl = Hogan.compile(args.aboutTmpl);

			this.hazWork = false;
			this.hazGit = false;

			this.hasPushstate = !!(window.history && history.pushState);

			this.deeplink = args.deeplink;
			this.search = args.search;

			return this;

		},


		/**
		 * Events
		 *
		 */
		lightFires: function () {

			var $body = this.$body;

			// Events
			$body.on('click', '.projectlist-item', function (evt) {
				var target = this,
					projectName = target.getAttribute('data-project');
				B.openProject(projectName);
			});
			$body.on('keydown', function (evt) {
				var keycode = evt.keyCode;
				if (keycode === 27) B.close();
				if (keycode === 9) B.toggleView();
			});
			$body.on('click', '[data-open-page]', function (evt) {
				evt.preventDefault();
				var target = this,
					page = target.getAttribute('data-open-page');
				B.openPage(page);
			});

			// History API stuff
			if (this.hasPushstate) {
				window.onpopstate = function (evt) {
					if (window.location.search.indexOf('?') != -1) {
						// that.parseQuery();
					} else {
						// that.switchView(false, that.viewCont);
					}
				};
			}

			return this;

		}

	};



	Zepto(function($){

		var deeplink = false,
			hash = window.location.hash,
			windowSearch = window.location.search,
			search = {};

		// Default to hashbangs, which link directly to project work
		if (hash.length) {
			if (hash.indexOf('#!') !== -1) {
				hash = hash.replace('#!', '');
			} else {
				hash = hash.replace('#', '');
			}
			deeplink = hash.replace('/', '');
		// Otherwise we can perform an advanced lookup for something
		} else {
			if (windowSearch.length) {
				search = windowSearch;//.queryToObj('?');
			}
		}

		B.vroom({
			body: $('body'),
			detail: $('.detail'),
			projectTmpl: $('#tProject').html(),
			fourZeroFourTmpl: $('#tFourZeroFour').html(),
			aboutTmpl: $('#tAbout').html(),
			deeplink: deeplink,
			search: search
		});


	});

}(window, document));
