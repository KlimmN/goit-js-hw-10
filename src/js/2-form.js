const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const { email, message } = form.elements;

let formData = { email: '', message: '' };

initFormFromStorage();

form.addEventListener('input', onFormInput);
form.addEventListener('submit', onFormSubmit);

function initFormFromStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  try {
    const parsed = JSON.parse(saved) || {};
    email.value = parsed.email || '';
    message.value = parsed.message || '';
    formData = { email: email.value, message: message.value };
  } catch {}
}

function onFormInput(e) {
  const { name, value } = e.target;
  formData[name] = value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();

  const data = {
    email: email.value.trim(),
    message: message.value.trim(),
  };

  if (!data.email || !data.message) {
    alert('Будь ласка, заповніть обидва поля.');
    return;
  }

  console.log(data);

  e.currentTarget.reset();
  formData = { email: '', message: '' };
  localStorage.removeItem(STORAGE_KEY);
}
