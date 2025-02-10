import "./index.css";
import Api from "../utils/api.js";

import logoEl from "../image/logo.svg";
const logoElement = document.getElementById("logo");
logoElement.src = logoEl;

import profilePic from "../image/avatar.jpg";
const profilePicEl = document.getElementById("profile-pic");
profilePicEl.src = profilePic;

import editPen from "../image/edit-profile-pen.svg";
const editPenEl = document.getElementById("edit-pen");
editPenEl.src = editPen;

import newPost from "../image/new-post-btn.svg";
const newPostEl = document.getElementById("new-post");
newPostEl.src = newPost;

import { enableValidation, resetValidation, disableButton, config } from "../scripts/validation.js";

const api = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
      authorization: "5b40f66f-c611-4855-8659-c2085a4f3c96",
      "Content-Type": "application/json"
    }
});

//api.getInitialCards()
//.then(cards => {
//if (Array.isArray(cards)) {
//    cards.forEach((item, i, arr) => {
//        const cardElement = getCardElement(item);
//        cardsList.append(cardElement);
//    });
//} else {
//    console.error('Received data is not an array:', cards);
//}
//})
//.catch((error) => {
//    console.error('Error fetching initial cards:', error)
//});


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
const editAvatarButton = document.querySelector(".profile__avatar-btn");

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

const avatarModal = document.querySelector("#avatar-modal");
const avatarCloseButton = avatarModal.querySelector(".modal__close");
const avatarSubmit = avatarModal.querySelector(".modal__submit");
const avatarFormElement = avatarModal.querySelector(".modal__form");
const avatarLink = avatarModal.querySelector("#profile-avatar-input");

const deleteModal = document.querySelector("#delete-card-modal");
const deleteCloseButton = deleteModal.querySelector(".modal__close_delete");
const deleteSubmit = deleteModal.querySelector(".modal__form_remove");
const deleteFormElement = deleteModal.querySelector(".modal__form_delete");

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const cardContainer = document.querySelector(".card");

let selectedCard;
let selectedCardId;

function getCardElement(data) {
    const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
    const cardNameEl = cardElement.querySelector(".card__title");
    const cardImageEl = cardElement.querySelector(".card__image");
    const cardLikeButton = cardElement.querySelector(".card__like-btn");
    const cardDeleteButton = cardElement.querySelector(".card__delete");

    cardNameEl.textContent = data.name;
    cardImageEl.src = data.link;
    cardImageEl.alt = data.name;

    if (data.isLiked) {
      cardLikeButton.classList.add("card__like-btn_liked");
  }

    cardLikeButton.addEventListener("click", () => {
        const isLiked = cardLikeButton.classList.contains("card__like-btn_liked");



        if (isLiked) {
          api.unLikeCard(data._id)
            .then((response) => {
              cardLikeButton.classList.toggle("card__like-btn_liked");
              console.log(response);
            })
             .catch(error => console.error('Error:', error));
        } else {
          api.likeCard(data._id)
            .then((response) => {
              cardLikeButton.classList.toggle("card__like-btn_liked");
              console.log(response);
            })
             .catch(error => console.error('Error:', error));
        }
      });

    cardDeleteButton.addEventListener("click", () => {
        handleDeleteCard(cardElement, data);
    })

    cardImageEl.addEventListener("click", () => {
        openModal(previewModal);
        previewModalCaptionEl.textContent = data.name;
        previewModalImageEl.src = data.link;
        previewModalImageEl.alt = data.name;
    })

    return cardElement;

};

function handleDeleteCard(cardElement, data) {
    selectedCard = cardElement; // Assign the card element to selectedCard
    selectedCardId = data._id;
    openModal(deleteModal);
};

const deleteCancelButton = deleteModal.querySelector(".modal__form_cancel")

deleteCancelButton.addEventListener("click", (evt) => {
    closeModal(deleteModal);
});


