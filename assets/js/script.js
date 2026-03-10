document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", function () {
      menu.classList.toggle("active");
    });

    document.querySelectorAll(".menu a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("active");
      });
    });
  }

  if (window.gsap) {
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
        },
      });
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