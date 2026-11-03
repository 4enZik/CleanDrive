document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('portfolioTrack');
  const prevBtn = document.getElementById('portPrevBtn');
  const nextBtn = document.getElementById('portNextBtn');
  
  if (!track || !prevBtn || !nextBtn) return;

  // 1. Получаем все оригинальные карточки
  const originalCards = Array.from(track.children);
  const totalCards = originalCards.length;
  
  // 2. Клонируем их и добавляем в конец
  originalCards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.classList.add('cloned'); // Помечаем клоны для CSS (если нужно)
    track.appendChild(clone);
  });

  let currentIndex = 0;
  let isAnimating = false;

  function getCardsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 992) return 2;
    return 3;
  }

  function updateSlider(animate = true) {
    const cardsPerView = getCardsPerView();
    const maxIndex = totalCards; // Теперь можно листать до конца (клоны)
    
    // Ограничиваем индекс
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    // Вычисляем сдвиг
    const cardWidth = track.children[0].getBoundingClientRect().width;
    const gap = 20; // Должен совпадать с CSS gap
    const offset = (cardWidth + gap) * currentIndex;

    // Применяем анимацию
    if (animate) {
      track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    } else {
      track.style.transition = 'none'; // Мгновенный сдвиг
    }
    
    track.style.transform = `translateX(-${offset}px)`;
  }

  // Обработчик анимации
  track.addEventListener('transitionend', () => {
    const cardsPerView = getCardsPerView();
    const totalItems = track.children.length; // Учитывая клоны

    // Если дошли до конца (точнее, до первого клона)
    if (currentIndex >= totalCards) {
      currentIndex = 0;
      updateSlider(false); // Мгновенный сдвиг в начало (без анимации)
    }

    // Если ушли в минус (нажали "Назад" с первой карточки)
    if (currentIndex < 0) {
      currentIndex = totalCards;
      updateSlider(false);
    }
  });

  prevBtn.addEventListener('click', () => {
    currentIndex--;
    updateSlider();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex++;
    updateSlider();
  });

  // Пересчитываем при ресайзе
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      currentIndex = 0;
      updateSlider(false);
    }, 200);
  });

  // Первичный рендер
  updateSlider(false);
});