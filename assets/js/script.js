;(function(window, document, undefined){

	window.Site = {
		basePath: document.body.getAttribute('data-base-url'),
		userAgent: navigator.userAgent,
		platform: navigator.platform
	};

	var b = document.documentElement;
	b.setAttribute("data-useragent", Site.userAgent);
	b.setAttribute("data-platform", Site.platform);


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


	/**
	 * Your functions here
	 *
	 */
	var B = {

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


		pedalToTheMetal: function () {

			$.get(Site.basePath + '/portfolio.php', this.readyWork);

			var githubApi = "https://api.github.com/users/adamcbrewer/repos?callback=?&type=owner";
			$.getJSON(githubApi, this.readyGit);

		},


		readyWork: function (data) {
			B.work = data.work;
			B['404'] = data['404'];
			B.hazWork = true;
			B.checkReadyState();
		},

		readyGit: function (data) {
			// TODO
			B.hazGit = true;
			B.checkReadyState();
			B.relax();
		},

		checkReadyState: function () {

			// console.log(this.hazGit);
			// console.log(this.hazWork);

		},

		busy: function () {
			this.$body.addClass('busy');
		},

		relax: function () {
			this.$body.removeClass('busy');
		},

		open: function (projectName) {

			this.busy();

			var that = this,
				project = this.work[projectName],
				html = '';
			if (project) {
				html = this.projectTmpl.render(project);
			} else {
				var num = Math.floor(Math.random() * this['404'].length);
				html = this.fourZeroFourTmpl.render();//(this['404'][num]);
			}

			this.$detail.html(html);
			// this.$detail.find('.project').html(html);
			that.$body.addClass('detail-open');
			imagesLoaded(this.$detail[0], function () {
				that.relax();
				that.$detail.find('.project').removeClass('hide');
			});

		},

		close: function () {
			this.$body.removeClass('detail-open');
			this.$detail.html('');
			window.scrollTo(0, 0);
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

			this.hazWork = false;
			this.hazGit = false;

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
				B.open(projectName);
			});
			$body.on('keydown', function (evt) {
				var keycode = evt.keyCode;
				if (keycode === 27) B.close();
			});

			return this;

		}

	};



	Zepto(function($){

		B.vroom({
			body: $('body'),
			detail: $('.detail'),
			projectTmpl: $('#tProject').html(),
			fourZeroFourTmpl: $('#tFourZeroFour').html()
		});


	});

}(window, document));
