// Initialize AOS with proper options for first-load animations
AOS.init({
  duration: 800,        // Animation duration in milliseconds
  offset: 100,          // Trigger animations 100px before element enters viewport
  delay: 100,           // Stagger animations
  easing: 'ease-in-out',
  once: false,          // Allow animations to repeat on scroll
  mirror: true          // Reverse animation when scrolling up
});

// Add parallax effect to section images on scroll
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const img = section.querySelector('div[class*="img"]');
        if (img) {
          const scrollPosition = window.scrollY;
          const sectionTop = section.offsetTop;
          const distance = scrollPosition - sectionTop;

          // Only apply parallax when section is in viewport area
          if (distance > -window.innerHeight && distance < window.innerHeight) {
            img.style.transform = `translateY(${distance * 0.15}px)`;
          }
        }
      });
      ticking = false;
    });
    ticking = true;
  }
});

// Smooth scroll behavior on page load
document.addEventListener('DOMContentLoaded', () => {
  // Ensure the page starts at the top
  window.scrollTo(0, 0);

  // Handle progress line with color changes
  const progressLine = document.getElementById('progressLine');

  window.addEventListener('scroll', () => {
    // Calculate scroll progress
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight;

    // Update progress line height and color
    if (progressLine) {
      progressLine.style.transform = `scaleY(${scrollPercent})`;

      // Smooth color transition based on scroll progress
      // Green (#418379) -> Red (#a0284c) -> Blue (#3d5bbf)
      let lineColor;

      if (scrollPercent < 0.5) {
        // First half: blend green to red
        const t = scrollPercent * 2; // 0 to 1
        const r = Math.round(65 + (160 - 65) * t);
        const g = Math.round(131 + (40 - 131) * t);
        const b = Math.round(121 + (76 - 121) * t);
        lineColor = `rgb(${r}, ${g}, ${b})`;
      } else {
        // Second half: blend red to blue
        const t = (scrollPercent - 0.5) * 2; // 0 to 1
        const r = Math.round(160 + (61 - 160) * t);
        const g = Math.round(40 + (91 - 40) * t);
        const b = Math.round(76 + (191 - 76) * t);
        lineColor = `rgb(${r}, ${g}, ${b})`;
      }

      progressLine.style.background = lineColor;
    }
  });

  // Back to top button click handler
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
