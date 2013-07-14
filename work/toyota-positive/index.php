<? include($_SERVER['DOCUMENT_ROOT'] . "/partials/header.php"); ?>
	<article class="work-item-single">
		<header class="work-item-header">
			<h1 class="work-item-title">Toyota Positive</h1>
			<footer>
				<time>January 2012</time><br />
				<a target="_blank" title="Toyota Positive" href="http://www.toyotapositive.com">toyotapositive.com</a>
			</footer>
		</header>
		<section class="work-desc">
			<p>
				Toyota Positive was a site built to promote the positive influence their new car
				was bringing to the environment.
			</p>
			<p>
				It was a fun site to make which was to showcase the individual stories from people who
				used the car to perform positive deeds. It was built to stand as both a web app and as
				an embedded YouTube gadget. The video player/carousel widget was the core feature of
				the site and the trickiest to implement. The video playlist in the main widget can be
				controlled through the images in the gallery, with each story able to be individually
				shared on both Twitter and Facebook as it cycles through.
			</p>
			<p>
				It was the first time I'd gotten my hands dirty with an iterative design/build process, not
				to mention integrating language support for multiple countries as well.
			</p>
		</section>

		<section class="work-pics">
			<figure class="ri">
				<img src="<?= $config->work ?>/toyota-positive/home01.jpg" alt="Homepage">
			</figure>
			<figure class="ri">
				<img src="<?= $config->work ?>/toyota-positive/home02.jpg" alt="Homepage - video playing">
			</figure>
			<figure class="ri">
				<img src="<?= $config->work ?>/toyota-positive/stories.jpg" alt="Positive Stories">
			</figure>
			<figure class="ri">
				<img src="<?= $config->work ?>/toyota-positive/video.jpg" alt="The video page">
			</figure>
			<figure class="ri">
				<img src="<?= $config->work ?>/toyota-positive/form.jpg" alt="The form">
			</figure>
		</section>

	</article>
<? include($_SERVER['DOCUMENT_ROOT'] . "/partials/footer.php"); ?>
