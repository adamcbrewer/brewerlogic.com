<ol class="features">

    <?php foreach ($projects as $project) : ?>

        <li class="feature">
            <figure class="feature-figure figurelink">
                <a href="<?php echo $project->url() ?>">
                    <div class="btn" tabindex="-1"><?php echo $site->buttonView() ?></div>
                    <img src="<?php echo $project->feature()->url() ?>" alt="<?php echo html($project->title()) ?>">
                </a>
            </figure>
            <div>
                <h3 class="feature-title">
                    <a href="<?php echo $project->url() ?>"><?php echo html($project->title()) ?></a>
                </h3>
                <p class="feature-summary"><?php echo html($project->summary()) ?></p>
            </div>
        </li>

    <?php endforeach; ?>

</ol>
