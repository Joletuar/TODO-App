import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { todoSlice } from './todo/todoSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        appTodo: todoSlice.reducer,
    },
});
