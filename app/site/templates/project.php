<?php snippet('header') ?>

    <article class="section section--alternate project">

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
            <aside>
                <a href="<?php echo $page->website() ?>" class="project-website" title="<?php echo $page->title() ?>">View the website</a>
            </aside>
        </section>

        <section class="contain project-images">

            <?php foreach ($page->images()->sortBy('sort', 'asc')->not('thumb.jpg', 'thumb.png', 'feature.jpg', 'feature.png') as $image) : ?>
                <article class="project-figure">
                    <figure class="project-image">
                        <img src="<?php echo $image->url() ?>" alt="<?php echo $image->filename() ?>">
                        <?php if ($image->caption()) : ?>
                        <figcaption class="project-figure-caption"><?php echo $image->caption() ?></figcaption>
                        <?php endif; ?>
                    </figure>
                    <?php if ($image->description()) : ?>
                    <figcaption class="contain contain--text project-figure-description"><?php echo $image->description() ?></figcaption>
                    <?php endif; ?>
                </article>
            <?php endforeach; ?>

        </section>

        <footer class="project-footer contain contain--text">
            <?php echo markdown($page->signoff()) ?>
        </footer>

    </article>

<?php snippet('footer') ?>
