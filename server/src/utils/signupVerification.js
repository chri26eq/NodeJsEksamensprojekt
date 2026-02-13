import { HttpError } from "../utils/customErrors.js"

import {
  emailExists,
  nicknameExists, 
} from "../database/repos/usersRepo.js";




export async function validateCredential(email, nickname, password, passwordConfirm) {
  if (!areFieldsFilled(email, nickname, password, passwordConfirm)) {
    throw new HttpError(400, "All fields must be filled out"); 
  }

  if (!isValidEmail(email)) {
    throw new HttpError(400, "Please enter a valid email address");
  }

  if (!doPasswordsMatch(password, passwordConfirm)) {
    throw new HttpError(400, "Passwords do not match. Please try again");
  }

  if (password.length < 8) {
    throw new HttpError(400, "Password must be at least 8 characters long");
  }

  if (!isValidPassword(password)) {
    throw new HttpError(400, "Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character")
  }

  if (await emailExists(email)) {
    throw new HttpError(409, "Email already exists");
  }
  if (await nicknameExists(nickname)){
    throw new HttpError(409, "Nickname already exists");
  }
    
}


function isValidPassword(password) {

  const hasNumber = /[0-9]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  
  return hasNumber && hasUpperCase && hasLowerCase && hasSpecialChar;
}

function areFieldsFilled(...fields) {
    return fields.every(
      (field) => field !== "" && field !== null && field !== undefined
    );
  }

function doPasswordsMatch(password1, password2) {
  return password1 === password2;
}

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
  return emailRegex.test(email);
}