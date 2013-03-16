<? require("config.php"); ?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1,requiresActiveX=true">
	<meta name="author" content="">

	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title>Brewer Logic</title>

	<meta name="robots" content="all">

	<link type="text/plain" rel="author" href="humans.txt" />

	<meta name="description" content="The work of web developer, Adam Brewer">
	<meta name="keywords" content="brewerlogic, adamcbrewer, adam brewer, brewer logic, web-development, front-end developer, front end developer">

	<meta property="og:title" content="Brewer Logic"/>
	<meta property="og:type" content="Portfolio"/>
	<meta property="og:image" content="assets/img/logo_a.png"/>
	<meta property="og:url" content="http://brewerlogic.com"/>
	<meta property="og:site_name" content="Brewer Logic"/>
	<meta property="og:description" content="The work of web developer, Adam Brewer"/>

	<link href="assets/css/core.css" rel="stylesheet">

	<script type="text/javascript">
		// var _gaq = _gaq || [];
		// _gaq.push(['_setAccount', 'UA-31471338-1']);
		// _gaq.push(['_trackPageview']);
		// (function() {
		// 	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		// 	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		// 	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		// })();
	</script>

</head>
<body data-base-url="<?= $site_url; ?>">

	<div class="wrapper">

		<nav class="site-nav">

			<header class="header">
				<h1 class="logo"><a href="/" title="Brewer Logic">Brewer Logic</a></h1>
			</header>

			<div class="spinner">
				<div class="cube">
					<div class="side side-front"></div>
					<div class="side side-bottom"></div>
					<div class="side side-back"></div>
					<div class="side side-top"></div>
					<div class="side side-left"></div>
					<div class="side side-right"></div>
				</div>
			</div>

			<footer class="elsewhere">
				<a class="icon icon-twitter" href="http://twitter.com/adamcbrewer" target="_blank" title="Twitter"><span>Twitter</span></a>
				<a class="icon icon-github-circled" href="http://github.com/adamcbrewer" target="_blank" title="Github"><span>Github</span></a>
				<a class="icon icon-linkedin" href="http://za.linkedin.com/in/adamcbrewer" target="_blank" title="LinkedIn"><span>LinkedIn</span></a>
				<a class="icon icon-user" href="http://adamcbrewer.com" target="_blank" title="adamcbrewer.com"><span>adamcbrewer.com</span></a>
				<a class="icon icon-gplus" href="https://plus.google.com/u/0/109651434155076896860/" target="_blank" title="Google Plus"><span>Google +</span></a>
			</footer>

		</nav>

		<section class="detail"></section>

		<section class="content">

			<ul class="projectlist">

				<li class="projectlist-item" data-project="brewersdroop">
					<article>
						<h3 class="projectlist-title">Launchpad</h3>
					</article>
				</li>
				<li class="projectlist-item wide" data-project="brewersdroop">
					<article>
						<h3 class="projectlist-title">Brewers Droop</h3>
					</article>
				</li>
				<li class="projectlist-item wide">
					<article>
						<h3 class="projectlist-title">Somethting else</h3>
					</article>
				</li>
				<li class="projectlist-item"></li>
				<li class="projectlist-item"></li>
				<li class="projectlist-item wide"></li>
				<li class="projectlist-item"></li>
				<li class="projectlist-item"></li>
				<li class="projectlist-item"></li>
				<li class="projectlist-item wide"></li>
				<li class="projectlist-item"></li>
				<li class="projectlist-item wide"></li>
				<li class="projectlist-item"></li>
				<li class="projectlist-item"></li>

			</ul>

		</section>

	</div>

	<div>
		<? include('templates.php'); ?>
	</div>

	<script src="assets/js/libs/hogan-2.0.0.js"></script>
	<script src="assets/js/libs/zepto.js"></script>
	<script src="assets/js/script.js"></script>

</body>
</html>
