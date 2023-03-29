const expresion =
    /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;

export const errorMessagePasswordValid = 'Ingrese una contraseña válida';

export const fnPasswordValid = (password) => {
    if (!password.match(expresion)) {
        return false;
    }
    return true;
};

// Validar que la contraseña no sea nula o este vacía

export const errorMessagePasswordBlank = 'La contraseña es obligatoria';

export const fnPasswordBlank = (password) => {
    if (!password) return false;
    return true;
};

// Validar que las contraseñas sean iguales

export const errorMessagePasswordsNotMatch = 'Las contraseñas no coinciden';

export const fnPasswordsNotMatch = (password1, password2) => {
    if (password1 != password2) return false;
    return true;
};
