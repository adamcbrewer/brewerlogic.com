<!doctype html>
<html class="no-js no-font <?php e($site->showtweets() == 'true', 'tweets-on', 'tweets-off') ?>">
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="p:domain_verify" content="29f15f009e351add5ca80ee07f6a3178"/>

    <title><?php echo $site->title() ?><?php if (!in_array($page->title(), array('Home'))) : ?> – <?php echo $page->title() ?><?php else : ?> | Web Development<?php endif; ?></title>

    <link rel="dns-prefetch" href="//www.google-analytics.com">
    <link rel="dns-prefetch" href="//ajax.googleapis.com">

    <meta name="author" content="Adam Brewer">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <meta name="description" content="<?php echo $site->description()->html() ?>">
    <meta name="keywords" content="<?php echo $site->keywords()->html() ?>">

    <meta property="og:type" content="website" />
    <meta property="og:url" content="<?php echo $site->url() ?>" />
    <meta property="og:title" content="<?php echo $site->title() ?>" />
    <meta property="og:image" content="<?php echo url('/assets/img/logo-og.png') ?>" />

    <?php if ($page->template() == 'project') : ?>
    <?php if ($page->hasPrevVisible()) : ?><link rel="prev" href="<?php echo $page->prevVisible()->url() ?>"><?php endif; ?>
    <?php if ($page->hasNextVisible()) : ?><link rel="next" href="<?php echo $page->nextVisible()->url() ?>"><?php endif; ?>
    <?php endif; ?>

    <script src="//ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js"></script>
    <script>
        WebFont.load({typekit: { id: 'qwc7wds' }});
    </script>

    <?php echo css('assets/css/styles.min.css'); ?>
    <?php echo js('assets/js/modernizr.min.js') ?>

</head>
<body class="page--<?php echo $page->template(); ?>" data-basepath="<?php echo $site->url() ?>">

    <header class="header f-futura">
        <div class="inner contain">
            <nav class="nav nav--pages">
                <?php snippet('nav-internal'); ?>
            </nav>
            <figure class="logo logo-main">
                <a href="<?php echo $site->url() ?>">
                    <?php snippet('icons/logo'); ?>
                </a>
            </figure>
            <nav class="nav nav--external">
                <?php snippet('nav-external'); ?>
            </nav>
        </div>
    </header>

    <section class="wrapper">

        <section class="content">

