document.addEventListener("DOMContentLoaded", () => {
    // 1. ОДИН ОБСЕРВЕР ДЛЯ ВСЕХ ЛЕНИВЫХ КАРТИНОК И ФОНОВ НА САЙТЕ
    const allLazyImgs = document.querySelectorAll('img[data-src]');

    const lazyObserverOptions = {
        root: null,
        rootMargin: '0px 0px 300px 0px',
        threshold: 0
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;

                if (element.tagName === 'IMG') {
                    element.src = element.getAttribute('data-src');
                    element.classList.add('img-loaded');
                } else if (element.hasAttribute('data-bg')) {
                    element.style.backgroundImage = `url('${element.getAttribute('data-bg')}')`;
                }

                observer.unobserve(element);
            }
        });
    }, lazyObserverOptions);

    allLazyImgs.forEach(el => imageObserver.observe(el));
    document.querySelectorAll('[data-bg]').forEach(el => imageObserver.observe(el));


    // 2. УНИВЕРСАЛЬНЫЙ СКРИПТ ХОУВЕРА ДЛЯ БЛОКОВ С DATA-TILT
    function initCardHover(cardSelector, baseIconSelector, hoverIconSelector) {
        const cards = document.querySelectorAll(cardSelector);
        
        cards.forEach(card => {
            const baseIcon = card.querySelector(baseIconSelector);
            const hoverIcon = card.querySelector(hoverIconSelector);

            if (baseIcon && hoverIcon) {
                // Ховер сработает только на компьютерах (экран больше 1024px)
                card.addEventListener('mouseenter', () => {
                    if (window.innerWidth > 1024) {
                        baseIcon.style.setProperty('opacity', '0', 'important');
                        hoverIcon.style.setProperty('opacity', '1', 'important');
                    }
                });

                card.addEventListener('mouseleave', () => {
                    if (window.innerWidth > 1024) {
                        baseIcon.style.setProperty('opacity', '0.35', 'important');
                        hoverIcon.style.setProperty('opacity', '0', 'important');
                    }
                });
            }
        });
    }

    // Запускаем ховер для Блока Преимуществ
    initCardHover('.feature-item', '.feat-icon-base', '.feat-icon-hover');

    // Запускаем ховер для Блока Процессов
    initCardHover('.process-item', '.proc-icon-base', '.proc-icon-hover');
});
