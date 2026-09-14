(() => {
  "use strict";

  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  // Header
  const header = $(".site-header");
  const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 24);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Cursor glow (desktop only)
  const glow = $(".cursor-glow");
  if (glow && window.matchMedia("(pointer:fine)").matches) {
    window.addEventListener("pointermove", (e) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
      glow.style.opacity = "1";
    }, { passive: true });
    document.addEventListener("mouseleave", () => { glow.style.opacity = "0"; });
  }

  // Smooth section buttons
  $$('[data-scroll-target]').forEach((button) => {
    button.addEventListener("click", () => {
      const target = $(button.dataset.scrollTarget);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });


  // Bright Motion Hero background
  const heroSection = $("#hero");
  const heroBackgroundVideo = $("#heroBackgroundVideo");

  if (heroSection && heroBackgroundVideo) {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const showVideoFallback = () => {
      heroSection.classList.add("hero-video-fallback");
    };

    const tryPlayHero = async () => {
      if (reducedMotion || document.hidden) return;
      try {
        heroBackgroundVideo.muted = true;
        await heroBackgroundVideo.play();
        heroSection.classList.remove("hero-video-fallback");
      } catch (error) {
        // The upper-body group visual remains visible as the graceful fallback.
        console.warn("ECHØR hero background autoplay is unavailable.", error);
      }
    };

    heroBackgroundVideo.addEventListener("loadeddata", tryPlayHero, { once: true });
    heroBackgroundVideo.addEventListener("canplay", tryPlayHero, { once: true });
    heroBackgroundVideo.addEventListener("error", showVideoFallback);

    if (reducedMotion) {
      heroBackgroundVideo.pause();
    } else if ("IntersectionObserver" in window) {
      const heroVideoObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.08) {
            tryPlayHero();
          } else {
            heroBackgroundVideo.pause();
          }
        });
      }, { threshold: [0, 0.08, 0.25] });

      heroVideoObserver.observe(heroSection);
    } else {
      tryPlayHero();
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        heroBackgroundVideo.pause();
      } else {
        const rect = heroSection.getBoundingClientRect();
        const visible = rect.bottom > 0 && rect.top < window.innerHeight;
        if (visible) tryPlayHero();
      }
    });
  }

  // Reveal observer
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
  $$(".reveal").forEach((el) => revealObserver.observe(el));

  // Release progress animation
  const releaseLine = $(".release-line");
  if (releaseLine) {
    const releaseObserver = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        releaseLine.classList.add("is-visible");
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    releaseObserver.observe(releaseLine);
  }

  // Hero Film
  const film = $("#heroFilm");
  const filmStage = film?.closest(".film-stage");
  const filmPlay = $("#filmPlay");
  if (film && filmPlay && filmStage) {
    const playFilm = async () => {
      try {
        film.controls = true;
        await film.play();
        filmStage.classList.add("is-playing");
      } catch (err) {
        film.controls = true;
        console.warn("Video playback requires user interaction.", err);
      }
    };
    filmPlay.addEventListener("click", playFilm);
    film.addEventListener("pause", () => {
      if (film.currentTime < film.duration) filmStage.classList.remove("is-playing");
    });
    film.addEventListener("play", () => filmStage.classList.add("is-playing"));
    film.addEventListener("ended", () => filmStage.classList.remove("is-playing"));

    $$(".scene-step").forEach((step) => {
      step.addEventListener("click", async () => {
        $$(".scene-step").forEach((item) => item.classList.remove("active"));
        step.classList.add("active");
        film.currentTime = Number(step.dataset.time || 0);
        await playFilm();
      });
    });

    film.addEventListener("timeupdate", () => {
      const t = film.currentTime;
      let activeIndex = Math.min(4, Math.floor(t / 8));
      const steps = $$(".scene-step");
      steps.forEach((step, index) => step.classList.toggle("active", index === activeIndex));
    });
  }

  // Member modal data
  const members = {
    eira: {
      index: "MEMBER 01",
      name: "EIRA",
      phrase: "QUIET PRESENCE",
      height: "168 CM",
      body: "SLENDER ATHLETIC",
      proportion: "7.5–8 HEAD",
      accent: "RESIDUAL ROSE",
      dir: "EIRA",
      sheet: "EIRA_CHARACTER_SHEET_FINAL.png",
      files: ["EIRA_FRONT_FINAL.png", "EIRA_RIGHT_3Q_FINAL.png", "EIRA_RIGHT_PROFILE_FINAL.png", "EIRA_UPPER_BODY_FINAL.png", "EIRA_FULL_BODY_FINAL.png"]
    },
    nova: {
      index: "MEMBER 02",
      name: "NOVA",
      phrase: "CONTROLLED TENSION",
      height: "169 CM",
      body: "SLENDER LINEAR",
      proportion: "7.5–8 HEAD",
      accent: "ECHO BLUE",
      dir: "NOVA",
      sheet: "NOVA_CHARACTER_SHEET_FINAL.png",
      files: ["NOVA_FRONT_FINAL.png", "NOVA_RIGHT_3Q_FINAL.png", "NOVA_RIGHT_PROFILE_FINAL.png", "NOVA_UPPER_BODY_FINAL.png", "NOVA_FULL_BODY_FINAL.png"]
    },
    lyra: {
      index: "MEMBER 03",
      name: "LYRA",
      phrase: "RESTRAINED WARMTH",
      height: "167 CM",
      body: "SLIM BALANCED",
      proportion: "7.5–8 HEAD",
      accent: "PALE GOLD",
      dir: "LYRA",
      sheet: "LYRA_CHARACTER_SHEET_FINAL.png",
      files: ["LYRA_FRONT_FINAL.png", "LYRA_RIGHT_3Q_FINAL.png", "LYRA_RIGHT_PROFILE_FINAL.png", "LYRA_UPPER_BODY_FINAL.png", "LYRA_FULL_BODY_FINAL.png"]
    },
    cyra: {
      index: "MEMBER 04",
      name: "CYRA",
      phrase: "CLEAR FOCUS",
      height: "170 CM",
      body: "SLIM ATHLETIC",
      proportion: "7.5–8 HEAD",
      accent: "PRISM SILVER",
      dir: "CYRA",
      sheet: "CYRA_CHARACTER_SHEET_FINAL.png",
      files: ["CYRA_FRONT_FINAL.png", "CYRA_RIGHT_3Q_FINAL.png", "CYRA_RIGHT_PROFILE_FINAL.png", "CYRA_UPPER_BODY_FINAL.png", "CYRA_FULL_BODY_FINAL.png"]
    }
  };

  const modal = $("#memberModal");
  const modalGallery = $("#modalGallery");
  const modalSheetImage = $("#modalSheetImage");
  const openMember = (key) => {
    const member = members[key];
    if (!modal || !member) return;
    $("#modalMemberIndex").textContent = member.index;
    $("#modalMemberName").textContent = member.name;
    $("#modalMemberPhrase").textContent = member.phrase;
    $("#modalHeight").textContent = member.height;
    $("#modalBody").textContent = member.body;
    $("#modalProportion").textContent = member.proportion;
    $("#modalAccent").textContent = member.accent;
    if (modalSheetImage) {
      modalSheetImage.src = `assets/echor/${member.dir}/${member.sheet}`;
      modalSheetImage.alt = `${member.name} character identity sheet`;
    }
    modalGallery.innerHTML = member.files.map((file, i) => {
      const labels = ["FRONT / MASTER", "3/4 RIGHT", "PROFILE RIGHT", "UPPER BODY", "FULL BODY"];
      return `<figure><img src="assets/echor/${member.dir}/${file}" alt="${member.name} ${labels[i]}"><figcaption>${labels[i]}</figcaption></figure>`;
    }).join("");
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    $(".modal-close", modal)?.focus();
  };
  const closeMember = () => {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };
  $$(".member-card").forEach((card) => {
    card.addEventListener("click", () => openMember(card.dataset.member));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openMember(card.dataset.member); }
    });
  });
  $$('[data-close-modal]').forEach((el) => el.addEventListener("click", closeMember));

  // Identity Matrix
  const matrixName = $("#matrixName");
  const matrixPhrase = $("#matrixPhrase");
  const matrixProgress = $("#matrixProgress");
  $$(".matrix-track").forEach((track) => {
    track.addEventListener("click", () => {
      $$(".matrix-track").forEach((t) => t.classList.remove("active"));
      track.classList.add("active");
      if (matrixName) matrixName.textContent = track.dataset.name;
      if (matrixPhrase) matrixPhrase.textContent = track.dataset.phrase;
      if (matrixProgress) matrixProgress.style.width = `${Number(track.dataset.index) * 25}%`;
    });
  });

  // Gallery lightbox
  const lightbox = $("#lightbox");
  const lightboxImage = $("#lightboxImage");
  const lightboxTitle = $("#lightboxTitle");
  const openLightbox = (item) => {
    if (!lightbox || !lightboxImage || !lightboxTitle) return;
    lightboxImage.src = item.dataset.image;
    lightboxImage.alt = item.dataset.title || "ECHØR concept visual";
    lightboxTitle.textContent = item.dataset.title || "ECHØR CONCEPT PHOTO";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  };
  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };
  $$(".gallery-item").forEach((item) => item.addEventListener("click", () => openLightbox(item)));
  $$('[data-close-lightbox]').forEach((el) => el.addEventListener("click", closeLightbox));

  // Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMember();
      closeLightbox();
    }
  });

  // Image fallback helper: if a web-use asset has a .png name but only .jpeg exists,
  // the page will try the jpeg extension once. This is useful while assets are being finalized.
  $$('img').forEach((img) => {
    img.addEventListener('error', () => {
      if (img.dataset.fallbackTried) return;
      img.dataset.fallbackTried = '1';
      const src = img.getAttribute('src') || '';
      if (src.endsWith('.png')) img.src = src.replace(/\.png$/i, '.jpeg');
    });
  });

  // Footer year
  const year = $("#currentYear");
  if (year) year.textContent = String(new Date().getFullYear());
})();
