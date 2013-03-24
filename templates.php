<script type="text/html" id="tProject">
	<article class="project hide">
		{{# pagination }}
			<nav class="pagination">
				{{# prev }}<a rel="prev" data-project="{{ prev.key }}" title="{{{ prev.title }}}" href="?project={{ prev.key }}">&#9664;</a>{{/ prev }}
				{{# next }}<a rel="next" data-project="{{ next.key }}" title="{{{ next.title }}}" href="?project={{ next.key }}">&#9654;</a>{{/ next }}
			</nav>
		{{/ pagination }}
		<header>
		    <h2 class="project-title">{{& title }}</h2>
		    {{# intro }}<h3 class="project-intro">{{& intro }}</h3>{{/ intro }}
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

<script type="text/html" id="tProjectlistItem">
	{{# work }}
		<li class="projectlist-item" title="{{{ title }}}" data-project="{{ key }}" style="background-image:url({{ thumb }})">
			<article>
				<h3 class="projectlist-title">{{{ title }}}</h3>
			</article>
		</li>
	{{/ work }}
</script>
