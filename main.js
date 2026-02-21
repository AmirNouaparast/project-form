// ======= Select DOM elements =======
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// ======= Form Submit Event =======
form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInputs();
});

// ======= UI State Handler =======
const setStatus = (element, message = "", type) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;

  inputControl.classList.remove("error", "success");
  inputControl.classList.add(type);
};

// ======= Email Validation =======
const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
};

// ======= Generic Required Validator =======
const checkRequired = (element, message) => {
  if (element.value.trim() === "") {
    setStatus(element, message, "error");
    return false;
  }
  setStatus(element, "", "success");
  return true;
};

// ======= Validate Inputs =======
const validateInputs = () => {
  const usernameValid = checkRequired(username, "نام کاربری اجباری");

  const emailValid =
    checkRequired(email, "ایمیل اجباری") &&
    (isValidEmail(email.value.trim())
      ? (setStatus(email, "", "success"), true)
      : (setStatus(email, "ایمیل معتبر نیست", "error"), false));

  const passwordValid =
    checkRequired(password, "گذرواژه اجباری") &&
    (password.value.trim().length >= 8
      ? (setStatus(password, "", "success"), true)
      : (setStatus(password, "حداقل 8 کاراکتر", "error"), false));

  const passwordMatch =
    checkRequired(password2, "تکرار گذرواژه اجباری") &&
    (password2.value === password.value
      ? (setStatus(password2, "", "success"), true)
      : (setStatus(password2, "گذرواژه مطابقت ندارد", "error"), false));

  return usernameValid && emailValid && passwordValid && passwordMatch;
};
