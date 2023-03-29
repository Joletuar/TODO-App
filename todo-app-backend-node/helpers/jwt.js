// Importamos el módulo para los tokens json

const jwt = require('jsonwebtoken');

const generarJWT = (uid, nombre) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, nombre };

        // Firmamos el token

        jwt.sign(
            payload,
            process.env.SECRET_JWT_SEED,
            {
                // Tiempo en el que el token expirará (duración)
                expiresIn: '4h',
            },
            (error, token) => {
                if (error) {
                    console.log(error);
                    reject('----> No se pudo generar el token');
                }

                resolve(token);
            }
        );
    });
};

module.exports = {
    generarJWT,
};
