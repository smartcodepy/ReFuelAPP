const express = require('express');
require('dotenv').config()
const multer = require('multer');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const PORT = 3000;
const mime = require('mime');
const fs = require('file-system');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const { imageModel: imageModel } = require('./src/models/image.model');
const req = require('express/lib/request');

//const upload = multer ({dest: 'uploads/'}); 


//app.use(bodyParser.json());

//Routes del Caso de Uso
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: false
}));

app.use(bodyParser.json({ limit: "500mb" }));
app.use(cors({
    origin: '*'
}));

require('./src/routes/usuarios.routes')(app);
require('./src/routes/pedidos.routes')(app);
require('./src/routes/categorias.routes')(app);
require('./src/routes/formaPagos.routes')(app);
require('./src/routes/producto.routes')(app);
require('./src/routes/comprobante.routes')(app);
require('./src/routes/pedidos.routes')(app);





io.on('connection', (socket) => {
    console.log('a user connected');
});




app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});