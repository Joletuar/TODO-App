import { RouterProvider } from 'react-router-dom';
import { ToastMsg } from '../components';

import { router } from './router';

export const AppRouter = () => {
    return (
        <>
            <ToastMsg />
            <RouterProvider router={router} />;
        </>
    );
};
