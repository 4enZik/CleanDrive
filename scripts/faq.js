window.addEventListener('load', () => {
    // Находим твои родные карточки
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length === 0) return;

    // Жесткий сброс при загрузке: принудительно закрываем всё
    faqItems.forEach(item => {
        item.classList.remove('active');
        const span = item.querySelector('.faq-question span');
        if (span) span.textContent = '+';
    });

    faqItems.forEach(item => {
        const questionZone = item.querySelector('.faq-question');
        if (!questionZone) return;

        function toggleAccordion(e) {
            if (e) e.preventDefault();
            
            const isActive = item.classList.contains('active');

            // Авто-закрытие: гасим остальные открытые вкладки
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherSpan = otherItem.querySelector('.faq-question span');
                if (otherSpan) otherSpan.textContent = '+';
            });

            // Если эта была закрыта — открываем и ставим минус
            if (!isActive) {
                item.classList.add('active');
                const currentSpan = item.querySelector('.faq-question span');
                if (currentSpan) currentSpan.textContent = '−'; // Премиальный длинный минус
            }
        }

        // Клик для ПК и тач для телефонов
        questionZone.addEventListener('click', toggleAccordion);
        questionZone.addEventListener('touchstart', toggleAccordion, { passive: false });
    });
});