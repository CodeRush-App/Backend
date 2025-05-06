export const userEvents = (socket: any) => {
    socket.on('test', (msg: string) => {
        console.log(JSON.parse(msg));
        socket.emit('test', 'Hello from server!');
    });
}