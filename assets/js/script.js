/**
 * Author: Adam Brewer
 *
 */
;(function(window, document, undefined){

    /**
     * Name-spacing
     *
     * Here we have to specifially define which
     * objects belong in the global object
     *
     */
    window.Site = {
        basePath: document.body.getAttribute('data-base-url'),
        userAgent: navigator.userAgent,
        platform: navigator.platform
    };


    /**
     * User-agenct data-attributes
     *
     * Add a data-attribute of the user-agent to <html> - very useful and worthwhile
     * Target with: html[data-useragent*="Chrome/13.0"][data-platform="Win32"]
     *
     */
    var b = document.documentElement;
    b.setAttribute("data-useragent", Site.userAgent);
    b.setAttribute("data-platform", Site.platform);


    /**
     * Carousels
     *
     */
    $(".js-slick").slick({
        dots: true,
        cssEase: 'cubic-bezier(1.000, 0.000, 0.000, 1.000)',
        lazyLoad: 'ondemand',
        infinite: false
    });


    /**
     * Smooth Scrolling
     *
     */
    $('.js-smoothscroll').click(function () {
        $.smoothScroll({
            offset: 0,
            easing: 'easeInOutExpo',
            speed: 500,
            scrollTarget: this.href.slice(this.href.indexOf('#'))
        });
    });


    /**
     * Konamin Code!
     *
     */
    var konami = function(f,a){document.onkeyup=function(e){/113302022928$/.test(a+=[((e||self.event).keyCode-37)])&&f()}}
    konami(function () {
        var arnie = window.arnie = {};
        arnie.audio = document.createElement('audio');
        arnie.audio.src = Site.basePath + "/assets/audio/arnie.mp3";
        document.body.appendChild(arnie.audio);
        arnie.audio.play();
        arnie.img = document.createElement('img');
        arnie.img.src = Site.basePath + "/assets/img/arnie.png";
        arnie.img.classList.add('arnie');
        document.body.appendChild(arnie.img);
        setTimeout(function () {
            arnie.img.classList.add('show');
        }, 200);
    });

    console.info("@source: http://github.com/adamcbrewer/brewerlogic.com");
    console.info("This site is Konami code friendly");

}(window, document));
