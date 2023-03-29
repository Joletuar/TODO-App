import { useSelector } from 'react-redux';
import { ErrorInputMessage } from '../../auth/components';

export const TodoEditable = ({
    titulo,
    estado,
    user,
    descripcion,
    tituloValid,
    descripcionValid,
    onInputChange,
    onUpdateTodo,
}) => {
    const { isSaving } = useSelector((state) => state.appTodo);

    return (
        <>
            <div className='mb-3'>
                <label className='form-label' htmlFor='titulo'>
                    Titulo
                </label>

                <input
                    className='form-control'
                    type='text'
                    name='titulo'
                    id='titulo'
                    value={titulo}
                    onChange={onInputChange}
                />

                {tituloValid && (
                    <ErrorInputMessage>{tituloValid}</ErrorInputMessage>
                )}
            </div>

            <div className='mb-3'>
                <input
                    className='border border-ligth rounded-2 p-2 form-control'
                    type='text'
                    name='descripcion'
                    id='descripcion'
                    value={descripcion}
                    onChange={onInputChange}
                />
                {descripcionValid && (
                    <ErrorInputMessage>{descripcionValid}</ErrorInputMessage>
                )}
            </div>

            <div className='mb-3'>
                <label className='form-label' htmlFor='user'>
                    Usuario{' '}
                </label>
                <input
                    className='form-control'
                    type='text'
                    name='user'
                    id='user'
                    value={user.userName}
                    disabled
                    onChange={onInputChange}
                />
            </div>

            <div className='mb-3'>
                <label className='form-label' htmlFor='estado'>
                    Estado
                </label>
                <select
                    className='form-control'
                    name='estado'
                    id='estado'
                    value={estado}
                    onChange={onInputChange}
                >
                    <option value='no-completed'>No Completado</option>
                    <option value='completed'>Completado</option>
                </select>
            </div>

            <div className='d-flex gap-2'>
                <button
                    className='btn btn-dark flex-fill'
                    onClick={onUpdateTodo}
                    disabled={isSaving}
                >
                    {isSaving ? 'Guardando cambios...' : ' Guardar Cambios'}
                </button>
            </div>
        </>
    );
};
