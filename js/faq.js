document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    item.addEventListener('toggle', () => {
      // Если элемент открылся
      if (item.open) {
        // Закрываем все остальные
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.open = false;
          }
        });
      }
    });
  });
});