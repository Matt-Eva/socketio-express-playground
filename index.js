const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors())

const io = socketIO(server, {
    cors: {
        origin: "http://127.0.0.1:5500"
    }
});

io.on("connection", (socket) =>{
    console.log("a user connected")
    socket.on("message", (arg) =>{
        console.log(arg)
        socket.emit("broadcast", arg)
    })
})

server.listen(4000, () => {
  console.log('Server running on port 4000');
});

