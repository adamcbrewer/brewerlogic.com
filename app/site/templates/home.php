<?php snippet('header') ?>

        <header class="section--hero">

            <div class="inner">
                <h1 class="title-hero">
                    <?= $page->text()->html(); ?>
                </h1>
                <div class="btn-group">
                    <a href="#" class="btn">View projects</a>
                    <a href="#" class="btn">Tell me more</a>
                </div>
            </div>

        </header>

        <section class="section contain">

            <header class="section-title">
                <h2><?= $page->sectionTitleTwo() ?></h2>
            </header>

            <ol class="featured-projects">

                <? foreach ($projects as $key => $project) : ?>

                    <? $img = $project->image('feature.jpg'); ?>
                    <? if ($img) : ?>

                        <li class="feature-item">
                            <figure class="feature-figure">
                                <img src="<?= $img->url() ?>" alt="<?= html($project->title()) ?>">
                            </figure>
                            <h3 class="feature-name">
                                <?= html($project->title()) ?>
                            </h3>
                        </li>

                    <? endif ;?>

                <? endforeach; ?>

            </ol>

        </section>

        <section class="section section--alternate">
            <header class="section-title">
                <h2><?= $page->sectionTitleThree() ?></h2>
            </header>
        </section>

    </section>

<?php snippet('footer') ?>

