const express = require('express');
const socket = require('socket.io');


// Setup app
const app = express();
const server = app.listen(8000, () => {
    console.log('listening to port 8000');
});


// Setup static file
app.use(express.static('public'));


// Setup socket
const io = socket(server);

io.on('connection', socket => {
    console.log('made connection');
});