import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { ModalTodo } from '../components';

export const NoDataView = () => {
    const [show, setShow] = useState(false);

    return (
        <div className='container-xl p-4 my-4'>
            <div
                className='row justify-content-center text-center align-items-center border rounded-3'
                style={{ height: '20vh' }}
            >
                <h3 className='col-12'>
                    No existen tareas creadas aún, cree una nueva
                </h3>
                <Button
                    variant='primary'
                    onClick={() => setShow(true)}
                    className='col-11 col-md-8 col-xl-5'
                >
                    <i className='bi bi-plus-circle-fill me-2'></i>
                    Añadir Tarea
                </Button>
            </div>
            {show && <ModalTodo show={show} setShow={setShow} />}
        </div>
    );
};
