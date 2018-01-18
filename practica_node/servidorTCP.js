const net = require('net');

let server = net.createServer((socket) => {
    console.log("client conec");
    socket.on('data', (data) => {
        console.log(data.toString());
    });
    socket.on('exit', () => {
        console.log("client disc")
    });
});
server.listen(3000, () => {
    console.log("servidor up");
});

