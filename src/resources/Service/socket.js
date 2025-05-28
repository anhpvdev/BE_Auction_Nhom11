const socketAuth = require("../Middleware/socketAuth")
const UserModel = require("../Model/user")
const moment = require('moment-timezone');

const room = {
    chat_home:"trang_chu_chat",
}

module.exports = function(io){
    io.use(socketAuth);

    io.on('connection',(socket)=>{
        socket.on('joinRoom', (roomId) => {
            socket.join(roomId);
        });

        socket.on("send_bid", async ({roomId,data }) => {
            if(socket.user){
                io.to(roomId).emit("receive_bid", {roomId:roomId,data:data});       
            }
        });


    })
}







