export const errorMessageDesValid = 'Ingrese un descripcion válida';

export const fnDesValid = (descripcion) => {
    if (!descripcion || descripcion.length < 6) return false;
    return true;
};
