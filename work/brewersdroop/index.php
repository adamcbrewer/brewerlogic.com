<? include($_SERVER['DOCUMENT_ROOT'] . "/partials/header.php"); ?>
	<article>
		<header>
			<h1 class="work-item-header">Brewers Droop</h1>
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
				My older bother designed the site and we launched it over may pints of Guinness
				and several bottles of wine.
			</p>
		</section>
		<footer>
			<time>&mdash; August 2011</time>
		</footer>

		<section class="work-pics">
			<figure class="ri">
				<img src="<?= $config->work ?>/brewersdroop/devices.png" alt="Devices">
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
