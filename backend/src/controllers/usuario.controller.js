const usuariosService = require('../services/usuario.service');
const meddlewaresJWT = require("../meddlewares/validar-jwt")
const login = async(req, res) => {
    try {
        let result = await usuariosService.login(req.body, req.headers)

        res.status(200).send({
            result: result
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            result: error
        });
    }
}

const logout = async(req, res) => {
    try {
        (req.headers)
        let result = await usuariosService.logout(req.headers["x-token"])
        res.status(200).send({
            result: result


        });
    } catch (error) {
        res.status(400).send({
            success: false,
            result: error
        });
    }
}

const list = async(req, res) => {


    try {
        const usuarios = await usuariosService.list(req.query.q);
        res.status(200).send({
            result: usuarios
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            result: error.message
        });
    }
}

const listFilter = async(req, res) => {

    try {

        const usuario = await usuariosService.listFilter(req.params.q);
        res.status(200).send({
            success: true,
            result: usuario
        });

    } catch (error) {
        res.status(400).send({
            success: false,
            result: error.message
        });

    }
}

const getById = async(req, res) => {

    try {
        console.log(req.params, "parametros")
        const usuario = await usuariosService.getById(req.params.id);

        res.status(201).send({
            success: true,
            result: usuario
        });

    } catch (error) {
        res.status(400).send({
            success: false,
            result: error.message
        });
    }
}

const recuperarPassword = async(req, res) => {

    try {
        console.log(req.params, "parametros")
        const usuario = await usuariosService.recuperarContrasena(req.params.email);

        res.status(201).send({
            success: true,
            result: usuario
        });

    } catch (error) {
        res.status(400).send({
            success: false,
            result: error.message
        });
    }
}


const registrarAdm = async(req, res) => {
    try {
        const usuario = await usuariosService.registrarAdm(req.body);
        res.status(202).send({
            success: true,
            result: usuario
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            result: error.message
        });
    }



}


const registrar = async(req, res) => {
    try {
        const usuario = await usuariosService.registrar(req.body);
        res.status(202).send({
            success: true,
            result: usuario
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            result: error.message
        });
    }

}

const create = async(req, res) => {
    try {
        const usuario = await usuariosService.create(req.body);
        res.status(202).send({
            success: true,
            result: usuario
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            result: error.message
        });
    }

}

const update = async(req, res) => {
    try {
        console.log(req.params, req.body)
        const usuario = await usuariosService.updateUsuarioById(req.params.id, req.body);
        res.status(202).send({
            success: true,
            result: usuario
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            result: error.message
        });
    }




}






const remove = async(req, res) => {
    try {
        const booleanValue = await usuariosService.removeUsuario(req.params.id);
        res.status(202).send({
            success: booleanValue
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            result: error.message
        });
    }
}


const updateFoto = async(req, res) => {
    let matches = req.body.dataUrl.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    dataUrl = req.body.dataUrl;
    const imagen = await usuariosService.updateFotoPerfil(req.params.id, matches, dataUrl);
    res.status(202).send({
        success: { imagen }
    })
}
module.exports = {
    list,
    listFilter,
    getById,
    create,
    update,
    remove,
    updateFoto,
    login,
    logout,
    registrar,
    registrarAdm,
    recuperarPassword
}