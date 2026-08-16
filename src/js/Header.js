const logo = document.querySelector(".js-logo")
const navMenuLinks = document.querySelectorAll(".js-menu-set");

navMenuLinks.forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        if (link.classList.contains("disabled")) {
            event.preventDefault();
            return;
        }

        navMenuLinks.forEach(item => item.classList.remove("current"));

        link.classList.add("current");
    });

})
