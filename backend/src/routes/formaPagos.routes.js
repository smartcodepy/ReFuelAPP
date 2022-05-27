const pagosController = require('../controllers/formaPago.controllers')
const validarToken = require('../meddlewares/validar-jwt')
module.exports = (app) => {

    app.get('/pagos/get', validarToken.validarJWT, pagosController.getAll);
    app.get('/pagos/getById/:id', validarToken.validarJWT, pagosController.getById);
    app.post('/pagos/add', validarToken.validarJWT, pagosController.add);
    app.put('/pagos/update', validarToken.validarJWT, pagosController.update);
    app.delete('/pagos/delete/:id', validarToken.validarJWT, pagosController.remove);


}