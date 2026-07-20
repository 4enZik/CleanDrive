window.addEventListener('load', () => {
    const animatedElements = document.querySelectorAll('.anim-fade-up, .anim-fade-left, .anim-fade-right');

    if (animatedElements.length === 0) return;

    const observerOptions = {
        root: null,
        // МАГИЯ ЗАДЕРЖКИ: Искусственно подрезаем зону видимости снизу на 100 пикселей.
        // Теперь анимация включится только тогда, когда блок проедет вверх ХОТЯ БЫ на 100px от нижнего края экрана!
        // Клиент гарантированно заметит сочное выплывание.
        rootMargin: '0px 0px -100px 0px', 
        threshold: 0.1 
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Если блок заехал на экран снизу — плавно проявляем его
                entry.target.classList.add('show');
            } else {
                // БЕСКОНЕЧНЫЙ ЦИКЛ: Если блок улетел за пределы экрана (скролл вверх или далеко вниз) 
                // — намертво прячем его обратно, чтобы он мог сочно вылететь снова!
                entry.target.classList.remove('show');
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => scrollObserver.observe(el));
});
