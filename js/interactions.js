document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const navButton = document.querySelector(".w-nav-button");
  const navMenu = document.querySelector(".w-nav-menu");
  const navOverlay = document.querySelector(".w-nav-overlay");

  if (navButton && navMenu) {
    navButton.addEventListener("click", () => {
      const isOpen = navButton.classList.toggle("w--open");
      navMenu.classList.toggle("w--open");
      
      // Webflow CSS uses [data-nav-menu-open] attribute to position and show mobile menu
      if (isOpen) {
        navMenu.setAttribute("data-nav-menu-open", "");
        if (navOverlay) {
          navOverlay.style.display = "block";
          setTimeout(() => navOverlay.classList.add("active"), 10);
        }
      } else {
        navMenu.removeAttribute("data-nav-menu-open");
        if (navOverlay) {
          navOverlay.classList.remove("active");
          setTimeout(() => navOverlay.style.display = "none", 300);
        }
      }
    });
  }

  // 2. Dropdown Menu Toggle (Hover for Desktop, Click for Mobile)
  const dropdowns = document.querySelectorAll(".w-dropdown");
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector(".w-dropdown-toggle");
    const list = dropdown.querySelector(".w-dropdown-list");

    if (toggle && list) {
      // Hover for desktop
      dropdown.addEventListener("mouseenter", () => {
        if (window.innerWidth > 991) {
          dropdown.classList.add("w--open");
          toggle.classList.add("w--open");
          list.classList.add("w--open");
        }
      });
      dropdown.addEventListener("mouseleave", () => {
        if (window.innerWidth > 991) {
          dropdown.classList.remove("w--open");
          toggle.classList.remove("w--open");
          list.classList.remove("w--open");
        }
      });

      // Click for mobile/tablet
      toggle.addEventListener("click", (e) => {
        if (window.innerWidth <= 991) {
          e.preventDefault();
          const isOpen = dropdown.classList.toggle("w--open");
          toggle.classList.toggle("w--open");
          list.classList.toggle("w--open");
        }
      });
    }
  });

  // 3. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const header = item.querySelector(".faq-header");
    const content = item.querySelector(".faq-item-content");
    const icon = item.querySelector(".faq-icon");

    if (header && content) {
      // Set initial state (closed)
      content.style.maxHeight = "0px";
      content.style.overflow = "hidden";
      content.style.transition = "max-height 0.3s ease, padding 0.3s ease";
      content.style.display = "block"; // override display: none of w-dropdown-list

      header.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const isOpen = item.classList.toggle("active");
        header.classList.toggle("w--open");
        
        if (isOpen) {
          content.classList.add("w--open");
          content.style.maxHeight = content.scrollHeight + "px";
          if (icon) icon.classList.add("active");
        } else {
          content.style.maxHeight = "0px";
          setTimeout(() => content.classList.remove("w--open"), 300);
          if (icon) icon.classList.remove("active");
        }
      });
    }
  });

  // 4. Form Submission Client-Side Interceptor
  const forms = document.querySelectorAll("form");
  forms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const successDiv = form.parentElement.querySelector(".w-form-done");
      const errorDiv = form.parentElement.querySelector(".w-form-fail");
      
      if (successDiv) {
        form.style.display = "none";
        successDiv.style.display = "block";
        if (errorDiv) errorDiv.style.display = "none";
      }
    });
  });

  // 5. Initialize AOS (Scroll Animations)
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
      easing: "ease-out-quad"
    });
  }

  // 6. Initialize Swiper Carousels locally for each slider
  if (typeof Swiper !== "undefined") {
    const sliders = document.querySelectorAll(".w-slider");
    sliders.forEach(slider => {
      const nextEl = slider.querySelector(".w-slider-arrow-right");
      const prevEl = slider.querySelector(".w-slider-arrow-left");
      const paginationEl = slider.querySelector(".w-slider-nav");

      new Swiper(slider, {
        loop: true,
        speed: 600,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        pagination: paginationEl ? {
          el: paginationEl,
          clickable: true,
          bulletClass: "w-slider-dot",
          bulletActiveClass: "w-active"
        } : false,
        navigation: {
          nextEl: nextEl,
          prevEl: prevEl
        }
      });
    });
  }
});
