let formData = {
  firstName: 'Алексей',
  lastName: '',
  middleName: '',
  mobile: '+09 363 398 46',
  email: 'emirhanboruch55@gmail.com',
  region: 'Самарская область',
  city: '',
  companyName: 'Emirhan',
  website: 'emirhanboruch55@gmail.com',
  companyPhone: '+09 363 398 46',
  companyEmail: 'emirhanboruch55@gmail.com'
};
let originalData = { ...formData };
let isEditing = false;

// DOM elements
const editButtonContainer = document.getElementById('editButtonContainer');
const actionButtonsContainer = document.getElementById('actionButtonsContainer');
const editButton = document.getElementById('editButton');
const saveButton = document.getElementById('saveButton');
const cancelButton = document.getElementById('cancelButton');

// Field mappings
const fields = [
  { key: 'firstName', display: 'firstNameDisplay', input: 'firstNameInput' },
  { key: 'lastName', display: 'lastNameDisplay', input: 'lastNameInput' },
  { key: 'middleName', display: 'middleNameDisplay', input: 'middleNameInput' },
  { key: 'mobile', display: 'mobileDisplay', input: 'mobileInput' },
  { key: 'email', display: 'emailDisplay', input: 'emailInput' },
  { key: 'region', display: 'regionDisplay', input: 'regionInput' },
  { key: 'city', display: 'cityDisplay', input: 'cityInput' },
  { key: 'companyName', display: 'companyNameDisplay', input: 'companyNameInput' },
  { key: 'website', display: 'websiteDisplay', input: 'websiteInput' },
  { key: 'companyPhone', display: 'companyPhoneDisplay', input: 'companyPhoneInput' },
  { key: 'companyEmail', display: 'companyEmailDisplay', input: 'companyEmailInput' }
];

// Initialize display
function updateDisplay() {
  fields.forEach(field => {
    const displayEl = document.getElementById(field.display);
    const inputEl = document.getElementById(field.input);
    displayEl.textContent = formData[field.key] || '';
    inputEl.value = formData[field.key] || '';
  });
}

// Toggle edit mode
function toggleEditMode(enable) {
  isEditing = enable;
  editButtonContainer.classList.toggle('hidden', isEditing);
  actionButtonsContainer.classList.toggle('hidden', !isEditing);
  fields.forEach(field => {
    const displayEl = document.getElementById(field.display);
    const inputEl = document.getElementById(field.input);
    displayEl.classList.toggle('hidden', isEditing);
    inputEl.classList.toggle('hidden', !isEditing);
  });
}

// Handle input changes
fields.forEach(field => {
  const inputEl = document.getElementById(field.input);
  inputEl.addEventListener('input', (e) => {
    formData[field.key] = e.target.value;
  });
});

// Event listeners
editButton.addEventListener('click', () => toggleEditMode(true));
saveButton.addEventListener('click', () => {
  originalData = { ...formData };
  toggleEditMode(false);
});
cancelButton.addEventListener('click', () => {
  formData = { ...originalData };
  updateDisplay();
  toggleEditMode(false);
});

// Initial render
updateDisplay();
