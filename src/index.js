const path = require("path");
const express = require("express");
const http = require("http");
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

  socket.emit('countUpdate', count)

  socket.on('increase' , ()=>{
      count++
    //   socket.emit('countUpdate',count)
      io.emit('countUpdate',count)
  })
});


server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
