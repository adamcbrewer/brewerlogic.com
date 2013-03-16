<script type="text/html" id="tProject">
	<article class="project">
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
