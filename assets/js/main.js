(function() {
    'use strict';

    const THEME_KEY = 'brewerlogic-theme';
    const html = document.documentElement;
    const toggle = document.querySelector('.theme-toggle');

    function getStoredTheme() {
        return localStorage.getItem(THEME_KEY);
    }

    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
    }

    function getPreferredTheme() {
        const stored = getStoredTheme();
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    setTheme(getPreferredTheme());

    if (toggle) {
        toggle.addEventListener('click', function() {
            const current = html.getAttribute('data-theme');
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!getStoredTheme()) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Mobile nav toggle
    var hamburger = document.querySelector('.nav__hamburger');
    var mobileNav = document.querySelector('.mobile-nav');
    var mobileLinks = document.querySelectorAll('.mobile-nav__links a');

    function toggleMobileNav() {
        var isOpen = mobileNav.classList.toggle('is-open');
        hamburger.setAttribute('aria-expanded', isOpen);
        mobileNav.setAttribute('aria-hidden', !isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    function closeMobileNav() {
        mobileNav.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', toggleMobileNav);

        mobileLinks.forEach(function(link) {
            link.addEventListener('click', closeMobileNav);
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
                closeMobileNav();
            }
        });
    }

    // Active nav state on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__links a');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav__links a');

    function setActiveNav(id) {
        var selector = '#' + id;
        navLinks.forEach(function(link) {
            link.classList.remove('is-active');
            if (link.getAttribute('href') === selector) {
                link.classList.add('is-active');
            }
        });
        mobileNavLinks.forEach(function(link) {
            link.classList.remove('is-active');
            if (link.getAttribute('href') === selector) {
                link.classList.add('is-active');
            }
        });
    }

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                setActiveNav(entry.target.id);
            }
        });
    }, {
        rootMargin: '-50% 0px -50% 0px'
    });

    sections.forEach(function(section) {
        observer.observe(section);
    });
})();
