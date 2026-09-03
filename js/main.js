/* MENTOR FEEDBACK FINAL PATCH: existing reduced-motion, lazy video preload, modal focus/scroll behavior retained. */
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
        $("#openLessenceCaseStudy"),
        $("#openAeronHero")
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
       AERON Z1 / ZERO GRAVITY MODAL
    ----------------------------- */
    const aeronModal = $("#aeronModal");

    [
        $("#openAeron"),
        $("#openAeronHero"),
        $("#openAeronCaseStudy")
    ]
        .filter(Boolean)
        .forEach((opener) => {
            opener.addEventListener("click", (event) => {
                event.preventDefault();
                openModal(aeronModal);
            });
        });

    const aeronBackTop = $("#aeronBackTop");
    if (aeronBackTop) {
        aeronBackTop.addEventListener("click", () => scrollModalTop(aeronModal));
    }

    const aeronBackProjects = $("#aeronBackProjects");
    if (aeronBackProjects) {
        aeronBackProjects.addEventListener("click", () => closeModal(aeronModal));
    }

    const aeronFilmJump = $("#openAeronFilm");
    if (aeronFilmJump) {
        aeronFilmJump.addEventListener("click", (event) => {
            event.preventDefault();
            openModal(aeronModal);
            window.setTimeout(() => {
                const film = $("#aeronFinalFilm", aeronModal);
                const modalWindow = getModalWindow(aeronModal);
                if (film && modalWindow) {
                    modalWindow.scrollTo({
                        top: film.offsetTop,
                        behavior: prefersReducedMotion ? "auto" : "smooth"
                    });
                }
            }, 80);
        });
    }

    $$(".aeron-scroll-cue", aeronModal).forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const target = $(link.getAttribute("href"), aeronModal);
            const modalWindow = getModalWindow(aeronModal);
            if (target && modalWindow) {
                modalWindow.scrollTo({
                    top: target.offsetTop,
                    behavior: prefersReducedMotion ? "auto" : "smooth"
                });
            }
        });
    });


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

                if (hero.id === "openAeronHero") {
                    openModal(aeronModal);
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
        slider.setAttribute("aria-valuetext","Before 50%, After 50%");

        const before=beforeImg.cloneNode(true), after=afterImg.cloneNode(true);
        before.className="ba-before"; after.className="ba-after";
        before.removeAttribute("loading"); after.removeAttribute("loading");
        slider.append(before,after);
        slider.insertAdjacentHTML(
            "beforeend",
            '<span class="ba-label before">BEFORE</span>' +
            '<span class="ba-label after">AFTER</span>' +
            '<span class="ba-divider" aria-hidden="true"></span>' +
            '<span class="ba-drag-zone" aria-hidden="true"></span>' +
            '<span class="ba-handle" aria-hidden="true">‹ ›</span>'
        );
        container.appendChild(slider);
        container.classList.add("is-slider-enhanced");

        const dragZone = $(".ba-drag-zone", slider);
        let currentPosition = 50;
        let dragging = false;
        let startClientX = 0;
        let startPosition = 50;
        let frameId = null;
        let pendingPosition = 50;

        const setPos = (value) => {
            const next = Math.max(0, Math.min(100, value));
            currentPosition = next;
            slider.style.setProperty("--ba-position", next + "%");
            slider.setAttribute("aria-valuenow", String(Math.round(next)));
            slider.setAttribute(
                "aria-valuetext",
                `Before ${Math.round(next)}%, After ${Math.round(100 - next)}%`
            );
        };

        const queuePosition = (value) => {
            pendingPosition = value;
            if (frameId !== null) return;

            frameId = requestAnimationFrame(() => {
                setPos(pendingPosition);
                frameId = null;
            });
        };

        const beginDrag = (event) => {
            dragging = true;
            startClientX = event.clientX;
            startPosition = currentPosition;
            dragZone.classList.add("is-dragging");
            dragZone.setPointerCapture?.(event.pointerId);
            event.preventDefault();
        };

        const moveDrag = (event) => {
            if (!dragging) return;

            const rect = slider.getBoundingClientRect();
            if (!rect.width) return;

            const deltaPercent = ((event.clientX - startClientX) / rect.width) * 100;
            queuePosition(startPosition + deltaPercent);
            event.preventDefault();
        };

        const endDrag = (event) => {
            if (!dragging) return;
            dragging = false;
            dragZone.classList.remove("is-dragging");
            dragZone.releasePointerCapture?.(event.pointerId);
        };

        // 중요:
        // 이미지 아무 곳을 클릭해도 경계선이 순간 이동하지 않습니다.
        // 현재 경계선/핸들 주변의 드래그 영역을 잡고 움직일 때만 이동합니다.
        dragZone.addEventListener("pointerdown", beginDrag);
        dragZone.addEventListener("pointermove", moveDrag);
        dragZone.addEventListener("pointerup", endDrag);
        dragZone.addEventListener("pointercancel", endDrag);

        slider.addEventListener("keydown", (event) => {
            const step = event.shiftKey ? 10 : 3;

            if (event.key === "ArrowLeft") {
                event.preventDefault();
                setPos(currentPosition - step);
            } else if (event.key === "ArrowRight") {
                event.preventDefault();
                setPos(currentPosition + step);
            } else if (event.key === "Home") {
                event.preventDefault();
                setPos(0);
            } else if (event.key === "End") {
                event.preventDefault();
                setPos(100);
            }
        });
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
       MENTOR REFERENCE / SELECTIVE MICRO INTERACTIONS
    ----------------------------- */
    const directionTicker = $(".direction-ticker-track");
    if (directionTicker && !prefersReducedMotion) {
        directionTicker.addEventListener("mouseenter", () => {
            directionTicker.style.animationPlayState = "paused";
        });
        directionTicker.addEventListener("mouseleave", () => {
            directionTicker.style.animationPlayState = "running";
        });
    }

    const processItems = $$(".process-list li");
    if (processItems.length && "IntersectionObserver" in window && !prefersReducedMotion) {
        const processObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-process-visible");
                    processObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        processItems.forEach((item) => processObserver.observe(item));
    }


    /* -----------------------------
       MENTOR FEEDBACK / EVIDENCE REVEAL
       추가 기능이 아니라 제작 증거의 가독성만 보강합니다.
    ----------------------------- */
    const evidenceBlocks = $$(".creator-proof-grid article, .decision-evidence, .trouble-proof, .ai-creator-proof > div");

    if (evidenceBlocks.length && "IntersectionObserver" in window && !prefersReducedMotion) {
        const evidenceObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-evidence-visible");
                    evidenceObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.14 });

        evidenceBlocks.forEach((block) => {
            block.classList.add("evidence-reveal");
            evidenceObserver.observe(block);
        });
    }

    /* -----------------------------
       INITIAL MODAL STATE
    ----------------------------- */
    allModals.forEach((modal) => {
        if (!modal.classList.contains("is-open")) {
            modal.setAttribute("aria-hidden", "true");
        }
    });

});


