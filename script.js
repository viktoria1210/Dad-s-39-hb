document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MOBILE MENU
    ========================= */

    const menuButton = document.querySelector(".menu-btn");
    const nav = document.querySelector(".nav");

    if (menuButton && nav) {

        menuButton.addEventListener("click", () => {
            nav.classList.toggle("open");

            if (nav.classList.contains("open")) {
                menuButton.textContent = "×";
            } else {
                menuButton.textContent = "☰";
            }
        });

        document.querySelectorAll(".nav a").forEach(link => {

            link.addEventListener("click", () => {
                nav.classList.remove("open");
                menuButton.textContent = "☰";
            });

        });
    }


    /* =========================
       REVEAL ANIMATIONS
    ========================= */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* =========================
       PHOTO LIGHTBOX
    ========================= */

    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightbox = document.querySelector(".lightbox");
    const lightboxImage = document.querySelector(".lightbox img");
    const closeButton = document.querySelector(".lightbox-close");
    const previousButton = document.querySelector(".lightbox-prev");
    const nextButton = document.querySelector(".lightbox-next");

    let currentPhoto = 0;

    const photos = Array.from(galleryItems).map(item => {

        const image = item.querySelector("img");

        return {
            src: image ? image.src : "",
            alt: image ? image.alt : ""
        };

    });


    function showPhoto(index) {

        if (!photos.length || !lightboxImage) {
            return;
        }

        currentPhoto = (index + photos.length) % photos.length;

        lightboxImage.src = photos[currentPhoto].src;
        lightboxImage.alt = photos[currentPhoto].alt;

    }


    function openLightbox(index) {

        if (!lightbox) {
            return;
        }

        showPhoto(index);

        lightbox.classList.add("open");

        document.body.classList.add("no-scroll");

    }


    function closeLightbox() {

        if (!lightbox) {
            return;
        }

        lightbox.classList.remove("open");

        document.body.classList.remove("no-scroll");

    }


    galleryItems.forEach((item, index) => {

        item.addEventListener("click", () => {
            openLightbox(index);
        });

    });


    if (closeButton) {
        closeButton.addEventListener("click", closeLightbox);
    }


    if (previousButton) {

        previousButton.addEventListener("click", () => {
            showPhoto(currentPhoto - 1);
        });

    }


    if (nextButton) {

        nextButton.addEventListener("click", () => {
            showPhoto(currentPhoto + 1);
        });

    }


    if (lightbox) {

        lightbox.addEventListener("click", event => {

            if (event.target === lightbox) {
                closeLightbox();
            }

        });

    }


    document.addEventListener("keydown", event => {

        if (!lightbox || !lightbox.classList.contains("open")) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowLeft") {
            showPhoto(currentPhoto - 1);
        }

        if (event.key === "ArrowRight") {
            showPhoto(currentPhoto + 1);
        }

    });


    /* =========================
       QUIZ
    ========================= */

    const questions = document.querySelectorAll(".question");
    const resultBox = document.querySelector("#quizResult");

    const scoreElement = document.querySelector("#score");
    const resultText = document.querySelector("#resultText");

    const questionNumber = document.querySelector("#questionNumber");
    const progress = document.querySelector("#progress");

    let currentQuestion = 0;
    let score = 0;


    function updateQuizProgress() {

        if (questionNumber) {
            questionNumber.textContent =
                String(currentQuestion + 1).padStart(2, "0");
        }

        if (progress) {

            const percentage =
                ((currentQuestion + 1) / questions.length) * 100;

            progress.style.width = `${percentage}%`;
        }

    }


    function showQuestion(index) {

        questions.forEach(question => {
            question.classList.remove("active");
        });

        if (questions[index]) {
            questions[index].classList.add("active");
        }

        updateQuizProgress();

    }


    function finishQuiz() {

        questions.forEach(question => {
            question.classList.remove("active");
        });

        if (resultBox) {
            resultBox.classList.add("show");
        }

        if (scoreElement) {
            scoreElement.textContent = score;
        }


        if (resultText) {

            if (score === 5) {

                resultText.textContent =
                    "Ідеально. Схоже, Ви знаєте нас не гірше, ніж ми знаємо Вас.";

            } else if (score >= 3) {

                resultText.textContent =
                    "Дуже непогано. Але деякі сімейні секрети все ж залишилися.";

            } else {

                resultText.textContent =
                    "Схоже, нам доведеться провести ще кілька сімейних вечорів.";

            }

        }

    }


    questions.forEach((question, questionIndex) => {

        const answers = question.querySelectorAll(".answers button");

        answers.forEach(button => {

            button.addEventListener("click", () => {

                const selectedAnswer =
                    Number(button.dataset.choice);

                const correctAnswer =
                    Number(question.dataset.answer);

                if (selectedAnswer === correctAnswer) {
                    score++;
                }

                currentQuestion++;

                if (currentQuestion < questions.length) {

                    showQuestion(currentQuestion);

                } else {

                    finishQuiz();

                }

            });

        });

    });


    if (questions.length) {
        updateQuizProgress();
    }


    /* =========================
       LETTER / ENVELOPE
    ========================= */

    const envelope = document.querySelector("#envelope");

    if (envelope) {

        envelope.addEventListener("click", () => {

            envelope.classList.toggle("open");

        });

    }

});
