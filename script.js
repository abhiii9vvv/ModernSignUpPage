// Password toggle functionality
document.addEventListener("DOMContentLoaded", function () {
  const eyeButton = document.querySelector(".eye-icon");
  const passwordInput = document.querySelector(
    '.password-field input[type="password"]',
  );
  const eyeIcon = eyeButton.querySelector("svg");

  eyeButton.addEventListener("click", function () {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      eyeIcon.innerHTML = `
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
        <line x1="1" y1="1" x2="23" y2="23"></line>
      `;
    } else {
      passwordInput.type = "password";
      eyeIcon.innerHTML = `
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      `;
    }
  });

  // Form validation
  const form = document.querySelector(".signup-form");
  const createAccountBtn = document.querySelector(".create-account-btn");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    //get from ele

    const firstName = document.querySelector('input[placeholder="First name"]');
    const lastName = document.querySelector('input[placeholder="Last name"]');
    const email = document.querySelector('input[placeholder="Email"]');
    const password = passwordInput;
    const checkbox = document.querySelector(".checkbox");

    let isValid = true;

    if (!firstName.value.trim()) {
      firstName.style.borderColor = "#ef4444";
      isValid = false;
    } else {
      firstName.style.borderColor = "#3a3a4a";
    }

    if (!lastName.value.trim()) {
      lastName.style.borderColor = "#ef4444";
      isValid = false;
    } else {
      lastName.style.borderColor = "#3a3a4a";
    }

    if (!email.value.trim() || !email.value.includes("@")) {
      email.style.borderColor = "#ef4444";
      isValid = false;
    } else {
      email.style.borderColor = "#3a3a4a";
    }

    if (!password.value.trim() || password.value.length < 6) {
      password.style.borderColor = "#ef4444";
      isValid = false;
    } else {
      password.style.borderColor = "#3a3a4a";
    }

    if (!checkbox.checked) {
      checkbox.parentElement.style.color = "#ef4444";
      isValid = false;
    } else {
      checkbox.parentElement.style.color = "#ffffff";
    }

    if (!isValid) return;

    try {
      createAccountBtn.innerHTML = "Creating account...";
      createAccountBtn.disabled = true;

      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.value.trim(),
          lastName: lastName.value.trim(),
          email: email.value.trim(),
          password: password.value.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup Failed");
      }
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userData", JSON.stringify({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email
        }));
      }

      alert(data.message || "Account created successfully!");
      
      // Redirect to dashboard after successful signup
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 500);
      
      form.reset();
    } catch (error) {
      alert(error.message || "Something Went wrong");
    } finally {
      createAccountBtn.innerHTML = "Create account";
      createAccountBtn.disabled = false;
    }
  });
});
