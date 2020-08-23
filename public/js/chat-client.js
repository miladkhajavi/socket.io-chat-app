const socket = io();

// events*************************
// socket.on('countUpdate', (count)=>{
//     console.log('client on count update' ,count);
// })

// document.querySelector('#increase').addEventListener('click', ()=>{
//     console.log('added');
//     socket.emit('increase')
// })
// ********************************
socket.on("message", (message) => {
  console.log(message);
});

// send message ******************
document.querySelector("#message-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const message = e.target.elements.messages.value;
  // console.log(message);
  socket.emit("sendMSG", message);
});
// ********************************

// send my current location *******
document.querySelector("#send-location").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("geolocation is not supported by your browser ");
  }
  navigator.geolocation.getCurrentPosition((position) => {
    //   console.log(position);
    socket.emit("sendLocation", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  });
});
// ********************************
