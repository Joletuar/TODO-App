import { createBrowserRouter } from 'react-router-dom';
import { LayoutMain } from '../layouts';
import { AuthRouter } from '../auth/routes';
import { LoginPage, RegisterPage } from '../auth/pages';
import { PageLoading } from '../pages';
import { ErrorPage } from '../components';
import { TodoRouter } from '../appTodo/routes/TodoRouter';
import { PerfilPageTodo, TodoPageHome } from '../appTodo/pages';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutMain />,
        children: [
            {
                index: true,
                element: <PageLoading />,
            },
            {
                path: '/auth',
                element: <AuthRouter />,
                children: [
                    {
                        index: true,
                        element: <LoginPage />,
                    },
                    {
                        path: '/auth/login',
                        element: <LoginPage />,
                    },
                    {
                        path: '/auth/register',
                        element: <RegisterPage />,
                    },
                    {
                        path: '/auth/*',
                        element: <LoginPage />,
                    },
                ],
            },
            {
                path: '/app/todo-app',
                element: <TodoRouter />,
                children: [
                    {
                        index: true,
                        element: <TodoPageHome />,
                    },
                    {
                        path: '/app/todo-app/home',
                        element: <TodoPageHome />,
                    },
                    {
                        path: '/app/todo-app/perfil',
                        element: <PerfilPageTodo />,
                    },
                    {
                        path: '/app/todo-app/*',
                        element: <TodoPageHome />,
                    },
                ],
            },
        ],
    },
    {
        path: '/*',
        element: <ErrorPage />,
    },
]);
