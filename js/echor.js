// ==================================================
// ECHØR CASE STUDY
// COMPLETE SCRIPT
// ==================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initScrollReveal();

        initSheetModal();

        initIdentityModal();

    }
);



/* ==================================================
   SCROLL REVEAL
================================================== */

function initScrollReveal() {

    const targets =
        document.querySelectorAll(
            ".echor-overview__content, " +
            ".echor-overview__visual, " +
            ".echor-characters__header, " +
            ".echor-member-card, " +
            ".echor-sheets__header, " +
            ".echor-sheet-card"
        );


    if (!targets.length) {
        return;
    }


    targets.forEach(
        (target) => {

            target.classList.add(
                "echor-reveal"
            );

        }
    );


    const observer =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "is-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.10,
                rootMargin: "0px 0px -30px 0px"
            }

        );


    targets.forEach(
        (target) => {

            observer.observe(
                target
            );

        }
    );

}



/* ==================================================
   CHARACTER SHEET MODAL
================================================== */

function initSheetModal() {

    const modal =
        document.getElementById(
            "echor-sheet-modal"
        );


    const image =
        document.getElementById(
            "echor-sheet-modal-image"
        );


    const title =
        document.getElementById(
            "echor-sheet-modal-title"
        );


    const closeButton =
        document.getElementById(
            "echor-sheet-modal-close"
        );


    const backdrop =
        modal?.querySelector(
            ".echor-sheet-modal__backdrop"
        );


    const cards =
        document.querySelectorAll(
            ".echor-sheet-card"
        );


    if (
        !modal ||
        !image ||
        !title ||
        !closeButton ||
        !backdrop
    ) {
        return;
    }


    function openModal(card) {

        image.src =
            card.dataset.fullImage;


        image.alt =
            `${card.dataset.member} Character Sheet`;


        title.textContent =
            `${card.dataset.member} / CHARACTER SHEET`;


        modal.classList.add(
            "is-open"
        );


        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "modal-open"
        );

    }


    function closeModal() {

        modal.classList.remove(
            "is-open"
        );


        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "modal-open"
        );


        image.src = "";

    }


    cards.forEach(
        (card) => {

            card.addEventListener(
                "click",
                () => {

                    openModal(card);

                }
            );

        }
    );


    closeButton.addEventListener(
        "click",
        closeModal
    );


    backdrop.addEventListener(
        "click",
        closeModal
    );


    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                modal.classList.contains(
                    "is-open"
                )
            ) {

                closeModal();

            }

        }
    );

}



/* ==================================================
   MEMBER DATA
================================================== */

const echorMembers = {

    eira: {

        number: "MEMBER 01",

        name: "EIRA",

        keyword: "Quiet Presence",

        accent: "Residual Rose",

        folder: "assets/echor/EIRA",

        references: [
            ["EIRA_FRONT_FINAL.png", "FRONT"],
            ["EIRA_RIGHT_3Q_FINAL.png", "3/4 VIEW"],
            ["EIRA_RIGHT_PROFILE_FINAL.png", "PROFILE"],
            ["EIRA_UPPER_BODY_FINAL.png", "UPPER BODY"]
        ],

        fullBody:
            "EIRA_FULL_BODY_FINAL.png",

        body: [
            ["HEIGHT", "168 CM"],
            ["BUILD", "SLENDER ATHLETIC"],
            ["PROPORTION", "7.5–8 HEAD"],
            ["STANCE", "NEUTRAL / CONTROLLED"],
            ["SILHOUETTE", "VERTICAL / MINIMAL"]
        ]

    },


    nova: {

        number: "MEMBER 02",

        name: "NOVA",

        keyword: "Controlled Tension",

        accent: "Echo Blue",

        folder: "assets/echor/NOVA",

        references: [
            ["NOVA_FRONT_FINAL.png", "FRONT"],
            ["NOVA_RIGHT_3Q_FINAL.png", "3/4 VIEW"],
            ["NOVA_RIGHT_PROFILE_FINAL.png", "PROFILE"],
            ["NOVA_UPPER_BODY_FINAL.png", "UPPER BODY"]
        ],

        fullBody:
            "NOVA_FULL_BODY_FINAL.png",

        body: [
            ["HEIGHT", "169 CM"],
            ["BUILD", "SLENDER LINEAR"],
            ["PROPORTION", "7.5–8 HEAD"],
            ["STANCE", "NEUTRAL / CONTROLLED"],
            ["SILHOUETTE", "LINEAR / STRUCTURED"]
        ]

    },


    lyra: {

        number: "MEMBER 03",

        name: "LYRA",

        keyword: "Restrained Warmth",

        accent: "Pale Gold",

        folder: "assets/echor/LYRA",

        references: [
            ["LYRA_FRONT_FINAL.png", "FRONT"],
            ["LYRA_RIGHT_3Q_FINAL.png", "3/4 VIEW"],
            ["LYRA_RIGHT_PROFILE_FINAL.png", "PROFILE"],
            ["LYRA_UPPER_BODY_FINAL.png", "UPPER BODY"]
        ],

        fullBody:
            "LYRA_FULL_BODY_FINAL.png",

        body: [
            ["HEIGHT", "167 CM"],
            ["BUILD", "SLIM BALANCED"],
            ["PROPORTION", "7.5–8 HEAD"],
            ["STANCE", "FLUID / CONTROLLED"],
            ["SILHOUETTE", "CURVED / BALANCED"]
        ]

    },


    cyra: {

        number: "MEMBER 04",

        name: "CYRA",

        keyword: "Clear Focus",

        accent: "Prism Silver",

        folder: "assets/echor/CYRA",

        references: [
            ["CYRA_FRONT_FINAL.png", "FRONT"],
            ["CYRA_RIGHT_3Q_FINAL.png", "3/4 VIEW"],
            ["CYRA_RIGHT_PROFILE_FINAL.png", "PROFILE"],
            ["CYRA_UPPER_BODY_FINAL.png", "UPPER BODY"]
        ],

        fullBody:
            "CYRA_FULL_BODY_FINAL.png",

        body: [
            ["HEIGHT", "170 CM"],
            ["BUILD", "SLIM ATHLETIC"],
            ["PROPORTION", "7.5–8 HEAD"],
            ["STANCE", "NEUTRAL / CONTROLLED"],
            ["SILHOUETTE", "CLEAN / COMPACT / PRECISE"]
        ]

    }

};



