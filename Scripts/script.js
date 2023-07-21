pages = {};
const baseUrl = "https://user/api";

pages.page_index = () => {
  const registerForm = document.getElementById("registerForm");
  const passwordField = document.getElementById("Password");
  const confirmPasswordField = document.getElementById("ConfirmPassword");
  const showPassCheckbox = document.getElementById("ShowPassword");

  showPassCheckbox.addEventListener("change", function () {
    const showPassword = showPassCheckbox.checked;
    passwordField.type = showPassword ? "text" : "password";
    confirmPasswordField.type = showPassword ? "text" : "password";
  });
  confirmPasswordField.addEventListener("input", function () {
    if (passwordField.value !== confirmPasswordField.value) {
      confirmPasswordField.style.border = "1px solid red";
      return;
    } else {
      confirmPasswordField.style.border = "none";
    }
  });
  passwordField.addEventListener("input", function () {
    if (passwordField.value !== confirmPasswordField.value) {
      confirmPasswordField.style.border = "1px solid red";
      return;
    } else {
      confirmPasswordField.style.border = "none";
    }
  });

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const firstName = document.getElementById("FirstName").value;
    const lastName = document.getElementById("LastName").value;
    const userName = document.getElementById("Username").value;
    const password = passwordField.value;
    const confirmPassword = confirmPasswordField.value;

    if (password !== confirmPassword) {
      confirmPasswordField.style.border = "1px solid red";
      return;
    } else {
      confirmPasswordField.style.border = "none";
    }

    const formData = new FormData(registerForm);

    fetch("${baseUrl}/register", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          window.location.href = "signin.html";
        }
      })
      .catch((error) => console.log(error));
  });
};

pages.page_signin = () => {
  const signInForm = document.getElementById("signInForm");
  const passwordField = document.getElementById("Password");
  const showPassCheckbox = document.getElementById("ShowPassword");

  showPassCheckbox.addEventListener("change", function () {
    const showPassword = showPassCheckbox.checked;
    passwordField.type = showPassword ? "text" : "password";
  });

  signInForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("Username").value;
    const password = passwordField.value;

    const formData = new FormData(signInForm);
    formData.append("username", username);
    formData.append("password", password);

    fetch(`${baseUrl}/signin`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          window.location.href = "dashboard.html";
          localStorage.setItem("username", data.username);
          localStorage.setItem("F_Name", data.firstName);
          localStorage.setItem("L_Name", data.lastName);
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => console.log(error));
  });
};

pages.page_dashboard = () => {
  const usernameSpan = document.getElementById("username");
  const fullNameSpan = document.getElementById("fullName");

  const storedUsername = localStorage.getItem("username");
  const storedFullName =
    localStorage.getItem("F_Name") + " " + localStorage.getItem("L_Name");

  if (storedUsername && storedFullName) {
    usernameSpan.textContent = storedUsername;
    fullNameSpan.textContent = storedFullName;
  }
};

pages.loadFor = (page) => {
  eval("pages.page_" + page + "();");
};
