const initialCards = [
    {name: "Val Thorens", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"},
    {name: "Resturant terrance", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"},
    {name: "An outdoor cafe", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg"},
    {name: "A very long bridge, over the forest and through the trees", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"},
    {name: "Tunnel with morning light", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg"},
    {name: "Mountain house", link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg"},
]

const profileEditButton = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const descriptionName = document.querySelector(".profile__description");
const addCardButton = document.querySelector(".profile__add-btn");

const editModal = document.querySelector("#edit-profile-modal");
const editFormElement = editModal.querySelector(".modal__form");
const editModalCloseButton = editModal.querySelector(".modal__close");
const editModalNameInput = editModal.querySelector("#profile-name-input")
const editModalDescriptionInput = document.querySelector("#profile-description-input");

const addCardModal = document.querySelector("#add-card-modal");
const addCardCloseButton = addCardModal.querySelector(".modal__close");
const addFormElement = addCardModal.querySelector(".modal__form");


const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");



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
        cardDeleteButton.classList.toggle("card__delete");
        cardElement.remove("card");
    })
    return cardElement;
};

function openModal(modal) {
    modal.classList.add("modal_opened");
}

function closeModal(modal) {
   modal.classList.remove("modal_opened");
}

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = editModalNameInput.value;
    descriptionName.textContent = editModalDescriptionInput.value;
    closeModal(editModal);
};

function handleAddFromElement(evt) {
    evt.preventDefault();
    closeModal(addCardModal);
};


profileEditButton.addEventListener("click", () => {
    openModal(editModal);
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
addFormElement.addEventListener("submit", handleAddFromElement);

initialCards.forEach((item, i, arr) => {
    console.log(i);
    console.log(arr);
    const cardElement = getCardElement(item);
    cardsList.append(cardElement);
});