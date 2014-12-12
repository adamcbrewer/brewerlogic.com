<?php snippet('header') ?>

    <section class="section section--alternate">

        <header class="section-header contain">
            <h2 class="section-title"><?php echo $page->sectionTitleOne() ?></h2>
            <h1 class="title-main"><?php echo $page->header() ?></h1>
        </header>

        <ol>
            <?php foreach ($page->children()->visible() as $project) : ?>
            <li>
                <figure>
                    <img src="<?php echo $project->image('thumb.jpg')->url() ?>" alt="<?php echo $project->title(); ?>">
                </figure>
                <h3><?php echo $project->title(); ?></h3>
            </li>
            <?php endforeach; ?>
        </ol>

    </section>

<?php snippet('footer') ?>

