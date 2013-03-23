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
			B.renderWork(data);
			B.hazWork = true;
			B.checkReadyState();
		},

		renderWork: function (data) {

			data.type = 'wide';
			var html = this.projectlistItemTmpl.render(data);
			this.$projectList.append(html);

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
		 * Simmer down now.
		 *
		 */
		relax: function () {
			this.$body.removeClass('busy');
		},


		/**
		 * Opening a project...start to finish
		 */
		openProject: function (projectName) {

			this.busy();

			var that = this,
				project,
				html = '',
				pagination = {},
				pagingHtml = false;

			if ( this.currentProject && ( projectName === 'prev' || projectName === 'next' ) ) {
				// TODO - breaks if there's no prev/next item
				if (projectName === 'prev' && this.currentProject.pagination.prev) this.openProject(this.currentProject.pagination.prev.key);
				if (projectName === 'next' && this.currentProject.pagination.next) this.openProject(this.currentProject.pagination.next.key);
				return;
			} else {
				project = this.findProject(projectName);
			}

			if (project) {
				html = this.projectTmpl.render(project);
				this.pushState('project', projectName);
				this.currentProject = project;
			} else {
				var num = Math.floor(Math.random() * this['404'].length);
				html = this.fourZeroFourTmpl.render(this['404'][num]);
				this.pushState('page', '404');
			}

			this.$detail.html(html);

			if (!that.$body.hasClass('detail-open')) {
				that.$body.addClass('detail-open');
			}
			imagesLoaded(this.$detail[0], function () {
				that.relax();
				that.$detail.find('.project').removeClass('hide');
			});

		},


		/**
		 * find the paginated projects
		 *
		 */
		paginate: function (i) {

			var pagination = {},
				prev, next;

			if (typeof i === 'number') {
				prev = this.work[i - 1];
				next = this.work[i + 1];
			}
			if (prev) pagination.prev = prev;
			if (next) pagination.next = next;

			return pagination;

		},


		/**
		 * Yer
		 *
		 */
		findProject: function (key) {

			var i = 0,
				projects = this.work,
				project = false;

			loop:
			for (i; i < projects.length; i++) {
				if (projects[i].key === key) {
					project = projects[i];
					project.pagination = this.paginate(i);
					break loop;
				}
			}

			return project;

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
				this.openProject(null);
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

			this.updatePageNav(page);

		},


		/**
		 * The site page-nav. Here be the logic that updates it.
		 *
		 */
		updatePageNav: function (page) {

			var links = this.$pageNav.find('a');
			links.removeClass('current');
			if (typeof page === 'string') {
				links.filter('[data-open-page="'+page+'"]').addClass('current');
			} else {
				links.filter('[data-open-page="work"]').addClass('current');
			}

		},


		/**
		 * Close all states and clean up
		 *
		 */
		close: function () {
			this.$body.removeClass('detail-open');
			this.$detail.find('.project').addClass('hide');
			this.$detail.html('');
			this.pushState(false);
			this.updatePageNav(false);
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
			var searchObj;
			if (typeof search === 'string') {
				searchObj = search.queryToObj('?');
			} else {
				searchObj = search;
			}
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
			this.$pageNav = args.pageNav;
			this.$projectList = args.projectList;

			this.projectTmpl = Hogan.compile(args.projectTmpl);
			this.fourZeroFourTmpl = Hogan.compile(args.fourZeroFourTmpl);
			this.aboutTmpl = Hogan.compile(args.aboutTmpl);
			this.projectlistItemTmpl = Hogan.compile(args.projectlistItemTmpl);

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
			$body.on('click', '[data-project]', function (evt) {
				evt.preventDefault();
				var target = this,
					projectName = target.getAttribute('data-project');
				B.openProject(projectName);
			});
			this.$pageNav.find('.nav-select').on('change', function(evt) {
				var i = this.selectedIndex,
					page = this.options[i].getAttribute('data-open-page');
				B.openPage(page);
			});

			// Fun times
			// Konami code with jQuery.
			// Source: http://paulirish.com/2009/cornify-easter-egg-with-jquery/
			var kkeys = [],
				konami = "38,38,40,40,37,39,37,39,66,65";

			$body.on('keydown', function (evt) {
				var keycode = evt.keyCode;
				kkeys.push( evt.keyCode );
				if ( kkeys.toString().indexOf( konami ) >= 0 ) {
					$(document).unbind('keydown', arguments.callee);
					console.log('KONAMI!');
				}
				if (keycode === 27) B.close();
				if (keycode === 9) B.toggleView();
				if (keycode === 37) B.openProject('prev');
				if (keycode === 39) B.openProject('next');
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
				search = windowSearch;
			}
		}


		B.vroom({
			body: $('body'),
			detail: $('.detail'),
			projectList: $('.projectlist'),
			pageNav: $('.nav'),
			projectTmpl: $('#tProject').html(),
			fourZeroFourTmpl: $('#tFourZeroFour').html(),
			aboutTmpl: $('#tAbout').html(),
			projectlistItemTmpl: $('#tProjectlistItem').html(),
			deeplink: deeplink,
			search: search
		});


	});

}(window, document));
