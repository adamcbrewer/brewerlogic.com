<!doctype html>
<html class="no-js no-font <?php e($site->showtweets() == 'true', 'tweets-on', 'tweets-off') ?>">
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title><?php echo $site->title() ?></title>

    <link rel="dns-prefetch" href="//www.google-analytics.com">

    <meta name="author" content="Adam Brewer">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="description" content="<?php echo $site->description()->html() ?>">
    <meta name="keywords" content="<?php echo $site->keywords()->html() ?>">

    <script>
        (function() {
            var config = {
                kitId: 'qwc7wds',
                scriptTimeout: 100
            };
            var h = document.getElementsByTagName('html')[0];
            h.className += ' wf-loading';
            var t = setTimeout(function() {
                h.className = h.className.replace(/(\s|^)wf-loading(\s|$)/g, ' ');
                h.className += ' wf-inactive';
            }, config.scriptTimeout);
            var d = false;
            var tk = document.createElement('script');
            tk.src = '//use.typekit.net/' + config.kitId + '.js';
            tk.type = 'text/javascript';
            tk.async = 'true';
            tk.onload = tk.onreadystatechange = function() {
                var rs = this.readyState;
                if (d || rs && rs != 'complete' && rs != 'loaded') return;
                d = true;
                clearTimeout(t);
                try { Typekit.load(config); } catch (e) {}
            };
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(tk, s);
        })();
    </script>

    <?php echo css('assets/css/styles.unprefixed.css') ?>
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

