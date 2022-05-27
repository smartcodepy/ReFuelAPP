const controller = require('../controllers/usuario.controller');
const validarToken = require('../meddlewares/validar-jwt')
module.exports = (app) => {

    app.get('/usuario/list', controller.list, validarToken.validarJWT);
    app.post('/usuario/login', controller.login);
    app.get('/usuario/recuperar/:email', controller.recuperarPassword);
    app.get('/usuario/filter/:q', validarToken.validarJWT, controller.listFilter);
    app.get('/usuario/find/:id', validarToken.validarJWT, controller.getById);
    app.post('/usuario/create', controller.create);
    app.post('/usuario/registrar', controller.registrar);
    app.post('/usuario/registrar/adm', controller.registrarAdm);
    app.put('/usuario/update/:id', validarToken.validarJWT, controller.update);
    app.put('/usuario/logout', validarToken.validarJWT, controller.logout);
    app.delete('/usuario/remove/:id', controller.remove, validarToken.validarJWT);
}