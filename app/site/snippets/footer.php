
    </section>

    <footer class="footer">

        <div class="footer-inner contain">
            <nav class="nav nav--footer f-futura">
                <?php foreach($pages->find('work', 'contact', 'about')->sortBy('num')->visible() as $page): ?>
                    <a class="nav-link" href="<?= $page->url() ?>"><?= $page->title()->html() ?></a>
                <?php endforeach; ?>
                <?php $external_links = array_slice($site->externallinks()->yaml(), 0, 3); ?>
                <?php foreach($external_links as $external_link) : ?>
                    <a class="nav-link" href="<?= $external_link['url'] ?>"><?= $external_link['title'] ?></a>
                <?php endforeach; ?>
            </nav>

            <aside>
                <?= $site->copyright()->kirbytext(); ?>
            </aside>
        </div>

    </footer>

    <div id="scripts">
        <!-- // <script src="assets/js/script.min.js"></script> -->
        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
            ga('create', '<?php echo $site->analytics(); ?>');
            ga('send', 'pageview');
        </script>
    </div>

</body>
</html>
