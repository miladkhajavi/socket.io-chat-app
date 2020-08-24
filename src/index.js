const path = require("path");
const express = require("express");
const http = require("http");
const {generateMSG, generateLocationMSG} = require('./utils/Msg')
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

  // welcome user ******************
  socket.emit("message", generateMSG('خوش آمدید!'));
  socket.broadcast.emit("message", generateMSG('new user joined the chat'));
  // *******************************
  // send message ******************
  socket.on("sendMSG", (message, callback) => {
    // console.log(message);
    io.emit("message", generateMSG(message));
    callback("Delivered");
  });
  // *******************************
  // send my current location ******
  socket.on("sendLocation", (coords, callback) => {
    io.emit(
      "messageLocation",
      generateLocationMSG(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
    );
    callback();
  });
  // *******************************

  // disconnected ******************
  socket.on("disconnect", () => {
    io.emit("message", generateMSG('A user has left the chat'));
  });
  // *******************************
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
