// Validar correo electrónico
export const validateEmail = (value: string) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(value) ? "" : "Ingresa un correo electrónico válido";
};

// Validar que un campo no esté vacío
export const validateNotEmpty = (value: any) => {
  return value.length !== 0 ? "" : "Este campo no puede estar vacío";
};

// Validar que un campo fecha sea valido
export const validateCorrectDate = (value: any) => {
  return value.length !== 0 ? "" : "Ingrese una fecha correcta";
};

// Validar que la fecha introducida no supere la fecha actual
export const validateMaxDate = (value: string) => {
  const inputDate = new Date(value);
  const currentDate = new Date();
  return inputDate <= currentDate ? "" : "La fecha no puede ser futura";
};

// Validar que el campo sea un enlace valido
export const validateUrl = (value: string) => {
  const urlRegex = /^(http|https):\/\/[^ "]+$/;
  return urlRegex.test(value) ? "" : "Ingrese un enlace válido";
};