import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form  textarea'),
  input: document.querySelector('.feedback-form  input'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(savingData, 500));

const STORAGE_KEY = 'feedback-form-state';

// an object that keeps the input and textarea info
const formData = {};

// function that helps to save data from the form textarea and input
function savingData(event) {
  // console.log(e.target.name);
  // console.log(e.target.value);

  // saving into the object formData name and the value
  formData[event.target.name] = event.target.value;
  // display the object with the email and message fields and their current values in the console
  console.log(formData);
  //saving data to the localStorage from the object formData and brining to the string type
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

/* eventListener with DOMContentLoaded event fires when the initial HTML
 document has been completely loaded and parsed */
addEventListener('DOMContentLoaded', populateTextarea);

/* When loading the page, check the state of the storage, and if it stores some data,
use it to fill in the form fields. Otherwise, the fields must be empty.*/
function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  // if - there is a data in the localStorage then assigning the value of the input from the storage
  // to the email input and the value of textarea from the Object to the textarea
  // else - clearing the input and the textarea
  if (savedMessage) {
    try {
      let objectMessage = JSON.parse(savedMessage);

      refs.input.value = objectMessage.email;
      refs.textarea.value = objectMessage.message;
    } catch (error) {
      console.log(error.message);
      console.log(error.name);
    }
  } else {
    refs.input.value = '';
    refs.textarea.value = '';
  }
}

/* When submitting the form, clear the storage and form fields  */
// function that clears the form when the form has been submitted
// and removing storageKey value from the localStorage
function onFormSubmit(evt) {
  evt.preventDefault();

  // clearing a form when submit
  evt.currentTarget.reset();

  // removing storageKey info from the localStorage
  localStorage.removeItem(STORAGE_KEY);
}
