const formData = {
  name: "",
  phone: "",
  message: "",
};

const form = document.querySelector(".contact-form");
const STORAGE_KEY = "data-contact-modal";

const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
    const parsedData = JSON.parse(savedData);
    formData.name = parsedData.name || "";
    formData.phone = parsedData.phone || "";
    formData.message = parsedData.message || "";

    form.elements.name.value = formData.name;
    form.elements.phone.value = formData.phone;
    form.elements.message.value = formData.message;
}

form.addEventListener("input", event => {
const { name, value } = event.target;
formData[name] = value.trim();
localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

form.addEventListener("submit", event => {
    event.preventDefault();
    if (formData.name === "" || formData.phone === "") {
        alert("Fill please all fields");
    } else {
        localStorage.removeItem(STORAGE_KEY);
        formData.name = "";
        formData.phone = "";
        formData.message = "";
        form.reset();

        form.querySelectorAll(".modal-input").forEach(input => {
    input.classList.remove("is-touched");
    })
}});

const inputs = document.querySelectorAll(".modal-input");

inputs.forEach(input => {
  input.addEventListener("blur", () => {
    input.classList.add("is-touched");
  });

  input.addEventListener("input", () => {
    if (input.validity.valid) {
      input.classList.remove("is-touched");
    }
  });
});
