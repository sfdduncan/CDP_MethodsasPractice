// Typewriter effect for a single element
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

function revealOnScroll() {
  const images = d3.selectAll(".circle-img");
  const typewriterParagraphs = document.querySelectorAll("p.typewriter");

  // === Image Observer: grow/shrink ===
  const imageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const el = d3.select(entry.target);
      if (entry.isIntersecting) {
        el.classed("visible", true);
      } else {
        el.classed("visible", false);
      }
    });
  }, {
    threshold: 0.4
  });

  images.each(function () {
    imageObserver.observe(this);
  });

  // === Typewriter Paragraph Observer ===
  const typedSet = new Set();

  const paragraphObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const el = entry.target;

      if (entry.isIntersecting && !typedSet.has(el)) {
        const fullText = el.textContent;
        el.textContent = "";
        el.classList.add("visible");
        typeWriterEffect(el, fullText);
        typedSet.add(el);
      }

 
    });
  }, {
    threshold: 0.6
  });

  typewriterParagraphs.forEach(p => {
    paragraphObserver.observe(p);
  });
}

document.addEventListener("DOMContentLoaded", revealOnScroll);


