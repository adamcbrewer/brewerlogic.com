<script type="text/html" id="tProject">
	<article class="project hide">
		<header>
		    <h2 class="project-title">{{& title }}</h2>
	    	<p class="project-description">{{& description }}</p>
	    </header>
	    <section class="project-imgs">
		    {{# img }}
		        <figure class="ri project-img">
		        	<img src="{{ src }}" alt="{{ alt }}" title="{{ title }}">
		        </figure>
		    {{/ img }}
	    </section>
	</article>
</script>

<script type="text/html" id="tFourZeroFour">
	<article class="project notfound hide">
		<h2 class="notfound-title">{{ title }}</h2>
		<cite class="notfound-cite">{{& cite }}</cite>
	</article>
</script>

<script type="text/html" id="tAbout">
	<article class="project about hide">
		<h2 class="about-title">{{& title }}</h2>
		<h3 class="about-blurb">{{& blurb }}</h3>
		<div class="about-description">{{& description }}</div>
	</article>
</script>
