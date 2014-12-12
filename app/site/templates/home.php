<?php snippet('header') ?>

        <header class="section--hero">

            <div class="inner">
                <h1 class="title-hero">
                    <?= $page->text()->html(); ?>
                </h1>
                <div class="btn-group">
                    <a href="<?= $site->find('/work')->url() ?>" class="btn">View projects</a>
                    <a href="<?= $site->find('/about')->url() ?>" class="btn">Tell me more</a>
                </div>
            </div>

        </header>

        <section class="section contain">

            <header class="section-title">
                <h2><?= $page->sectionTitleTwo() ?></h2>
            </header>

            <ol class="features">

                <? foreach ($projects as $key => $project) : ?>

                    <? $img = $project->image('feature.jpg'); ?>
                    <? if ($img) : ?>

                        <li class="feature">
                            <figure class="feature-figure">
                                <img src="<?= $img->url() ?>" alt="<?= html($project->title()) ?>">
                            </figure>
                            <div>
                                <h3 class="feature-title"><?= html($project->title()) ?></h3>
                                <p class="feature-summary"><?= html($project->summary()) ?></p>
                            </div>
                        </li>

                    <? endif ;?>

                <? endforeach; ?>

            </ol>

            <div class="btn-group">
                <a href="<?= $site->find('/work')->url() ?>" class="btn btn--primary">View all projects</a>
            </div>

        </section>

        <section class="section section--alternate">
            <header class="section-title">
                <h2><?= $page->sectionTitleThree() ?></h2>
            </header>
        </section>

    </section>

<?php snippet('footer') ?>

