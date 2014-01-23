<?php require_once('config.php'); ?>
<!doctype html>
<html class="no-js" lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1,requiresActiveX=true">
	<meta name="author" content="Adam Brewer">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title>Brewer Logic</title>

	<meta name="robots" content="all">
	<link rel="shortcut icon" href="/assets/img/favicon.ico">

	<link type="text/plain" rel="author" href="/humans.txt" />

	<meta name="description" content="The work of web developer, Adam Brewer">
	<meta name="keywords" content="brewerlogic, adamcbrewer, adam brewer, brewer logic, web-development, front-end developer, front end developer">

	<meta property="og:title" content="Brewer Logic"/>
	<meta property="og:type" content="Portfolio"/>
	<meta property="og:image" content="/img/logo_a.png"/>
	<meta property="og:site_name" content="Brewer Logic"/>
	<meta property="og:description" content="The work of web developer, Adam Brewer"/>

	<link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700|Archivo+Narrow:400,700' rel='stylesheet' type='text/css'>
	<link href="/assets/css/core.css" rel="stylesheet">

	<script type="text/javascript">
		// var _gaq = _gaq || [];
		// _gaq.push(['_setAccount', "<?= $config['ga']; ?>"]);
		// _gaq.push(['_trackPageview']);
		// (function() {
		// 	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		// 	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		// 	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		// })();
	</script>

</head>
<body data-base-url="">

	<div class="wrapper">

		<header class="header cf">
			<h1 class="logo"><a href="/" title="Brewer Logic">Brewer Logic</a></h1>
			<nav class="nav">
				<a class="nav-link" href="http://github.com/adamcbrewer" target="_blank" title="Github">Github</a>
				<a class="nav-link" href="http://za.linkedin.com/in/adamcbrewer" target="_blank" title="LinkedIn">LinkedIn</a>
				<a class="nav-link" href="http://twitter.com/adamcbrewer" target="_blank" title="Twitter">Twitter</a>
				<a class="nav-link" href="#about">About</a>
				<a class="nav-link" href="mailto:adam@brewerlogic.com">Contact</a>
			</nav>
		</header>

		<section class="content">

			<section class="section portfolio">
				<ul>
					<? foreach ($projects as $project_name => $project) : ?>
						<li id="<?= $project_name; ?>" data-toggle-target="<?= $project_name; ?>" class="work-item">
							<article>
								<header class="work-item-header" data-toggle="<?= $project_name; ?>">
									<h2 class="work-item-title"><?= $project->title; ?></h2>
									<footer class="work-item-meta">
										// &nbsp; <? if (property_exists($project, 'website')) { ?><?= $project->website; ?>. <? } ?><time datetime="<?= $project->date; ?>"><?= $project->date; ?></time>. <?= $project->intro; ?><br>
									</footer>
								</header>
								<div class="work-detail">
									<section class="inner cf">
										<section class="work-desc">
											<p><?= implode('</p><p>', $project->description); ?></p>
										</section>
										<section data-view="images" class="work-pics"></section>
									</section>
								</div>
							</article>
						</li>
					<? endforeach; ?>
				</ul>
			</section>

			<section id="about" data-target="about" class="section about">
				<article class="inner">
					<figure class="ri">
						<img src="/assets/img/me.png" alt="Adam Brewer">
					</figure>
					<div class="copy">
						<p>
							Brewer Logic is the portfolio of web developer Adam Brewer.
						</p>
						<p>
							I'm a fervent front-end Web Developer and Webmaker whose passion lies in
							all things Javascript, HTML and CSS. I have a fairly comprehensive front-end
							skill set with some back-end experience as well. I'm always eager to learn
							anything new.
						</p>
						<p>
							I build semantic, mobile-responsive websites and apps optimised for both speed
							and performance, utilising good front-end practices and complying with modern
							web standards and features.
						</p>
						<p>
							Aside from the Internet, my other interests include running, reading, wine and Paleo food. I used to be
							an Aircraft Technician in the British Army so I have quite a few stories to tell!
						</p>
						<p>
							This site went through many trials and versions. I had some crazy ideas for it, but I realised simplicity
							will always be a sure thing. You can read more about the <a target="_blank" href="/humans.txt" title="humans">technical specs here</a>.
						</p>
					</div>
				</article>
			</section>

		</section>

		<div class="push"></div>
	</div>

	<footer class="footer">
		<span>&copy; Adam Brewer 2013</span>
	</footer>

	<script src="/assets/js/build.min.js"></script>
</body>
</html>

