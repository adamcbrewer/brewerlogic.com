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

</head>
<body>

    <section class="wrapper">