api
  .getAppInfo()
  .then(([cards, userData, editData]) => {
    cards.forEach((item, i, arr) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });

    profileName.textContent = userData.name; // set the user name with the api response
    descriptionName.textContent = userData.about; // set the user about with the api response
    profilePicEl.src = userData.avatar; // set the user avatar with the api response
  })
  .catch((error) => {
    console.error("Error fetching initial cards:", error);
  });

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

function setButtonText(button, isLoading, defaultText, loadingText) {
  console.log(button);
  if (isLoading) {
      button.textContent = loadingText;
  } else {
      button.textContent = defaultText;
  }

}

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  const button = evt.target.querySelector(".modal__submit");
  setButtonText(button, true, "Save", "Saving...");

  api.editUserInfo({name: editModalNameInput.value, about: editModalDescriptionInput.value})
  .then(() => {
    profileName.textContent = editModalNameInput.value;
    descriptionName.textContent = editModalDescriptionInput.value;
    disableButton(editModalSubmit, config);
    closeModal(editModal);

  })
  .catch(() => {
    console.error("Sorry! Something must've gone wrong!");

  })

  .finally(() => setButtonText(button, false, "Save", "Saving...")); // Set the button text back to "Save"

};

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const formData = {cardName: addCardCaption.value, cardLink: addCardLink.value };
 const button = evt.target.querySelector(".modal__submit");
  setButtonText(button, true, "Save", "Saving...");
api
  .addNewCard(formData)
  .then((res) => {
    const cardElement = getCardElement(res);
    cardsList.prepend(cardElement);
    closeModal(addCardModal);
    evt.target.reset();
    disableButton(addCardSubmit, config);
  })
  .catch(console.error)
  .finally(() => setButtonText(button, false, "Save", "Saving...")); // Set the button text back to "Save"
};



function handleDeleteSubmit(evt) {

    evt.preventDefault(); // prevent the submit button from refreshing the page

    const button = evt.target.querySelector(".modal__form_remove");
    setButtonText(button, true, "Delete", "Deleteing...");

    api
      .deleteCard(selectedCardId)
      .then(() => {
        selectedCard.remove()
        closeModal(deleteModal);


      })
      .catch(() => {
        console.error("Sorry! Something must've gone wrong!");

      })

      .finally(() => setButtonText(button, false, "Delete", "Deleteing..."));
};

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const avatarInput = { avatar: avatarLink.value };

  const button = evt.target.querySelector(".modal__submit");
  setButtonText(button, true, "Save", "Saving...");

  console.log(JSON.stringify(avatarInput)); // Log the data being sent


  api.editAvatarInfo(avatarInput)
    .then(data => {
      profilePicEl.src = data.avatar;
      evt.target.reset();
      disableButton(avatarSubmit, config);
      closeModal(avatarModal);
    })
  .catch(console.error)

  .finally(() => setButtonText(button, false, "Save", "Saving..."));


}


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
editAvatarButton.addEventListener("click", () => {
    openModal(avatarModal);
});
avatarCloseButton.addEventListener("click", (evt) => {
    closeModal(avatarModal);
});
deleteCloseButton.addEventListener("click", (evt) => {
    closeModal(deleteModal)
});



editFormElement.addEventListener("submit", handleEditFormSubmit);
addFormElement.addEventListener("submit", handleAddFormSubmit);
avatarFormElement.addEventListener("submit", handleAvatarFormSubmit);
deleteFormElement.addEventListener("submit", handleDeleteSubmit);

function closeModalEsc(evt) {
    if (evt.key === "Escape") {
      const modalOpen = document.querySelector(".modal_opened");
      closeModal(modalOpen);
    }
};


//did I fix all the things wrong? Probably not...

const modals = document.querySelectorAll(".modal");

function closeOverlay(evt) {
    if (evt.target.classList.contains("modal")) {
        closeModal(evt.target);
    }
};

modals.forEach((modal) => {
    modal.addEventListener("mousedown", closeOverlay);
});

