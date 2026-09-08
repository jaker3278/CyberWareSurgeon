"use strict";

/* ============================================================
   CYBERWARESURGEON
   SITE JAVASCRIPT
   ============================================================ */


/* ------------------------------------------------------------
   COPYRIGHT YEAR
------------------------------------------------------------ */

const yearElement =
    document.getElementById("year");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* ------------------------------------------------------------
   PROJECT GALLERIES

   Desktop : 4 visible
   Tablet  : 2 visible
   Mobile  : 1 visible

   Manual navigation only.
   NO autoplay.
------------------------------------------------------------ */

document
    .querySelectorAll("[data-project-gallery]")
    .forEach((gallery) => {

        const track =
            gallery.querySelector(
                "[data-gallery-track]"
            );

        const slides =
            Array.from(
                gallery.querySelectorAll(
                    ".project-gallery-slide"
                )
            );

        const previousButton =
            gallery.querySelector(
                "[data-gallery-prev]"
            );

        const nextButton =
            gallery.querySelector(
                "[data-gallery-next]"
            );

        const positionDisplay =
            gallery.querySelector(
                "[data-gallery-position]"
            );

        const totalDisplay =
            gallery.querySelector(
                "[data-gallery-total]"
            );


        if (
            !track ||
            slides.length === 0 ||
            !previousButton ||
            !nextButton
        ) {

            return;

        }


        let currentIndex = 0;


        /* ----------------------------------------------------
           IMAGE / PLACEHOLDER STATE
        ---------------------------------------------------- */

        slides.forEach((slide) => {

            const image =
                slide.querySelector("img");

            const placeholder =
                slide.querySelector(
                    ".gallery-image-placeholder"
                );


            if (!image) {
                return;
            }


            const showImage = () => {

                image.style.display = "block";

                if (placeholder) {
                    placeholder.style.display = "none";
                }

            };


            const showPlaceholder = () => {

                image.style.display = "none";

                if (placeholder) {
                    placeholder.style.display = "flex";
                }

            };


            image.addEventListener(
                "load",
                showImage
            );


            image.addEventListener(
                "error",
                showPlaceholder
            );


            /*
                The browser may have completed the request
                before these listeners were attached.
            */

            if (image.complete) {

                if (image.naturalWidth > 0) {
                    showImage();
                }
                else {
                    showPlaceholder();
                }

            }

        });


        /* ----------------------------------------------------
           RESPONSIVE VISIBLE COUNT
        ---------------------------------------------------- */

        const getVisibleCount = () => {

            if (
                window.matchMedia(
                    "(max-width: 560px)"
                ).matches
            ) {

                return 1;

            }


            if (
                window.matchMedia(
                    "(max-width: 900px)"
                ).matches
            ) {

                return 2;

            }


            return 4;

        };


        /* ----------------------------------------------------
           UPDATE POSITION
        ---------------------------------------------------- */

        const updateGallery = () => {

            const visibleCount =
                getVisibleCount();

            const maximumIndex =
                Math.max(
                    0,
                    slides.length -
                    visibleCount
                );


            currentIndex =
                Math.min(
                    currentIndex,
                    maximumIndex
                );


            const targetSlide =
                slides[currentIndex];

            const offset =
                targetSlide
                    ? targetSlide.offsetLeft
                    : 0;


            track.style.transform =
                `translateX(-${offset}px)`;


            previousButton.disabled =
                currentIndex === 0;


            nextButton.disabled =
                currentIndex >= maximumIndex;


            if (positionDisplay) {

                positionDisplay.textContent =
                    String(
                        currentIndex + 1
                    ).padStart(
                        2,
                        "0"
                    );

            }


            if (totalDisplay) {

                totalDisplay.textContent =
                    String(
                        slides.length
                    ).padStart(
                        2,
                        "0"
                    );

            }

        };


        /* ----------------------------------------------------
           MANUAL CONTROLS
        ---------------------------------------------------- */

        previousButton.addEventListener(
            "click",
            () => {

                if (currentIndex <= 0) {
                    return;
                }


                currentIndex -= 1;

                updateGallery();

            }
        );


        nextButton.addEventListener(
            "click",
            () => {

                const maximumIndex =
                    Math.max(
                        0,
                        slides.length -
                        getVisibleCount()
                    );


                if (currentIndex >= maximumIndex) {
                    return;
                }


                currentIndex += 1;

                updateGallery();

            }
        );


        /* ----------------------------------------------------
           RESPONSIVE RECALCULATION
        ---------------------------------------------------- */

        let resizeTimer = null;


        window.addEventListener(
            "resize",
            () => {

                clearTimeout(
                    resizeTimer
                );


                resizeTimer =
                    setTimeout(
                        updateGallery,
                        100
                    );

            }
        );


        updateGallery();

    });
