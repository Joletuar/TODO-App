const { response } = require('express');
const Todo = require('../models/Todo');

// Retornamos un listado de TODOs por user

const getTodosByUser = async (req, res = response) => {
    console.log('----> Petición en getTodoByUser');

    // Recuperamos el id de los params de la url

    const uid = req.params.uid;

    try {
        // Realizamos la busqueda de los TODOs by user

        const todos = await Todo.find({ user: uid });

        // Retornamos una respuesta en formato json

        res.status(200).json({
            ok: true,
            todoList: todos,
            userName: req.nombre,
        });
    } catch (error) {
        console.log(error);

        // Retornamos una respuesta en formato json

        // status 500: error intern
        res.status(500).json({
            ok: false,
            msg: 'Contacte con soporte',
        });
    }
};

// Realizamos la creación de un nuevo TODO

const createTodo = async (req, res = response) => {
    console.log('----> Petición createTodo');

    // Verificar que tenga contenido el TODO

    if (!req.body) {
        return res.status(400).json({
            ok: false,
            msg: 'El TODO es obligatorio',
        });
    }

    const { titulo } = req.body;

    try {
        // Validamos si ya existe un todo con este nombre

        let todo = await Todo.findOne({ titulo });

        const { nombre, uid } = req;

        if (todo && todo.user.toString() === uid) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe una tarea con ese nombre',
            });
        }

        // En caso de no existir creamos el TODO

        todo = await new Todo(req.body);

        // Obtenemos el uid de la firma del token

        todo.user = uid;

        // Guardamos el TODO

        const todoGuarado = await todo.save();

        res.status(200).json({
            ok: true,
            todo: todoGuarado,
            userName: nombre,
        });
    } catch (error) {
        console.log(error);

        // Retornamos una respuesta en formato json

        // status 500: error intern
        res.status(500).json({
            ok: false,
            msg: 'Contacte con soporte',
        });
    }
};

// Actualización de la información de un TODO

const updateTodo = async (req, res = response) => {
    console.log('----> Petición updateTodo');

    // Verificamos que la información del TODO no este vacía

    if (!req.body) {
        return res.status(400).json({
            ok: false,
            msg: 'El TODO es obligatorio',
        });
    }
    // Recuperamos el id del TODO actualizar de los params id de la url

    const idTodo = req.params.idTodo;

    try {
        // Validamos que el TODO exista

        const todoBD = await Todo.findById(idTodo);

        if (!todoBD) {
            return res.status(404).json({
                ok: false,
                msg: 'El TODO no existe',
            });
        }

        const todos = await Todo.find({ user: todoBD.user }); // Devuelve un array

        // Validamos que la información a actualizar no se repita con otra ya previamente almacenada

        todos.map((todo) => {
            if (todo.titulo === req.body.titulo && todo._id != idTodo) {
                return res.status(401).json({
                    ok: false,
                    msg: 'Ya existe un TODO con este título',
                });
            }
        });

        // Validamos que el usuario a editar sea el usuario que creo el todo

        if (todoBD.user != todoBD.user) {
            return res.status(401).json({
                ok: false,
                msg: 'El usuario no tiene privilegios para actualizar el TODO',
            });
        }

        // Actualizamos el TODO

        const todoNuevo = {
            ...req.body,
            user: todoBD.user, // Le agregamos el id del usuario, ya que el body no contiene esta info
        };

        const todoActualizado = await Todo.findByIdAndUpdate(
            idTodo,
            todoNuevo,
            { new: true } // Retornamos el nuevo TODO
        );

        res.status(200).json({
            ok: true,
            todo: todoActualizado,
            userName: req.nombre,
        });
    } catch (error) {
        console.log(error);

        // Retornamos una respuesta en formato json

        // status 500: error intern
        res.status(500).json({
            ok: false,
            msg: 'Contacte con soporte',
        });
    }
};

// Eliminar un TODO

const deleteTodo = async (req, res = response) => {
    console.log('----> Petición deleteTodo');

    // Obtenemos el id del TODO de los params de la url

    const idTodo = req.params.idTodo;

    try {
        // Validamos que el TODO exista

        const todoBD = await Todo.findById(idTodo);

        if (!todoBD) {
            return res.status(404).json({
                ok: false,
                msg: 'El TODO no existe',
            });
        }
        // Recuperamos el uid de la firma del token

        const uid = req.uid;

        // Validamos que el usuario a eliminar sea el usuario que creo el todo

        if (todoBD.user.toString() != uid) {
            return res.status(401).json({
                ok: false,
                msg: 'El usuario no tiene privilegios para eliminar el TODO',
            });
        }

        // Realizamos la eliminación del TODO

        await Todo.findByIdAndDelete(idTodo);

        res.status(200).json({
            ok: true,
            todoBD,
        });
    } catch (error) {
        console.log(error);

        // Retornamos una respuesta en formato json

        // status 500: error intern
        res.status(500).json({
            ok: false,
            msg: 'Contacte con soporte',
        });
    }
};

module.exports = { getTodosByUser, createTodo, updateTodo, deleteTodo };
