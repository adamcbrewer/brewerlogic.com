<?php snippet('header') ?>

        <header class="section-hero">

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

        <section class="contain">

            <ol class="featured-projects">

                <? foreach ($projects as $key => $project) : ?>

                    <? $img = $project->image('feature.jpg'); ?>
                    <? if ($img) : ?>

                        <li class="feature-item">
                            <figure class="feature-figure">
                                <img src="<?= $img->url() ?>" alt="<?= html($project->title()) ?>">
                            </figure>
                            <h2 class="feature-name">
                                <?= html($project->title()) ?>
                            </h2>
                        </li>

                    <? endif ;?>

                <? endforeach; ?>

            </ol>

        </section>

    </section>

<?php snippet('footer') ?>

