<?php snippet('header') ?>

    <article class="section section--alt project">

        <header class="section-header section-header--stroked contain">
            <p class="section-title"><?php echo $page->when() ?></p>
            <h1 class="title-main">
                <?php echo $page->title() ?>
            </h1>
        </header>

        <section class="contain contain--text">
            <header class="project-intro u-textleft">
                <?php echo markdown($page->intro()) ?>
            </header>
            <?php if ($page->website() != "") : ?>
            <aside class="btn-group">
                <a href="<?php echo $page->website() ?>" class="btn btn--primary" target="_blank">View the website</a>
            </aside>
            <?php endif; ?>
        </section>

        <section class="contain project-images">

            <?php snippet('project/images', array('images' => $page->project_images())); ?>

        </section>

        <?php if ($page->signoff() != "") : ?>
        <footer class="project-footer contain contain--text u-textleft">
            <?php echo kirbyText($page->signoff()) ?>
        </footer>
        <?php endif; ?>

    </article>

<?php snippet('footer') ?>
