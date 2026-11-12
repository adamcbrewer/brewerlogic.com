(() => {
    if (location.protocol !== 'https:' || !['brewerlogic.com', 'www.brewerlogic.com'].includes(location.hostname)) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', 'G-TWKH9DPEMN');

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-TWKH9DPEMN';
    document.head.appendChild(script);
})();
