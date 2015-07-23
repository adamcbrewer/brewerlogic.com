<?php snippet('header') ?>

    <section class="section section--alt">

        <header class="section-header contain">
            <h2 class="section-title"><?php echo $page->sectionTitleOne() ?></h2>
            <h1 class="title-main"><?php echo $page->header() ?></h1>
        </header>

        <?php snippet('work/list', array('projects' => $projects)); ?>

    </section>

<?php snippet('footer') ?>

