const express = require('express');
const session = require('express-session');
const http = require('http');
const socketIO = require('socket.io');
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const sessionMiddleware = session({
    secret: "test"
})

const io = socketIO(server, {
    cors: {
        origin: "http://127.0.0.1:5500"
    }
}); 

app.use(cors())

app.use(sessionMiddleware)

io.engine.use(sessionMiddleware)

io.on("connection", (socket) =>{
    console.log("socket", socket.request.session)
    console.log("a user connected")
    socket.on("message", (arg) =>{
        console.log(arg)
        socket.emit("broadcast", arg)
    })
})

app.get("/", (req, res) =>{
    // console.log("FETCH", req)
    console.log("SESSION", req.session)
    res.send({data: "data"})
})

server.listen(4000, () => {
  console.log('Server running on port 4000');
});

