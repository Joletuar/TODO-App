import { useNavigate } from 'react-router-dom';

export const ErrorPage = () => {
    const navigate = useNavigate();

    const onhandleBack = () => {
        navigate('/');
    };

    return (
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <h1 className='col-5'>ErrorPage 404</h1>
                <button
                    className='col-2 btn btn-primary '
                    onClick={onhandleBack}
                >
                    Volver al HOME
                </button>
            </div>
        </div>
    );
};
