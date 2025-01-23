import "./index.css";

import profilePic from "../image/avatar.jpg";
const profilePicEl = document.getElementById("profile-pic");
profilePicEl.src = profilePic;

import editPen from "../image/edit-profile-pen.svg";
const editPenEl = document.getElementById("edit-pen");
editPenEl.src = editPen;

import newPost from "../image/new-post-btn.svg";
const newPostEl = document.getElementById("new-post");
newPostEl.src = newPost;

import { enableValidation, resetValidation, config } from "../scripts/validation.js";

const initialCards = [
    {name: "Val Thorens", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"},
    {name: "Resturant terrance", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"},
    {name: "An outdoor cafe", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg"},
    {name: "A very long bridge, over the forest and through the trees", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"},
    {name: "Tunnel with morning light", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg"},
    {name: "Mountain house", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg"},
    {name: "Golden Gate Bridge", link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg"},
]

const profileEditButton = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const descriptionName = document.querySelector(".profile__description");
const addCardButton = document.querySelector(".profile__add-btn");

const editModal = document.querySelector("#edit-profile-modal");
const editFormElement = editModal.querySelector(".modal__form");
const editModalCloseButton = editModal.querySelector(".modal__close");
const editModalSubmit = editModal.querySelector(".modal__submit");
const editModalNameInput = editModal.querySelector("#profile-name-input")
const editModalDescriptionInput = document.querySelector("#profile-description-input");

const addCardModal = document.querySelector("#add-card-modal");
const addCardCloseButton = addCardModal.querySelector(".modal__close");
const addCardSubmit = addCardModal.querySelector(".modal__submit");
const addFormElement = addCardModal.querySelector(".modal__form");
const addCardLink = addCardModal.querySelector("#add-card-link-input");
const addCardCaption = addCardModal.querySelector("#add-card-caption-input");

const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
const previewModalCloseButton = previewModal.querySelector(".modal__close");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const cardContainer = document.querySelector(".card");

function getCardElement(data) {
    const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
    const cardNameEl = cardElement.querySelector(".card__title");
    const cardImageEl = cardElement.querySelector(".card__image");
    const cardLikeButton = cardElement.querySelector(".card__like-btn");
    const cardDeleteButton = cardElement.querySelector(".card__delete");

    cardNameEl.textContent = data.name;
    cardImageEl.src = data.link;
    cardImageEl.alt = data.name;

    cardLikeButton.addEventListener("click", () => {
        cardLikeButton.classList.toggle("card__like-btn_liked");
    });

    cardDeleteButton.addEventListener("click", () => {
        cardElement.remove();
    })

    cardImageEl.addEventListener("click", () => {
        openModal(previewModal);
        previewModalCaptionEl.textContent = data.name;
        previewModalImageEl.src = data.link;
        previewModalImageEl.alt = data.name;
    })

    return cardElement;
};

previewModalCloseButton.addEventListener("click", (evt) => {
    closeModal(previewModal);
});

function openModal(modal) {
    modal.classList.add("modal_opened");
    document.addEventListener("keydown", closeModalEsc);
}

function closeModal(modal) {
   modal.classList.remove("modal_opened");
   document.removeEventListener("keydown", closeModalEsc);
}

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = editModalNameInput.value;
    descriptionName.textContent = editModalDescriptionInput.value;
    disableButton(editModalSubmit, config);
    closeModal(editModal);
};

function handleAddFormElement(evt) {
    evt.preventDefault();
    const inputValues = {name: addCardCaption.value, link: addCardLink.value };
    const cardElement = getCardElement(inputValues);
    cardsList.prepend(cardElement);
    evt.target.reset();
    disableButton(addCardSubmit, config);
    closeModal(addCardModal);
};

profileEditButton.addEventListener("click", () => {
    openModal(editModal);
    resetValidation(editFormElement, [editModalNameInput, editModalDescriptionInput],config);
    editModalNameInput.value = profileName.textContent;
    editModalDescriptionInput.value = descriptionName.textContent;
});
editModalCloseButton.addEventListener("click", (evt) => {
    closeModal(editModal);
});

addCardButton.addEventListener("click", () => {
    openModal(addCardModal);
});
addCardCloseButton.addEventListener("click", (evt) => {
    closeModal(addCardModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);
addFormElement.addEventListener("submit", handleAddFormElement);

initialCards.forEach((item, i, arr) => {
    const cardElement = getCardElement(item);
    cardsList.append(cardElement);
});


function closeModalEsc(evt) {
    if (evt.key === "Escape") {
      const modalOpen = document.querySelector(".modal_opened");
      closeModal(modalOpen);
    }
};



const modals = document.querySelectorAll(".modal");

function closeOverlay(evt) {
    if (evt.target.classList.contains("modal")) {
        closeModal(evt.target);
    }
};

modals.forEach((modal) => {
    modal.addEventListener("mousedown", closeOverlay);
});

    