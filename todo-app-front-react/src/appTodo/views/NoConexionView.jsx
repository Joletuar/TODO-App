import { useDispatch } from 'react-redux';
import { setMsg } from '../../store/auth';
import { startLoadingTodos } from '../../store/todo';

export const NoConexionView = () => {
    const dispatch = useDispatch();

    const onReload = (e) => {
        e.preventDefault();
        dispatch(startLoadingTodos());
        dispatch(setMsg({ msg: null }));
    };

    return (
        <div className='container mt-3'>
            <div className='row justify-content-center'>
                <h1 className='text-center'>No se ha podido obtener datos</h1>
                <p className='text-center'>
                    Compruebe su conexión, y vuelva a intentarlo
                </p>
                <button className='btn btn-primary col-4' onClick={onReload}>
                    Recargar Página
                </button>
            </div>
        </div>
    );
};
