const PedidosController = require('../controllers/pedidos.controllers');
const validarToken = require('../meddlewares/validar-jwt')

module.exports = (app) => {

    app.post('/pedidos/post', validarToken.validarJWT, PedidosController.add);
    app.post('/pedidos/post2', validarToken.validarJWT, PedidosController.create);
    app.get('/pedidos/get', validarToken.validarJWT, PedidosController.getPedidoPendiente);
    app.get('/pedidos/getAll', validarToken.validarJWT, PedidosController.getAll);
    app.get('/pedidos/get/filter/:q', validarToken.validarJWT, PedidosController.getPedidoFilter);
    app.get('/pedidos/get/all/usuer/:id', validarToken.validarJWT, PedidosController.getPedidoUsuario);
    app.put('/pedidos/put/:id', PedidosController.updateEstadoDetalle);


}