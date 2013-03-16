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
			B.hazWork = true;
			B.checkReadyState();
		},

		readyGit: function (data) {
			// TODO
			B.hazGit = true;
			B.checkReadyState();
		},

		checkReadyState: function () {

			// console.log(this.hazGit);
			// console.log(this.hazWork);

		},

		open: function (projectName) {

			var project = this.work[projectName],
				html = this.projectTmpl.render(project);

			this.$detail.html(html);

			this.$body.addClass('detail-open');

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
			projectTmpl: $('#tProject').html()
		});


	});

}(window, document));
