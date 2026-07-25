window.addEventListener('load', () => {
    // 1. НАСТРОЙКА ДЛЯ ОБЫЧНЫХ КАРТИНОК <img data-src>
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    // 2. НАСТРОЙКА ДЛЯ ФОНОВЫХ ДИВОВ <div data-bg>
    const lazyBackgrounds = document.querySelectorAll('[data-bg]');

    // Общие параметры "глаза" браузера
    const lazyObserverOptions = {
        root: null,
        // МАГИЯ ЗАБЛАГОВРЕМЕННОЙ ЗАГРУЗКИ:
        // rootMargin: '0px 0px 300px 0px' означает, что картинка начнет незаметно скачиваться 
        // за 300 пикселей ДО ТОГО, как клиент доскроллит до нее! Клиент даже не заметит подвоха.
        rootMargin: '0px 0px 300px 0px',
        threshold: 0.01
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Если элемент заехал в зону видимости (+300px снизу)
            if (entry.isIntersecting) {
                const element = entry.target;

                // Проверяем: если это обычный тег IMG
                if (element.tagName === 'IMG') {
                    const realSrc = element.getAttribute('data-src');
                    if (realSrc) {
                        element.src = realSrc; // Перекидываем реальный путь в src
                        element.classList.add('img-loaded'); // Добавим класс для красивого плавного появления
                    }
                } 
                // Проверяем: если это DIV с фоновой картинкой
                else if (element.hasAttribute('data-bg')) {
                    const realBg = element.getAttribute('data-bg');
                    if (realBg) {
                        element.style.backgroundImage = `url('${realBg}')`; // Подставляем фон в инлайн-стили
                    }
                }

                // Картинка подгружена — снимаем с нее слежку, чтобы не тратить ресурсы телефона
                observer.unobserve(element);
            }
        });
    }, lazyObserverOptions);

    // Включаем слежку за всеми найденными элементами
    lazyImages.forEach(img => imageObserver.observe(img));
    lazyBackgrounds.forEach(bg => imageObserver.observe(bg));
});
