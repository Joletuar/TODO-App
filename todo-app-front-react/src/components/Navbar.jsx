import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { startLogout } from '../store/auth';

const AUTHENTICATED = 'authenticated';

export const Navbar = () => {
    const { user, status } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const onLogout = (e) => {
        e.preventDefault();
        dispatch(startLogout());
    };

    return (
        <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
            <div className='container-fluid'>
                {status === AUTHENTICATED ? (
                    <>
                        <NavLink
                            className='navbar-brand'
                            to='/app/todo-app/home'
                        >
                            {user.nombre}
                        </NavLink>
                        <button
                            className='navbar-toggler'
                            type='button'
                            data-bs-toggle='collapse'
                            data-bs-target='#navbarText'
                            aria-controls='navbarText'
                            aria-expanded='false'
                            aria-label='Toggle navigation'
                        >
                            <span className='navbar-toggler-icon'></span>
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink className='navbar-brand' to='/'>
                            HOME
                        </NavLink>
                        <button
                            className='navbar-toggler'
                            type='button'
                            data-bs-toggle='collapse'
                            data-bs-target='#navbarText'
                            aria-controls='navbarText'
                            aria-expanded='false'
                            aria-label='Toggle navigation'
                        >
                            <span className='navbar-toggler-icon'></span>
                        </button>
                    </>
                )}
                <div className='collapse navbar-collapse' id='navbarText'>
                    <ul className='navbar-nav col-12 align-items-center justify-content-md-end'>
                        <li className='nav-item '>
                            {status === AUTHENTICATED ? (
                                <NavLink
                                    className='nav-link'
                                    to='/app/todo-app/perfil'
                                >
                                    Perfil
                                </NavLink>
                            ) : (
                                <NavLink className='nav-link' to='/auth/login'>
                                    Ingresar
                                </NavLink>
                            )}
                        </li>
                        <li className='nav-item'>
                            {status === AUTHENTICATED ? (
                                <NavLink
                                    className='nav-link'
                                    to='/auth/login'
                                    onClick={onLogout}
                                >
                                    Salir
                                </NavLink>
                            ) : (
                                <NavLink
                                    className='nav-link'
                                    to='/auth/register'
                                >
                                    Registrarse
                                </NavLink>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
