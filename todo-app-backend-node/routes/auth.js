/* Rutas de usuarios
 host + /api/auth
*/

const { Router } = require('express');

/* 
    Modulo de validaciones
- check: se encarga de validar un campo en particular, uno a la vez
*/
const { check } = require('express-validator');

const {
    crearUsuario,
    loginUsuario,
    revalidarUsuario,
    updateUser,
} = require('../controllers/auth');

const { valdiarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// Nos permite crear los endpoints

const router = Router();

// -----> Endpoint para el logeo de un usuario

router.post(
    '/',
    [
        // Middlewares
        check('correo', 'El correo debe ser válido').isEmail(),
        check('password', 'La contraseña no es válida').not().isEmpty(),
        valdiarCampos,
    ],
    loginUsuario
);

// -----> Endpoint para la creación de nuevo usuario

/* 
   Aqui usamos el controlador que importamos
   Se lo llama con callback
   El segundo parámetro corresponde a middleware o
   un arreglo de estos
*/

router.post(
    '/new',
    [
        /*
            Middleware: check: el nombre debe ser obligatorio y no vacío
        
            primer arg: el campo a evaluar
            segundo arg: el error a retornar
        */
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellidos', 'Los apellidos son obligatorios').not().isEmpty(),
        /*
            Middleware: check: verificamos que el correo sea válido: no vacío y formato correcto
        */
        check('correo', 'El correo no es válido').isEmail(),
        /*
            Middleware: check: verificamos que la contraseña tenga un longitud mínima de 6 caracteres
        */
        check('password', 'El password debe ser mayor a 6 caracteres').isLength(
            { min: 6 }
        ),
        check('descripcion', 'La descripcion no es válida').isLength({
            min: 6,
        }),

        // Usamos nuestro custom middleware
        valdiarCampos,
    ],
    crearUsuario
);

// -----> Endpoint para la renovación del token

router.get('/renew', validarJWT, revalidarUsuario);

// -----> Endpoint para la actualización del user

router.put(
    '/:uid',
    validarJWT,
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellidos', 'Los apellidos son obligatorios').not().isEmpty(),
        check('correo', 'El correo no es válido').isEmail(),
        check('descripcion', 'La descripcion no es válida').isLength({
            min: 6,
        }),
        valdiarCampos,
    ],
    updateUser
);

module.exports = router;
