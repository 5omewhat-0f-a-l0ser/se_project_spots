const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: "modal__submit_disabled", //I don't think I have this in my file, but x3 10 says to have it
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error"
}

//Inputs
const showInputError = (formElement, inputElement, errorMessage, config) => {
const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
console.log(errorElement);
inputElement.classList.add(config. inputErrorClass);
errorElement.textContent = errorMessage;};

const hideInputError = (formElement, inputElement, config) => {
const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
inputElement.classList.remove(config. inputErrorClass);  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, config) => {
if (!inputElement.validity.valid) {
  showInputError(formElement, inputElement, inputElement.validationMessage, config);
} else {
  hideInputError(formElement, inputElement, config);
}
};

const cardNameInput = addCardModal.querySelector("#add-card-caption-input");
const cardLinkInput = addCardModal.querySelector("#add-card-link-input");

const hasInvalidInput = (inputList) => {
const inputsArray = Array.from(inputList);
return inputsArray.some((inputElement) => {
  return !inputElement.validity.valid;
});
};

//Validation of forms
function handleAddFromElement(evt) {
evt.preventDefault();
const inputValues = {name: addCardCaption.value, link: addCardLink.value };
const cardElement = getCardElement(inputValues);
cardsList.prepend(cardElement);
evt.target.reset();
toggleButtonState({cardNameInput, cardLinkInput}, addCardSubmit, settings);
closeModal(addCardModal);
};

//buttons(the bane of ever loving existence)
const toggleButtonState = (inputList, buttonElement, config) => {
if (!buttonElement) return; // Exit if buttonElement is not found

if (hasInvalidInput(inputList)) {
  disableButton()
} else {
  enableButton()
}

    console.log(buttonElement); // Check if this logs the correct element
  buttonElement.classList.add(config.inactiveButtonClass);

};

// disable/enable
const enableButton = (buttonElement, config) => {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.disabled = false;
};


const disableButton = (buttonElement, config) => {
console.log(buttonElement); // To check if the button element is coming through
if (buttonElement) {  // This checks if buttonElement is defined
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
}
};

const buttonElements = document.querySelectorAll(".modal__submit");
buttonElements.forEach((buttonElement) => {
disableButton(buttonElement, config);
});



const resetValidation = (formElement, inputList, config) => {
inputList.forEach((inputElement) => {
  hideInputError(formElement, inputElement, config)
})
};

resetValidation(editFormElement, [editModalNameInput, editModalDescriptionInput], {
inputErrorClass: "modal__input_type_error",
});

const setEventListeners = (formElement, config) => {
const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
const buttonElement = formElement.querySelector(config.submitButtonSelector);

toggleButtonState(inputList, buttonElement, config);

inputList.forEach((inputElement) => {
  inputElement.addEventListener("input", function () {
    checkInputValidity(formElement, inputElement, config);
    toggleButtonState(inputList, buttonElement, config);
  });
});
};

const enableValidation = (config) => {
const formList = document.querySelectorAll(config.formSelector);
formList.forEach((formElement) => {
  setEventListeners(formElement, config);
});
};

enableValidation(config);