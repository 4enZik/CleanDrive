document.addEventListener("DOMContentLoaded", () => {
  // Ищем наши статичные обертки
  const wrappers = document.querySelectorAll("[data-tilt]");

  wrappers.forEach((wrapper) => {
    // Находим внутренний элемент, который будем наклонять визуально
    const targetCard = wrapper.querySelector('.map-link-container, .process-item, .service-card, .complex-card, .sub-card, .hero-3d-card, .footer-wrapper, .benefits-image-card, .review-item, .reviews-image, .portfolio-case-card');

    if (!targetCard) return;

    wrapper.addEventListener("mousemove", (e) => {
      const rect = wrapper.getBoundingClientRect();

      const width = rect.width;
      const height = rect.height;

      const mouseX = e.clientX - rect.left - width / 2;
      const mouseY = e.clientY - rect.top - height / 2;

      // Мягкий угол наклона для тяжелых больших блоков
      const maxTiltX = 6;
      const maxTiltY = 6;

      const tiltX = (mouseY / (height / 2)) * -maxTiltX;
      const tiltY = (mouseX / (width / 2)) * maxTiltY;

      // Наклоняем внутреннюю карточку, пока обертка стоит на месте железно
      targetCard.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.01, 1.01, 1.01)`;
    });

    // Плавный возврат в центр при уходе мыши
    wrapper.addEventListener("mouseleave", () => {
      targetCard.style.transition =
        "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
      targetCard.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });

    wrapper.addEventListener("mouseenter", () => {
      targetCard.style.transition = "none";
    });
  });
});
