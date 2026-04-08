document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");
  const navDropdowns = document.querySelectorAll(".nav-dropdown");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", function () {
      menu.classList.toggle("active");
    });

    document.querySelectorAll(".menu a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("active");

        navDropdowns.forEach((dropdown) => {
          dropdown.classList.remove("active");
          const toggle = dropdown.querySelector(".dropdown-toggle");
          if (toggle) toggle.setAttribute("aria-expanded", "false");
        });
      });
    });
  }

  navDropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle");

    if (!toggle) return;

    toggle.addEventListener("click", function (event) {
      if (window.innerWidth <= 820) {
        event.preventDefault();

        navDropdowns.forEach((item) => {
          if (item !== dropdown) {
            item.classList.remove("active");
            const otherToggle = item.querySelector(".dropdown-toggle");
            if (otherToggle) otherToggle.setAttribute("aria-expanded", "false");
          }
        });

        dropdown.classList.toggle("active");
        toggle.setAttribute(
          "aria-expanded",
          dropdown.classList.contains("active") ? "true" : "false"
        );
      }
    });
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 820) {
      navDropdowns.forEach((dropdown) => {
        dropdown.classList.remove("active");
        const toggle = dropdown.querySelector(".dropdown-toggle");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      });
    }
  });

  /* PARALLAX HERO */
  const heroImagesContainer = document.querySelector(".hero-images");
  const heroImgLeft =
    document.querySelector(".hero-img-copy") ||
    document.querySelector(".hero-img.dos") ||
    document.querySelector(".dos");

  const heroImgRight =
    document.querySelector(".hero-img-product") ||
    document.querySelector(".hero-img.uno") ||
    document.querySelector(".uno");

  if (heroImagesContainer && heroImgLeft && heroImgRight) {
    heroImagesContainer.addEventListener("mousemove", function (event) {
      if (window.innerWidth <= 820) return;

      const rect = heroImagesContainer.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const moveX = (x - centerX) / centerX;
      const moveY = (y - centerY) / centerY;

      heroImgLeft.style.transform =
        `translate(${moveX * 12}px, ${moveY * 12}px) rotateY(${moveX * 6}deg) rotateX(${moveY * -4}deg)`;

      heroImgRight.style.transform =
        `translate(${moveX * -12}px, ${moveY * -12}px) rotateY(${moveX * -6}deg) rotateX(${moveY * 4}deg)`;
    });

    heroImagesContainer.addEventListener("mouseleave", function () {
      heroImgLeft.style.transform = "translate(0, 0) rotateY(0deg) rotateX(0deg)";
      heroImgRight.style.transform = "translate(0, 0) rotateY(0deg) rotateX(0deg)";
    });
  }

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".reveal").forEach((element) => {
      gsap.from(element, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    ScrollTrigger.refresh();

    window.addEventListener("load", function () {
      ScrollTrigger.refresh();

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 800);

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 1800);

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 3000);

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 4500);
    });
  }

  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const submitBtn = document.getElementById("contact-submit-btn");

  if (form && status && submitBtn) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      status.textContent = "Enviando solicitud...";
      status.className = "form-status form-status-loading";
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando...";

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          form.reset();
          status.textContent = "Tu solicitud fue enviada correctamente. Te contactaremos pronto.";
          status.className = "form-status form-status-success";
        } else {
          status.textContent = "No se pudo enviar la solicitud. Intenta nuevamente o escríbenos por WhatsApp.";
          status.className = "form-status form-status-error";
        }
      } catch (error) {
        status.textContent = "Ocurrió un error al enviar el formulario. Intenta nuevamente o escríbenos por WhatsApp.";
        status.className = "form-status form-status-error";
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Enviar solicitud";
      }
    });
  }
});