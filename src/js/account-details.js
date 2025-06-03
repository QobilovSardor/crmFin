// DOM elements
const infoText = document.getElementById('infoText');
const toggleTextButton = document.getElementById('toggleText');
const sameAsLegalAddressContainer = document.getElementById('sameAsLegalAddress');
const termsAgreementContainer = document.getElementById('termsAgreement');
const sameAsLegalAddressCheckbox = sameAsLegalAddressContainer ? sameAsLegalAddressContainer.querySelector('.checkbox-input') : null;
const termsAgreementCheckbox = termsAgreementContainer ? termsAgreementContainer.querySelector('.checkbox-input') : null;
const legalFormSelect = document.getElementById('legalForm');

// Full and truncated text
const fullText = 'Это откроет полный доступ ко всем возможностям нашей платформы, позволит удобно управлять финансовыми операциями и обеспечит возможность быстро и легко пополнять баланс вашего аккаунта посредством безналичных платежей. А заключение договора закрепит наши взаимовыгодные отношения официально, предоставив вам уверенность в безопасности и надежности всех проводимых операций.';
const truncatedText = 'Это откроет полный доступ ко всем возможностям нашей платформы, позволит удобно управлять финансовыми операциями и...';

// Handle checkbox changes
function handleCheckboxChange(key) {
    checkboxState[key] = !checkboxState[key];
    const checkbox = key === 'sameAsLegalAddress' ? sameAsLegalAddressCheckbox : termsAgreementCheckbox;
    const container = key === 'sameAsLegalAddress' ? sameAsLegalAddressContainer : termsAgreementContainer;
    if (checkbox && container) {
        checkbox.checked = checkboxState[key];
        container.dataset.checked = checkboxState[key];
    }
}

// Toggle text expansion
function toggleText() {
    if (typeof isTextExpanded === 'undefined') {
        isTextExpanded = false;
    }
    isTextExpanded = !isTextExpanded;
    if (infoText) {
        infoText.textContent = isTextExpanded ? fullText : truncatedText;
    }
    if (toggleTextButton) {
        toggleTextButton.textContent = isTextExpanded ? 'Скрыть' : 'Раскрыть';
    }
}

// Handle select change
if (legalFormSelect) {
    legalFormSelect.addEventListener('change', (e) => {
        console.log('Selected value:', e.target.value);
    });
}

// Event listeners for checkboxes
if (sameAsLegalAddressCheckbox) {
    sameAsLegalAddressCheckbox.addEventListener('change', () => handleCheckboxChange('sameAsLegalAddress'));
}
if (termsAgreementCheckbox) {
    termsAgreementCheckbox.addEventListener('change', () => handleCheckboxChange('receiveReportEmail'));
}

// Event listener for text toggle
if (toggleTextButton) {
    toggleTextButton.addEventListener('click', toggleText);
}

// Initial render
if (infoText) {
    infoText.textContent = window.innerWidth >= 640 ? fullText : truncatedText;
}
if (toggleTextButton) {
    toggleTextButton.textContent = isTextExpanded ? 'Скрыть' : 'Раскрыть';
}
if (sameAsLegalAddressCheckbox && sameAsLegalAddressContainer) {
    sameAsLegalAddressCheckbox.checked = checkboxState.sameAsLegalAddress;
    sameAsLegalAddressContainer.dataset.checked = checkboxState.sameAsLegalAddress;
}
if (termsAgreementCheckbox && termsAgreementContainer) {
    termsAgreementCheckbox.checked = checkboxState.receiveReportEmail;
    termsAgreementContainer.dataset.checked = checkboxState.receiveReportEmail;
}
