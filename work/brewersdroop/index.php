<? include($_SERVER['DOCUMENT_ROOT'] . "/partials/header.php"); ?>
	<article class="work-item-single">
		<header class="work-item-header">
			<h1 class="work-item-title">Brewers Droop</h1>
			<footer>
				<time>August 2011</time><br />
				<a target="_blank" title="brewersdroop.co.za" href="http://brewersdroop.co.za">brewersdroop.co.za</a>
			</footer>
		</header>
		<section class="work-desc">
			<p>
				The Brewers Droop is a blog of tales and quips of Chris Brewer
				whose origins started as a monthly letter sent out to subscribers
				by mail.
			</p>
			<p>
				I built the site for my Dad to stop him pestering me for a blog. It
				was purely coincedental that at the time I wanted to learn how to use WordPress
				properly and also experiment with building a responsive site. I also seemed to
				be going through a MooTools phase at the time.
			</p>
			<p>
				<a target="_blank" title="Studio Brewer" href="http://studiobrewer.com">My older bother</a> designed the site and we launched it over may pints of Guinness
				and several bottles of wine.
			</p>
		</section>

		<section class="work-pics">
			<figure class="ri">
				<img src="<?= $config->work ?>/brewersdroop/devices.jpg" alt="Devices">
			</figure>
			<figure class="ri">
				<img src="<?= $config->work ?>/brewersdroop/home.jpg" alt="Home page">
			</figure>
			<figure class="ri">
				<img src="<?= $config->work ?>/brewersdroop/singledroop.jpg" alt="Single Droop">
			</figure>
			<figure class="ri">
				<img src="<?= $config->work ?>/brewersdroop/about.jpg" alt="About">
			</figure>
		</section>

	</article>
<? include($_SERVER['DOCUMENT_ROOT'] . "/partials/footer.php"); ?>
