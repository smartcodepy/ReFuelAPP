const controller = require('../controllers/comprobante.controllers');
const validarToken = require('../meddlewares/validar-jwt')
module.exports = (app) => {
    app.get('/comprobante/get', validarToken.validarJWT, controller.list);
    app.get('/comprobante/filter/:q', validarToken.validarJWT, controller.listFilter);
    app.get('/comprobante/find/:id', validarToken.validarJWT, controller.getById);
    app.post('/comprobante/create', validarToken.validarJWT, controller.create);
    app.put('/comprobante/update/:id', validarToken.validarJWT, controller.update);
    app.delete('/comprobante/remove/:id', validarToken.validarJWT, controller.remove);



}