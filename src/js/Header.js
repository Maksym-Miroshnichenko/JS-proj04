/*logo => home*/
/*document.addEventListener("DOMContentLoaded", () => {
    const logoLink = document.getElementById("logo-link");

    if (logoLink) {
        logoLink.addEventListener("click", (event) => {
            const homePage = window.location.pathname;

            if (homePage === "/" || homePage === "/index.html" || homePage.endsWith("/index.html")) {
                event.preventDefault();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
                navMenuLinks.forEach(item => item.classList.remove("current"));
            }
        });
    }
});*/

const logoLink = document.querySelector('#logo-link');
const navMenuLinks = document.querySelectorAll(".js-menu-set");
const burgerBtn = document.querySelector(".menu-burger-btn");
const headerNav = document.querySelector(".header-nav");


function removeCurrentLink() {
    navMenuLinks.forEach(item => {
        item.classList.remove("current");
    });

    if (document.activeElement) {
        document.activeElement.blur();
    }
}

if (logoLink) {
    logoLink.addEventListener('click', (event) => {
        /*event.preventDefault();*/

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

        closeNavbar();
    });
};

navMenuLinks.forEach(link => {
    link.addEventListener("click", (event) => {
        if (link.classList.contains("disabled")) {
            event.preventDefault();
            return;
        }

        const targetId = link.getAttribute("href");
        const targetSection = document.querySelector(targetId);

        if (!targetSection) {
            return;
        }

        event.preventDefault();
        navMenuLinks.forEach(link => {
            link.classList.remove("current");
        });
        link.classList.add("current");

        targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        closeNavbar();
    });
})

window.addEventListener('scroll', () => {
    if (window.scrollY <= 10) {
        removeCurrentLink();
    }
});


burgerBtn.addEventListener("click", () => {
    if (headerNav.classList.contains("is-open")) {
        closeNavbar();
    } else {
        openNavbar();
    }
});

function openNavbar() {
    headerNav.classList.add("is-open");
    burgerBtn.classList.add("is-open");
    document.body.classList.add("menu-open");
    burgerBtn.setAttribute("aria-label", "Close menu");
}

function closeNavbar() {
    headerNav.classList.remove("is-open");
    burgerBtn.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    burgerBtn.setAttribute("aria-label", "Open menu");
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeNavbar();
    }
});

/*btn go shopping => section-sweets*/
const button = document.querySelector(".header-btn");

button.addEventListener("click", (event) => {
    event.preventDefault();

    if (button.classList.contains("disabled")) {
        event.preventDefault();
        return;
    }

    const targetSection = document.querySelector("#sweets");

    if (targetSection) {
        event.preventDefault();

        targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
});
