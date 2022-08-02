// library Lightbox import
import SimpleLightbox from 'simplelightbox';

// css styles import
import 'simplelightbox/dist/simple-lightbox.min.css';

// object import
import { galleryItems } from './gallery-items';

console.log(galleryItems);

const galleryEl = document.querySelector('.gallery');

// CREATING a template render from the array for each image
function createGalleryMarkup(items) {
  const markup = galleryItems
    .map(({ preview, original, description }) => {
      return `
      <a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>`;
    })
    .join('');

  return markup;
}

// PUBLISHING a new markup/template with insertAdjacentHTML
const galleryMarkup = createGalleryMarkup(galleryItems);
galleryEl.insertAdjacentHTML('beforeend', galleryMarkup);

// Simple ligthbox Modal Window with captions settings
let lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionType: 'attr',
  captionPosition: 'bottom',
  captionDelay: 250,
});
