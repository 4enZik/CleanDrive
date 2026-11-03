document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll(
    '.anim-fade-up, .anim-fade-left, .anim-fade-right'
  );

  if (!animatedElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Если вошел в экран — показываем
          entry.target.classList.add('is-visible');
        } else {
          // Если вышел за экран — скрываем (убираем класс)
          entry.target.classList.remove('is-visible');
        }
      });
    }, {
      // Срабатывает, когда элемент пересекает 15% высоты экрана
      rootMargin: '0px 0px -15% 0px', 
      threshold: 0
    });

    animatedElements.forEach(el => observer.observe(el));
    // ВАЖНО: Мы убрали observer.unobserve() — теперь следим всегда!
  } else {
    animatedElements.forEach(el => el.classList.add('is-visible'));
  }
});