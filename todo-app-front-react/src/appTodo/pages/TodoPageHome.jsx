import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { startLoadingTodos } from '../../store/todo/thunks';

import { ListTodoView, NoConexionView, NoDataView } from '../views';
import { LineWave } from 'react-loader-spinner';

import { ModalTodo } from '../components';

export const TodoPageHome = () => {
    const { todos, isLoading } = useSelector((state) => state.appTodo);
    const { msg, noConexion } = useSelector((state) => state.auth);
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startLoadingTodos());
    }, []);

    const onHandleAdd = (e) => {
        e.preventDefault();
        setShow(true);
    };

    if (isLoading) {
        return (
            <>
                <p>Cargando...</p>
                <LineWave
                    height='100'
                    width='100'
                    color='#d63636'
                    ariaLabel='line-wave'
                    visible={true}
                />
            </>
        );
    }

    if (noConexion) {
        return <>{msg && <NoConexionView />}</>;
    }

    return (
        <>
            {todos.length ? (
                <>
                    <ListTodoView todos={todos} />
                    <button
                        className='btn btn-primary rounded-4 position-fixed ms-2'
                        style={{
                            top: '90%',
                            zIndex: 99,
                        }}
                        onClick={onHandleAdd}
                    >
                        <i className='bi bi-plus-circle-fill fs-5'></i>
                    </button>
                </>
            ) : (
                <NoDataView />
            )}

            {show && <ModalTodo show={show} setShow={setShow} />}
        </>
    );
};
