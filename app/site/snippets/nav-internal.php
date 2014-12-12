<?php foreach($pages->find('work', 'contact', 'about')->sortBy('num')->visible() as $page): ?>
    <a class="nav-link" href="<?php echo $page->url() ?>"><?php echo $page->title()->html() ?></a>
<?php endforeach; ?>
