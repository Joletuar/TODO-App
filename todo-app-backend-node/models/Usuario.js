const { Schema, model } = require('mongoose');

/*
    Schema: indica como queremos que luzca la información dentro de la BD
*/

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true,
    },
    apellidos: {
        type: String,
        required: true,
    },
    correo: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: false
    }
});

module.exports = model('Usuario', UsuarioSchema); // Retorna una clase
