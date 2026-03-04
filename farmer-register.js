const form = document.getElementById("farmerForm");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const email = document.getElementById("email");
const confirmEmail = document.getElementById("confirmEmail");
const strengthBar = document.getElementById("strengthBar");
const profilePic = document.getElementById("profilePic");
const previewImage = document.getElementById("previewImage");

/* Email validation */
confirmEmail.addEventListener("input", () => {
    if (email.value !== confirmEmail.value) {
        confirmEmail.setCustomValidity("Emails do not match");
    } else {
        confirmEmail.setCustomValidity("");
    }
});

/* Password validation */
confirmPassword.addEventListener("input", () => {
    if (password.value !== confirmPassword.value) {
        confirmPassword.setCustomValidity("Passwords do not match");
    } else {
        confirmPassword.setCustomValidity("");
    }
});

/* Password strength meter */
password.addEventListener("input", () => {
    let strength = 0;
    if (password.value.length > 6) strength += 25;
    if (/[A-Z]/.test(password.value)) strength += 25;
    if (/[0-9]/.test(password.value)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password.value)) strength += 25;

    strengthBar.style.width = strength + "%";

    if (strength <= 25) strengthBar.style.background = "red";
    else if (strength <= 50) strengthBar.style.background = "orange";
    else if (strength <= 75) strengthBar.style.background = "yellow";
    else strengthBar.style.background = "green";
});

/* Image preview */
profilePic.addEventListener("change", function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            previewImage.src = reader.result;
            previewImage.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});

/* Form submission */
form.addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Farmer registered successfully!");
    form.reset();
    strengthBar.style.width = "0%";
    previewImage.style.display = "none";
});