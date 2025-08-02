import { isValidPhoneNumber, type CountryCode } from "libphonenumber-js";

export const validateEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);

export const validatePassword = (password: string) => password.length >= 8;

export const validateName = (name: string) => name.trim().length >= 2;

export const validatePhone = (
  phoneNumber: string,
  countryCode?: CountryCode
) => {
  console.log(isValidPhoneNumber(phoneNumber, countryCode));
  return isValidPhoneNumber(phoneNumber, countryCode);
};

