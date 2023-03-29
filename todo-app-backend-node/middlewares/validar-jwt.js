const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {
    // x-token headers

    // Accedemos al contenido del header

    const token = req.header('x-token');
    // Validando el token

    if (!token) {
        //status 401: user no authenticated
        return res.status(401).json({
            ok: false,
            msg: 'No existe token en la petición',
        });
    }

    try {
        // Accedemos al payload del jwt

        const { uid, nombre } = jwt.verify(token, process.env.SECRET_JWT_SEED);

        req.uid = uid;
        req.nombre = nombre;
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido',
        });
    }

    next();
};

module.exports = {
    validarJWT,
};
