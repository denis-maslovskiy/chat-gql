export const emailValidationPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const onlyLettersPattern = /^[A-Za-z]+$/;

export const colors = {
  darkBlue: "#4e51e9",
  ultraDarkBlue: "#12334c",
  blue: "#2EA6FF",
  bgcolor: "#1b4c71",
  lightgray: "#dedede",
  lightRed: "#cc4b4b",
  brightRed: "#ff3030",
};

export const newChatTitleErrors = {
  min: "The chat title must be at least 6 characters long.",
  max: "The chat title must have a maximum of 50 characters.",
};

export const screenSizes = {
  desktop: "1370px",
  tablet: "1370px",
  landscape: "1124px",
  mobile: "767px",
};

export const formErrorMessages = {
  isRequired: (field) => `${field} is required`,
  enterValidEmail: "Please enter a valid email",
  minLength: (field, limitation) => `${field} must be at least ${limitation} characters long`,
  maxLength: (field, limitation) => `${field} must contain no more than ${limitation} characters`,
  containOnlyLetters: (field) => `${field} must contain only letters`,

};
