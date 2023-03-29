const { response } = require('express');
const { validationResult } = require('express-validator');

// Creamos nuestro custom middleware

const valdiarCampos = (req, res = response, next) => {
    // Manejo de errores

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        });
    }

    // Esta función se llama si todo el middleware se ejecuta correctamente

    // Para este caso va a ejecutar nuestra función principal

    next();
};

module.exports = {
    valdiarCampos,
};
