/* ============================================================
   ECHØR 2.0
   MASTER JAVASCRIPT
============================================================ */

(() => {

    "use strict";


    /* ========================================================
       00. HELPERS
    ======================================================== */

    const $ = (selector, scope = document) =>
        scope.querySelector(selector);


    const $$ = (selector, scope = document) =>
        [...scope.querySelectorAll(selector)];


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;



    /* ========================================================
       01. HERO REVEAL
    ======================================================== */

    const initHeroReveal = () => {

        const hero =
            $(".echor2-hero");


        if (!hero) return;


        const items =
            $$(
                "[data-echor2-reveal]",
                hero
            );


        items.forEach(
            (item, index) => {

                if (reducedMotion) {

                    item.classList.add(
                        "is-visible"
                    );

                    return;
                }


                window.setTimeout(
                    () => {

                        item.classList.add(
                            "is-visible"
                        );

                    },
                    100 + index * 100
                );

            }
        );

    };



    /* ========================================================
       02. HERO POINTER / PARALLAX
    ======================================================== */

    const initHeroPointer = () => {

        const hero =
            $(".echor2-hero");


        const image =
            $(".echor2-hero__image");


        if (
            !hero ||
            !image ||
            reducedMotion
        ) {
            return;
        }


        const finePointer =
            window.matchMedia(
                "(pointer: fine)"
            ).matches;


        if (!finePointer) return;


        hero.addEventListener(
            "pointermove",
            (event) => {

                const rect =
                    hero.getBoundingClientRect();


                const x =
                    (
                        (
                            event.clientX -
                            rect.left
                        ) /
                        rect.width
                    ) * 100;


                const y =
                    (
                        (
                            event.clientY -
                            rect.top
                        ) /
                        rect.height
                    ) * 100;


                hero.style.setProperty(
                    "--echor-mouse-x",
                    `${x}%`
                );


                hero.style.setProperty(
                    "--echor-mouse-y",
                    `${y}%`
                );


                const normalX =
                    x / 100 - 0.5;


                const normalY =
                    y / 100 - 0.5;


                image.style.transform =
                    `
                    scale(1.055)
                    translate3d(
                        ${normalX * -8}px,
                        ${normalY * -5}px,
                        0
                    )
                    `;

            }
        );


        hero.addEventListener(
            "pointerleave",
            () => {

                hero.style.setProperty(
                    "--echor-mouse-x",
                    "50%"
                );


                hero.style.setProperty(
                    "--echor-mouse-y",
                    "50%"
                );


                image.style.transform =
                    "scale(1.055) translate3d(0,0,0)";

            }
        );

    };



    /* ========================================================
       03. SMOOTH INTERNAL LINKS
    ======================================================== */

    const initSmoothScroll = () => {

        $$('a[href^="#"]').forEach(
            (link) => {

                link.addEventListener(
                    "click",
                    (event) => {

                        const id =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !id ||
                            id === "#"
                        ) {
                            return;
                        }


                        const target =
                            document.querySelector(
                                id
                            );


                        if (!target) return;


                        event.preventDefault();


                        target.scrollIntoView({
                            behavior:
                                reducedMotion
                                    ? "auto"
                                    : "smooth",

                            block: "start"
                        });

                    }
                );

            }
        );

    };



    /* ========================================================
       04. MEMBER DATA
    ======================================================== */

    const members = {

        eira: {

            number:
                "MEMBER 01",

            name:
                "EIRA",

            keyword:
                "QUIET PRESENCE",

            color:
                "RESIDUAL ROSE",

            folder:
                "EIRA",

            height:
                "168 CM",

            build:
                "SLENDER ATHLETIC",

            proportion:
                "7.5–8 HEAD",

            stance:
                "NEUTRAL / CONTROLLED",

            silhouette:
                "VERTICAL / MINIMAL"

        },


        nova: {

            number:
                "MEMBER 02",

            name:
                "NOVA",

            keyword:
                "CONTROLLED TENSION",

            color:
                "ECHO BLUE",

            folder:
                "NOVA",

            height:
                "169 CM",

            build:
                "SLENDER LINEAR",

            proportion:
                "7.5–8 HEAD",

            stance:
                "NEUTRAL / CONTROLLED",

            silhouette:
                "LINEAR / STRUCTURED"

        },


        lyra: {

            number:
                "MEMBER 03",

            name:
                "LYRA",

            keyword:
                "RESTRAINED WARMTH",

            color:
                "PALE GOLD",

            folder:
                "LYRA",

            height:
                "167 CM",

            build:
                "SLIM BALANCED",

            proportion:
                "7.5–8 HEAD",

            stance:
                "FLUID / CONTROLLED",

            silhouette:
                "CURVED / BALANCED"

        },


        cyra: {

            number:
                "MEMBER 04",

            name:
                "CYRA",

            keyword:
                "CLEAR FOCUS",

            color:
                "PRISM SILVER",

            folder:
                "CYRA",

            height:
                "170 CM",

            build:
                "SLIM ATHLETIC",

            proportion:
                "7.5–8 HEAD",

            stance:
                "NEUTRAL / CONTROLLED",

            silhouette:
                "CLEAN / COMPACT / PRECISE"

        }

    };



    /* ========================================================
       05. MEMBER MODAL
    ======================================================== */

    const initMemberModal = () => {

        const modal =
            $("#memberModal");


        if (!modal) return;


        const closeButton =
            $(".echor-member-modal2__close", modal);


        const backdrop =
            $(".echor-member-modal2__backdrop", modal);


        let lastFocusedElement = null;


        const fields = {

            number:
                $("#modalMemberNumber"),

            name:
                $("#modalMemberName"),

            keyword:
                $("#modalMemberKeyword"),

            color:
                $("#modalMemberColor"),

            front:
                $("#modalFront"),

            threeQuarter:
                $("#modalThreeQuarter"),

            profile:
                $("#modalProfile"),

            upper:
                $("#modalUpper"),

            full:
                $("#modalFull"),

            height:
                $("#modalHeight"),

            build:
                $("#modalBuild"),

            proportion:
                $("#modalProportion"),

            stance:
                $("#modalStance"),

            silhouette:
                $("#modalSilhouette")

        };


        const openModal =
            (key, trigger) => {

                const member =
                    members[key];


                if (!member) return;


                const path =
                    `assets/echor/${member.folder}`;


                fields.number.textContent =
                    member.number;


                fields.name.textContent =
                    member.name;


                fields.keyword.textContent =
                    member.keyword;


                fields.color.textContent =
                    member.color;


                fields.front.src =
                    `${path}/${member.folder}_FRONT_FINAL.png`;


                fields.threeQuarter.src =
                    `${path}/${member.folder}_RIGHT_3Q_FINAL.png`;


                fields.profile.src =
                    `${path}/${member.folder}_RIGHT_PROFILE_FINAL.png`;


                fields.upper.src =
                    `${path}/${member.folder}_UPPER_BODY_FINAL.png`;


                fields.full.src =
                    `${path}/${member.folder}_FULL_BODY_FINAL.png`;


                fields.front.alt =
                    `${member.name} Front`;


                fields.threeQuarter.alt =
                    `${member.name} Three Quarter`;


                fields.profile.alt =
                    `${member.name} Profile`;


                fields.upper.alt =
                    `${member.name} Upper Body`;


                fields.full.alt =
                    `${member.name} Full Body`;


                fields.height.textContent =
                    member.height;


                fields.build.textContent =
                    member.build;


                fields.proportion.textContent =
                    member.proportion;


                fields.stance.textContent =
                    member.stance;


                fields.silhouette.textContent =
                    member.silhouette;


                lastFocusedElement =
                    trigger || document.activeElement;


                modal.classList.add(
                    "is-open"
                );


                modal.setAttribute(
                    "aria-hidden",
                    "false"
                );


                document.body
                    .classList
                    .add(
                        "is-modal-open"
                    );


                window.setTimeout(
                    () => {

                        closeButton?.focus();

                    },
                    30
                );

            };


        const closeModal = () => {

            if (
                !modal.classList.contains(
                    "is-open"
                )
            ) {
                return;
            }


            modal.classList.remove(
                "is-open"
            );


            modal.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body
                .classList
                .remove(
                    "is-modal-open"
                );


            lastFocusedElement?.focus();

        };


        $$(
            "[data-echor-member]"
        ).forEach(
            (card) => {

                card.addEventListener(
                    "click",
                    () => {

                        openModal(
                            card.dataset
                                .echorMember,

                            card
                        );

                    }
                );

            }
        );


        closeButton?.addEventListener(
            "click",
            closeModal
        );


        backdrop?.addEventListener(
            "click",
            closeModal
        );


        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key ===
                    "Escape"
                ) {

                    closeModal();

                }

            }
        );

    };



    /* ========================================================
       06. CHARACTER SHEET LIGHTBOX
    ======================================================== */

    const initCharacterSheetLightbox =
        () => {

            const images =
                $$(
                    ".echor-character-sheets__grid img"
                );


            if (!images.length) return;


            const lightbox =
                document.createElement(
                    "div"
                );


            lightbox.className =
                "echor-lightbox";


            lightbox.innerHTML = `
                <button
                    type="button"
                    aria-label="Close image"
                >
                    ×
                </button>

                <img
                    src=""
                    alt=""
                >
            `;


            document.body.appendChild(
                lightbox
            );


            const image =
                $("img", lightbox);


            const close =
                $("button", lightbox);


            const closeLightbox =
                () => {

                    lightbox.classList.remove(
                        "is-open"
                    );


                    document.body
                        .classList
                        .remove(
                            "is-modal-open"
                        );

                };


            images.forEach(
                (sourceImage) => {

                    sourceImage.addEventListener(
                        "click",
                        () => {

                            image.src =
                                sourceImage.src;


                            image.alt =
                                sourceImage.alt;


                            lightbox.classList.add(
                                "is-open"
                            );


                            document.body
                                .classList
                                .add(
                                    "is-modal-open"
                                );

                        }
                    );

                }
            );


            close.addEventListener(
                "click",
                closeLightbox
            );


            lightbox.addEventListener(
                "click",
                (event) => {

                    if (
                        event.target ===
                        lightbox
                    ) {

                        closeLightbox();

                    }

                }
            );


            document.addEventListener(
                "keydown",
                (event) => {

                    if (
                        event.key ===
                        "Escape"
                    ) {

                        closeLightbox();

                    }

                }
            );

        };



    /* ========================================================
       07. GENERAL SCROLL REVEAL
    ======================================================== */

    const initGeneralReveal = () => {

        const targets =
            $$(
                [
                    ".echor-overview-grid",
                    ".echor-overview-visual",
                    ".echor-character-sheets__grid",
                    ".echor-visual-development h2",
                    ".echor-visual-development__grid",
                    ".echor-visual-development__process",
                    ".echor-visual-development blockquote",
                    ".echor-film h2",
                    ".echor-film__video",
                    ".echor-film__meta",
                    ".echor-film__scenes",
                    ".echor-workflow h2",
                    ".echor-workflow__steps",
                    ".echor-workflow blockquote",
                    ".echor-closing > div"
                ].join(",")
            );


        if (!targets.length) return;


        targets.forEach(
            (target) => {

                target.classList.add(
                    "echor-auto-reveal"
                );

            }
        );


        if (reducedMotion) {

            targets.forEach(
                (target) => {

                    target.classList.add(
                        "is-visible"
                    );

                }
            );

            return;
        }


        const observer =
            new IntersectionObserver(

                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add(
                                        "is-visible"
                                    );


                                observer
                                    .unobserve(
                                        entry.target
                                    );

                            }

                        }
                    );

                },

                {
                    threshold: 0.14
                }

            );


        targets.forEach(
            (target) => {

                observer.observe(
                    target
                );

            }
        );

    };



    /* ========================================================
       08. STEP 3 GROUP REVEALS
    ======================================================== */

    const initGroupSection = () => {

        const section =
            $(".echor3-group");


        if (!section) return;


        const revealItems =
            $$(
                ".echor3-reveal",
                section
            );


        if (reducedMotion) {

            revealItems.forEach(
                (item) => {

                    item.classList.add(
                        "is-visible"
                    );

                }
            );

        } else {

            const revealObserver =
                new IntersectionObserver(

                    (entries) => {

                        entries.forEach(
                            (entry) => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target
                                        .classList
                                        .add(
                                            "is-visible"
                                        );


                                    revealObserver
                                        .unobserve(
                                            entry.target
                                        );

                                }

                            }
                        );

                    },

                    {
                        threshold: 0.16
                    }

                );


            revealItems.forEach(
                (item) => {

                    revealObserver.observe(
                        item
                    );

                }
            );

        }



        /* SYNCHRONIZATION */

        const sync =
            $(".echor3-sync", section);


        if (sync) {

            if (reducedMotion) {

                sync.classList.add(
                    "is-active"
                );

            } else {

                const syncObserver =
                    new IntersectionObserver(

                        (entries) => {

                            entries.forEach(
                                (entry) => {

                                    if (
                                        entry.isIntersecting
                                    ) {

                                        window.setTimeout(
                                            () => {

                                                sync.classList.add(
                                                    "is-active"
                                                );

                                            },
                                            220
                                        );


                                        syncObserver
                                            .unobserve(
                                                sync
                                            );

                                    }

                                }
                            );

                        },

                        {
                            threshold: 0.48
                        }

                    );


                syncObserver.observe(
                    sync
                );

            }

        }



        /* FINAL GROUP */

        const finalGroup =
            $(".echor3-final", section);


        if (finalGroup) {

            if (reducedMotion) {

                finalGroup.classList.add(
                    "is-active"
                );

            } else {

                const finalObserver =
                    new IntersectionObserver(

                        (entries) => {

                            entries.forEach(
                                (entry) => {

                                    if (
                                        entry.isIntersecting
                                    ) {

                                        window.setTimeout(
                                            () => {

                                                finalGroup
                                                    .classList
                                                    .add(
                                                        "is-active"
                                                    );

                                            },
                                            160
                                        );


                                        finalObserver
                                            .unobserve(
                                                finalGroup
                                            );

                                    }

                                }
                            );

                        },

                        {
                            threshold: 0.28
                        }

                    );


                finalObserver.observe(
                    finalGroup
                );

            }

        }

    };



    /* ========================================================
       09. HERO FILM CONTROL
    ======================================================== */

    const initHeroFilm = () => {

        const film =
            $(".echor-film__video");


        if (!film) return;


        const observer =
            new IntersectionObserver(

                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting &&
                                !film.paused
                            ) {

                                film.pause();

                            }

                        }
                    );

                },

                {
                    threshold: 0.15
                }

            );


        observer.observe(
            film
        );

    };



    /* ========================================================
       10. BACK TO PROJECTS
    ======================================================== */

    const initBackToProjects = () => {

        const link =
            $(".echor-closing__back");


        if (!link) return;


        link.addEventListener(
            "click",
            (event) => {

                const href =
                    link.getAttribute(
                        "href"
                    );


                if (
                    href ===
                    "index.html#projects"
                ) {

                    return;

                }


                event.preventDefault();

                window.location.href =
                    "index.html#projects";

            }
        );

    };



    /* ========================================================
       11. INIT
    ======================================================== */

    const init = () => {

        initHeroReveal();

        initHeroPointer();

        initSmoothScroll();

        initMemberModal();

        initCharacterSheetLightbox();

        initGeneralReveal();

        initGroupSection();

        initHeroFilm();

        initBackToProjects();

    };


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init,
            {
                once: true
            }
        );

    } else {

        init();

    }

})();
/* ============================================================
   ECHØR 2.0 / STEP 4
   HERO FILM PREMIERE INTERACTION
   APPEND ONLY
============================================================ */

