const { Schema, model } = require('mongoose');

/*
    Schema: indica como queremos que luzca la información dentro de la BD
*/

const TodoSchema = Schema({
    titulo: {
        type: String,
        required: true,
    },
    estado: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
});

module.exports = model('Todo', TodoSchema); // Retorna una clase
