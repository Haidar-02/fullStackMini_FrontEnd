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

    fetch("register.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        if (data.success) {
          window.location.href = "signin.html";
        }
      })
      .catch((error) => console.error(error));
  });
};

pages.page_signin = () => {};

pages.page_dashboard = () => {};

pages.loadFor = (page) => {
  eval("pages.page_" + page + "();");
};