(() => {

    "use strict";


    const section =
        document.querySelector(
            ".echor4-film"
        );


    if (!section) return;


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;



    /* ========================================================
       01. STEP 4 REVEAL
    ======================================================== */

    const revealItems =
        section.querySelectorAll(
            [
                ".echor4-film__header",
                ".echor4-premiere",
                ".echor4-film__frame",
                ".echor4-meta",
                ".echor4-scenes",
                ".echor4-motion",
                ".echor4-film__ending"
            ].join(",")
        );


    if (reducedMotion) {

        revealItems.forEach(
            (item) => {

                item.classList.add(
                    "is-visible"
                );

            }
        );

    } else {

        const revealObserver =
            new IntersectionObserver(

                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            entry.target
                                .classList
                                .add(
                                    "is-visible"
                                );


                            revealObserver
                                .unobserve(
                                    entry.target
                                );

                        }
                    );

                },

                {
                    threshold: 0.14
                }

            );


        revealItems.forEach(
            (item) => {

                revealObserver.observe(
                    item
                );

            }
        );

    }



    /* ========================================================
       02. VIDEO STATUS
    ======================================================== */

    const video =
        section.querySelector(
            ".echor4-film__video"
        );


    const frame =
        section.querySelector(
            ".echor4-film__frame"
        );


    const status =
        section.querySelector(
            "#echorFilmStatus"
        );


    if (
        video &&
        frame &&
        status
    ) {

        const setReady =
            () => {

                status.textContent =
                    "READY / USER CONTROLLED";


                frame.classList.remove(
                    "is-playing"
                );

            };


        const setPlaying =
            () => {

                status.textContent =
                    "PLAYING / PRISM Ø";


                frame.classList.add(
                    "is-playing"
                );

            };


        const setPaused =
            () => {

                if (
                    video.ended
                ) {

                    status.textContent =
                        "COMPLETE / PRISM Ø";

                } else {

                    status.textContent =
                        "PAUSED / USER CONTROLLED";

                }


                frame.classList.remove(
                    "is-playing"
                );

            };


        video.addEventListener(
            "loadedmetadata",
            setReady
        );


        video.addEventListener(
            "play",
            setPlaying
        );


        video.addEventListener(
            "pause",
            setPaused
        );


        video.addEventListener(
            "ended",
            () => {

                status.textContent =
                    "COMPLETE / PRISM Ø";


                frame.classList.remove(
                    "is-playing"
                );

            }
        );

    }



    /* ========================================================
       03. SCENE TRACKLIST INTERACTION
    ======================================================== */

    const scenes =
        [
            ...section.querySelectorAll(
                ".echor4-scene"
            )
        ];


    if (scenes.length) {

        const activateScene =
            (target) => {

                scenes.forEach(
                    (scene) => {

                        scene.classList.remove(
                            "is-active"
                        );

                    }
                );


                target.classList.add(
                    "is-active"
                );

            };


        scenes.forEach(
            (scene) => {

                scene.addEventListener(
                    "mouseenter",
                    () => {

                        activateScene(
                            scene
                        );

                    }
                );


                scene.addEventListener(
                    "focus",
                    () => {

                        activateScene(
                            scene
                        );

                    }
                );


                scene.addEventListener(
                    "click",
                    () => {

                        activateScene(
                            scene
                        );

                    }
                );

            }
        );

    }



    /* ========================================================
       04. VIDEO FRAME AMBIENT RESPONSE
    ======================================================== */

    if (
        frame &&
        !reducedMotion &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        frame.addEventListener(
            "pointermove",
            (event) => {

                const rect =
                    frame.getBoundingClientRect();


                const x =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width;


                const y =
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height;


                const moveX =
                    (
                        x - .5
                    ) * 3;


                const moveY =
                    (
                        y - .5
                    ) * 2;


                frame.style.transform =
                    `
                    translateY(-3px)
                    translate3d(
                        ${moveX}px,
                        ${moveY}px,
                        0
                    )
                    `;

            }
        );


        frame.addEventListener(
            "pointerleave",
            () => {

                frame.style.transform =
                    "";

            }
        );

    }

})();
/* ============================================================
   ECHØR 2.0 / STEP 5
   IDENTITY MATRIX PLAYER
   APPEND ONLY
============================================================ */

