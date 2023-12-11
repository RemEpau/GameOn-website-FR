import {
  editNav,
  launchModal,
  closeModal,
  isValidInput,
  isValidBirth,
  isCitiesCheck,
  isValidCgu,
  getCheckedRadioValue
} from './functions.js';


// DOM Elements

// btn
const modalBtn = document.querySelectorAll(".modal-btn");
const modalBtnClose = document.querySelector(".close");
const btnSubmit = document.querySelector(".btn-submit");
//input
const inputFirst = document.getElementById("first");
const inputLast = document.getElementById("last");
const inputEmail = document.getElementById("email");
const inputBirth = document.getElementById("birthdate");
const inputQuantity = document.getElementById("quantity");
const inputRadio = document.querySelectorAll("input[type='radio'");
const inputCgu = document.getElementById("checkbox1");
const inputThx = document.getElementById("btn-thanks");
//other
const formElem = document.querySelector("form[name='reserve'");
const thanksElem = document.querySelector(".thanks");

// Objet contenant les messages d'erreur
const objMsg = {
  errName: "Doit comporter entre 2 et 31 caractères.",
  errEmail: "L'email est invalide.",
  errBirth: "La date est incorrecte.",
  errQty: "Vous devez indiquer un chiffre valide.",
  errCities: "Vous devez sélectionner une ville.",
  errCgu: "Vous devez vérifier que vous acceptez les termes et conditions.",
}

// Regex
const rgxName = /^[a-zA-ZÀ-ÖØ-öøç ]{2,31}[-]{0,1}[a-zA-ZÀ-ÖØ-öøç ]{0,31}$/; // Nom et Prenom
const rgxEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; //Email
const rgxQty = /^\d+$/; // Quantite


// Events principaux


// launch editnav event
document.getElementById("burger").addEventListener("click", editNav);

// launch and close modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalBtnClose.addEventListener("click", closeModal);

// Validation du formulaire

// event input validation form
inputFirst.addEventListener("input", () => isValidInput(inputFirst, objMsg.errName, rgxName));
inputLast.addEventListener("input", () => isValidInput(inputLast, objMsg.errName, rgxName));
inputEmail.addEventListener("input", () => isValidInput(inputEmail, objMsg.errEmail, rgxEmail));
inputBirth.addEventListener("input", () => isValidBirth(inputBirth, objMsg));
inputQuantity.addEventListener("input", () => isValidInput(inputQuantity, objMsg.errQty, rgxQty));
inputRadio.forEach((el) => el.addEventListener("change", () => isCitiesCheck(el, objMsg.errCities, inputRadio)));
inputCgu.addEventListener("change", () => isValidCgu(inputCgu, objMsg.errCgu));

// "Fermer" Button reset
inputThx.addEventListener("click", () => {
  formElem.classList.remove("modal-hide");
  thanksElem.classList.replace("modal-show", "modal-hide");
  closeModal();
});

/**
* validate()
* Indique si le formulaire passe la validation ou non
* @returns {boolean} => true = validation OK, false = validation NOT OK
*/

function validate() {
  let isValidFirstR = isValidInput(inputFirst, objMsg.errName, rgxName);
  let isValidLastR = isValidInput(inputLast, objMsg.errName, rgxName);
  let isValidEmailR = isValidInput(inputEmail, objMsg.errEmail, rgxEmail);
  let isValidBirthR = isValidBirth(inputBirth, objMsg);
  let isValidQuantityR = isValidInput(inputQuantity, objMsg.errQty, rgxQty);
  let isValidCguR = isValidCgu(inputCgu, objMsg.errCgu);

  //if(isValidFirstR && isValidLastR && isValidEmailR && isValidBirthR && isValidQuantityR && isValidCitieR && isValidCguR){
  return isValidFirstR && isValidLastR && isValidEmailR && isValidBirthR && isValidQuantityR && isValidCguR;
}



// submit form event
btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  if (validate()) {
    // on affiche l'information à l'utilisateur sur la validation du formulaire
    formElem.classList.add("modal-hide");
    thanksElem.classList.replace("modal-hide", "modal-show");
  }
})