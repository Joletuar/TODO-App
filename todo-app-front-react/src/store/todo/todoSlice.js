import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        isLoading: false,
        noConexion: false,
        isSaving: false,
        todos: [],
    },
    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
            state.noConexion = false;
        },
        setTodos: (state, { payload }) => {
            state.todos = payload.data;
            state.isLoading = false;
            state.noConexion = false;
        },
        desactiveLoading: (state) => {
            state.isLoading = false;
            state.noConexion = false;
        },
        deleteTodo: (state, { payload }) => {
            state.todos = state.todos.filter(
                (todo) => todo._id != payload.idTodo
            );
            state.noConexion = false;
        },
        updateTodo: (state, { payload }) => {
            state.todos = state.todos.map((valor) => {
                if (valor._id === payload.todo._id) return payload.todo;
                return valor;
            });
            state.isSaving = false;
            state.noConexion = false;
        },
        deleteTodos: (state) => {
            state.todos = [];
            state.noConexion = false;
        },
        onNoConexion: (state) => {
            state.noConexion = true;
        },
        onSaving: (state, { payload }) => {
            state.isSaving = payload;
        },
    },
});

export const {
    setLoading,
    desactiveLoading,
    setTodos,
    deleteTodos,
    deleteTodo,
    updateTodo,
    onNoConexion,
    onSaving,
} = todoSlice.actions;
