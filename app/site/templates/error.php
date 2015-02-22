<?php snippet('header') ?>

    <div class="fourohfour">

        <?php if ($page->hasVideos() && $page->videos()) : ?>
        <div class="u-rv u-grain">
            <video src="<?php echo $page->videos()->first()->url() ?>" autoplay></video>
        </div>
        <?php endif; ?>

        <footer class="fourohfour-footer">
            <a href="<?php echo $site->url() ?>" class="btn btn--primary">Continue</a> &nbsp; <a href="<?php echo $site->url() ?>" class="btn">Exit</a>
        </footer>

    </div>

<?php snippet('footer') ?>
