import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks';

import {
    errorMessageEmailBlank,
    errorMessagePasswordBlank,
    fnEmailBlank,
    fnPasswordBlank,
} from '../../validators';

import { startLogin } from '../../store/auth';
import { ErrorInputMessage } from './ErrorInputMessage';

const initialFormData = {
    correo: '',
    password: '',
};

const initialValidations = {
    correo: [fnEmailBlank, errorMessageEmailBlank],
    password: [fnPasswordBlank, errorMessagePasswordBlank],
};

const CHECKING = 'checking';

export const FormLogin = () => {
    const [showErrors, setShowErrors] = useState(false);
    const [tipo, setTipo] = useState('password');
    const { status } = useSelector((state) => state.auth);
    const isAuthenticating = useMemo(() => status === CHECKING, [status]);
    const dispatch = useDispatch();

    const {
        correo,
        password,
        onInputChange,
        formState,
        isFormValid,
        correoValid,
        passwordValid,
    } = useForm(initialFormData, initialValidations);

    const onSubmitLogin = (e) => {
        e.preventDefault();

        setShowErrors(true);

        if (!isFormValid) return;

        dispatch(startLogin(formState));
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
            className='container-xl mt-4 rounded-3 p-4'
            onSubmit={onSubmitLogin}
        >
            <div className='row justify-content-center'>
                <div className='col-md-5 col-sm-10 col-12 border rounded-2 p-2'>
                    <fieldset>
                        <legend className='text-center fw-bold fs-2'>
                            Ingreso de Usuario
                        </legend>
                    </fieldset>

                    <div className='mb-3'>
                        <label htmlFor='correo' className='form-label'>
                            Correo
                        </label>
                        <input
                            className='form-control'
                            type='email'
                            name='correo'
                            id='correo'
                            placeholder='correo@correo.com'
                            value={correo.trim()}
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
                                placeholder='***********'
                                value={password.trim()}
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

                    <div className='d-grid'>
                        <input
                            className='btn btn-primary fw-bold fs-5'
                            type='submit'
                            value={
                                isAuthenticating
                                    ? 'Autenticando...'
                                    : 'Ingresar'
                            }
                            disabled={isAuthenticating}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};