(() => {

    "use strict";


    const section =
        document.querySelector(
            ".echor5-matrix"
        );


    if (!section) return;


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;



    /* ========================================================
       01. MODULE DATA
    ======================================================== */

    const modules = [

        {
            number: "MODULE 01",

            title:
                "CHARACTER<br>MASTER REFERENCE",

            description:
                "각 멤버의 얼굴, 헤어, 체형과 실루엣을 Master Reference로 정의해 이후 생성물의 일관성을 판단하는 기준으로 사용했습니다.",

            input:
                "MEMBER IDENTITY",

            process:
                "REFERENCE LOCK",

            output:
                "04 MASTER SYSTEMS",

            tool:
                "NANO BANANA / FIGMA"
        },


        {
            number: "MODULE 02",

            title:
                "DUO IDENTITY<br>DEVELOPMENT",

            description:
                "EIRA × NOVA와 LYRA × CYRA를 두 개의 유닛으로 조합해 개별 캐릭터의 차이를 유지하면서 그룹 안에서의 관계와 밸런스를 검증했습니다.",

            input:
                "04 MASTER REFERENCES",

            process:
                "DUO BALANCE",

            output:
                "02 UNIT VISUALS",

            tool:
                "NANO BANANA"
        },


        {
            number: "MODULE 03",

            title:
                "GROUP<br>KEY VISUAL",

            description:
                "두 개의 듀오 시스템을 하나의 4인 그룹으로 확장하고 Wardrobe Unity, Prism Language, Group Balance를 하나의 최종 비주얼에 통합했습니다.",

            input:
                "02 DUO SYSTEMS",

            process:
                "04 → 01 SYNC",

            output:
                "FINAL GROUP VISUAL",

            tool:
                "NANO BANANA"
        },


        {
            number: "MODULE 04",

            title:
                "VISUAL<br>REFINEMENT",

            description:
                "Face Drift, Wardrobe Balance, Group Readability 문제를 비교하고 수정하면서 OBSERVE → COMPARE → REFINE → VALIDATE 과정을 반복했습니다.",

            input:
                "V01 / V02",

            process:
                "COMPARE + REFINE",

            output:
                "CONTROLLED IDENTITY",

            tool:
                "NANO BANANA / FIGMA"
        },


        {
            number: "MODULE 05",

            title:
                "HERO FILM<br>EXPANSION",

            description:
                "정지 이미지에서 확보한 캐릭터 아이덴티티를 5개의 모션 장면으로 확장하고 40초 PRISM Ø Hero Film으로 완성했습니다.",

            input:
                "FINAL IDENTITIES",

            process:
                "STILL → MOTION",

            output:
                "40 SEC HERO FILM",

            tool:
                "VEO / PREMIERE PRO"
        }

    ];



    /* ========================================================
       02. ELEMENTS
    ======================================================== */

    const tracks =
        [
            ...section.querySelectorAll(
                ".echor5-track"
            )
        ];


    const detail =
        section.querySelector(
            ".echor5-detail"
        );


    const title =
        section.querySelector(
            "#matrixTitle"
        );


    const description =
        section.querySelector(
            "#matrixDescription"
        );


    const moduleLabel =
        section.querySelector(
            "#matrixModule"
        );


    const input =
        section.querySelector(
            "#matrixInput"
        );


    const process =
        section.querySelector(
            "#matrixProcess"
        );


    const output =
        section.querySelector(
            "#matrixOutput"
        );


    const tool =
        section.querySelector(
            "#matrixTool"
        );


    const counter =
        section.querySelector(
            "#matrixCounter"
        );


    const progress =
        section.querySelector(
            "#matrixProgress"
        );


    const status =
        section.querySelector(
            "#matrixStatus"
        );


    const previousButton =
        section.querySelector(
            "#matrixPrev"
        );


    const nextButton =
        section.querySelector(
            "#matrixNext"
        );


    const playButton =
        section.querySelector(
            "#matrixPlay"
        );


    const playIcon =
        section.querySelector(
            "#matrixPlayIcon"
        );


    let activeIndex = 0;

    let timer = null;

    let playing = false;



    /* ========================================================
       03. RENDER MODULE
    ======================================================== */

    const renderModule =
        (index) => {

            if (
                index < 0
            ) {

                index =
                    modules.length - 1;

            }


            if (
                index >= modules.length
            ) {

                index = 0;

            }


            activeIndex = index;


            const module =
                modules[index];


            tracks.forEach(
                (track, trackIndex) => {

                    track.classList.toggle(
                        "is-active",
                        trackIndex === index
                    );

                }
            );


            detail?.classList.add(
                "is-switching"
            );


            window.setTimeout(
                () => {

                    if (title) {

                        title.innerHTML =
                            module.title;

                    }


                    if (description) {

                        description.textContent =
                            module.description;

                    }


                    if (moduleLabel) {

                        moduleLabel.textContent =
                            module.number;

                    }


                    if (input) {

                        input.textContent =
                            module.input;

                    }


                    if (process) {

                        process.textContent =
                            module.process;

                    }


                    if (output) {

                        output.textContent =
                            module.output;

                    }


                    if (tool) {

                        tool.textContent =
                            module.tool;

                    }


                    if (counter) {

                        counter.textContent =
                            `${String(
                                index + 1
                            ).padStart(
                                2,
                                "0"
                            )} / 05`;

                    }


                    if (progress) {

                        progress.style.width =
                            `${(
                                (
                                    index + 1
                                ) /
                                modules.length
                            ) * 100}%`;

                    }


                    detail?.classList.remove(
                        "is-switching"
                    );

                },
                reducedMotion
                    ? 0
                    : 180
            );

        };



    /* ========================================================
       04. TRACK CLICK
    ======================================================== */

    tracks.forEach(
        (track, index) => {

            track.addEventListener(
                "click",
                () => {

                    renderModule(
                        index
                    );

                }
            );

        }
    );



    /* ========================================================
       05. PREV / NEXT
    ======================================================== */

    previousButton?.addEventListener(
        "click",
        () => {

            renderModule(
                activeIndex - 1
            );

        }
    );


    nextButton?.addEventListener(
        "click",
        () => {

            renderModule(
                activeIndex + 1
            );

        }
    );



    /* ========================================================
       06. AUTO SYNC PLAYER
    ======================================================== */

    const stopAutoPlay =
        () => {

            if (timer) {

                window.clearInterval(
                    timer
                );


                timer = null;

            }


            playing = false;


            section.classList.remove(
                "is-playing"
            );


            if (playIcon) {

                playIcon.textContent =
                    "▶";

            }


            if (status) {

                status.textContent =
                    "NOW SYNCING";

            }

        };


    const startAutoPlay =
        () => {

            stopAutoPlay();


            playing = true;


            section.classList.add(
                "is-playing"
            );


            if (playIcon) {

                playIcon.textContent =
                    "Ⅱ";

            }


            if (status) {

                status.textContent =
                    "AUTO SYNC ON";

            }


            timer =
                window.setInterval(
                    () => {

                        renderModule(
                            activeIndex + 1
                        );

                    },
                    2800
                );

        };


    playButton?.addEventListener(
        "click",
        () => {

            if (playing) {

                stopAutoPlay();

            } else {

                startAutoPlay();

            }

        }
    );



    /* ========================================================
       07. SECTION REVEAL
    ======================================================== */

    const revealItems =
        section.querySelectorAll(
            [
                ".echor5-header",
                ".echor5-player",
                ".echor5-footer"
            ].join(",")
        );


    if (reducedMotion) {

        revealItems.forEach(
            (item) => {

                item.classList.add(
                    "is-visible"
                );

            }
        );

    } else {

        const observer =
            new IntersectionObserver(

                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            entry.target
                                .classList
                                .add(
                                    "is-visible"
                                );


                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },

                {
                    threshold: .15
                }

            );


        revealItems.forEach(
            (item) => {

                observer.observe(
                    item
                );

            }
        );

    }



    /* ========================================================
       08. STOP AUTO PLAY WHEN SECTION LEAVES
    ======================================================== */

    const visibilityObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting &&
                            playing
                        ) {

                            stopAutoPlay();

                        }

                    }
                );

            },

            {
                threshold: .05
            }

        );


    visibilityObserver.observe(
        section
    );


    renderModule(0);

})();
/* ============================================================
   ECHØR 2.0 / STEP 6
   RELEASE FLOW / PROMOTION SCHEDULE
   APPEND ONLY
============================================================ */

