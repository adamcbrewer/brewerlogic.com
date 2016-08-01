<ol class="works contain">
    <?php foreach ($projects as $project) : ?>
    <li class="work">
        <figure class="work-thumb figure-link">
            <a class="figure-link__link" href="<?php echo $project->url() ?>">
                <div class="figure-link__clip">
                    <div class="btn" tabindex="-1"><?php echo $site->buttonView() ?></div>
                    <img src="<?php echo $project->thumb()->url() ?>" alt="<?php echo $project->title(); ?>">
                </div>
            </a>
        </figure>
        <section class="work-details">
            <h3 class="work-title"><a href="<?php echo $project->url() ?>"><?php echo $project->title(); ?></a></h3>
            <p class="work-summary"><?php echo $project->summary(); ?></p>
        </section>
    </li>
    <?php endforeach; ?>
</ol>
