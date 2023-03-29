export const errorMessageTitleValid = 'Ingrese un título válido';

export const fnTitleValid = (title) => {
    if (!title || title.length <= 1) return false;
    return true;
};
