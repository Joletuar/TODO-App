import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AUTHENTICATED = 'authenticated';

export const TodoRouter = () => {
    const { status } = useSelector((state) => state.auth);

    if (status != AUTHENTICATED) {
        return <Navigate to='/' />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};
