import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startRegisterUser } from '../../store/auth';
import { useForm } from '../../hooks';

import {
    errorMessageApellidosValid,
    errorMessageDescripcionValid,
    errorMessageEmailValid,
    errorMessageNameValid,
    errorMessagePasswordsNotMatch,
    errorMessagePasswordValid,
    fnApellidosValid,
    fnDescripcionValid,
    fnEmailValid,
    fnNameValid,
    fnPasswordsNotMatch,
    fnPasswordValid,
} from '../../validators';

import { ErrorInputMessage } from './ErrorInputMessage';

const initialFormData = {
    nombre: '',
    apellidos: '',
    correo: '',
    password: '',
    password2: '',
    descripcion: '',
};

const initialValidations = {
    nombre: [fnNameValid, errorMessageNameValid],
    apellidos: [fnApellidosValid, errorMessageApellidosValid],
    correo: [fnEmailValid, errorMessageEmailValid],
    password: [fnPasswordValid, errorMessagePasswordValid],
    password2: [fnPasswordValid, errorMessagePasswordValid],
    descripcion: [fnDescripcionValid, errorMessageDescripcionValid],
};

const CHECKING = 'checking';

export const FormRegister = () => {
    const [showErrors, setShowErrors] = useState(false);
    const [tipo, setTipo] = useState('password');
    const { status } = useSelector((state) => state.auth);
    const isAuthenticating = useMemo(() => status === CHECKING, [status]);
    const dispatch = useDispatch();

    const {
        nombre,
        apellidos,
        correo,
        password,
        password2,
        descripcion,
        onInputChange,
        formState,
        isFormValid,
        nombreValid,
        apellidosValid,
        correoValid,
        passwordValid,
        password2Valid,
        descripcionValid,
    } = useForm(initialFormData, initialValidations);

    const onSubmitRegister = (e) => {
        e.preventDefault();

        setShowErrors(true);

        if (!isFormValid) return;

        dispatch(startRegisterUser(formState));
    };

    const handleShowPassword = (e) => {
        e.preventDefault();

        if (tipo === 'password') {
            setTipo('text');
        } else {
            setTipo('password');
        }
    };

    return (
        <form
            className='container-xl p-4 rounded-3 my-4'
            onSubmit={onSubmitRegister}
        >
            <div className='row justify-content-center'>
                <div className='col-xl-8 col-md-7 col-12 border rounded-2 p-3'>
                    <legend className='text-center fw-bold fs-1'>
                        Registro de Usuario
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
                            type='text'
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
                        <label htmlFor='password' className='form-label'>
                            Contaseña
                        </label>
                        <div className='input-group'>
                            <input
                                className='form-control'
                                type={tipo}
                                name='password'
                                id='password'
                                placeholder='**************'
                                value={password}
                                onChange={onInputChange}
                            />
                            <button
                                className='btn btn-outline-secondary'
                                type='button'
                                onClick={handleShowPassword}
                            >
                                <i className='bi bi-eye-slash-fill'></i>
                            </button>
                        </div>
                        {showErrors && passwordValid && (
                            <ErrorInputMessage>
                                {passwordValid}
                            </ErrorInputMessage>
                        )}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='password2' className='form-label'>
                            Repetir Contraseña
                        </label>
                        <div className='input-group'>
                            <input
                                className='form-control'
                                type={tipo}
                                name='password2'
                                id='password2'
                                placeholder='**************'
                                value={password2}
                                onChange={onInputChange}
                            />
                            <button
                                className='btn btn-outline-secondary'
                                type='button'
                                onClick={handleShowPassword}
                            >
                                <i className='bi bi-eye-slash-fill'></i>
                            </button>
                        </div>
                        {showErrors ? (
                            password2Valid ? (
                                <ErrorInputMessage>
                                    {password2Valid}
                                </ErrorInputMessage>
                            ) : (
                                !fnPasswordsNotMatch(password, password2) && (
                                    <ErrorInputMessage>
                                        {errorMessagePasswordsNotMatch}
                                    </ErrorInputMessage>
                                )
                            )
                        ) : null}
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
                                isAuthenticating
                                    ? 'Autenticando...'
                                    : 'Registrarse'
                            }
                            disabled={isAuthenticating}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};
