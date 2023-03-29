import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks';
import { startDeleteTodo, startUpdateTodo } from '../../store/todo';
import { TodoEditable, TodoShow } from './';

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

export const Todo = ({ todo }) => {
    const [isEditable, setIsEditable] = useState(false);

    const {
        user,
        _id,
        descripcion,
        titulo,
        estado,
        onInputChange,
        formState,
        isFormValid,
        tituloValid,
        descripcionValid,
    } = useForm(todo, initialValidations);

    const dispatch = useDispatch();

    const handleEditar = (e) => {
        e.preventDefault();

        setIsEditable(true);
    };

    const onUpdateTodo = (e) => {
        e.preventDefault();

        if (!isFormValid) return;

        const promesa = dispatch(startUpdateTodo(_id, formState));

        promesa.then(() => {
            setIsEditable(false);
        });
    };

    const onDeleteTodo = (e) => {
        e.preventDefault();

        const opcion = confirm('¿Está seguro de eliminar?');

        if (!opcion) return;

        const promesa = dispatch(startDeleteTodo(_id));

        promesa.then(() => {});
    };

    return (
        <form className='col-11 col-md-5 col-xl-3 border rounded-3 p-3'>
            {isEditable ? (
                <TodoEditable
                    titulo={titulo}
                    tituloValid={tituloValid}
                    descripcion={descripcion}
                    descripcionValid={descripcionValid}
                    estado={estado}
                    user={user}
                    onInputChange={onInputChange}
                    onUpdateTodo={onUpdateTodo}
                />
            ) : (
                <TodoShow
                    titulo={titulo}
                    estado={estado}
                    user={user}
                    descripcion={descripcion}
                    onDeleteTodo={onDeleteTodo}
                    onUpdateTodo={onUpdateTodo}
                    handleEditar={handleEditar}
                />
            )}
        </form>
    );
};
