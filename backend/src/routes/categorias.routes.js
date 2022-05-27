const categoriaController = require('../controllers/categoria.controllers');
const validarToken = require('../meddlewares/validar-jwt')

module.exports = (app) => {

    app.get('/categorias/get', validarToken.validarJWT, categoriaController.getAll);
    app.get('/categorias/getById/:Id', validarToken.validarJWT, categoriaController.getById);
    app.get('/categorias/getFilter/:q', validarToken.validarJWT, categoriaController.getFilter);
    app.put('/categorias/update', validarToken.validarJWT, categoriaController.update);
    app.post('/categorias/create', validarToken.validarJWT, categoriaController.add);
    app.delete('/categorias/delete/:Id', validarToken.validarJWT, categoriaController.remove);

}