(() => {

    "use strict";


    const section =
        document.querySelector(
            ".echor6-release"
        );


    if (!section) return;


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;



    /* ========================================================
       01. RELEASE DATA
    ======================================================== */

    const releases = [

        {
            signal:
                "SIGNAL 01 / T−21",

            kicker:
                "IDENTITY ORIGIN",

            title:
                "CHARACTER<br>DESIGN",

            description:
                "ECHØR의 출발점으로 네 멤버의 인상, 헤어, 체형, 실루엣과 성격 키워드를 정의해 각 캐릭터의 기본 정체성을 설계했습니다.",

            output:
                "04 MEMBER IDENTITIES",

            system:
                "FACE · HAIR · SILHOUETTE",

            next:
                "REFERENCE CONTROL"
        },


        {
            signal:
                "SIGNAL 02 / T−18",

            kicker:
                "MASTER LOCK",

            title:
                "REFERENCE<br>CONTROL",

            description:
                "정면, 3/4, 프로필, 상반신과 전신 이미지를 기준으로 Master Reference를 구축해 이후 생성 과정에서 얼굴과 체형이 흔들리지 않도록 기준을 고정했습니다.",

            output:
                "04 MASTER REFERENCES",

            system:
                "IDENTITY CONSISTENCY",

            next:
                "DUO DEVELOPMENT"
        },


        {
            signal:
                "SIGNAL 03 / T−14",

            kicker:
                "UNIT SIGNAL",

            title:
                "DUO<br>DEVELOPMENT",

            description:
                "EIRA × NOVA와 LYRA × CYRA를 두 개의 유닛으로 구성해 각 멤버의 개별성이 유지되는지 확인하고 그룹 안에서의 시각적 관계를 설계했습니다.",

            output:
                "02 DUO VISUALS",

            system:
                "MEMBER DISTINCTION",

            next:
                "GROUP VISUAL"
        },


        {
            signal:
                "SIGNAL 04 / T−10",

            kicker:
                "FOUR TO ONE",

            title:
                "GROUP<br>VISUAL",

            description:
                "두 개의 유닛을 하나의 4인 그룹으로 통합해 Wardrobe Unity, Prism Language와 Group Balance를 최종 Key Visual 안에서 조율했습니다.",

            output:
                "01 FINAL GROUP",

            system:
                "04 SIGNALS → 01 FREQUENCY",

            next:
                "HERO FILM"
        },


        {
            signal:
                "SIGNAL 05 / T−05",

            kicker:
                "MOTION PREMIERE",

            title:
                "HERO<br>FILM",

            description:
                "정지 이미지에서 확보한 캐릭터 정체성을 5개의 모션 장면으로 확장하고 Veo와 Premiere Pro를 활용해 40초 PRISM Ø Hero Film으로 완성했습니다.",

            output:
                "40 SEC HERO FILM",

            system:
                "STILL → MOTION",

            next:
                "PORTFOLIO LAUNCH"
        },


        {
            signal:
                "SIGNAL 06 / T−00",

            kicker:
                "ECHØR LIVE",

            title:
                "PORTFOLIO<br>LAUNCH",

            description:
                "캐릭터 설계, 그룹 비주얼, 개선 과정과 Hero Film을 하나의 인터랙티브 웹 경험으로 통합해 ECHØR 프로젝트의 최종 Case Study를 공개합니다.",

            output:
                "FINAL WEB CASE STUDY",

            system:
                "IDENTITY → EXPERIENCE",

            next:
                "LIVE"
        }

    ];



    /* ========================================================
       02. ELEMENTS
    ======================================================== */

    const cards =
        [
            ...section.querySelectorAll(
                ".echor6-card"
            )
        ];


    const detail =
        section.querySelector(
            ".echor6-detail"
        );


    const signal =
        section.querySelector(
            "#releaseSignal"
        );


    const kicker =
        section.querySelector(
            "#releaseKicker"
        );


    const title =
        section.querySelector(
            "#releaseTitle"
        );


    const description =
        section.querySelector(
            "#releaseDescription"
        );


    const output =
        section.querySelector(
            "#releaseOutput"
        );


    const system =
        section.querySelector(
            "#releaseSystem"
        );


    const next =
        section.querySelector(
            "#releaseNext"
        );


    const progress =
        section.querySelector(
            "#releaseProgress"
        );


    let activeIndex = 0;



    /* ========================================================
       03. RENDER RELEASE
    ======================================================== */

    const renderRelease =
        (index) => {

            if (
                index < 0 ||
                index >= releases.length
            ) {
                return;
            }


            activeIndex = index;


            cards.forEach(
                (card, cardIndex) => {

                    card.classList.toggle(
                        "is-active",
                        cardIndex === index
                    );

                }
            );


            detail?.classList.add(
                "is-switching"
            );


            window.setTimeout(
                () => {

                    const release =
                        releases[index];


                    if (signal) {

                        signal.textContent =
                            release.signal;

                    }


                    if (kicker) {

                        kicker.textContent =
                            release.kicker;

                    }


                    if (title) {

                        title.innerHTML =
                            release.title;

                    }


                    if (description) {

                        description.textContent =
                            release.description;

                    }


                    if (output) {

                        output.textContent =
                            release.output;

                    }


                    if (system) {

                        system.textContent =
                            release.system;

                    }


                    if (next) {

                        next.textContent =
                            release.next;

                    }


                    if (progress) {

                        progress.style.width =
                            `${(
                                (
                                    index + 1
                                ) /
                                releases.length
                            ) * 100}%`;

                    }


                    detail?.classList.remove(
                        "is-switching"
                    );

                },
                reducedMotion
                    ? 0
                    : 160
            );

        };



    /* ========================================================
       04. CARD INTERACTION
    ======================================================== */

    cards.forEach(
        (card, index) => {

            card.addEventListener(
                "click",
                () => {

                    renderRelease(
                        index
                    );

                }
            );

        }
    );



    /* ========================================================
       05. SCROLL REVEAL
    ======================================================== */

    const revealItems =
        section.querySelectorAll(
            [
                ".echor6-header",
                ".echor6-countdown",
                ".echor6-grid",
                ".echor6-detail",
                ".echor6-ending"
            ].join(",")
        );


    if (reducedMotion) {

        revealItems.forEach(
            (item) => {

                item.classList.add(
                    "is-visible"
                );

            }
        );

    } else {

        const observer =
            new IntersectionObserver(

                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            entry.target
                                .classList
                                .add(
                                    "is-visible"
                                );


                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },

                {
                    threshold: .14
                }

            );


        revealItems.forEach(
            (item) => {

                observer.observe(
                    item
                );

            }
        );

    }



    /* ========================================================
       06. KEYBOARD SUPPORT
    ======================================================== */

    section.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key ===
                "ArrowRight"
            ) {

                const nextIndex =
                    Math.min(
                        activeIndex + 1,
                        releases.length - 1
                    );


                renderRelease(
                    nextIndex
                );


                cards[
                    nextIndex
                ]?.focus();

            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                const previousIndex =
                    Math.max(
                        activeIndex - 1,
                        0
                    );


                renderRelease(
                    previousIndex
                );


                cards[
                    previousIndex
                ]?.focus();

            }

        }
    );


    renderRelease(0);

})();
/* ============================================================
   ECHØR 2.0 / STEP 7
   CONCEPT PHOTO RELEASE ARCHIVE
   APPEND ONLY
============================================================ */

