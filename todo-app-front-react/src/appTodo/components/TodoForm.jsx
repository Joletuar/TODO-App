import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startCreateNewTodo, startLoadingTodos } from '../../store/todo';
import { useForm } from '../../hooks';
import { ErrorInputMessage } from '../../auth/components';

import {
    errorMessageDesValid,
    fnDesValid,
    errorMessageTitleValid,
    fnTitleValid,
} from '../../validators';

const initialValidations = {
    titulo: [fnTitleValid, errorMessageTitleValid],
    descripcion: [fnDesValid, errorMessageDesValid],
};

const todo = {
    titulo: '',
    descripcion: '',
    estado: 'no-completed',
};

export const TodoForm = ({ setShow }) => {
    const [showErrors, setShowErrors] = useState(false);
    const { isSaving } = useSelector((state) => state.appTodo);
    const dispatch = useDispatch();

    const {
        titulo,
        descripcion,
        estado,
        onInputChange,
        formState,
        isFormValid,
        tituloValid,
        descripcionValid,
    } = useForm(todo, initialValidations);

    const onSubmitForm = (e) => {
        e.preventDefault();

        setShowErrors(true);

        if (!isFormValid) return;

        const promesa = dispatch(startCreateNewTodo(formState));

        promesa.then(() => {
            setShow(false);
            dispatch(startLoadingTodos());
        });
    };

    return (
        <form onSubmit={onSubmitForm}>
            <div className='mb-3'>
                <label className='form-label' htmlFor='titulo'>
                    Titulo
                </label>

                <input
                    className='form-control'
                    type='text'
                    name='titulo'
                    id='titulo'
                    value={titulo}
                    onChange={onInputChange}
                />

                {tituloValid && showErrors && (
                    <ErrorInputMessage>{tituloValid}</ErrorInputMessage>
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

                {descripcionValid && showErrors && (
                    <ErrorInputMessage>{descripcionValid}</ErrorInputMessage>
                )}
            </div>
            <div className='mb-3'>
                <label className='form-label' htmlFor='estado'>
                    Estado
                </label>
                <select
                    className='form-control'
                    name='estado'
                    id='estado'
                    value={estado}
                    onChange={onInputChange}
                >
                    <option value='no-completed'>No Completado</option>
                    <option value='completed'>Completado</option>
                </select>
            </div>

            <div className='d-flex gap-2'>
                <button
                    className='btn btn-warning flex-fill'
                    type='submit'
                    disabled={isSaving}
                >
                    {isSaving ? 'Creando...' : 'Crear'}
                </button>
                <button
                    className='btn btn-danger flex-fill'
                    onClick={(e) => {
                        e.preventDefault();
                        return setShow(false);
                    }}
                >
                    Cerrar
                </button>
            </div>
        </form>
    );
};
