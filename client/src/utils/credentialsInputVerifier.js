

export function isValidPassword(password) {

  const hasNumber = /[0-9]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  
  return hasNumber && hasUpperCase && hasLowerCase && hasSpecialChar;
}

export function areFieldsFilled(...fields) {
    return fields.every(
      (field) => field !== "" && field !== null && field !== undefined
    );
  }

export function doPasswordsMatch(password1, password2) {
  return password1 === password2;
}

export function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
  return emailRegex.test(email);
}
