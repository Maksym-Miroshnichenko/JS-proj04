import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { CURRENT_DESSERT_ID } from "./Products.js";

const ORDERS_URL ="https://deserts-store.b.goit.study/api/orders"
const DESSERT_ID = null
export function initContactForm(){ 

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

form.addEventListener("submit", async event => {
    event.preventDefault();
    if (formData.name === "" || formData.phone === "") {
        alert("Fill please all fields");
        return
    }
      const orderData = {
    name: formData.name,
    phone: formData.phone,
    dessertId: CURRENT_DESSERT_ID,
    comment: formData.message,
  };
  try {
    const response = await axios.post(ORDERS_URL, orderData)
    Swal.fire({
  position: "center",
  icon: "success",
  title: "Відправлено",
  showConfirmButton: false,
  timer: 1500
});
        localStorage.removeItem(STORAGE_KEY);
        formData.name = "";
        formData.phone = "";
        formData.message = "";
        form.reset();

        form.querySelectorAll(".modal-input").forEach(input => {
    input.classList.remove("is-touched");
    })
    closeModal();
  } catch (error){
    Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Спробуйте ще раз"
});
  }
});

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
})

const backdrop = document.querySelector(".backdrop")
const closeBtn = document.querySelector('.close-btn');
const modalContactForm = document.querySelector(".modal-contact-form");

closeBtn.addEventListener('click', closeModal);

modalContactForm.addEventListener('click', (event) => {
  if (event.target === modalContactForm) {
    closeModal();
  }
});


document.addEventListener("keydown", (event) =>{
  if(event.key === "Escape"){
    closeModal()
  }
})


function closeModal(){
  backdrop.classList.remove("is-open")
  document.body.classList.remove("modal-open");
}
}