/* ==================================================
   MEMBER IDENTITY MODAL
================================================== */

function initIdentityModal() {

    const modal =
        document.getElementById(
            "echor-identity-modal"
        );


    if (!modal) {
        return;
    }


    const cards =
        document.querySelectorAll(
            ".echor-member-card"
        );


    const closeButton =
        document.getElementById(
            "identity-modal-close"
        );


    const backdrop =
        modal.querySelector(
            ".echor-identity-modal__backdrop"
        );


    const numberElement =
        document.getElementById(
            "identity-member-number"
        );


    const nameElement =
        document.getElementById(
            "identity-member-name"
        );


    const keywordElement =
        document.getElementById(
            "identity-member-keyword"
        );


    const accentElement =
        document.getElementById(
            "identity-member-accent"
        );


    const topGrid =
        document.getElementById(
            "identity-top-grid"
        );


    const fullBodyImage =
        document.getElementById(
            "identity-fullbody-image"
        );


    const bodyData =
        document.getElementById(
            "identity-body-data"
        );



    function createReferenceCard(
        data,
        file,
        index
    ) {

        const figure =
            document.createElement(
                "figure"
            );


        figure.className =
            "echor-reference-card";


        figure.innerHTML = `

            <div class="echor-reference-card__image-wrap">

                <img
                    src="${data.folder}/${file[0]}"
                    alt="${data.name} ${file[1]}"
                    class="echor-reference-card__image"
                >

            </div>

            <figcaption class="echor-reference-card__caption">

                <span>
                    0${index + 1}
                </span>

                <span>
                    ${file[1]}
                </span>

            </figcaption>

        `;


        return figure;

    }



    function openMember(memberId) {

        const data =
            echorMembers[memberId];


        if (!data) {
            return;
        }


        numberElement.textContent =
            data.number;


        nameElement.textContent =
            data.name;


        keywordElement.textContent =
            data.keyword;


        accentElement.textContent =
            data.accent;



        /* TOP FOUR IMAGES */

        topGrid.innerHTML = "";


        data.references.forEach(
            (file, index) => {

                topGrid.appendChild(
                    createReferenceCard(
                        data,
                        file,
                        index
                    )
                );

            }
        );



        /* FULL BODY */

        fullBodyImage.src =
            `${data.folder}/${data.fullBody}`;


        fullBodyImage.alt =
            `${data.name} Full Body`;



        /* BODY SYSTEM */

        bodyData.innerHTML = "";


        data.body.forEach(
            (row) => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "echor-body-system__row";


                item.innerHTML = `

                    <span class="echor-body-system__label">
                        ${row[0]}
                    </span>

                    <span class="echor-body-system__value">
                        ${row[1]}
                    </span>

                `;


                bodyData.appendChild(
                    item
                );

            }
        );



        modal.classList.add(
            "is-open"
        );


        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "modal-open"
        );

    }



    function closeModal() {

        modal.classList.remove(
            "is-open"
        );


        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "modal-open"
        );

    }



    cards.forEach(
        (card) => {

            card.addEventListener(
                "click",
                () => {

                    openMember(
                        card.dataset.memberId
                    );

                }
            );

        }
    );


    closeButton.addEventListener(
        "click",
        closeModal
    );


    backdrop.addEventListener(
        "click",
        closeModal
    );


    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                modal.classList.contains(
                    "is-open"
                )
            ) {

                closeModal();

            }

        }
    );

}