(() => {

    "use strict";


    const section =
        document.querySelector(
            ".echor7-gallery"
        );


    if (!section) return;


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;



    /* ========================================================
       01. CONCEPT DATA
    ======================================================== */

    const concepts = [

        {
            image:
                "assets/echor/EIRA/EIRA_UPPER_BODY_FINAL.png",

            alt:
                "ECHØR EIRA Concept Photo",

            code:
                "CONCEPT PHOTO 01",

            type:
                "MEMBER RELEASE",

            signal:
                "RESIDUAL ROSE",

            title:
                "EIRA",

            subtitle:
                "QUIET PRESENCE",

            kicker:
                "MEMBER 01",

            description:
                "Residual Rose를 중심으로 조용하지만 강한 존재감을 표현한 EIRA의 공식 Concept Photo.",

            identity:
                "QUIET PRESENCE",

            color:
                "RESIDUAL ROSE",

            release:
                "MEMBER VISUAL",

            position:
                "center 20%"
        },


        {
            image:
                "assets/echor/NOVA/NOVA_UPPER_BODY_FINAL.png",

            alt:
                "ECHØR NOVA Concept Photo",

            code:
                "CONCEPT PHOTO 02",

            type:
                "MEMBER RELEASE",

            signal:
                "ECHO BLUE",

            title:
                "NOVA",

            subtitle:
                "CONTROLLED TENSION",

            kicker:
                "MEMBER 02",

            description:
                "Echo Blue와 직선적인 실루엣을 활용해 차갑고 통제된 긴장감을 시각화한 NOVA의 공식 Concept Photo.",

            identity:
                "CONTROLLED TENSION",

            color:
                "ECHO BLUE",

            release:
                "MEMBER VISUAL",

            position:
                "center 20%"
        },


        {
            image:
                "assets/echor/LYRA/LYRA_UPPER_BODY_FINAL.png",

            alt:
                "ECHØR LYRA Concept Photo",

            code:
                "CONCEPT PHOTO 03",

            type:
                "MEMBER RELEASE",

            signal:
                "PALE GOLD",

            title:
                "LYRA",

            subtitle:
                "RESTRAINED WARMTH",

            kicker:
                "MEMBER 03",

            description:
                "Pale Gold의 부드러운 빛과 유려한 헤어 실루엣을 통해 절제된 따뜻함을 표현한 LYRA의 공식 Concept Photo.",

            identity:
                "RESTRAINED WARMTH",

            color:
                "PALE GOLD",

            release:
                "MEMBER VISUAL",

            position:
                "center 20%"
        },


        {
            image:
                "assets/echor/CYRA/CYRA_UPPER_BODY_FINAL.png",

            alt:
                "ECHØR CYRA Concept Photo",

            code:
                "CONCEPT PHOTO 04",

            type:
                "MEMBER RELEASE",

            signal:
                "PRISM SILVER",

            title:
                "CYRA",

            subtitle:
                "CLEAR FOCUS",

            kicker:
                "MEMBER 04",

            description:
                "Prism Silver와 정교한 보브 실루엣으로 또렷하고 현대적인 집중감을 강조한 CYRA의 공식 Concept Photo.",

            identity:
                "CLEAR FOCUS",

            color:
                "PRISM SILVER",

            release:
                "MEMBER VISUAL",

            position:
                "center 20%"
        },


        {
            image:
                "assets/echor/GROUP/ECHOR_GROUP_FINAL.png",

            alt:
                "ECHØR Group Concept Photo",

            code:
                "CONCEPT PHOTO 05",

            type:
                "GROUP RELEASE",

            signal:
                "FINAL FREQUENCY",

            title:
                "ECHØR",

            subtitle:
                "FOUR MEMBERS. ONE VISUAL LANGUAGE.",

            kicker:
                "GROUP SIGNAL",

            description:
                "네 멤버의 개별성을 유지하면서 밝은 White, Silver, Prism 스타일을 하나의 그룹 언어로 통합한 Final Group Concept Photo.",

            identity:
                "GROUP BALANCE",

            color:
                "PRISM SYSTEM",

            release:
                "GROUP VISUAL",

            position:
                "center"
        },


        {
            image:
                "assets/echor/VIDEO/ECHOR_HERO_FILM_THUMBNAIL_FINAL_16x9.png",

            alt:
                "ECHØR PRISM Ø Motion Concept",

            code:
                "CONCEPT PHOTO 06",

            type:
                "MOTION RELEASE",

            signal:
                "PRISM Ø",

            title:
                "MOTION",

            subtitle:
                "THE SIGNAL ENTERS MOTION.",

            kicker:
                "HERO FILM",

            description:
                "정지 이미지에서 구축한 ECHØR의 시각 언어가 40초 Hero Film으로 확장되는 마지막 Concept Release.",

            identity:
                "IDENTITY IN MOTION",

            color:
                "VIOLET × CYAN",

            release:
                "MOTION VISUAL",

            position:
                "center"
        }

    ];



    /* ========================================================
       02. ELEMENTS
    ======================================================== */

    const feature =
        section.querySelector(
            ".echor7-feature"
        );


    const thumbs =
        [
            ...section.querySelectorAll(
                ".echor7-thumb"
            )
        ];


    const image =
        section.querySelector(
            "#conceptFeatureImage"
        );


    const code =
        section.querySelector(
            "#conceptFeatureCode"
        );


    const type =
        section.querySelector(
            "#conceptFeatureType"
        );


    const signal =
        section.querySelector(
            "#conceptFeatureSignal"
        );


    const title =
        section.querySelector(
            "#conceptFeatureTitle"
        );


    const subtitle =
        section.querySelector(
            "#conceptFeatureSubtitle"
        );


    const counter =
        section.querySelector(
            "#conceptFeatureCounter"
        );


    const kicker =
        section.querySelector(
            "#conceptFeatureKicker"
        );


    const infoTitle =
        section.querySelector(
            "#conceptFeatureInfoTitle"
        );


    const description =
        section.querySelector(
            "#conceptFeatureDescription"
        );


    const identity =
        section.querySelector(
            "#conceptFeatureIdentity"
        );


    const color =
        section.querySelector(
            "#conceptFeatureColor"
        );


    const release =
        section.querySelector(
            "#conceptFeatureRelease"
        );


    const prevButton =
        section.querySelector(
            "#conceptPrev"
        );


    const nextButton =
        section.querySelector(
            "#conceptNext"
        );


    let activeIndex = 0;



    /* ========================================================
       03. RENDER CONCEPT
    ======================================================== */

    const renderConcept =
        (index) => {

            if (
                index < 0
            ) {

                index =
                    concepts.length - 1;

            }


            if (
                index >= concepts.length
            ) {

                index = 0;

            }


            activeIndex = index;


            const concept =
                concepts[index];


            thumbs.forEach(
                (thumb, thumbIndex) => {

                    thumb.classList.toggle(
                        "is-active",
                        thumbIndex === index
                    );

                }
            );


            feature?.classList.add(
                "is-switching"
            );


            window.setTimeout(
                () => {

                    if (image) {

                        image.src =
                            concept.image;


                        image.alt =
                            concept.alt;


                        image.style.objectPosition =
                            concept.position;

                    }


                    if (code) {

                        code.textContent =
                            concept.code;

                    }


                    if (type) {

                        type.textContent =
                            concept.type;

                    }


                    if (signal) {

                        signal.textContent =
                            concept.signal;

                    }


                    if (title) {

                        title.textContent =
                            concept.title;

                    }


                    if (subtitle) {

                        subtitle.textContent =
                            concept.subtitle;

                    }


                    if (counter) {

                        counter.textContent =
                            `${String(
                                index + 1
                            ).padStart(
                                2,
                                "0"
                            )} / 06`;

                    }


                    if (kicker) {

                        kicker.textContent =
                            concept.kicker;

                    }


                    if (infoTitle) {

                        infoTitle.textContent =
                            concept.title;

                    }


                    if (description) {

                        description.textContent =
                            concept.description;

                    }


                    if (identity) {

                        identity.textContent =
                            concept.identity;

                    }


                    if (color) {

                        color.textContent =
                            concept.color;

                    }


                    if (release) {

                        release.textContent =
                            concept.release;

                    }


                    feature?.classList.remove(
                        "is-switching"
                    );

                },
                reducedMotion
                    ? 0
                    : 190
            );

        };



    /* ========================================================
       04. THUMB INTERACTION
    ======================================================== */

    thumbs.forEach(
        (thumb, index) => {

            thumb.addEventListener(
                "click",
                () => {

                    renderConcept(
                        index
                    );

                }
            );

        }
    );



    /* ========================================================
       05. PREV / NEXT
    ======================================================== */

    prevButton?.addEventListener(
        "click",
        () => {

            renderConcept(
                activeIndex - 1
            );

        }
    );


    nextButton?.addEventListener(
        "click",
        () => {

            renderConcept(
                activeIndex + 1
            );

        }
    );



    /* ========================================================
       06. KEYBOARD
    ======================================================== */

    section.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key ===
                "ArrowRight"
            ) {

                renderConcept(
                    activeIndex + 1
                );

            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                renderConcept(
                    activeIndex - 1
                );

            }

        }
    );



    /* ========================================================
       07. SCROLL REVEAL
    ======================================================== */

    const revealItems =
        section.querySelectorAll(
            [
                ".echor7-header",
                ".echor7-releasebar",
                ".echor7-feature",
                ".echor7-strip",
                ".echor7-ending"
            ].join(",")
        );


    if (reducedMotion) {

        revealItems.forEach(
            (item) => {

                item.classList.add(
                    "is-visible"
                );

            }
        );

    } else {

        const observer =
            new IntersectionObserver(

                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            entry.target
                                .classList
                                .add(
                                    "is-visible"
                                );


                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },

                {
                    threshold: .14
                }

            );


        revealItems.forEach(
            (item) => {

                observer.observe(
                    item
                );

            }
        );

    }


    renderConcept(0);

})();
/* ============================================================
   ECHØR 2.0 / STEP 8
   PRODUCTION PIPELINE
   APPEND ONLY
============================================================ */

