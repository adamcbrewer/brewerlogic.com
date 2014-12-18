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

        <aside class="contain contain--narrow">
            <?php echo $page->status() ?>
        </aside>

    </header>

    <section class="section contain contain--features">

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

    <?php if ($site->showtweets() == 'true') : ?>

    <section class="section section--alt">
        <header class="section-header contain">
            <h2 class="section-title"><?php echo $page->sectionTitleThree() ?></h2>
        </header>

        <div id="tweets" class="u-flex u-flex--row u-flex--spacebetween u-flex--stretch contain">

        </div>

        <article id="tweet-template" class="tweet">
            <header class="tweet-header">
                <time datetime="" title="" class="tweet-time"></time>
            </header>
            <section class="tweet-body"></section>
        </article>

    </section>

    <?php endif; ?>

<?php snippet('footer') ?>

