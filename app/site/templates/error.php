<?php snippet('header') ?>

    <div class="fourohfour">

        <?php if ($page->hasVideos() && $page->videos()) : ?>
        <div class="u-rv u-grain">
            <video src="<?php echo $page->videos()->first()->url() ?>" autoplay></video>
        </div>
        <?php endif; ?>

        <footer class="fourohfour-footer">
            <?php foreach ($page->buttons()->yaml() as $button) : ?>
            <a href="<?php echo $button['url'] ?>" class="btn btn--<?php echo $button['type'] ?>"><?php echo $button['title'] ?></a>&nbsp;
            <?php endforeach; ?>
        </footer>

    </div>

<?php snippet('footer') ?>
