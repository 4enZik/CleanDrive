const burger = document.getElementById('burgerBtn');
const overlay = document.querySelector('.mobile-menu-overlay');
const closeBtn = document.querySelector('.mobile-menu-close');
const navLinks = document.querySelectorAll('.mobile-nav-links a'); // Все ссылки в меню

if (burger && overlay) {
  // Функция открытия/закрытия
  const toggleMenu = () => {
    const isActive = overlay.classList.toggle('active');
    burger.setAttribute('aria-expanded', isActive);
    // Блокируем скролл body
    document.body.style.overflow = isActive ? 'hidden' : '';
  };

  // Функция закрытия
  const closeMenu = () => {
    overlay.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  // 1. Клик по бургеру
  burger.addEventListener('click', toggleMenu);

  // 2. Клик по крестику
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  // 3. Клик по любой ссылке внутри меню
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // 4. Закрытие по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeMenu();
    }
  });
}