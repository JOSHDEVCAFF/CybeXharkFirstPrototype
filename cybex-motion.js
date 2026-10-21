(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const selectors = [
        'body > .main > .navbar',
        'body > .navbar',
        'body > .site-header',
        'body > header',
        'body > .main > .main-content',
        'body > main:not(.container)',
        'body > .container',
        'body > .main > .content',
        'body > .main > .payment-container',
        'body > .main > .payment-container > *',
        '.featured-products',
        '.other-products',
        '.shop-intro',
        '.shop-categories',
        '.listProduct',
        '.services',
        '.contact-section',
        '.service-card',
        '.product-card',
        '.value-card',
        'body > footer'
    ].join(',');
    const elements = [...document.querySelectorAll(selectors)]
        .filter(element => !element.matches('#view-cart') && !element.closest('.sidebar, .admin-view, .account-settings-section'));

    if (elements.length === 0) {
        return;
    }

    document.documentElement.classList.add('motion-enabled');
    elements.forEach((element, index) => {
        element.dataset.motion = 'rise';
        element.style.setProperty('--motion-delay', `${Math.min(index % 5, 4) * 90}ms`);
    });

    const revealVisibleElements = () => {
        elements.forEach(element => {
            if (element.classList.contains('motion-visible')) {
                return;
            }
            const bounds = element.getBoundingClientRect();
            if (bounds.top < window.innerHeight - 24 && bounds.bottom > 24) {
                element.classList.add('motion-visible');
            }
        });
    };
    revealVisibleElements();
    window.addEventListener('scroll', revealVisibleElements, { passive: true });
    window.addEventListener('resize', revealVisibleElements);
    window.addEventListener('pageshow', revealVisibleElements);
})();
