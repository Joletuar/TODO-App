// Validar que el email sea correcto

const expresion =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

export const errorMessageEmailValid = 'Ingrese un email válido';

export const fnEmailValid = (email) => {
    if (!email.match(expresion)) {
        return false;
    }
    return true;
};

// Validar que el email no este vacío o nulo

export const errorMessageEmailBlank = 'El email es obligatorio';

export const fnEmailBlank = (email) => {
    if (!email) return false;
    return true;
};
