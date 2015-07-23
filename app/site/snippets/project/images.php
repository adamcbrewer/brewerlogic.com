<?php foreach ($images as $image) : ?>

<figure class="figure figure--<?php echo $image->layout() ?>">
    <div class="project-image">
        <img src="<?php echo $image->image()->url() ?>" alt="<?php echo $image->image()->filename() ?>">
        <?php if (!$image->caption()->empty()) : ?><figcaption class="figure-caption"><?php echo $image->caption() ?></figcaption><?php endif; ?>
    </div>
</figure>

<?php endforeach; ?>
