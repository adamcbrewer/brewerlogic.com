<?php foreach($pages->find('work', 'contact', 'about')->sortBy('num')->visible() as $page): ?>
    <a class="nav-link" href="<?= $page->url() ?>"><?= $page->title()->html() ?></a>
<?php endforeach; ?>
