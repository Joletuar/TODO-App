import { createSlice } from '@reduxjs/toolkit';

const NOT_AUTHENTICATED = 'not-authenticated';
const AUTHENTICATED = 'authenticated';
const CHECKING = 'checking';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: NOT_AUTHENTICATED,
        isUpdating: false,
        user: undefined,
        msg: null,
    },
    reducers: {
        login: (state, { payload }) => {
            state.status = AUTHENTICATED;
            state.user = payload.user;
            localStorage.setItem('jwt', payload.user.token);
        },
        logout: (state) => {
            state.status = NOT_AUTHENTICATED;
            state.user = undefined;
            state.msg = null;
            state.isUpdating = false;
            localStorage.clear();
        },
        checkingCredentials: (state) => {
            state.status = CHECKING;
        },
        updateUser: (state, { payload }) => {
            state.user = payload.user;
            state.isUpdating = false;
        },
        setMsg: (state, { payload }) => {
            state.msg = payload.msg;
        },
        onUpdating: (state, { payload }) => {
            state.isUpdating = payload;
        },
    },
});

export const {
    checkingCredentials,
    login,
    logout,
    updateUser,
    setMsg,
    onUpdating,
} = authSlice.actions;
