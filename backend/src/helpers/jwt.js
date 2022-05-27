const { process_params } = require("express/lib/router");
const jwt = require("jsonwebtoken")

const generarJWT = async(payload) => {
    var token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "48h"
    });
    return token;

}



const decodificarToken = (token) => {
    let result = jwt.decode(token, process.env.JWT_SECRET)
    return result;
}

const validarToken = (token) => {
    try {
        jwt.verify(token, process.env.JWT_SECRET)
        return true
    } catch (error) {
        (error.message)
        return false;
    }


}
const validarAndGenerarToken = async(usuarioFromDb) => {
    try {
        jwt.verify(usuarioFromDb.usu_token, process.env.JWT_SECRET)
        return { token: usuarioFromDb.usu_token };
    } catch (error) {

        let payload = { "usu": usuarioFromDb.usu_id }
        let token = await generarJWT(payload)

        await updateToken(usuarioFromDb.usu_id, token);

        return { token: token }

    }
}


module.exports = {
    generarJWT,
    decodificarToken,
    validarToken,
    validarAndGenerarToken
};