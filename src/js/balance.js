// Initial state
let isWarningVisible = false;
let selectedMethod = null;

// DOM elements
const cardPaymentButton = document.getElementById('cardPayment');
const invoicePaymentButton = document.getElementById('invoicePayment');
const warningBox = document.getElementById('warningBox');
const invoiceDetails = document.getElementById('invoiceDetails');

// Handle payment method click
function handlePaymentMethodClick(method) {
  isWarningVisible = true;
  selectedMethod = method;

  // Update button borders
  if (cardPaymentButton && invoicePaymentButton) {
    cardPaymentButton.classList.toggle('border-[#407BFF]', method === 'card');
    cardPaymentButton.classList.toggle('border-[#DEE3F3]', method !== 'card');
    invoicePaymentButton.classList.toggle('border-[#407BFF]', method === 'invoice');
    invoicePaymentButton.classList.toggle('border-[#DEE3F3]', method !== 'invoice');
  }

  // Update warning box and invoice details visibility
  if (warningBox) {
    warningBox.classList.toggle('hidden', !isWarningVisible);
  }
  if (invoiceDetails) {
    invoiceDetails.classList.toggle('hidden', !isWarningVisible);
  }
}

// Event listeners
if (cardPaymentButton) {
  cardPaymentButton.addEventListener('click', () => handlePaymentMethodClick('card'));
}
if (invoicePaymentButton) {
  invoicePaymentButton.addEventListener('click', () => handlePaymentMethodClick('invoice'));
}
