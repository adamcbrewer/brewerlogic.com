<script type="text/html" id="tProject">
	<article class="project hide">
		<aside class="project-description">
		    <h2 class="project-title">{{ title }}</h2>
	    	<p>{{ description }}</p>
	    </aside>
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
		<h2 class="notfound-title">404</h2>
		<cite class="notfound-cite">Empty your mind, be formless, shapeless &mdash; like water. Now you put water in a cup, it becomes the cup; You put water into a bottle it becomes the bottle; You put it in a teapot it becomes the teapot. Now water can flow or it can crash. <strong>Be water, my friend</strong>.<br />
			<br />
			&mdash; <a href='http://en.wikiquote.org/wiki/Bruce_Lee' target='_blank'>Bruce Lee</a></cite>
	</article>
</script>
