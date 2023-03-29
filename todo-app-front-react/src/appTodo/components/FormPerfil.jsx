import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks';
import { startUpdateUser } from '../../store/auth';
import { useNavigate } from 'react-router-dom';

import {
    errorMessageApellidosValid,
    errorMessageDescripcionValid,
    errorMessageEmailValid,
    errorMessageNameValid,
    fnApellidosValid,
    fnDescripcionValid,
    fnEmailValid,
    fnNameValid,
} from '../../validators';

import { ErrorInputMessage } from '../../auth/components';

const initialValidations = {
    nombre: [fnNameValid, errorMessageNameValid],
    apellidos: [fnApellidosValid, errorMessageApellidosValid],
    correo: [fnEmailValid, errorMessageEmailValid],
    descripcion: [fnDescripcionValid, errorMessageDescripcionValid],
};

export const FormPerfil = () => {
    const [showErrors, setShowErrors] = useState(false);
    const { user, isUpdating } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const {
        nombre,
        apellidos,
        correo,
        descripcion,
        onInputChange,
        formState,
        isFormValid,
        nombreValid,
        apellidosValid,
        correoValid,
        descripcionValid,
    } = useForm(
        {
            nombre: user.nombre,
            apellidos: user.apellidos,
            correo: user.correo,
            descripcion: user.descripcion,
        },
        initialValidations
    );

    const dispatch = useDispatch();

    const onSubmitUpdate = (e) => {
        e.preventDefault();

        setShowErrors(true);

        if (!isFormValid) return;

        const promesa = dispatch(startUpdateUser(formState));

        promesa.then(() => {
            navigate('/app/todo-app/home');
        });
    };

    return (
        <form
            className='container-xl p-4 rounded-3 my-4'
            onSubmit={onSubmitUpdate}
        >
            <div className='row justify-content-center'>
                <div className='col-xl-7 col-md-8 col-12 border rounded-2 p-3'>
                    <legend className='text-center fw-bold fs-1'>
                        Información de Usuario
                    </legend>

                    <div className='mt-5 mb-3'>
                        <label htmlFor='nombre' className='form-label'>
                            Nombre
                        </label>
                        <input
                            className='form-control'
                            type='text'
                            id='nombre'
                            name='nombre'
                            placeholder='Johan'
                            value={nombre}
                            onChange={onInputChange}
                        />
                        {showErrors && nombreValid && (
                            <ErrorInputMessage>{nombreValid}</ErrorInputMessage>
                        )}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='apellidos' className='form-label'>
                            Apellidos
                        </label>
                        <input
                            className='form-control'
                            type='text'
                            id='apellidos'
                            name='apellidos'
                            placeholder='Tuarez Vega'
                            value={apellidos}
                            onChange={onInputChange}
                        />
                        {showErrors && apellidosValid && (
                            <ErrorInputMessage>
                                {apellidosValid}
                            </ErrorInputMessage>
                        )}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='correo' className='form-label'>
                            Correo
                        </label>
                        <input
                            className='form-control'
                            type='email'
                            id='correo'
                            name='correo'
                            placeholder='correo@correo.com'
                            value={correo}
                            onChange={onInputChange}
                        />
                        {showErrors && correoValid && (
                            <ErrorInputMessage>{correoValid}</ErrorInputMessage>
                        )}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='descripcion' className='form-label'>
                            Descripción
                        </label>
                        <textarea
                            className='form-control'
                            name='descripcion'
                            id='descripcion'
                            cols='30'
                            rows='3'
                            placeholder='Soy programador ....'
                            value={descripcion}
                            onChange={onInputChange}
                        ></textarea>
                        {showErrors && descripcionValid && (
                            <ErrorInputMessage>
                                {descripcionValid}
                            </ErrorInputMessage>
                        )}
                    </div>

                    <div className='d-grid'>
                        <input
                            className='btn btn-primary fs-4'
                            type='submit'
                            value={
                                isUpdating
                                    ? 'Actualizando...'
                                    : 'Guardar Cambios'
                            }
                            disabled={isUpdating}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};
