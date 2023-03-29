import { deleteTodos } from '../todo/todoSlice';
import {
    checkingCredentials,
    login,
    logout,
    onUpdating,
    setMsg,
    updateUser,
} from './authSlice';

// Proceso que realiza el login

export const startLogin = (data = {}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        };

        try {
            const resp = await fetch(
                'http://localhost:3452/api/auth/',
                options
            );

            const { ok, user, msg } = await resp.json();

            if (!ok) {
                dispatch(logout());
                dispatch(setMsg({ msg }));
                return;
            }

            dispatch(
                login({
                    user,
                })
            );

            dispatch(setMsg({ msg: 'Inicio de sesión exitoso' }));
        } catch (error) {
            console.log(error);
            dispatch(logout());
            return;
        }
    };
};

// Proceso que realiza el registro de un nuevo user

export const startRegisterUser = (data = {}) => {
    return async (dispatch) => {
        const options = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        };

        try {
            const resp = await fetch(
                'http://localhost:3452/api/auth/new',
                options
            );

            const { ok, user, msg } = await resp.json();

            if (!ok) {
                dispatch(logout());
                dispatch(setMsg({ msg }));
                return;
            }

            dispatch(setMsg({ msg: 'Registro exitoso' }));

            dispatch(checkingCredentials());

            dispatch(
                login({
                    user,
                })
            );
        } catch (error) {
            console.log(error);
            dispatch(logout());
            return;
        }
    };
};

// Proceso que realiza el logout de la sesión

export const startLogout = () => {
    return async (dispatch) => {
        dispatch(logout());
        dispatch(deleteTodos());
    };
};

// Proceso que realiza el update de los datos del usuario

export const startUpdateUser = (data = {}) => {
    return async (dispatch, getState) => {
        // Recuperamos el token y uid

        dispatch(onUpdating(true));

        const {
            user: { token, uid },
        } = getState().auth;

        const options = {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'x-token': token,
            },
        };

        const url = `http://localhost:3452/api/auth/${uid}`;

        try {
            const resp = await fetch(url, options);
            const { ok, msg, user } = await resp.json();

            if (!ok) {
                dispatch(setMsg({ msg }));
                dispatch(onUpdating(false));
                return;
            }

            dispatch(updateUser({ user: user }));

            dispatch(setMsg({ msg: 'Actualización correcta' }));

            return;
        } catch (error) {
            console.log(error);
            dispatch(logout());
            return;
        }
    };
};

export const verificarJWT = (token = '') => {
    return async (dispatch) => {
        
        const options = {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'x-token': token,
            },
        };
        const url = `http://localhost:3452/api/auth/renew`;

        try {
            const resp = await fetch(url, options);
            const { ok, user } = await resp.json();

            if (!ok) {
                dispatch(logout());
                dispatch(setMsg({ msg: null }));
                return;
            }

            dispatch(checkingCredentials());

            dispatch(
                login({
                    user,
                })
            );

            dispatch(setMsg({ msg: 'Inicio de sesión exitoso' }));
        } catch (error) {
            console.log(error);
            dispatch(logout());
            return;
        }
    };
};
