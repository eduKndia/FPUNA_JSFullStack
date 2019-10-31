const express = require('express');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();
const SocketIo = require('socket.io');
const cors = require('cors');
const axios = require('axios');

const app = express();

//settings 
app.set('port', process.env.PORT || 4000);
require('./database');
// statics files
app.use(express.static(path.join(__dirname, 'public')));

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// routes
app.use('/api/productos', require('./routes/productos.routes'));
app.use('/api/compras', require('./routes/compras.routes'));


// starting the server
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

// socket config

const io = SocketIo(server);

io.on('connection', (socket) => {
    socket.on('fetchProductos', async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/productos')
            await socket.emit('Productos', res.data)
        } catch (error) {
            console.log('Error')
        }

    });
    socket.on('fetchCompras', async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/compras')
            await socket.emit('Compras', res.data)
        } catch (error) {
            console.log('Error')
        }

    });


}

);