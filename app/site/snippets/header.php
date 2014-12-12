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
            <?php snippet('nav-internal'); ?>
        </nav>
        <figure class="logo logo-main">
            <a href="<?= $site->url() ?>">
                <img src="<?= url('/assets/img/logo.png') ?>" alt="Brewer Logic">
            </a>
        </figure>
        <nav class="nav nav--external">
            <?php snippet('nav-external'); ?>
        </nav>
    </header>

    <section class="wrapper">

        <section class="content">

