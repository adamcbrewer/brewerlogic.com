<!doctype html>
<html class="no-js no-font <?php e($site->showtweets() == 'true', 'tweets-on', 'tweets-off') ?>">
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title><?php echo $site->title() ?></title>

    <link rel="dns-prefetch" href="//www.google-analytics.com">
    <link rel="dns-prefetch" href="//ajax.googleapis.com">

    <meta name="author" content="Adam Brewer">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="description" content="<?php echo $site->description()->html() ?>">
    <meta name="keywords" content="<?php echo $site->keywords()->html() ?>">

    <script src="//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js"></script>
    <script>
        WebFont.load({typekit: { id: 'qwc7wds' }});
    </script>

    <?php echo css('assets/css/styles.prefixed.css') ?>
    <?php echo js('assets/js/modernizr.build.js') ?>

</head>
<body data-basepath="<?php echo $site->url() ?>">

    <header class="header contain f-futura">
        <nav class="nav nav--pages">
            <?php snippet('nav-internal'); ?>
        </nav>
        <figure class="logo logo-main">
            <a href="<?php echo $site->url() ?>">
                <img src="<?php echo url('/assets/img/logo.png') ?>" alt="Brewer Logic">
            </a>
        </figure>
        <nav class="nav nav--external">
            <?php snippet('nav-external'); ?>
        </nav>
    </header>

    <section class="wrapper">

        <section class="content">

