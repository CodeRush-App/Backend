import { Socket } from 'socket.io';

export const userEvents = (socket: Socket) => {
  socket.on('test', (msg: string) => {
    console.log(JSON.parse(msg));
    socket.emit('test', 'Hello from server!');
  });
};