// ==================================================
// STEP 5
// GROUP DEVELOPMENT REVEAL
// ==================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initGroupDevelopmentReveal();

    }
);


function initGroupDevelopmentReveal() {

    const targets =
        document.querySelectorAll(

            ".echor-group-development__header, " +
            ".echor-duo-card, " +
            ".echor-group-flow, " +
            ".echor-group-final, " +
            ".echor-group-principles"

        );


    if (!targets.length) {
        return;
    }


    targets.forEach(
        (target) => {

            target.classList.add(
                "echor-reveal"
            );

        }
    );


    const observer =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "is-visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.10,

                rootMargin:
                    "0px 0px -30px 0px"
            }

        );


    targets.forEach(
        (target) => {

            observer.observe(
                target
            );

        }
    );

}

// ==================================================
// STEP 6
// VISUAL DEVELOPMENT REVEAL
// ==================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initVisualDevelopmentReveal();

    }
);


function initVisualDevelopmentReveal() {

    const targets =
        document.querySelectorAll(

            ".echor-visual-development__header, " +
            ".echor-visual-version-card, " +
            ".echor-refinement-flow, " +
            ".echor-refinement-statement"

        );


    if (!targets.length) {
        return;
    }


    targets.forEach(
        (target) => {

            target.classList.add(
                "echor-reveal"
            );

        }
    );


    const observer =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "is-visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.10,

                rootMargin:
                    "0px 0px -30px 0px"
            }

        );


    targets.forEach(
        (target) => {

            observer.observe(
                target
            );

        }
    );

}

// ==================================================
// STEP 7
// HERO FILM
// ==================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initHeroFilmReveal();

        initHeroFilmVisibilityControl();

    }
);



/* ==================================================
   HERO FILM REVEAL
================================================== */

function initHeroFilmReveal() {

    const targets =
        document.querySelectorAll(

            ".echor-film__header, " +
            ".echor-film__player-wrap, " +
            ".echor-film__meta, " +
            ".echor-film-scenes, " +
            ".echor-film-direction, " +
            ".echor-film__statement"

        );


    if (!targets.length) {
        return;
    }


    targets.forEach(
        (target) => {

            target.classList.add(
                "echor-reveal"
            );

        }
    );


    const observer =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "is-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.10,

                rootMargin:
                    "0px 0px -30px 0px"
            }

        );


    targets.forEach(
        (target) => {

            observer.observe(
                target
            );

        }
    );

}



/* ==================================================
   PAUSE VIDEO WHEN SECTION LEAVES VIEW
================================================== */

function initHeroFilmVisibilityControl() {

    const video =
        document.getElementById(
            "echor-hero-video"
        );


    const section =
        document.getElementById(
            "hero-film"
        );


    if (
        !video ||
        !section
    ) {
        return;
    }


    const observer =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting &&
                            !video.paused
                        ) {

                            video.pause();

                        }

                    }
                );

            },

            {
                threshold: 0.05
            }

        );


    observer.observe(
        section
    );

}

// ==================================================
// STEP 8 + PROJECT CLOSING
// REVEAL
// ==================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initWorkflowAndClosingReveal();

    }
);



function initWorkflowAndClosingReveal() {

    const targets =
        document.querySelectorAll(

            ".echor-workflow__header, " +
            ".echor-workflow-steps, " +
            ".echor-tools-section, " +
            ".echor-insight, " +
            ".echor-closing__label, " +
            ".echor-closing__logo, " +
            ".echor-closing__project, " +
            ".echor-closing__statement, " +
            ".echor-closing__bottom"

        );


    if (!targets.length) {
        return;
    }


    targets.forEach(
        (target) => {

            target.classList.add(
                "echor-reveal"
            );

        }
    );


    const observer =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "is-visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.10,

                rootMargin:
                    "0px 0px -30px 0px"
            }

        );


    targets.forEach(
        (target) => {

            observer.observe(
                target
            );

        }
    );

}
// ==================================================
// ECHØR
// BACK TO MOTIONARY PROJECTS
// ==================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initEchorBackToProjects();

    }
);



function initEchorBackToProjects() {

    const backButton =
        document.querySelector(
            ".echor-closing__back"
        );


    if (!backButton) {
        return;
    }


    backButton.addEventListener(
        "click",
        (event) => {

            event.preventDefault();


            window.location.href =
                "index.html#projects";

        }
    );

}

