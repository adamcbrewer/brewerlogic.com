<? include($_SERVER['DOCUMENT_ROOT'] . "/partials/header.php"); ?>
	<article class="work-item-single">
		<header class="work-item-header">
			<h1 class="work-item-title">Cravendale Epic Straws</h1>
			<footer>
				<time>August 2012</time><br />
				<a target="_blank" title="Cravendale Epic Straws" href="http://epicstraws.co.uk">epicstraws.co.uk</a>
			</footer>
		</header>
		<section class="work-desc">
			<p>
				This site was vastly different than anything I had made before while working
				at Outside Line. The size of the assets, the traffic generated and the experience
				we tried to deliver was a massive challange. I was excited from day one!
			</p>
			<p>
				The site was very image heavy and the designer's intention was to deliver a skeuomorphic
				expereince following the brands' guidelines for the promotional straw sets that Cravendale
				were offering in exchange for colecting codes, which were printed and sold on bottles across
				the UK.
			</p>
			<p>
				Both the designer and I came up with an idea to simulate a 3 dimentional display of the straw
				sets using a series of images of each set, themselves modeled and rendered in 3D. The result was
				a combination of simple, 2D image replacement which gave an impressive, realistic 3D effect.
			</p>
			<p>
				Everything had to be built to give a complete expereince, meaning even the YouTube player UI
				had to be built from scratch. In our workflow we ran our images through PunyPNG image compression
				and used CodeKit to minify and compress all our Javascript and CSS, all of which was served through
				an Amazon S3 CDN.
			</p>
			<p>
				It was the biggest site, with regards to traffic, that I had the pleasure in working on,
				not to mention celebratory drinks afterwards.
			</p>
		</section>

		<section class="work-pics">
			<figure class="ri">
				<img src="<?= $config->work ?>/cravendale-epic-straws/homepage.jpg" alt="Homepage">
			</figure>
			<figure class="ri">
				<img src="<?= $config->work ?>/cravendale-epic-straws/products.jpg" alt="Products">
			</figure>
			<figure class="ri">
				<img src="<?= $config->work ?>/cravendale-epic-straws/redemption.jpg" alt="Redemption 01">
			</figure>
			<figure class="ri">
				<img src="<?= $config->work ?>/cravendale-epic-straws/redemption2.jpg" alt="Redemption 02">
			</figure>
			<figure class="ri">
				<img src="<?= $config->work ?>/cravendale-epic-straws/faq.jpg" alt="FAQ">
			</figure>
		</section>

	</article>
<? include($_SERVER['DOCUMENT_ROOT'] . "/partials/footer.php"); ?>
