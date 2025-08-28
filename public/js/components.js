// header component
customElements.define(
  "ka-header",
  class extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: "open" });
      this.lastScrollTop = 0;
      this.isMenuOpen = false;
      this.header = this.generateElem();
      shadowRoot.appendChild(this.header);
    }

    generateElem() {
      const style = document.createElement("style");
      style.textContent = `
        header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0rem 3rem;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background: var(--bg-color);
          z-index: 1000;
          transition: transform 0.2s ease-in-out, opacity 0.6s ease-in-out, box-shadow 0.6s ease-in-out;
          transform: translateY(0);
          opacity: 1;
          box-sizing: border-box;
          background-color : var(--bg-col);
        }

        header.hidden {
          transform: translateY(-100%);
          opacity: 0;
        }

        header.shadow {
          box-shadow: 0 10px 30px -10px var(--bg-btn);
        }

        header figure img {
          width: 64px;
          height: 64px;
        }

        header nav ul {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        header nav ul li {
          list-style: none;
          margin-left: 3rem;
        }

        header nav ul li a {
          text-decoration: none;
          color: var(--text-light);
          position: relative;
          display: inline-block;
          cursor: pointer;
        }

        header nav ul li a::after {
          content: "";
          position: absolute;
          width: 0;
          height: 2px;
          background-color: var(--text-dark);
          bottom: -4px;
          left: 0;
          transition: width 0.2s ease-in-out;
        }

        header nav ul li a:hover {
          color: var(--text-dark);
        }

        header nav ul li a:hover::after,
        header nav ul li a:active::after,
        header nav ul li a:focus::after {
          width: 100%;
        }

        header nav ul li button {
          color: var(--text-light);
          cursor: pointer;
          border: 1px solid var(--bg-btn);
          border-radius: 4px;
          padding: 0.8em 2em;
          background: var(--bg-btn);
          transition: 0.2s;
          font-weight: 900;
        }

        header nav ul li button:hover {
          color: var(--hover-text);
          transform: translate(-0.25rem, -0.25rem);
          background: var(--hover-bg);
          box-shadow: 0.25rem 0.25rem var(--bg-btn);
        }

        header nav ul li button:active {
          transform: translate(0);
          box-shadow: none;
        }

        /* Mobile Menu Button */
        .mobile-menu-btn {
          display: none;
          flex-direction: column;
          cursor: pointer;
          padding: 8px;
          background: none;
          border: none;
          z-index: 1001;
        }

        .mobile-menu-btn span {
          width: 25px;
          height: 3px;
          background: var(--text-light);
          margin: 3px 0;
          transition: 0.3s;
          border-radius: 2px;
        }

        .mobile-menu-btn.active span:nth-child(1) {
          transform: rotate(-45deg) translate(-6px, 6px);
        }

        .mobile-menu-btn.active span:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu-btn.active span:nth-child(3) {
          transform: rotate(45deg) translate(-6px, -6px);
        }

        /* Tablet Styles */
        @media screen and (max-width: 1024px) {
          header {
            padding: 0rem 2rem;
          }

          header figure img {
            width: 56px;
            height: 56px;
          }

          header nav ul li {
            margin-left: 2rem;
          }

          header nav ul li button {
            padding: 0.7em 1.5em;
            font-size: 0.9rem;
          }
        }

        /* Mobile Styles */
        @media screen and (max-width: 768px) {
          header {
            padding: 0rem 1.5rem;
          }

          header figure img {
            width: 48px;
            height: 48px;
          }

          .mobile-menu-btn {
            display: flex;
          }

          header nav {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: var(--bg-color);
            backdrop-filter: blur(20px);
            box-shadow: 0 5px 70px -5px var(--bg-btn);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
          }

          header nav.mobile-open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
          }

          header nav ul {
            flex-direction: column;
            padding: 2rem 0;
            gap: 1rem;
          }

          header nav ul li {
            margin: 0;
            width: 100%;
            text-align: center;
          }

          header nav ul li a {
            display: block;
            padding: 1rem;
            font-size: 1.1rem;
          }

          header nav ul li button {
            padding: 1rem 2rem;
            margin: 1rem;
          }

          /* Hide shadow when menu is open */
          header.shadow {
            box-shadow: none;
          }
        }

        /* Small Mobile Styles */
        @media screen and (max-width: 480px) {
          header {
            padding: 0rem 1rem;
          }

          header figure img {
            width: 40px;
            height: 40px;
          }

          header nav ul li a {
            font-size: 1rem;
          }

          header nav ul li button {
            padding: 0.8rem 1.5rem;
            font-size: 0.9rem;
          }
        }

        /* Large Screen Optimization */
        @media screen and (min-width: 1200px) {
          header {
            padding: 0rem 4rem;
          }

          header nav ul li {
            margin-left: 3.5rem;
          }
        }

        /* Ultra-wide Screen */
        @media screen and (min-width: 1600px) {
          header {
            padding: 0rem 6rem;
          }

          header nav ul li {
            margin-left: 4rem;
          }
        }
      `;

      const header = document.createElement("header");
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const nav = document.createElement("nav");
      const ul = document.createElement("ul");
      const about = document.createElement("li");
      const experience = document.createElement("li");
      const work = document.createElement("li");
      const contact = document.createElement("li");
      const resume = document.createElement("li");

      const aboutLink = document.createElement("a");
      const experienceLink = document.createElement("a");
      const workLink = document.createElement("a");
      const contactLink = document.createElement("a");
      const resumeLink = document.createElement("button");

      const mobileMenuBtn = document.createElement("button");
      mobileMenuBtn.className = "mobile-menu-btn";
      mobileMenuBtn.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
      `;

      img.src = "/ressources/logo.svg";
      img.alt = "KA.";
      figure.appendChild(img);

      aboutLink.innerHTML = "About";
      experienceLink.innerHTML = "Experience";
      workLink.innerHTML = "Work";
      contactLink.innerHTML = "Contact";

      aboutLink.className = "jet-medium";
      experienceLink.className = "jet-medium";
      workLink.className = "jet-medium";
      contactLink.className = "jet-medium";

      resumeLink.innerHTML = "RESUME";

      about.appendChild(aboutLink);
      experience.appendChild(experienceLink);
      work.appendChild(workLink);
      contact.appendChild(contactLink);
      resume.appendChild(resumeLink);

      ul.appendChild(about);
      ul.appendChild(experience);
      ul.appendChild(work);
      ul.appendChild(contact);
      ul.appendChild(resume);
      nav.appendChild(ul);

      header.appendChild(figure);
      header.appendChild(nav);
      header.appendChild(mobileMenuBtn);
      header.appendChild(style);

      mobileMenuBtn.addEventListener("click", () => {
        this.toggleMobileMenu();
      });
      const links = [aboutLink, experienceLink, workLink, contactLink];
      links.forEach((link) => {
        link.addEventListener("click", () => {
          this.closeMobileMenu();
        });
      });

      resumeLink.addEventListener("click", () => {
        this.closeMobileMenu();
      });

      return header;
    }

    toggleMobileMenu() {
      const nav = this.header.querySelector("nav");
      const mobileMenuBtn = this.header.querySelector(".mobile-menu-btn");

      this.isMenuOpen = !this.isMenuOpen;

      if (this.isMenuOpen) {
        nav.classList.add("mobile-open");
        mobileMenuBtn.classList.add("active");
      } else {
        nav.classList.remove("mobile-open");
        mobileMenuBtn.classList.remove("active");
      }
    }

    closeMobileMenu() {
      const nav = this.header.querySelector("nav");
      const mobileMenuBtn = this.header.querySelector(".mobile-menu-btn");

      this.isMenuOpen = false;
      nav.classList.remove("mobile-open");
      mobileMenuBtn.classList.remove("active");
    }

    headerHide() {
      this.closeMobileMenu();
      this.header.classList.add("hidden");
    }

    headerShow() {
      this.shadowed();
      this.header.classList.remove("hidden");
    }

    updateScrollPosition(scrollTop) {
      this.lastScrollTop = scrollTop;
    }

    shadowed() {
      if (window.scrollY === 0) {
        this.header.classList.remove("shadow");
      } else {
        this.header.classList.add("shadow");
      }
    }

    getLastScrollTop() {
      return this.lastScrollTop;
    }
  }
);

window.addEventListener("scroll", () => {
  const kaHeader = document.querySelector("ka-header");
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > 100) {
    if (scrollTop > kaHeader.getLastScrollTop()) {
      kaHeader.headerHide();
    } else {
      kaHeader.headerShow();
    }
  } else {
    kaHeader.headerShow();
  }

  kaHeader.updateScrollPosition(scrollTop <= 0 ? 0 : scrollTop);
});

window.addEventListener("resize", () => {
  const kaHeader = document.querySelector("ka-header");
  if (window.innerWidth > 768) {
    kaHeader.closeMobileMenu();
  }
});

customElements.define(
  "ka-section-title",
  class extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.appendChild(this.generateElem());
    }
    generateElem() {}
  }
);
