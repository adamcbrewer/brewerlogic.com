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

    var tweetsOn = false;
    var htmlEl = document.documentElement;
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
        if (request.status >= 200 && request.status < 400){

            var resp = JSON.parse(request.responseText);
            var tweets = resp.tweets;
            var filter = resp.filter || false;
            var x = 0;

            // Template and container nodes
            var $tweetContainer = document.getElementById('tweets');
            var $templateOriginal = document.getElementById('tweet-template');
            var $template = $templateOriginal.cloneNode(true);
            var frag = document.createDocumentFragment();

            // remove the template from the DOM
            $templateOriginal.parentNode.removeChild($templateOriginal);

            var $tweet = document.createElement('div');

            for (x; x < tweets.length; x++) {
                $tweet = new Tweet(tweets[x], $template, filter);
                frag.appendChild($tweet);
            }

            $tweetContainer.appendChild(frag);

        }
    };

    request.onerror = function() {
      // There was a connection error of some sort
    };

    if (tweetsOn) {
        request.send();
    }



    /**
     * Typekit loading
     *
     */
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

}(window, document));

/*
.wf-loading {
    // styles to use when web fonts are loading
}

.wf-active {
    // styles to use when web fonts are active
}

.wf-inactive {
    // styles to use when web fonts are inactive
}
*/
