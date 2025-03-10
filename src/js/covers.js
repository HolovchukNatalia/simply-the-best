const targetElement = document.querySelector('.covers-wrapper');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animation');
      } else {
        entry.target.classList.remove('animation');
      }
    });
  },
  { threshold: 0 }
);

observer.observe(targetElement);
