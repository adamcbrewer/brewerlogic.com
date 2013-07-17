<? include($_SERVER['DOCUMENT_ROOT'] . "/partials/header.php"); ?>
	<section class="section portfolio">
		<header class="section-header">
			<h1>Work</h1>
		</header>
		<ul>
			<li class="work-item">
				<h2 class="work-item-title"><a class="work-link" href="<?= $config->work ?>/lovecravendale">Love Cravendale</a></h2>
				<footer class="work-item-meta">
					<time>June 2013</time> &mdash; Loyalty scheme web app.
				</footer>
			</li>
			<li class="work-item">
				<h2 class="work-item-title"><a class="work-link" href="<?= $config->work ?>/toyota-positive">Toyota Positive</a></h2>
				<footer class="work-item-meta">
					<time>January 2013</time> &mdash; Inspiring uplifting gestures and selfless acts.
				</footer>
			</li>
			<li class="work-item">
				<h2 class="work-item-title"><a class="work-link" href="<?= $config->work ?>/cravendale-epic-straws">Cravendale Epic Straws</a></h2>
				<footer class="work-item-meta">
					<time>October 2012</time> &mdash; Loyalty app/scheme.
				</footer>
			</li>
			<li class="work-item">
				<h2 class="work-item-title"><a class="work-link" href="<?= $config->work ?>/brewersdroop">Brewers Droop</a></h2>
				<footer class="work-item-meta">
					<time>August 2011</time> &mdash; Responsive blog.
				</footer>
			</li>
			<? /* not curated yet
			<li class="work-item">
				<h2 class="work-item-title"><a class="work-link" href="<?= $config->work ?>/brewers-droop">Virgin Galactic</a></h2>
				<footer class="work-item-meta">
					<time>Novemeber 2012</time> &mdash; Virgin Galactic. Mobile website.
				</footer>
			</li>
			<li class="work-item">
				<h2 class="work-item-title"><a class="work-link" href="<?= $config->work ?>/brewers-droop">8 Bit Office</a></h2>
				<footer class="work-item-meta">
					<time>August 2012</time> &mdash; A personal, realtime project using Node.js.
				</footer>
			</li>
			*/ ?>
		</ul>
	</section>
<? include($_SERVER['DOCUMENT_ROOT'] . "/partials/footer.php"); ?>
