export const errorMessageNameValid = 'Ingrese un nombre válido';

export const fnNameValid = (name) => {
    if (!name || name.length <= 1) return false;
    return true;
};
