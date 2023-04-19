import socketIO from "socket.io"

export default class SocketConfig {

    constructor(server) {
        const socketParams = {
            cors: {
                origin: "http://localhost:4200/",
                methods: ["GET", "POST"],
            },

            transports: ['websocket', 'polling']
        }
        this.socket = socketIO(server, socketParams);
    }

    /**
     * 
     * @param {*} socket 
     */
    onConnection(socket) {
        socket.emit('greeting-from-server', {
            greeting: 'Hello Client'
        });
        socket.on('greeting-from-client', function (message) {
            console.log(message);
        });
    }
}