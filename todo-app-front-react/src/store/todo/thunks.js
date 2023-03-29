import { setMsg } from '../auth';
import {
    deleteTodo,
    desactiveLoading,
    onNoConexion,
    onSaving,
    setLoading,
    setTodos,
    updateTodo,
} from './todoSlice';

// Proceso que realiza la carga de los TODOs desde la BD

export const startLoadingTodos = () => {
    return async (dispatch, getState) => {
        dispatch(setLoading());

        // Recuperamos el uid y token del store

        const {
            user: { uid, token },
        } = getState().auth;

        const url = `http://localhost:3452/api/todos/${uid}`;

        const options = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'x-token': token,
            },
        };

        try {
            const resp = await fetch(url, options);
            const { ok, todoList, userName, msg } = await resp.json();

            if (!ok) {
                dispatch(setMsg({ msg }));
                dispatch(desactiveLoading());
                return;
            }

            const dataNew = await todoList.map((todo) => {
                const todoNew = { ...todo };

                todoNew.user = { userId: todoNew.user, userName };

                return todoNew;
            });

            dispatch(setTodos({ data: dataNew }));
        } catch (error) {
            console.log(error);
            dispatch(onNoConexion());
            dispatch(desactiveLoading());
            return;
        }
    };
};

// Proceso que realiza la eliminación de un TODO

export const startDeleteTodo = (idTodo = '') => {
    return async (dispatch, getState) => {
        const {
            user: { token },
        } = getState().auth;

        const url = `http://localhost:3452/api/todos/${idTodo}`;

        const options = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'x-token': token,
            },
        };

        try {
            const resp = await fetch(url, options);
            const { ok, msg } = await resp.json();

            if (!ok) {
                dispatch(setMsg({ msg }));
                dispatch(desactiveLoading());
                return;
            }

            dispatch(deleteTodo({ idTodo }));
            dispatch(setMsg({ msg: 'Eliminación correcta' }));
        } catch (error) {
            console.log(error);
            dispatch(onNoConexion());
            dispatch(desactiveLoading());
            return;
        }
    };
};

// Proceso que realiza la actulización de la información de un TODO

export const startUpdateTodo = (idTodo = '', data = {}) => {
    return async (dispatch, getState) => {
        dispatch(onSaving(true));

        const {
            user: { token },
        } = getState().auth;

        const url = `http://localhost:3452/api/todos/${idTodo}`;

        const options = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'x-token': token,
            },
        };

        try {
            const resp = await fetch(url, options);
            const { ok, todo, userName, msg } = await resp.json();

            if (!ok) {
                dispatch(setMsg({ msg }));
                dispatch(onSaving(false));
                return;
            }

            todo.user = { userId: todo.user, userName };

            dispatch(updateTodo({ todo }));
            dispatch(setMsg({ msg: 'Actualización correcta' }));
        } catch (error) {
            console.log(error);
            dispatch(onNoConexion());
            dispatch(desactiveLoading());
            return;
        }
    };
};

// Proceso que realiza la creación de nuevo TODO

export const startCreateNewTodo = (data = {}) => {
    return async (dispatch, getState) => {
        dispatch(onSaving(true));

        const {
            user: { token },
        } = getState().auth;

        const url = `http://localhost:3452/api/todos/new`;

        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'x-token': token,
            },
        };

        try {
            const resp = await fetch(url, options);
            const { ok, todo, userName, msg } = await resp.json();

            if (!ok) {
                dispatch(setMsg({ msg }));
                dispatch(onSaving(false));
                return;
            }

            todo.user = { userId: todo.user, userName };

            dispatch(setMsg({ msg: 'Creación correcta' }));
            dispatch(onSaving(false));
        } catch (error) {
            console.log(error);
            dispatch(onNoConexion());
            dispatch(desactiveLoading());
            return;
        }
    };
};
