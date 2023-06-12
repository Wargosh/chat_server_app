const express = require('express');
const path = require('path');
// const { Server } = require('socket.io')

require('dotenv').config();

// db config
require('./database/config').dbConnection();

// App de Express
const app = express();

// Lectura y parseo del body
app.use(express.json());

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

// Path público
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

// Routes
app.use('/api/login', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/messages', require('./routes/messages'));

// const httpServer = server.listen(process.env.PORT, (err) => {
server.listen(process.env.PORT, (err) => {
    if (err) throw new Error(err);

    console.log('Servidor ejecutando en puerto', process.env.PORT);
});

// const io = new Server(httpServer, {
//     cors: {
//         // origin: "*",
//         origin: "https://chatserverapp.up.railway.app/",
//         methods: ["GET", "POST"],
//         allowHeaders: ["x-token"],
//         credentials: true,
//     },
// });

// module.exports.io = io;
// require('./sockets/socket');