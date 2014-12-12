<?php snippet('header') ?>

        <header class="section--hero">

            <div class="inner">
                <h1 class="title-hero">
                    <?php echo $page->text()->html(); ?>
                </h1>
                <div class="btn-group">
                    <a href="<?php echo $site->find('/work')->url() ?>" class="btn">View projects</a>
                    <a href="<?php echo $site->find('/about')->url() ?>" class="btn">Tell me more</a>
                </div>
            </div>

        </header>

        <section class="section contain">

            <header class="section-header">
                <h2 class="section-title"><?php echo $page->sectionTitleTwo() ?></h2>
            </header>

            <ol class="features">

                <? foreach ($projects as $key => $project) : ?>

                    <li class="feature">
                        <figure class="feature-figure">
                            <img src="<?php echo $project->images()->findBy('name', 'feature')->url() ?>" alt="<?php echo html($project->title()) ?>">
                        </figure>
                        <div>
                            <h3 class="feature-title"><?php echo html($project->title()) ?></h3>
                            <p class="feature-summary"><?php echo html($project->summary()) ?></p>
                        </div>
                    </li>

                <? endforeach; ?>

            </ol>

            <div class="btn-group">
                <a href="<?php echo $site->find('/work')->url() ?>" class="btn btn--primary">View all projects</a>
            </div>

        </section>

        <section class="section section--alternate">
            <header class="section-header contain">
                <h2 class="section-title"><?php echo $page->sectionTitleThree() ?></h2>
            </header>
        </section>

    </section>

<?php snippet('footer') ?>

