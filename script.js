// Interface for submission of enquiries

const enquiryForm = document.createElement('form');

const nameLabel = document.createElement('label');
nameLabel.textContent = 'Name:';
const nameInput = document.createElement('input');
nameInput.type = 'text';
nameInput.name = 'name';

const emailLabel = document.createElement('label');
emailLabel.textContent = 'Email:';
const emailInput = document.createElement('input');
emailInput.type = 'email';
emailInput.name = 'email';

const enquiryLabel = document.createElement('label');
enquiryLabel.textContent = 'Enquiry:';
const enquiryInput = document.createElement('textarea');
enquiryInput.name = 'enquiry';

const submitButton = document.createElement('button');
submitButton.textContent = 'Submit';

enquiryForm.appendChild(nameLabel);
nameLabel.appendChild(nameInput);

enquiryForm.appendChild(emailLabel);
emailLabel.appendChild(emailInput);

enquiryForm.appendChild(enquiryLabel);
enquiryLabel.appendChild(enquiryInput);

enquiryForm.appendChild(submitButton);

// Append the form to the body or a specific container
document.body.appendChild(enquiryForm);
