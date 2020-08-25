const path = require("path");
const express = require("express");
const http = require("http");
const {generateMSG, generateLocationMSG} = require('./utils/Msg')
const {addUser, getUser, getUsersInRoom, removeUser} = require('./utils/users')
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
// port
const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

let count = 0;
io.on("connection", (socket) => {
  console.log("new connection");

  // events*************************
  // socket.emit('countUpdate', count)

  // socket.on('increase' , ()=>{
  //     count++
  //   //   socket.emit('countUpdate',count)
  //     io.emit('countUpdate',count)
  // })
  // ********************************
  socket.on('join', (option, callback)=>{
   const {error,user} = addUser({id:socket.id , ...option})
   if(error){
     return callback(error)
   }
    socket.join(user.room)
    // welcome user ******************
    socket.emit("message", generateMSG('ادمین','خوش آمدید'));
    socket.broadcast.to(user.room).emit("message", generateMSG('ادمین',`${user.username} به گروه پیوست`));
    // *******************************
    callback()
  })
  // send message ******************
  socket.on("sendMSG", (message, callback) => {
    
    const user = getUser(socket.id)
    // console.log(user);
    io.to(user.room).emit("message", generateMSG(user.username,message));
    callback("Delivered");
  });
  // *******************************
  // send my current location ******
  socket.on("sendLocation", (coords, callback) => {
    const user = getUser(socket.id)
    io.to(user.room).emit(
      "messageLocation",
      generateLocationMSG(user.username,`https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
    );
    callback();
  });
  // *******************************

  // disconnected ******************
  socket.on("disconnect", () => {
    const user = removeUser(socket.id)
    if(user){
    io.to(user.room).emit("message", generateMSG('ادمین',`${user.username} از گروه رفت. `));
    }
  });
  // *******************************
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