(() => {

    "use strict";


    const section =
        document.querySelector(
            ".echor8-pipeline"
        );


    if (!section) return;


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;



    /* ========================================================
       01. PIPELINE DATA
    ======================================================== */

    const pipeline = [

        {
            phase:
                "PHASE 01",

            title:
                "DEFINE<br>IDENTITY.",

            summary:
                "생성 전에 각 멤버의 얼굴, 헤어, 체형, 실루엣과 성격 키워드를 먼저 정의해 이후 모든 결과물을 판단할 기준을 만들었습니다.",

            before:
                "캐릭터마다 명확한 비교 기준이 없는 상태",

            decision:
                "얼굴·헤어·체형·실루엣을 먼저 시스템으로 정의",

            output:
                "04 MEMBER MASTER IDENTITIES",

            tools:
                "NANO BANANA <i>+</i> FIGMA"
        },


        {
            phase:
                "PHASE 02",

            title:
                "LOCK<br>REFERENCES.",

            summary:
                "정면, 3/4, 프로필, 상반신과 전신 이미지를 기준으로 Master Reference를 고정해 새로운 이미지를 만들 때마다 동일성을 비교했습니다.",

            before:
                "각도와 프레이밍이 바뀔 때 얼굴·체형이 흔들림",

            decision:
                "다각도 Reference Sheet를 고정 비교 기준으로 사용",

            output:
                "04 CONTROLLED REFERENCE SYSTEMS",

            tools:
                "FIGMA <i>+</i> NANO BANANA"
        },


        {
            phase:
                "PHASE 03",

            title:
                "BUILD<br>THE GROUP.",

            summary:
                "4명을 한 번에 생성하기 전에 EIRA × NOVA, LYRA × CYRA 두 개의 듀오로 나누어 멤버 구분과 스타일 통일성을 먼저 검증했습니다.",

            before:
                "4인 구성에서 얼굴 평균화와 멤버 개성 약화",

            decision:
                "DUO 단위로 테스트한 뒤 04 → 01 구조로 확장",

            output:
                "02 DUOS + 01 FINAL GROUP",

            tools:
                "NANO BANANA"
        },


        {
            phase:
                "PHASE 04",

            title:
                "REFINE<br>THE OUTPUT.",

            summary:
                "V01 결과를 그대로 채택하지 않고 Face Drift, Wardrobe Balance, Group Readability 문제를 구체적으로 기록한 뒤 수정과 재검증을 반복했습니다.",

            before:
                "FACE DRIFT · HEAVY WARDROBE · WEAK DISTINCTION",

            decision:
                "OBSERVE → COMPARE → REFINE → VALIDATE",

            output:
                "CONTROLLED FINAL IDENTITY",

            tools:
                "NANO BANANA <i>+</i> FIGMA"
        },


        {
            phase:
                "PHASE 05",

            title:
                "EXPAND<br>TO MOTION.",

            summary:
                "정지 이미지에서 고정한 정체성을 모션에서도 유지하도록 장면별 움직임을 제한하고, 5개의 장면을 40초 Hero Film으로 편집했습니다.",

            before:
                "모션 생성 시 얼굴 변화와 과도한 움직임 가능성",

            decision:
                "SLOW PUSH-IN · CONTROLLED MOTION · PRISM LIGHT",

            output:
                "40 SEC PRISM Ø HERO FILM",

            tools:
                "VEO <i>+</i> PREMIERE PRO"
        }

    ];



    /* ========================================================
       02. ELEMENTS
    ======================================================== */

    const stages =
        [
            ...section.querySelectorAll(
                ".echor8-stage"
            )
        ];


    const decisionPanel =
        section.querySelector(
            ".echor8-decision"
        );


    const phase =
        section.querySelector(
            "#pipelinePhase"
        );


    const title =
        section.querySelector(
            "#pipelineTitle"
        );


    const summary =
        section.querySelector(
            "#pipelineSummary"
        );


    const before =
        section.querySelector(
            "#pipelineBefore"
        );


    const decision =
        section.querySelector(
            "#pipelineDecision"
        );


    const output =
        section.querySelector(
            "#pipelineOutput"
        );


    const tools =
        section.querySelector(
            "#pipelineTools"
        );


    let activeIndex = 0;



    /* ========================================================
       03. RENDER PIPELINE
    ======================================================== */

    const renderPipeline =
        (index) => {

            if (
                index < 0 ||
                index >= pipeline.length
            ) {
                return;
            }


            activeIndex = index;


            stages.forEach(
                (stage, stageIndex) => {

                    stage.classList.toggle(
                        "is-active",
                        stageIndex === index
                    );

                }
            );


            decisionPanel?.classList.add(
                "is-switching"
            );


            window.setTimeout(
                () => {

                    const item =
                        pipeline[index];


                    if (phase) {

                        phase.textContent =
                            item.phase;

                    }


                    if (title) {

                        title.innerHTML =
                            item.title;

                    }


                    if (summary) {

                        summary.textContent =
                            item.summary;

                    }


                    if (before) {

                        before.textContent =
                            item.before;

                    }


                    if (decision) {

                        decision.textContent =
                            item.decision;

                    }


                    if (output) {

                        output.textContent =
                            item.output;

                    }


                    if (tools) {

                        tools.innerHTML =
                            item.tools;

                    }


                    decisionPanel?.classList.remove(
                        "is-switching"
                    );

                },
                reducedMotion
                    ? 0
                    : 170
            );

        };



    /* ========================================================
       04. STAGE INTERACTION
    ======================================================== */

    stages.forEach(
        (stage, index) => {

            stage.addEventListener(
                "click",
                () => {

                    renderPipeline(
                        index
                    );

                }
            );

        }
    );



    /* ========================================================
       05. KEYBOARD CONTROL
    ======================================================== */

    section.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key ===
                "ArrowRight"
            ) {

                const nextIndex =
                    Math.min(
                        activeIndex + 1,
                        pipeline.length - 1
                    );


                renderPipeline(
                    nextIndex
                );


                stages[
                    nextIndex
                ]?.focus();

            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                const previousIndex =
                    Math.max(
                        activeIndex - 1,
                        0
                    );


                renderPipeline(
                    previousIndex
                );


                stages[
                    previousIndex
                ]?.focus();

            }

        }
    );



    /* ========================================================
       06. SCROLL REVEAL
    ======================================================== */

    const revealItems =
        section.querySelectorAll(
            [
                ".echor8-header",
                ".echor8-system",
                ".echor8-proof",
                ".echor8-control-log",
                ".echor8-tools",
                ".echor8-insight"
            ].join(",")
        );


    if (reducedMotion) {

        revealItems.forEach(
            (item) => {

                item.classList.add(
                    "is-visible"
                );

            }
        );

    } else {

        const observer =
            new IntersectionObserver(

                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            entry.target
                                .classList
                                .add(
                                    "is-visible"
                                );


                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },

                {
                    threshold: .14
                }

            );


        revealItems.forEach(
            (item) => {

                observer.observe(
                    item
                );

            }
        );

    }


    renderPipeline(0);

})();
/* ============================================================
   ECHØR 2.0 / STEP 9
   FINAL LAUNCH / CLOSING CTA
   APPEND ONLY
============================================================ */

