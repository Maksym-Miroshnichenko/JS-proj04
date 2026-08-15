const menuLinks = document.querySelectorAll(".menu-set");

menuLinks.addEventListener("click", (event) => {
    if (link.classList.contains("disabled")) {
        event.preventDefault();
        return;
    }

    menuLinks.forEach(item => item.classList.remove("current"));

    link.classList.add("current");
});
