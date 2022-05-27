const controller = require('../controllers/producto.controllers');
const validarToken = require('../meddlewares/validar-jwt')

module.exports = (app) => {

    app.get('/producto/get', validarToken.validarJWT, controller.getAll, );
    app.get('/producto/getTop5', validarToken.validarJWT, controller.getTop5);
    app.get('/producto/getByFilterCategoria/:id', validarToken.validarJWT, controller.getFilterByCategoria);
    app.get('/producto/getByCategoria/:id', validarToken.validarJWT, controller.getByCategoria);
    app.get('/producto/getById/:Id', validarToken.validarJWT, controller.getById);
    app.get('/producto/getFilter/:q', validarToken.validarJWT, controller.getFilter);
    app.put('/producto/update/:id', validarToken.validarJWT, controller.update);
    app.post('/producto/add', validarToken.validarJWT, controller.add);
    app.delete('/producto/delete/:Id', validarToken.validarJWT, controller.remove);

}