/* =========================================================
   MOTIONARY 2026 — INTRO / CAPABILITY / PROCESS INTERACTION
========================================================= */
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const intro = document.getElementById('motionaryIntro');
  if (intro) {
    const alreadySeen = sessionStorage.getItem('motionaryIntroSeen') === '1';
    if (alreadySeen || reduced) { intro.remove(); }
    else {
      document.body.classList.add('intro-lock');
      requestAnimationFrame(() => intro.classList.add('is-running'));
      const steps = [...intro.querySelectorAll('.intro-step')];
      const brand = intro.querySelector('.intro-brand');
      const times = window.innerWidth < 768 ? [0,180,360,540,760,1040] : [0,260,520,780,1040,1420];
      steps.forEach((step, i) => setTimeout(() => {
        steps.forEach(s => s.classList.remove('is-active'));
        step.classList.add('is-active');
      }, times[i]));
      setTimeout(() => { steps.forEach(s=>s.classList.remove('is-active')); brand?.classList.add('is-active'); }, times[4]);
      setTimeout(() => {
        intro.classList.add('is-done'); document.body.classList.remove('intro-lock');
        sessionStorage.setItem('motionaryIntroSeen','1');
        setTimeout(()=>intro.remove(),600);
      }, times[5]);
    }
  }

  const capItems = [...document.querySelectorAll('#capabilityGrid article[data-preview]')];
  const capImage = document.getElementById('capabilityPreviewImage');
  const capLabel = document.getElementById('capabilityPreviewLabel');
  const capFigure = capImage?.closest('.capability-preview');
  const activateCapability = (item) => {
    if (!item || !capImage) return;
    capItems.forEach(el=>el.classList.toggle('is-active',el===item));
    capFigure?.classList.add('is-changing');
    const next=item.dataset.preview; const label=item.dataset.label||'';
    const preload=new Image(); preload.onload=()=>{ capImage.src=next; capImage.alt=label; if(capLabel) capLabel.textContent=label; requestAnimationFrame(()=>capFigure?.classList.remove('is-changing')); }; preload.src=next;
  };
  capItems.forEach(item=>{ item.addEventListener('mouseenter',()=>activateCapability(item)); item.addEventListener('focus',()=>activateCapability(item)); });
  if(capItems.length) activateCapability(capItems[0]);

  const processItems=[...document.querySelectorAll('.process-list li')];
  if(processItems.length && 'IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{ if(entry.isIntersecting){ processItems.forEach(x=>x.classList.remove('is-current')); entry.target.classList.add('is-current'); }});
    },{rootMargin:'-38% 0px -48% 0px',threshold:0});
    processItems.forEach((li,i)=>{if(i===0)li.classList.add('is-current');io.observe(li)});
  }
})();


/* =========================================================
   FINAL MOBILE PERFORMANCE PATCH
   - Mobile: do not autoplay decorative project previews.
   - Below-fold images decode lazily via native browser support.
   - Hero remains priority content, but heavy previews wait for interaction.
========================================================= */
(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const saveData = navigator.connection && navigator.connection.saveData;
    const slowConnection = navigator.connection && /(^|-)2g$/.test(navigator.connection.effectiveType || '');

    document.querySelectorAll('img').forEach((img, index) => {
        if (!img.hasAttribute('decoding')) img.decoding = 'async';
        // Preserve above-the-fold browser priority, defer the rest.
        if (index > 1 && !img.hasAttribute('loading')) img.loading = 'lazy';
    });

    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.preload = (isMobile || saveData || slowConnection) ? 'metadata' : 'auto';
    }

    if (isMobile || saveData || slowConnection) {
        document.querySelectorAll('.work-hover-preview, .autoplay-when-visible').forEach(video => {
            video.removeAttribute('autoplay');
            video.preload = 'none';
            try { video.pause(); } catch (_) {}
        });
    }

    // When a user explicitly opens/plays content, the browser can then fetch it normally.
    document.querySelectorAll('.work-play, .work-head-actions button, .case-detail-button').forEach(control => {
        control.addEventListener('pointerdown', () => {
            const section = control.closest('.work-project-head, .case-project-card, .work-showcase');
            const nearbyVideo = section?.parentElement?.querySelector('video[preload="none"]') || section?.querySelector('video[preload="none"]');
            if (nearbyVideo) nearbyVideo.preload = 'metadata';
        }, { once: true, passive: true });
    });
})();
