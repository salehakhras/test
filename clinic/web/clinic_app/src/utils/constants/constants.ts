export const AuthMethod = {
  Email: "email",
  Phone: "phone",
  Google: "google",
};

export type AuthMethod = (typeof AuthMethod)[keyof typeof AuthMethod];

export const userRoles = {
  admin: "admin",
  manager: "manager",
  doctor: "doctor",
  secretary: "secretary",
  patient: "patient",
};

export type userRoles = (typeof userRoles)[keyof typeof userRoles];

export const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
