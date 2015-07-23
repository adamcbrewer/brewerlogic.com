'use strict';

import Tweet from './modules/tweet';


/**
 * Globals & Namespacing
 *
 */
global.Site = {
    basePath: document.body.getAttribute('data-basepath'),
    userAgent: navigator.userAgent,
    platform: navigator.platform
};


/**
 * Useragent styling
 *
 */
let b = document.documentElement;
b.setAttribute("data-useragent", Site.userAgent);
b.setAttribute("data-platform", Site.platform);


/**
 * Keyboard navigation
 *
 */
window.addEventListener('keyup', function (evt) {

    var code = evt.keyCode || null;
    var link = null;

    switch (code) {
        case 39: // right
            link = document.querySelectorAll('[rel="next"]');
            if (link.length && link[0].href) window.location = link[0].href;
            break;
        case 37: // left;
            link = document.querySelectorAll('[rel="prev"]');
            if (link.length && link[0].href) window.location = link[0].href;
            break;
        case 27: // esc
            window.location = Site.basePath;
        default:
            break;
    }

});



/**
 * Detecting if tweets are turned on and creating
 * a template form the original DOM element.
 *
 */
let tweetsOn = false;
let htmlEl = document.documentElement;

// Template and container nodes
let $tweetContainer = document.getElementById('tweets');
let $templateOriginal = document.getElementById('tweet-template');
let $template;
let frag;

if ($templateOriginal) {

    $template = $templateOriginal.cloneNode(true);
    frag = document.createDocumentFragment();

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
let request = new XMLHttpRequest();
request.open('GET', `${Site.basePath}/api/twitter`, true);

request.onload = () => {

    if ($tweetContainer) $tweetContainer.classList.remove('is-busy');

    if (request.status >= 200 && request.status < 400){

        let resp = JSON.parse(request.responseText);
        let tweets = resp.tweets;

        if (!tweets) return;

        let filter = resp.filter || false;
        let x = 0;

        let $tweet = document.createElement('div');

        for (x in tweets) {
            $tweet = new Tweet(tweets[x], $template, filter, resp.screen_name);
            frag.appendChild($tweet);
        }

        $tweetContainer.appendChild(frag);

    }
};

request.onerror = () => {

  console.error('There was an error fetching tweets');

};

if (tweetsOn && $tweetContainer) {

    $tweetContainer.classList.add('is-busy');
    request.send();

}


/**
 * Konami code
 *
 */
let konami = function(f,a){document.onkeyup=function(e){/113302022928$/.test(a+=''+((e||self.event).keyCode-37))&&f()}};
konami(() => {
    document.body.classList.add('is-konami');
    setTimeout(pixelateImages, 800);
});

function pixelateImages () {
    let els = document.querySelectorAll('img');
    let i = els.length;
    while (i--) {
        pixelate(els[i]);
    }
};

function pixelate (img) {

    // Get the dimensions of loaded img.
    let width = img.clientWidth;
    let height = img.clientHeight;

    // Create canvas element.
    let canvas = document.createElement('canvas');
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
    let context = canvas.getContext('2d');

    // Use nearest-neighbor scaling when images are resized instead of the resizing algorithm to create blur.
    context.mozImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;

    // We'll be pixelating the image by 80% (20% of original size).
    let percent = 0.25;

    // Calculate the scaled dimensions.
    let scaledWidth = width * percent;
    let scaledHeight = height * percent;

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
