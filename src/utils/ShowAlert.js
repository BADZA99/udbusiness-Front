import { showAlert } from "tailwind-toastify";

export const handleShowAlert = (type, title, message) => {
  showAlert(type, title, message);
};
