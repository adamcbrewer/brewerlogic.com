<? require($_SERVER['DOCUMENT_ROOT'] . "/config.php"); ?>
<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1,requiresActiveX=true">
	<meta name="author" content="Adam Brewer">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title>Brewer Logic</title>

	<meta name="robots" content="all">

	<link type="text/plain" rel="author" href="<?= $config->site_url; ?>/humans.txt" />

	<meta name="description" content="The work of web developer, Adam Brewer">
	<meta name="keywords" content="brewerlogic, adamcbrewer, adam brewer, brewer logic, web-development, front-end developer, front end developer">

	<meta property="og:title" content="Brewer Logic"/>
	<meta property="og:type" content="Portfolio"/>
	<meta property="og:image" content="<?= $config->site_url; ?>/assets/img/logo_a.png"/>
	<meta property="og:url" content="<?= $config->site_url; ?>"/>
	<meta property="og:site_name" content="Brewer Logic"/>
	<meta property="og:description" content="The work of web developer, Adam Brewer"/>

	<link href="<?= $config->site_url; ?>/assets/css/core.css" rel="stylesheet">

	<script src="<?= $config->site_url; ?>/assets/js/libs/modernizr.js"></script>

	<script type="text/javascript">
		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', "<?= $config->ga ?>"]);
		_gaq.push(['_trackPageview']);
		(function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();
	</script>

</head>
<body data-base-url="<?= $config->site_url; ?>">

	<div class="wrapper">

		<header class="header cf">
			<h1 class="logo"><a href="<?= $config->site_url ?>" title="Brewer Logic">Brewer Logic</a></h1>
		</header>

		<section class="content">
