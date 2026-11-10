(function () {
    const header = document.querySelector('[data-site-header]');
    const toggle = header.querySelector('.nav__toggle');
    const overlay = header.querySelector('.nav__overlay');
    const menu = header.querySelector('.nav__links--mobile');
    let previousOverflow;

    function closeMenu() {
        if (toggle.getAttribute('aria-expanded') !== 'true') return;
        toggle.setAttribute('aria-expanded', 'false');
        overlay.classList.remove('is-open');
        menu.classList.remove('is-open');
        menu.setAttribute('aria-hidden', 'true');
        menu.inert = true;
        document.body.style.overflow = previousOverflow;
    }

    function openMenu() {
        previousOverflow = document.body.style.overflow;
        toggle.setAttribute('aria-expanded', 'true');
        overlay.classList.add('is-open');
        menu.classList.add('is-open');
        menu.setAttribute('aria-hidden', 'false');
        menu.inert = false;
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(function () {
            if (toggle.getAttribute('aria-expanded') === 'true') {
                menu.querySelector('li:not([hidden]) a').focus();
            }
        });
    }

    toggle.addEventListener('click', function () {
        if (toggle.getAttribute('aria-expanded') === 'true') {
            closeMenu();
        } else {
            openMenu();
        }
    });

    overlay.addEventListener('click', closeMenu);
    menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (event) {
        if (toggle.getAttribute('aria-expanded') !== 'true') return;
        if (event.key === 'Escape') {
            closeMenu();
            toggle.focus();
        } else if (event.key === 'Tab') {
            const links = Array.from(menu.querySelectorAll('li:not([hidden]) a'));
            const first = toggle;
            const last = links[links.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth >= 768) closeMenu();
    });
})();
