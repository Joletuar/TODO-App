import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { verificarJWT } from '../store/auth';

export const PageLoading = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem('jwt');

    useEffect(() => {
        if (token) {
            const promesa = dispatch(verificarJWT(token));

            promesa.then(() => {
                navigate('/app/todo-app');
            });
        }
    }, []);

    return <>{!token && <Navigate to='/auth/login' />}</>;
};
