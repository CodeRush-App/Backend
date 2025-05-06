const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

import { userEvents } from './Events/userEvents';

io.on('connection', (socket: any) => {
    console.log('a user connected');
    userEvents(socket);
});

server.listen(3000, () => {
    console.log('WebSocket server is running on port 3000');
});
