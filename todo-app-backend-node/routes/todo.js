/*
    Rutas de los TODOs
    host + /api/todos
*/

const { Router } = require('express');

const { check } = require('express-validator');

const {
    getTodosByUser,
    createTodo,
    updateTodo,
    deleteTodo,
} = require('../controllers/todo');

const { valdiarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// ----> Endpoint para obtener un listado de TODOs por usuario

router.get('/:uid', validarJWT, getTodosByUser);

// ----> Endpoint para la creación de un nuevo TODO

router.post(
    '/new',
    validarJWT,
    [
        check('titulo', 'El título es obligatorio').not().isEmpty(),
        check('estado', 'El estado es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
        valdiarCampos,
    ],
    createTodo
);

// ----> Endpoint para la actualización de un TODO

router.put(
    '/:idTodo',
    validarJWT,
    [
        check('titulo', 'El título es obligatorio').not().isEmpty(),
        check('estado', 'El estado es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
        valdiarCampos,
    ],
    updateTodo
);

// ----> Endpoint para eliminación de un TODO

router.delete('/:idTodo', validarJWT, deleteTodo);

module.exports = router;
