const PORT = 8080
const express = require('express')
const app = express()
const path = require('path')

//config socket io
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')

const transocket = require('./resources/Service/socket')
const io = new Server(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});

transocket(io)

// app.set('view engine', 'ejs');
// app.set('views', './resources/views')
// config
const config = require("./config/config")
config(app)

// routes
const UserRoutes = require("./resources/Router/user")
UserRoutes(app)


const AdminRoutes = require("./resources/Router/admin")
AdminRoutes(app)


app.use((req, res, next) => {
    res.status(404);
    res.render(path.join(__dirname+"/resources/views/404.ejs"),{user:null})
  });

server.listen(PORT, () => console.log(`server is running on port http://localhost:${PORT}`))
