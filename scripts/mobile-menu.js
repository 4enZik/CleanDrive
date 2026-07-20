window.addEventListener('load', () => {
    const burgerBtn = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    
    // Строго твой правильный селектор ссылок, который ты нашел!
    const menuLinks = document.querySelectorAll('.mobile-nav-links a');

    if (!burgerBtn || !mobileMenu || !closeMenuBtn) return;

    // Открытие меню
    function openMenu(e) {
        if (e) e.preventDefault(); 
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }

    // Закрытие меню (Обычное, по крестику)
    function closeMenu(e) {
        if (e) e.preventDefault();
        mobileMenu.classList.remove('active');
        document.body.style.overflow = ''; 
    }

    // БРОНЕБОЙНЫЙ ХЕНДЛЕР ДЛЯ КЛИКА ПО ССЫЛКАМ
    function handleLinkClick(e) {
        // 1. Блокируем дефолтный сломанный переход браузера
        if (e) e.preventDefault(); 

        // 2. Берем ID блока из атрибута href ссылки (например: "#services")
        const targetId = this.getAttribute('href'); 
        
        // 3. Мгновенно закрываем шторку меню и возвращаем скролл сайту
        mobileMenu.classList.remove('active');
        if (burgerBtn) burgerBtn.classList.remove('active');
        document.body.style.overflow = ''; 

        // 4. Ищем этот блок на странице по его ID
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // 5. Если блок найден — плавно скроллим к нему силами JavaScript!
            // Даем микро-таймаут в 50 миллисекунд, чтобы шторка успела начать закрываться, 
            // и анимация скролла шла идеально гладко
            setTimeout(() => {
                targetSection.scrollIntoView({
                    behavior: 'smooth', // Плавно
                    block: 'start'      // До самого верха блока
                });
            }, 50);
        }
    }

    // Навешиваем события на бургер (клик + тач)
    burgerBtn.addEventListener('click', openMenu);
    burgerBtn.addEventListener('touchstart', openMenu, { passive: false });

    // Навешиваем события на крестик
    closeMenuBtn.addEventListener('click', closeMenu);
    closeMenuBtn.addEventListener('touchstart', closeMenu, { passive: false });

    // Навешиваем события на ссылки
    menuLinks.forEach(link => {
        link.addEventListener('click', handleLinkClick);
        link.addEventListener('touchstart', handleLinkClick, { passive: false });
    });
});
