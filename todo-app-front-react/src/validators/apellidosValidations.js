export const errorMessageApellidosValid = 'Ingrese apellidos válidos';

export const fnApellidosValid = (apellidos) => {
    if (!apellidos || apellidos.length <= 1) return false;
    return true;
};
