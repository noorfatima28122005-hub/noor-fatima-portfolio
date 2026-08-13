// =========================================================
// NOOR FATIMA — PREMIUM PORTFOLIO
// FINAL JAVASCRIPT
// =========================================================

document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // 1. NAVBAR SCROLL EFFECT
    // =====================================================

    const navbar = document.querySelector(".navbar");

    const updateNavbar = () => {

        if (!navbar) return;

        if (window.scrollY > 35) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    };

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    updateNavbar();


    // =====================================================
    // 2. SMOOTH SCROLL
    // =====================================================

    const navigationLinks =
        document.querySelectorAll(
            '.nav-links a[href^="#"]'
        );

    navigationLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    // =====================================================
    // 3. SCROLL REVEAL
    // =====================================================

    const revealElements =
        document.querySelectorAll(
            ".section, .skill-card, .project-card, .contact-box"
        );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("show");

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("show");
        });

    }


    // =====================================================
    // 4. STAGGERED CARD ANIMATION
    // =====================================================

    const cardGroups = [
        ".skill-card",
        ".project-card"
    ];

    cardGroups.forEach((selector) => {

        const cards =
            document.querySelectorAll(selector);

        cards.forEach((card, index) => {

            card.style.transitionDelay =
                `${index * 80}ms`;

        });

    });


    // =====================================================
    // 5. HERO MOUSE PARALLAX
    // =====================================================

    const hero =
        document.querySelector(".hero");

    const heroContent =
        document.querySelector(".hero-content");

    const glowOne =
        document.querySelector(".glow-one");

    const glowTwo =
        document.querySelector(".glow-two");


    if (
        hero &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        hero.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    hero.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left)
                    / rect.width - 0.5;

                const y =
                    (event.clientY - rect.top)
                    / rect.height - 0.5;


                if (heroContent) {

                    heroContent.style.transform =
                        `translate3d(
                            ${x * 5}px,
                            ${y * 5}px,
                            0
                        )`;

                }


                if (glowOne) {

                    glowOne.style.transform =
                        `translate(
                            ${x * 25}px,
                            ${y * 25}px
                        )`;

                }


                if (glowTwo) {

                    glowTwo.style.transform =
                        `translate(
                            ${x * -20}px,
                            ${y * -20}px
                        )`;

                }

            }
        );


        hero.addEventListener(
            "mouseleave",
            () => {

                if (heroContent) {
                    heroContent.style.transform =
                        "translate3d(0,0,0)";
                }

                if (glowOne) {
                    glowOne.style.transform =
                        "translate(0,0)";
                }

                if (glowTwo) {
                    glowTwo.style.transform =
                        "translate(0,0)";
                }

            }
        );

    }


    // =====================================================
    // 6. PROJECT CARD TILT EFFECT
    // =====================================================

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    projectCards.forEach((card) => {

        if (
            !window.matchMedia(
                "(pointer: fine)"
            ).matches
        ) {
            return;
        }


        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    (y - centerY) / 30;

                const rotateY =
                    (centerX - x) / 30;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });


    // =====================================================
    // 7. SKILL CARD INTERACTION
    // =====================================================

    const skillCards =
        document.querySelectorAll(
            ".skill-card"
        );


    skillCards.forEach((card) => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.classList.add("active");

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.classList.remove("active");

            }
        );

    });


    // =====================================================
    // 8. ACTIVE NAVIGATION
    // =====================================================

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-links a"
        );


    if (
        sections.length &&
        navLinks.length &&
        "IntersectionObserver" in window
    ) {

        const activeObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const currentId =
                            entry.target.getAttribute(
                                "id"
                            );


                        navLinks.forEach((link) => {

                            link.classList.remove(
                                "active"
                            );


                            if (
                                link.getAttribute(
                                    "href"
                                ) ===
                                `#${currentId}`
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        });

                    });

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px"
                }
            );


        sections.forEach((section) => {
            activeObserver.observe(section);
        });

    }


    // =====================================================
    // 9. EMAIL PROTECTION / CONSISTENCY
    // =====================================================

    const email =
        "noorfatima28122005@gmail.com";


    const emailLinks =
        document.querySelectorAll(
            'a[href^="mailto:"]'
        );


    emailLinks.forEach((link) => {

        link.setAttribute(
            "href",
            `mailto:${email}`
        );

    });


    // =====================================================
    // 10. EXTERNAL LINKS
    // =====================================================

    const externalLinks =
        document.querySelectorAll(
            'a[href^="http"]'
        );


    externalLinks.forEach((link) => {

        link.setAttribute(
            "target",
            "_blank"
        );

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


    // =====================================================
    // 11. CONTACT EMAIL COPY
    // =====================================================

    const emailButton =
        document.querySelector(
            ".email-button"
        );


    if (emailButton) {

        emailButton.addEventListener(
            "click",
            () => {

                emailButton.classList.add(
                    "clicked"
                );

                setTimeout(() => {

                    emailButton.classList.remove(
                        "clicked"
                    );

                }, 800);

            }
        );

    }


    // =====================================================
    // 12. CURRENT YEAR
    // =====================================================

    const footerYear =
        document.querySelector(
            "footer small"
        );


    if (footerYear) {

        footerYear.textContent =
            `© ${new Date().getFullYear()} Noor Fatima. All Rights Reserved.`;

    }


    // =====================================================
    // 13. SCROLL TO TOP WHEN LOGO IS CLICKED
    // =====================================================

    const logo =
        document.querySelector(".logo");


    if (logo) {

        logo.addEventListener(
            "click",
            (event) => {

                const home =
                    document.querySelector("#home");

                if (!home) return;

                event.preventDefault();

                home.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    }


    // =====================================================
    // 14. ESCAPE KEY
    // =====================================================

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                document
                    .querySelectorAll(".active")
                    .forEach((element) => {

                        element.classList.remove(
                            "active"
                        );

                    });

            }

        }
    );


    // =====================================================
    // 15. PAGE LOADED
    // =====================================================

    requestAnimationFrame(() => {

        document.body.classList.add(
            "loaded"
        );

    });


    // =====================================================
    // 16. CONSOLE
    // =====================================================

    console.log(
        "%c Noor Fatima Portfolio ",
        "background:#63e6e2;color:#070b12;font-weight:700;padding:8px 12px;border-radius:6px;"
    );

    console.log(
        "Premium portfolio loaded successfully."
    );

});