<?php snippet('header') ?>

    <article class="section section--alt section--yank">

        <header class="section-header section-header--stroked contain">
            <p class="section-title">Oops, I think we're lost</p>
            <h1 class="title-main">
                <?php echo $page->title() ?>
            </h1>
        </header>

    </article>

    <div class="contain">
        <figure class="figure figure--alt figure--about section">
            <img src="<?php echo $page->images()->findBy('name', 'error')->url() ?>">
        </figure>
    </div>

    <section class="section contain contain--narrow">

        <div class="u-textleft">
            <?php echo kirbytext($page->text()) ?>
        </div>

    </section>

<?php snippet('footer') ?>
