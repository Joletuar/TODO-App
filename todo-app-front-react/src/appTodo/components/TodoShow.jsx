export const TodoShow = ({
    titulo,
    estado,
    descripcion,
    user,
    handleEditar,
    onDeleteTodo,
}) => {
    return (
        <>
            <div className='container-fluid mb-3'>
                <div className='row justify-content-between align-items-center'>
                    <h2
                        className='col-9 p-0 fs-5'
                        style={{
                            textDecoration:
                                estado === 'completed' ? 'line-through' : '',
                        }}
                    >
                        {titulo}
                    </h2>
                    <div className='col-2 p-0 text-center'>
                        {estado === 'completed' ? (
                            <i className='bi bi-check-circle-fill  text-success'></i>
                        ) : (
                            <i className='bi bi-x-circle-fill  text-danger'></i>
                        )}
                    </div>
                </div>
            </div>

            <div className='mb-3 border border-success rounded-2 p-2'>
                <p>{descripcion}</p>
            </div>

            <p className='fw-bold'>
                Usuario:{''} <span className='fw-normal'>{user.userName}</span>
            </p>

            <div className='d-flex gap-2'>
                <button
                    className='btn btn-warning flex-fill'
                    onClick={handleEditar}
                >
                    Editar
                </button>
                <button
                    className='btn btn-danger flex-fill'
                    onClick={onDeleteTodo}
                >
                    Eliminar
                </button>
            </div>
        </>
    );
};
