import Modal from 'react-bootstrap/Modal';
import { TodoForm } from './TodoForm';

export const ModalTodo = ({ show, setShow }) => {
    return (
        <>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-center'>
                        Registrar Tarea
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TodoForm setShow={setShow} />
                </Modal.Body>
            </Modal>
        </>
    );
};
