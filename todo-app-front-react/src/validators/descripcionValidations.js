export const errorMessageDescripcionValid = 'Ingrese una descripción válida';

export const fnDescripcionValid = (descripcion) => {
    if (!descripcion || descripcion.length <= 5) return false;
    return true;
};
