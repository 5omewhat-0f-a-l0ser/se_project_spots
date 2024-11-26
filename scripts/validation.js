const setEventListeners = (formEL) => {
  const inputList = Array.from(formEL.querySelectorAll(".modal__input"));
  const buttonElement = formEL.querySelector(".modal__submit");

  console.log(inputList);
  console.log(buttonElement);

  //toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formEL, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = document.querySelectorAll(".modal__form");
  formList.forEach((formEL) => {
    setEventListeners(formEL);
  });
  };
  enableValidation();