import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AUTHENTICATED = 'authenticated';

export const AuthRouter = () => {
    const { status } = useSelector((state) => state.auth);

    if (status === AUTHENTICATED) {
        return <Navigate to='/app/todo-app/home' />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};
