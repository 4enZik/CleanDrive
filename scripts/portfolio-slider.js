document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.portfolio-slider-track');
    let cards = document.querySelectorAll('.portfolio-slider-track .portfolio-wrapper');
    const prevBtn = document.getElementById('portPrevBtn');
    const nextBtn = document.getElementById('portNextBtn');

    if (!track || cards.length === 0 || !prevBtn || !nextBtn) return;

    // ОПРЕДЕЛЯЕМ КОЛИЧЕСТВО ВИДИМЫХ КАРТОЧЕК НА ЭКРАНЕ
    function getVisibleCardsCount() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 4;
    }

    let visibleCards = getVisibleCardsCount();
    const gap = parseInt(window.getComputedStyle(track).gap) || 25;

    // ПРЕМИУМ-КЛОНИРОВАНИЕ ДЛЯ БЕСШОВНОГО ЦИКЛА
    // Клонируем первые и последние карточки, чтобы создать иллюзию бесконечности
    const firstClones = [];
    const lastClones = [];

    for (let i = 0; i < visibleCards; i++) {
        firstClones.push(cards[i].cloneNode(true));
        lastClones.push(cards[cards.length - 1 - i].cloneNode(true));
    }

    // Вставляем клоны в начало и в конец трека
    firstClones.forEach(clone => track.appendChild(clone));
    lastClones.reverse().forEach(clone => track.insertBefore(clone, track.firstChild));

    // Обновляем список карточек с учетом клонов
    const allCards = document.querySelectorAll('.portfolio-slider-track .portfolio-wrapper');
    
    // Начальный индекс смещен на количество клонов слева
    let currentIndex = visibleCards; 
    let isTransitioning = false;

    // Главная функция движения слайдера
    function moveSlider(transition = true) {
        const cardWidth = cards[0].getBoundingClientRect().width;
        const amountToMove = currentIndex * (cardWidth + gap);
        
        if (transition) {
            track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        } else {
            track.style.transition = 'none';
        }
        
        track.style.transform = `translateX(-${amountToMove}px)`;
    }

    // Проверка краев карусели для бесшовного прыжка
    track.addEventListener('transitionend', () => {
        isTransitioning = false;

        // Если долетели до правого края (до клонов) — сбрасываем в реальное начало
        if (currentIndex >= allCards.length - visibleCards) {
            currentIndex = visibleCards;
            moveSlider(false);
        }
        
        // Если долетели до левого края — сбрасываем в реальный конец
        if (currentIndex <= 0) {
            currentIndex = allCards.length - (visibleCards * 2);
            moveSlider(false);
        }
    });

    // Клик вперед
    nextBtn.addEventListener('click', () => {
        if (isTransitioning) return; // Защита от бешеных кликов
        isTransitioning = true;
        currentIndex++;
        moveSlider(true);
    });

    // Клик назад
    prevBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex--;
        moveSlider(true);
    });

    // Корректный пересчет при ресайзе окна (эмуляторы в DevTools)
    window.addEventListener('resize', () => {
        visibleCards = getVisibleCardsCount();
        moveSlider(false);
    });

    // Инициализация карусели со стартовой позиции (без анимации при первой загрузке)
    // Даем браузеру микро-таймаут, чтобы он успел рассчитать физическую ширину карточек в пикселях
    setTimeout(() => {
        moveSlider(false);
        // Делаем стрелки всегда яркими и активными, так как тупиков больше нет
        prevBtn.style.opacity = '1'; prevBtn.style.pointerEvents = 'auto';
        nextBtn.style.opacity = '1'; nextBtn.style.pointerEvents = 'auto';
    }, 50);
});
