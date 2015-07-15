<ol class="works contain">
    <?php foreach ($projects as $project) : ?>
    <li class="work">
        <figure class="work-thumb figurelink">
            <a href="<?php echo $project->url() ?>">
                <div class="btn" tabindex="-1"><?php echo $site->buttonView() ?></div>
                <img src="<?php echo $project->thumb()->url() ?>" alt="<?php echo $project->title(); ?>">
            </a>
        </figure>
        <section class="work-details">
            <h3 class="work-title"><a href="<?php echo $project->url() ?>"><?php echo $project->title(); ?></a></h3>
            <p class="work-summary"><?php echo $project->summary(); ?></p>
        </section>
    </li>
    <?php endforeach; ?>
</ol>
