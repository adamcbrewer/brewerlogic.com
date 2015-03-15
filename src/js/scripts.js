;(function(window, document, undefined){

    'use strict';

    /**
     * Name-spacing
     */
    window.Site = {
        basePath: document.body.getAttribute('data-basepath'),
        userAgent: navigator.userAgent,
        platform: navigator.platform
    };


    /**
     * Detecting if tweets are turned on and creating
     * a template form the original DOM element.
     *
     */
    var tweetsOn = false;
    var htmlEl = document.documentElement;
    // Template and container nodes
    var $tweetContainer = document.getElementById('tweets');
    var $templateOriginal = document.getElementById('tweet-template');
    if ($templateOriginal) {
        var $template = $templateOriginal.cloneNode(true);
        var frag = document.createDocumentFragment();
        // remove the template from the DOM
        $templateOriginal.parentNode.removeChild($templateOriginal);
    }

    if (htmlEl.classList && htmlEl.classList.toString().indexOf('tweets-on') != -1) {
        tweetsOn = true;
    }


    /**
     * Twitter Updates
     *
     */
    var request = new XMLHttpRequest();
    request.open('GET', Site.basePath + '/api/twitter', true);

    request.onload = function() {

        if ($tweetContainer) $tweetContainer.classList.remove('is-busy');

        if (request.status >= 200 && request.status < 400){

            var resp = JSON.parse(request.responseText);
            var tweets = resp.tweets;

            if (!tweets) return;

            var filter = resp.filter || false;
            var x = 0;

            var $tweet = document.createElement('div');

            for (x; x < tweets.length; x++) {
                $tweet = new Tweet(tweets[x], $template, filter, resp.screen_name);
                frag.appendChild($tweet);
            }

            $tweetContainer.appendChild(frag);

        }
    };

    request.onerror = function() {
      // There was a connection error of some sort
    };

    if (tweetsOn && $tweetContainer) {
        $tweetContainer.classList.add('is-busy');
        request.send();
    }


    /**
     * Konami code
     *
     */
    var konami = function(f,a){document.onkeyup=function(e){/113302022928$/.test(a+=''+((e||self.event).keyCode-37))&&f()}};
    konami(function () {
        document.body.classList.add('is-konami');
        setTimeout(pixelateImages, 800);
    });

    function pixelateImages () {
        var els = document.querySelectorAll('img');
        var i = els.length;
        while (i--) {
            pixelate(els[i]);
        }
    };

    function pixelate (img) {

        // Get the dimensions of loaded img.
        var width = img.clientWidth;
        var height = img.clientHeight;

        // Create canvas element.
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        // This is what gives us that blocky pixel styling, rather than a blend between pixels.
        canvas.style.cssText = 'image-rendering: optimizeSpeed;' + // FireFox < 6.0
            'image-rendering: -moz-crisp-edges;' + // FireFox
            'image-rendering: -o-crisp-edges;' +  // Opera
            'image-rendering: -webkit-crisp-edges;' + // Chrome
            'image-rendering: crisp-edges;' + // Chrome
            'image-rendering: -webkit-optimize-contrast;' + // Safari
            'image-rendering: pixelated; ' + // Future browsers
            '-ms-interpolation-mode: nearest-neighbor;'; // IE

        // Grab the drawing context object. It's what lets us draw on the canvas.
        var context = canvas.getContext('2d');

        // Use nearest-neighbor scaling when images are resized instead of the resizing algorithm to create blur.
        context.webkitImageSmoothingEnabled = false;
        context.mozImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;

        // We'll be pixelating the image by 80% (20% of original size).
        var percent = 0.25;

        // Calculate the scaled dimensions.
        var scaledWidth = width * percent;
        var scaledHeight = height * percent;

        // Render image smaller.
        context.drawImage(img, 0, 0, scaledWidth, scaledHeight);

        // Stretch the smaller image onto larger context.
        context.drawImage(canvas, 0, 0, scaledWidth, scaledHeight, 0, 0, width, height);

        // Here are what the above parameters mean:
        // canvasElement, canvasXOffsetForImage, canvasYOffsetForImage, imageWidth, imageHeight, imageXOffset, imageYOffset, destinationImageWidth, destinationImageHeight

        // Append canvas to body.
        img.parentNode.insertBefore(canvas, img);
        img.parentNode.removeChild(img);

    }


}(window, document));
