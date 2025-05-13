const socketAuth = require("../../Middleware/socketAuth")
const UserModel = require("../../Model/user")
const moment = require('moment-timezone');

const room = {
    chat_home:"trang_chu_chat",
}

module.exports = function(io){
    io.use(socketAuth);
    const onlineUsers = new Set();



    io.on('connection',(socket)=>{

        //let user_ip = `guest_${socket.handshake.address}`
        let user_ip = socket.handshake.headers["x-forwarded-for"] || socket.handshake.address;

        socket.on('joinRoom', (roomId) => {
            socket.join(roomId);
            console.log(user_ip,roomId)

            onlineUsers.add(user_ip);

            io.to(roomId).emit("update_online_users", onlineUsers.size);
            // console.log(`Socket ${socket.id} joined room ${roomId}`);
        });



        socket.on("disconnect", () => {
            onlineUsers.delete(user_ip); // Xóa user khi disconnect
            io.emit("update_online_users", onlineUsers.size); // Cập nhật lại số lượng
        });

        socket.on("send_chat", async ({roomId,groupID,message }) => {
            if(socket.user){
                console.log(roomId)
                if(roomId =='box-home'){
                    const vietNamTime = moment().tz("Asia/Ho_Chi_Minh").format("HH:mm");
  
                    let chatvalue = ` <div class="item_chat">
                        <div class="name">
                            ${socket.user.name}
                        </div>
                        
                        <div class="info">
                            <div class="avatar">
                                <img src="../../../public/images/user/${socket.user.avatar || 'default.jpg'}" alt="">
                            </div>
                            <div class="content" contenteditable="true">
                                  ${message}
                            </div>
                            <div class="time">${vietNamTime}</div>
                        </div>
                    
                    </div>`
    
                    const savechat  = await UserModel.send_chat_home(socket.user.id,chatvalue)
    
    
                    if(savechat){    
                        
                        io.to(roomId).emit("receive_message", {roomId:roomId,chatvalue:chatvalue});
                    }
                }else{
                    console.log('asdasasdsad')
                    const vietNamTime = moment().tz("Asia/Ho_Chi_Minh").format("HH:mm");
  
                    let chatvalue = ` <div class="item_chat">
                        <div class="name">
                            ${socket.user.name}
                        </div>
                        
                        <div class="info">
                            <div class="avatar">
                                <img src="../../../public/images/user/${socket.user.avatar || 'default.jpg'}" alt="">
                            </div>
                            <div class="content" contenteditable="true">
                                  ${message}
                            </div>
                            <div class="time">${vietNamTime}</div>
                        </div>
                    
                    </div>`

                    const savechat  = await UserModel.send_chat_group(socket.user.id,groupID,chatvalue)
    
    
                    if(savechat){    
                        
                        io.to(roomId).emit("receive_message", {roomId:roomId,chatvalue:chatvalue});
                    }
                   
                }
               
            }
        });







        socket.on('on_img',({roomId,index}) =>{
            console.log("abc"+roomId,index)
            io.to(roomId).emit('img_index', {roomId:roomId, data:index})
        })

        socket.on('value',({roomId,data})=>{
            console.log("asdasdasd123123123123")
            console.log(data.index)
            // io.to(roomId).emit('img_value',{roomId:roomId,newimage:data})
            io.to(roomId).emit('new_edit_image',{roomId:roomId,newimage:data})
        })

    })
}







