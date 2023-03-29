// Volvemos a llamar al modulo de express para tener el intelligence
const { response } = require('express');

// Modulo para hashear el password
const bcrypt = require('bcryptjs');

// Importamos nuestro modelo para instanciar
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

/*
    req: es la solicitud que realiza el usuario
    resp: es la respuesta que nosotros enviamos
*/

const loginUsuario = async (req, res = response) => {
    console.log('----> Petición en el loginUsuario');

    // Contenido del body

    const { correo, password } = req.body;

    try {
        // Validamos que el email exista o no en la BD

        const usuario = await Usuario.findOne({ correo });

        // status 400: bad request
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña incorrectos',
            });
        }

        // Confirmar los passwords

        const validarPassword = bcrypt.compareSync(password, usuario.password); // retorna true o false

        if (!validarPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña incorrectos',
            });
        }

        // Generar nuestro JWT

        const token = await generarJWT(usuario.id, usuario.nombre);

        // Retornamos una respuesta en formato json

        res.status(200).json({
            ok: true,
            user: {
                uid: usuario.id,
                nombre: usuario.nombre,
                apellidos: usuario.apellidos,
                correo: usuario.correo,
                password: usuario.password,
                descripcion: usuario.descripcion,
                token,
            },
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

const crearUsuario = async (req, res = response) => {
    console.log('----> Petición en crearUsuario');

    // Accdemos al contenido del body

    const { correo, password } = req.body;

    try {
        // Validamos que el email exista o no en la BD

        let usuario = await Usuario.findOne({ correo });

        // status 400: bad request
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado',
            });
        }

        // Creamos una nueva instancia a partir de nuestro modelo

        usuario = new Usuario(req.body);

        // Generar JWT

        const token = await generarJWT(usuario.id, usuario.nombre);

        // Encriptar password

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Guardamos la instancia dentro de la BD

        usuario.save();

        // Retornamos una respuesta en formato json

        // status 201: created
        res.status(201).json({
            ok: true,
            user: {
                uid: usuario.id,
                nombre: usuario.nombre,
                apellidos: usuario.apellidos,
                correo: usuario.correo,
                password: usuario.password,
                descripcion: usuario.descripcion,
                token,
            },
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

const revalidarUsuario = async (req, res = response) => {
    console.log('----> Petición de revalidarUsuario');

    const { uid, nombre } = req;

    // Generamos un nuevo jwt y lo retornamos en la petición

    try {
        // Validamos que el usuario exista o no en la BD

        const usuario = await Usuario.findById(uid);

        // status 400: bad request
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario dado de baja',
            });
        }

        // Generamos un nuevo JWT

        const token = await generarJWT(usuario._id, usuario.nombre);

        res.json({
            ok: true,
            user: {
                uid: usuario.id,
                nombre: usuario.nombre,
                apellidos: usuario.apellidos,
                correo: usuario.correo,
                password: usuario.password,
                descripcion: usuario.descripcion,
                token,
            },
        });
    } catch (error) {
        console.log(error);
        // status 500: error intern
        res.status(500).json({
            ok: false,
            msg: 'Contacte con soporte',
        });
    }
};

const updateUser = async (req, res = response) => {
    console.log('----> Petición en updateUser');

    const uid = req.params.uid;

    try {
        // Validamos que el usuario exista o no en la BD

        let usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe',
            });
        }

        // Validamos que el email nuevo no lo tengo otro usuario
        const { correo } = req.body;

        const usuarioValidacion = await Usuario.findOne({ correo });

        if (usuarioValidacion) {
            if (
                usuario._id.toString() != usuarioValidacion._id.toString() &&
                usuarioValidacion.correo === correo
            ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'El correo ya está en uso',
                });
            }
        }

        // Actualizamos el TODO

        const nuevoUser = {
            ...req.body,
        };

        const userActualizado = await Usuario.findByIdAndUpdate(
            uid,
            nuevoUser,
            { new: true } // Retornamos el nuevo TODO
        );

        // Generamos nuevo token

        const token = await generarJWT(uid, userActualizado.nombre);

        res.status(200).json({
            ok: true,
            user: {
                uid: userActualizado.id,
                nombre: userActualizado.nombre,
                apellidos: userActualizado.apellidos,
                correo: userActualizado.correo,
                password: userActualizado.password,
                descripcion: userActualizado.descripcion,
                token,
            },
        });
    } catch (error) {
        console.log(error);
        // status 500: error intern
        res.status(500).json({
            ok: false,
            msg: 'Contacte con soporte',
        });
    }
};

// Realizamos la exportación
module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarUsuario,
    updateUser,
};
