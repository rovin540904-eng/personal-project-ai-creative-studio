/* =========================================================
   MOTIONARY — MAIN.JS
   URBANVIBE + L'ESSENCE PUR INTEGRATED
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------
       HELPERS
    ----------------------------- */
    const $ = (selector, scope = document) => scope.querySelector(selector);
    const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const safePlay = (video) => {
        if (!video) return;

        const promise = video.play();

        if (promise && typeof promise.catch === "function") {
            promise.catch(() => {});
        }
    };

    const pauseVideo = (video, reset = false) => {
        if (!video) return;

        video.pause();

        if (reset) {
            try {
                video.currentTime = 0;
            } catch (error) {}
        }
    };


    /* -----------------------------
       HEADER SCROLL STATE
    ----------------------------- */
    const header = $(".header") || $("header");

    const updateHeader = () => {
        if (!header) return;
        header.classList.toggle("scrolled", window.scrollY > 30);
    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });


    /* -----------------------------
       SMOOTH ANCHOR SCROLL
    ----------------------------- */
    $$('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");

            if (!href || href === "#") return;

            const target = $(href);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: prefersReducedMotion ? "auto" : "smooth",
                block: "start"
            });
        });
    });


    /* -----------------------------
       SECTION REVEAL
    ----------------------------- */
    const revealSections = $$(".reveal-section");

    if (
        revealSections.length > 0 &&
        "IntersectionObserver" in window &&
        !prefersReducedMotion
    ) {
        revealSections.forEach((section) => {
            section.style.opacity = "0";
            section.style.transform = "translateY(34px)";
            section.style.transition =
                "opacity 0.8s cubic-bezier(.22,1,.36,1), " +
                "transform 0.8s cubic-bezier(.22,1,.36,1)";
        });

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -8% 0px"
            }
        );

        revealSections.forEach((section) => {
            revealObserver.observe(section);
        });
    }


    /* -----------------------------
       AUTOPLAY WHEN VISIBLE
    ----------------------------- */
    const autoplayVideos = $$(".autoplay-when-visible");

    if (
        autoplayVideos.length > 0 &&
        "IntersectionObserver" in window
    ) {
        const videoObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const video = entry.target;

                    if (entry.isIntersecting) {
                        video.muted = true;
                        video.playsInline = true;
                        safePlay(video);
                    } else {
                        pauseVideo(video);
                    }
                });
            },
            {
                threshold: 0.35
            }
        );

        autoplayVideos.forEach((video) => {
            video.muted = true;
            video.playsInline = true;
            videoObserver.observe(video);
        });
    } else {
        autoplayVideos.forEach((video) => {
            video.muted = true;
            safePlay(video);
        });
    }


    /* -----------------------------
       MODAL MANAGER
    ----------------------------- */
    let activeModal = null;
    let lastFocusedElement = null;

    const allModals = $$(".uv-modal");

    const getModalWindow = (modal) => {
        return modal ? $(".uv-modal-window", modal) : null;
    };

    const stopModalMedia = (modal) => {
        if (!modal) return;

        $$("video", modal).forEach((video) => {
            pauseVideo(video, true);
        });
    };

    const openModal = (modal) => {
        if (!modal) return;

        if (activeModal && activeModal !== modal) {
            closeModal(activeModal, false);
        }

        lastFocusedElement = document.activeElement;
        activeModal = modal;

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        const modalWindow = getModalWindow(modal);

        if (modalWindow) {
            modalWindow.scrollTop = 0;
        }

        const closeButton = $(".uv-modal-close", modal);

        if (closeButton) {
            window.setTimeout(() => {
                closeButton.focus();
            }, 50);
        }
    };

    const closeModal = (modal = activeModal, restoreFocus = true) => {
        if (!modal) return;

        stopModalMedia(modal);

        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");

        if (activeModal === modal) {
            activeModal = null;
        }

        if (!$(".uv-modal.is-open")) {
            document.body.style.overflow = "";
        }

        if (
            restoreFocus &&
            lastFocusedElement &&
            typeof lastFocusedElement.focus === "function"
        ) {
            lastFocusedElement.focus();
        }
    };

    const scrollModalTop = (modal) => {
        const modalWindow = getModalWindow(modal);

        if (!modalWindow) return;

        modalWindow.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? "auto" : "smooth"
        });
    };


    /* -----------------------------
       SHARED MODAL CLOSE
    ----------------------------- */
    allModals.forEach((modal) => {
        const closeButton = $(".uv-modal-close", modal);

        if (closeButton) {
            closeButton.addEventListener("click", () => {
                closeModal(modal);
            });
        }

        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });


    /* -----------------------------
       URBANVIBE MODAL
    ----------------------------- */
    const urbanvibeModal = $("#urbanvibeModal");

    [
        $("#openUrbanvibe"),
        $("#openUrbanvibeHero"),
        $("#openUrbanvibeFromCase"),
        $("#openUrbanvibeCaseStudy")
    ]
        .filter(Boolean)
        .forEach((opener) => {
            opener.addEventListener("click", (event) => {
                event.preventDefault();
                openModal(urbanvibeModal);
            });
        });

    const urbanvibeBackTop = $("#urbanvibeBackTop");

    if (urbanvibeBackTop) {
        urbanvibeBackTop.addEventListener("click", () => {
            scrollModalTop(urbanvibeModal);
        });
    }


    /* -----------------------------
       L'ESSENCE PUR MODAL
    ----------------------------- */
    const lessenceModal = $("#lessenceModal");

    [
        $("#openLessence"),
        $("#openLessenceHero"),
        $("#openLessenceCaseStudy")
    ]
        .filter(Boolean)
        .forEach((opener) => {
            opener.addEventListener("click", (event) => {
                event.preventDefault();
                openModal(lessenceModal);
            });
        });

    const lessenceBackTop = $("#lessenceBackTop");

    if (lessenceBackTop) {
        lessenceBackTop.addEventListener("click", () => {
            scrollModalTop(lessenceModal);
        });
    }


    /* -----------------------------
       KEYBOARD SUPPORT
    ----------------------------- */
    document.addEventListener("keydown", (event) => {
        if (!activeModal) return;

        if (event.key === "Escape") {
            event.preventDefault();
            closeModal(activeModal);
            return;
        }

        if (event.key !== "Tab") return;

        const modalWindow = getModalWindow(activeModal);

        if (!modalWindow) return;

        const focusable = $$(
            [
                'a[href]',
                'button:not([disabled])',
                'input:not([disabled])',
                'textarea:not([disabled])',
                'select:not([disabled])',
                '[tabindex]:not([tabindex="-1"])'
            ].join(","),
            modalWindow
        ).filter((element) => element.offsetParent !== null);

        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (
            event.shiftKey &&
            document.activeElement === first
        ) {
            event.preventDefault();
            last.focus();
        } else if (
            !event.shiftKey &&
            document.activeElement === last
        ) {
            event.preventDefault();
            first.focus();
        }
    });


    /* -----------------------------
       WORK HERO KEYBOARD SUPPORT
    ----------------------------- */
    [
        $("#openUrbanvibeHero"),
        $("#openLessenceHero"),
        $("#openLessenceCaseStudy")
    ]
        .filter(Boolean)
        .forEach((hero) => {
            if (!hero.hasAttribute("tabindex")) {
                hero.setAttribute("tabindex", "0");
            }

            if (!hero.hasAttribute("role")) {
                hero.setAttribute("role", "button");
            }

            hero.addEventListener("keydown", (event) => {
                if (
                    event.key !== "Enter" &&
                    event.key !== " "
                ) {
                    return;
                }

                event.preventDefault();

                if (hero.id === "openUrbanvibeHero") {
                    openModal(urbanvibeModal);
                }

                if (hero.id === "openLessenceHero") {
                    openModal(lessenceModal);
                }
            });
        });


    /* -----------------------------
       PAGE VISIBILITY VIDEO SAFETY
    ----------------------------- */
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            $$("video").forEach((video) => {
                if (!video.paused) {
                    video.dataset.wasPlaying = "true";
                    pauseVideo(video);
                }
            });

            return;
        }

        $$(".autoplay-when-visible").forEach((video) => {
            const parentModal = video.closest(".uv-modal");

            if (
                parentModal &&
                !parentModal.classList.contains("is-open")
            ) {
                return;
            }

            if (video.dataset.wasPlaying === "true") {
                safePlay(video);
                delete video.dataset.wasPlaying;
            }
        });
    });


    /* -----------------------------
       IMAGE LOADING STATE
    ----------------------------- */
    $$("img").forEach((image) => {
        if (image.complete) {
            image.classList.add("is-loaded");
            return;
        }

        image.addEventListener(
            "load",
            () => {
                image.classList.add("is-loaded");
            },
            { once: true }
        );
    });



    /* STEP 1 — INTERACTIVE BEFORE / AFTER */
    const enhanceBeforeAfter = (container) => {
        if (!container || container.classList.contains("is-slider-enhanced")) return;
        const figures = Array.from(container.children).filter(el => el.tagName === "FIGURE");
        if (figures.length < 2) return;
        const beforeImg = $("img", figures[0]);
        const afterImg = $("img", figures[1]);
        if (!beforeImg || !afterImg) return;

        const slider = document.createElement("div");
        slider.className = "ba-slider";
        slider.tabIndex = 0;
        slider.setAttribute("role","slider");
        slider.setAttribute("aria-label","Before와 After 이미지 비교");
        slider.setAttribute("aria-valuemin","0");
        slider.setAttribute("aria-valuemax","100");
        slider.setAttribute("aria-valuenow","50");

        const before=beforeImg.cloneNode(true), after=afterImg.cloneNode(true);
        before.className="ba-before"; after.className="ba-after";
        before.removeAttribute("loading"); after.removeAttribute("loading");
        slider.append(before,after);
        slider.insertAdjacentHTML("beforeend",'<span class="ba-label before">BEFORE</span><span class="ba-label after">AFTER</span><span class="ba-divider"></span><span class="ba-handle" aria-hidden="true">‹ ›</span>');
        container.appendChild(slider);
        container.classList.add("is-slider-enhanced");

        const setPos=v=>{const n=Math.max(0,Math.min(100,v));slider.style.setProperty("--ba-position",n+"%");slider.setAttribute("aria-valuenow",Math.round(n));};
        const fromPointer=e=>{const r=slider.getBoundingClientRect();setPos(((e.clientX-r.left)/r.width)*100);};
        let drag=false;
        slider.addEventListener("pointerdown",e=>{drag=true;slider.setPointerCapture?.(e.pointerId);fromPointer(e)});
        slider.addEventListener("pointermove",e=>{if(drag)fromPointer(e)});
        slider.addEventListener("pointerup",()=>drag=false);
        slider.addEventListener("pointercancel",()=>drag=false);
        slider.addEventListener("keydown",e=>{const n=Number(slider.getAttribute("aria-valuenow"))||50;if(e.key==="ArrowLeft"){e.preventDefault();setPos(n-5)}else if(e.key==="ArrowRight"){e.preventDefault();setPos(n+5)}else if(e.key==="Home"){e.preventDefault();setPos(0)}else if(e.key==="End"){e.preventDefault();setPos(100)}});
    };
    $$(".uv-before-after, .case-compare").forEach(enhanceBeforeAfter);

    /* STEP 2 — SELECTED WORK HOVER PREVIEW */
    const canHover=window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    $$(".work-main").forEach(card=>{
        const preview=$(".work-hover-preview",card);
        if(!preview||!canHover||prefersReducedMotion)return;
        const start=()=>{preview.preload="metadata";card.classList.add("is-previewing");safePlay(preview)};
        const stop=()=>{card.classList.remove("is-previewing");pauseVideo(preview,true)};
        card.addEventListener("mouseenter",start);card.addEventListener("mouseleave",stop);
        card.addEventListener("focusin",start);card.addEventListener("focusout",stop);
    });

    /* STEP 3 — MODAL READING PROGRESS */
    allModals.forEach(modal=>{
        const modalWindow=getModalWindow(modal); if(!modalWindow)return;
        const progress=document.createElement("div");
        progress.className="modal-progress"; progress.setAttribute("aria-hidden","true");
        progress.innerHTML='<span class="modal-progress-bar"></span><span class="modal-progress-label">0%</span>';
        modalWindow.prepend(progress);
        const bar=$(".modal-progress-bar",progress),label=$(".modal-progress-label",progress);
        const update=()=>{const max=modalWindow.scrollHeight-modalWindow.clientHeight;const p=max>0?(modalWindow.scrollTop/max)*100:0;const v=Math.max(0,Math.min(100,p));bar.style.width=v+"%";label.textContent=Math.round(v)+"%"};
        modalWindow.addEventListener("scroll",update,{passive:true});update();
    });

    /* STEP 4 — PERFORMANCE / ACCESSIBILITY */
    $$("img").forEach(img=>{if(!img.hasAttribute("decoding"))img.decoding="async"});
    $$("video").forEach(video=>{video.playsInline=true;if(!video.hasAttribute("preload"))video.preload="metadata"});


    /* -----------------------------
       INITIAL MODAL STATE
    ----------------------------- */
    allModals.forEach((modal) => {
        if (!modal.classList.contains("is-open")) {
            modal.setAttribute("aria-hidden", "true");
        }
    });

});
