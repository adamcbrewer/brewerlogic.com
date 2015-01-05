<?php snippet('header') ?>

    <article class="section section--alt project">

        <header class="section-header section-header--stroked contain">
            <p class="section-title"><?php echo $page->when() ?></p>
            <h1 class="title-main">
                <?php echo $page->title() ?>
            </h1>
        </header>

        <section class="contain contain--text">
            <header class="project-intro">
                <?php echo markdown($page->intro()) ?>
            </header>
            <?php if ($page->website() != "") : ?>
            <aside class="btn-group">
                <a href="<?php echo $page->website() ?>" class="btn btn--primary" target="_blank">View the website</a>
            </aside>
            <?php endif; ?>
        </section>

        <section class="contain project-images">

            <?php foreach ($page->images()->sortBy('sort', 'asc')->not('thumb.jpg', 'thumb.png', 'feature.jpg', 'feature.png') as $image) : ?>
                <article class="figure layout layout--<?php echo $image->layout() ?>">
                    <figure class="project-image">
                        <img src="<?php echo $image->url() ?>" alt="<?php echo $image->filename() ?>">
                        <?php if ($image->caption()) : ?>
                        <figcaption class="figure-caption"><?php echo $image->caption() ?></figcaption>
                        <?php endif; ?>
                    </figure>
                    <?php if ($image->description()) : ?>
                    <div class="contain contain--text figure-description"><?php echo $image->description() ?></div>
                    <?php endif; ?>
                </article>
            <?php endforeach; ?>

        </section>

        <footer class="project-footer contain contain--text">
            <?php echo markdown($page->signoff()) ?>
        </footer>

    </article>

<?php snippet('footer') ?>
