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
        origin: "*"
    }
}); 

app.use(cors())

app.use(sessionMiddleware)

io.engine.use(sessionMiddleware)

const getRandomRoom = () =>{
    const random = Math.random()
    if(random > .5){
        return "a"
    } else{
        return "b"
    }
}
 
io.on("connection", (socket) =>{
    const room = getRandomRoom()
    socket.join(room);
    socket.on("message", (arg) =>{
        // console.log(arg)
        socket.to(room).emit("broadcast", room)
    })
})

app.get("/", (req, res) =>{
    // console.log("FETCH", req)
    res.send({data: "data"})
})

server.listen(4000, () => {
  console.log('Server running on port 4000');
});

