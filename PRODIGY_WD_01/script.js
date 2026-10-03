// Get navbar
const navbar = document.getElementById("navbar");

// Get navigation links
const navLinks = document.querySelectorAll(".nav-link");

// Get all sections
const sections = document.querySelectorAll(".section");


// =====================================
// NAVBAR SCROLL EFFECT
// =====================================

window.addEventListener("scroll", function () {

    // Add dark navbar when scrolling
    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }


    // =================================
    // ACTIVE NAVIGATION
    // =================================

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop - 180;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY <
            sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    // Update active link

    navLinks.forEach(function (link) {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

});


// =====================================
// CONTACT BUTTON
// =====================================

function showMessage() {

    const message =
        document.getElementById("message");

    message.textContent =
        "Thank you! We will get back to you soon.";

}