import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialFormData = {}, initialValidations = {}) => {
    const [formState, setFormState] = useState(initialFormData);

    // Objeto que contiene las validaciones de los campos del formState
    const [formStateValidations, setFormStateValidations] = useState({});

    // Cambiamos el estado del formulario, cada vez que la data inicial cambie
    useEffect(() => {
        setFormState(initialFormData);
    }, []);

    // Si el formState cambia, entonces validamos de nuevo
    useEffect(() => {
        validateInputs();
    }, [formState]);

    // Decimos que el formulario es válido, solo si todos los valores del formStateValidations son undefined
    const isFormValid = useMemo(() => {
        for (const value of Object.values(formStateValidations)) {
            if (value) return false;
        }
        return true;
    }, [formStateValidations]);

    const onInputChange = (evt) => {
        const { name, value } = evt.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const validateInputs = () => {
        // Arreglo de validaciones de los campos
        const validationsObject = {};

        // Recorremos las validaciones que se quieren realizar
        for (const formField of Object.keys(initialValidations)) {
            const [fn, errorMessage] = initialValidations[formField];
            const isValid = fn(formState[formField]); // Puede ser true o false
            const resp = !isValid && errorMessage; // Si es false, la respuesta será el errorMessage
            validationsObject[`${formField}Valid`] = resp; // Creamos un clave con el nombre del campo del formulario + Valid, y donde su valor será la respuesta. Esta ultima puede ser un string o null
        }

        setFormStateValidations(validationsObject);
    };

    return {
        ...formState,
        formState,
        onInputChange,
        isFormValid,
        ...formStateValidations,
    };
};