(() => {

    "use strict";


    const section =
        document.querySelector(
            ".echor9-closing"
        );


    if (!section) return;


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;



    /* ========================================================
       01. FINAL REVEAL
    ======================================================== */

    if (reducedMotion) {

        section.classList.add(
            "is-visible"
        );

    } else {

        const revealObserver =
            new IntersectionObserver(

                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            section.classList.add(
                                "is-visible"
                            );


                            startCounters();


                            revealObserver
                                .unobserve(
                                    section
                                );

                        }
                    );

                },

                {
                    threshold: .16
                }

            );


        revealObserver.observe(
            section
        );

    }



    /* ========================================================
       02. STAT COUNTERS
    ======================================================== */

    let countersStarted = false;


    function startCounters() {

        if (
            countersStarted ||
            reducedMotion
        ) {
            return;
        }


        countersStarted = true;


        const numbers =
            section.querySelectorAll(
                ".echor9-stat-number"
            );


        numbers.forEach(
            (element) => {

                const target =
                    Number(
                        element.dataset
                            .echor9Count
                    );


                const padding =
                    Number(
                        element.dataset
                            .echor9Pad || 0
                    );


                const suffix =
                    element.dataset
                        .echor9Suffix || "";


                const duration = 850;

                const start =
                    performance.now();


                const animate =
                    (time) => {

                        const progress =
                            Math.min(
                                (
                                    time -
                                    start
                                ) /
                                duration,
                                1
                            );


                        const eased =
                            1 -
                            Math.pow(
                                1 - progress,
                                3
                            );


                        const current =
                            Math.round(
                                target *
                                eased
                            );


                        const formatted =
                            padding
                                ? String(
                                    current
                                ).padStart(
                                    padding,
                                    "0"
                                )
                                : String(
                                    current
                                );


                        element.textContent =
                            formatted +
                            suffix;


                        if (
                            progress < 1
                        ) {

                            requestAnimationFrame(
                                animate
                            );

                        }

                    };


                requestAnimationFrame(
                    animate
                );

            }
        );

    }



    if (reducedMotion) {

        startCounters();

    }



    /* ========================================================
       03. SUBTLE BACKGROUND PARALLAX
    ======================================================== */

    const image =
        section.querySelector(
            ".echor9-closing__image"
        );


    const finePointer =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;


    if (
        image &&
        finePointer &&
        !reducedMotion
    ) {

        section.addEventListener(
            "pointermove",
            (event) => {

                const rect =
                    section.getBoundingClientRect();


                const x =
                    (
                        event.clientX -
                        rect.left
                    ) /
                    rect.width;


                const y =
                    (
                        event.clientY -
                        rect.top
                    ) /
                    rect.height;


                const moveX =
                    (
                        x - .5
                    ) * -10;


                const moveY =
                    (
                        y - .5
                    ) * -6;


                image.style.transform =
                    `
                    scale(1.07)
                    translate3d(
                        ${moveX}px,
                        ${moveY}px,
                        0
                    )
                    `;

            }
        );


        section.addEventListener(
            "pointerleave",
            () => {

                image.style.transform =
                    "scale(1.07) translate3d(0,0,0)";

            }
        );

    }

})();
