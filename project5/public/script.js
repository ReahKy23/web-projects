window.onload = () => {
  const modalOverlay = document.getElementById("modalOverlay");
  const closeBtn = document.getElementById("closeModal");
  const openBtns = document.querySelectorAll(".openModal");
  
  // Get form sections
  const signupSection = document.getElementById("signup-section");
  const loginSection = document.getElementById("login-section");
  
  // Get toggle links
  const showLoginLink = document.getElementById("showLogin");
  const showSignupLink = document.getElementById("showSignup");
  
  // Get forms
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");

  // Only set up modal if elements exist (they don't exist on user.html)
  if (modalOverlay && closeBtn && openBtns.length > 0) {
    // OPEN MODAL - opens with signup by default
    openBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault(); // important if inside a form or link
        modalOverlay.classList.remove("hidden");
        // Show signup by default
        if (signupSection && loginSection) {
          signupSection.style.display = "block";
          loginSection.style.display = "none";
        }
      });
    });

    // CLOSE MODAL
    closeBtn.addEventListener("click", () => {
      modalOverlay.classList.add("hidden");
    });

    // Close modal when clicking outside
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.add("hidden");
      }
    });

    // TOGGLE TO LOGIN FORM
    if (showLoginLink && signupSection && loginSection) {
      showLoginLink.addEventListener("click", (e) => {
        e.preventDefault();
        signupSection.style.display = "none";
        loginSection.style.display = "block";
      });
    }

    // TOGGLE TO SIGNUP FORM
    if (showSignupLink && loginSection && signupSection) {
      showSignupLink.addEventListener("click", (e) => {
        e.preventDefault();
        loginSection.style.display = "none";
        signupSection.style.display = "block";
      });
    }

    // SIGNUP FORM VALIDATION (password matching)
    if (signupForm) {
      signupForm.addEventListener("submit", (e) => {
        const password = document.getElementById("signup-pswd").value;
        const confirm = document.getElementById("signup-pswdConfirm").value;

        if (password !== confirm) {
          e.preventDefault();
          alert("Passwords do not match");
          return;
        }
        // If passwords match, form will submit normally to /signup
      });
    }

    // LOGIN FORM - no validation needed, just submits to /authenticate
    // The server will handle authentication

    // Check for error messages in URL (from server redirects)
    // ONLY show modal if there's an error
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get("error");
    
    if (error) {
      // Open modal with login form showing ONLY IF there's an error
      modalOverlay.classList.remove("hidden");
      if (signupSection && loginSection) {
        signupSection.style.display = "none";
        loginSection.style.display = "block";
      }
      
      // Show error message based on type
      if (error === "usernotfound") {
        alert("User not found. Please check your username.");
      } else if (error === "invalidpassword") {
        alert("Invalid password. Please try again.");
      } else if (error === "signup") {
        alert("Error creating account. Username may already exist.");
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  }
};