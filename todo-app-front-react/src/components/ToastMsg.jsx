import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMsg } from '../store/auth';

import { ToastContainer, Col, Row, Toast } from 'react-bootstrap';

export const ToastMsg = () => {
    const [show, setShow] = useState(false);
    const { msg } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (msg) {
            setShow(true);
            setTimeout(() => {
                dispatch(setMsg({ msg: null }));
            }, [1650]);
        }
    }, [msg]);

    return (
        <Row>
            <Col xs={6}>
                <ToastContainer
                    position='absolute'
                    style={{ top: '55px', left: 'calc(100% - 355px)' }}
                >
                    <Toast
                        onClose={() => setShow(false)}
                        show={show}
                        delay={1500}
                        autohide
                        bg='warning'
                    >
                        <Toast.Header>
                            <strong className='me-auto'>Notificación</strong>
                        </Toast.Header>
                        <Toast.Body className='Warning'>{msg}</Toast.Body>
                    </Toast>
                </ToastContainer>
            </Col>
        </Row>
    );
};
