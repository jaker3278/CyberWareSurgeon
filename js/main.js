"use strict";

const yearElement =
    document.getElementById("year");

if (yearElement) {
    yearElement.textContent =
        new Date().getFullYear();
}


/* ============================================================
   CYBERWARESURGEON PROJECT GALLERY V0.6
   Manual navigation only. No autoplay.
   ============================================================ */


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


        /*
            If a future image file does not exist,
            hide the broken <img> and reveal the
            deliberately designed placeholder below it.
        */

        slides.forEach((slide) => {

            const image =
                slide.querySelector("img");

            if (!image) {
                return;
            }

            image.addEventListener(
                "error",
                () => {
                    image.style.display = "none";
                }
            );

        });


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


        previousButton.addEventListener(
            "click",
            () => {

                if (currentIndex > 0) {

                    currentIndex -= 1;

                    updateGallery();

                }

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


                if (
                    currentIndex <
                    maximumIndex
                ) {

                    currentIndex += 1;

                    updateGallery();

                }

            }
        );


        /*
            Resize does not advance anything.
            It simply recalculates how many images
            fit on the screen.
        */

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

