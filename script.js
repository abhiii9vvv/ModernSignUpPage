// Password toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const eyeButton = document.querySelector('.eye-icon');
  const passwordInput = document.querySelector('.password-field input[type="password"]');
  const eyeIcon = eyeButton.querySelector('svg');
  
  eyeButton.addEventListener('click', function() {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      eyeIcon.innerHTML = `
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
      `;
    } else {
      passwordInput.type = 'password';
      eyeIcon.innerHTML = `
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      `;
    }
  });

  // Form validation
  const form = document.querySelector('.signup-form');
  const createAccountBtn = document.querySelector('.create-account-btn');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form elements
    const firstName = document.querySelector('input[placeholder="First name"]');
    const lastName = document.querySelector('input[placeholder="Last name"]');
    const email = document.querySelector('input[placeholder="Email"]');
    const password = passwordInput;
    const checkbox = document.querySelector('.checkbox');
    
    // Simple validation
    let isValid = true;
    
    if (!firstName.value.trim()) {
      firstName.style.borderColor = '#ef4444';
      isValid = false;
    } else {
      firstName.style.borderColor = '#3a3a4a';
    }
    
    if (!lastName.value.trim()) {
      lastName.style.borderColor = '#ef4444';
      isValid = false;
    } else {
      lastName.style.borderColor = '#3a3a4a';
    }
    
    if (!email.value.trim() || !email.value.includes('@')) {
      email.style.borderColor = '#ef4444';
      isValid = false;
    } else {
      email.style.borderColor = '#3a3a4a';
    }
    
    if (!password.value.trim() || password.value.length < 6) {
      password.style.borderColor = '#ef4444';
      isValid = false;
    } else {
      password.style.borderColor = '#3a3a4a';
    }
    
    if (!checkbox.checked) {
      checkbox.parentElement.style.color = '#ef4444';
      isValid = false;
    } else {
      checkbox.parentElement.style.color = '#ffffff';
    }
    
    if (isValid) {
      // Show loading state
      createAccountBtn.innerHTML = 'Creating account...';
      createAccountBtn.disabled = true;
      
      // Simulate account creation
      setTimeout(() => {
        alert('Account created successfully!');
        createAccountBtn.innerHTML = 'Create account';
        createAccountBtn.disabled = false;
        form.reset();
      }, 2000);
    }
  });
});
