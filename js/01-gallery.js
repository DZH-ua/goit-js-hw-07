import { galleryItems } from "./gallery-items.js";

const galleryContainer = document.querySelector(".gallery");
const galleryMarkup = createGalleryCardsMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);
galleryContainer.addEventListener("click", onGalleryContainerClick);

function createGalleryCardsMarkup() {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img 
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"                    
                />
            </a>
        </div>`;
    })
    .join("");
}

function onGalleryContainerClick(event) {
  event.preventDefault();
  const isImageSwatchEl = event.target.classList.contains("gallery__image");
  const isOriginalImageUrl = event.target.dataset.source;
  if (!isImageSwatchEl) {
    return;
  }
  //   console.log(event.target);
  //   console.log(isOriginalImageUrl);

  creatModal(isOriginalImageUrl);
}

function creatModal(source) {
  const instance = basicLightbox.create(`<img src="${source}">`);
  instance.show();

  const onEscKeyPress = (event) => {
    const ESC_KEY_CODE = "Escape";
    const isEscKey = event.code === ESC_KEY_CODE;
    console.log(isEscKey);
    if (isEscKey) {
      instance.close();
      window.removeEventListener("keydown", onEscKeyPress);
    }
  };
  window.addEventListener("keydown", onEscKeyPress);
}
