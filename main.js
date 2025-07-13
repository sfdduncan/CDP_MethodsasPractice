function revealOnScroll() {
  const images = d3.selectAll(".circle-img");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const element = d3.select(entry.target);
      if (entry.isIntersecting) {
        element.classed("visible", true);
      } else {
        element.classed("visible", false); // reverse animation
      }
    });
  }, {
    threshold: 0.4
  });

  images.each(function () {
    observer.observe(this);
  });
}

document.addEventListener("DOMContentLoaded", revealOnScroll);


const typewriterText = `In a larger sense, Lauren Lee McCarthy’s work is a digital reflection on care, code, and control. Her artistic practice investigates the technological systems that increasingly shape and mediate our most intimate relationships, from parenting and health to self-monitoring and public exposure. Through a range of formats including performances, exhibitions, and speculative design, McCarthy creates immersive scenarios that challenge viewers to confront how emotional labor and bodily autonomy are reshaped by digital tools. The project is composed of several distinct pieces, such as Surrogate, Womb Walk, and What is Data?, each of which explores a different facet of how technology interacts with the body. Rather than offering solutions, McCarthy invites discomfort and reflection, revealing the quiet negotiations that occur when care is managed through systems of observation and control.`;

let typed = false;

function typeWriterEffect(element, text, speed = 20) {
  let i = 0;
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

window.addEventListener('scroll', () => {
  const intro = document.getElementById('intro');
  const textElement = document.getElementById('typewriter-text');
  if (!typed && isInViewport(intro)) {
    typeWriterEffect(textElement, typewriterText);
    typed = true;
  }
});

