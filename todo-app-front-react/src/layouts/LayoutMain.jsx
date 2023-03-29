import { Outlet } from 'react-router-dom';
import { Navbar } from '../components';

export const LayoutMain = () => {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </>
    );
};
