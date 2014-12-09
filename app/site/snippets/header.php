<!doctype html>
<html class="no-js">
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title><?= $site->title() ?></title>

    <link rel="dns-prefetch" href="//www.google-analytics.com">

    <meta name="author" content="Adam Brewer">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="description" content="<?= $site->description()->html() ?>">
    <meta name="keywords" content="<?= $site->keywords()->html() ?>">

    <?= css('assets/css/styles.unprefixed.css') ?>
    <?= js('assets/js/modernizr.build.js') ?>

    <script src="//use.typekit.net/qwc7wds.js"></script>
    <script>try{Typekit.load();}catch(e){}</script>

</head>
<body>

    <header class="header contain f-futura">
        <nav class="nav nav--pages">
            <?php foreach($pages->find('work', 'contact', 'about')->sortBy('num')->visible() as $page): ?>
                <a class="nav-link<?php if ($page->isOpen()) : ?> is-active<?php endif; ?>" href="<?= $page->url() ?>"><?= $page->title()->html() ?></a>
            <?php endforeach ?>
        </nav>
        <figure class="logo logo-main">
            <img src="<?= url('/assets/img/logo.png') ?>" alt="Brewer Logic">
        </figure>
        <nav class="nav nav--external">
            <?php $external_links = array_slice($site->externallinks()->yaml(), 0, 3); ?>
            <?php foreach($external_links as $external_link) : ?>
                <a class="nav-link" href="<?= $external_link['url'] ?>"><?= $external_link['title'] ?></a>
            <?php endforeach; ?>
        </nav>
    </header>

    <section class="wrapper">

