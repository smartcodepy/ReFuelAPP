const res = require('express/lib/response');
const { getEventListeners } = require('pg/lib/query');
const jwt = require('../helpers/jwt')
const usuarioService = require("../services/usuario.service")

const validarJWTUsuario = async(req, res, next) => {
    const token = req.headers["x-token"]
    try {

        let response = await verifivarTokenUsuarioDb(token)


        if (jwt.validarToken(token)) {
            next();

        } else
            res.status(401).send({ ok: false, result: "usuario no autorizado" });
    } catch (error) {
        res.status(401).send({ ok: false, result: "usuario no autorizado" });
    }

}

const verifivarTokenUsuarioDb = async(token) => {
    const result = await usuarioService.getByToken(token);


    if (result)
        return true;
    return false;
}



module.exports = {
    validarJWT: validarJWTUsuario,
}