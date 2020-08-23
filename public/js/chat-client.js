const socket = io();



// element 
const $messageForm = document.querySelector("#message-form")
const $messageFormInput = $messageForm.querySelector("input")
const $messageFormButton = $messageForm.querySelector("button")
const $sendLocationButton = document.querySelector("#send-location")
// 

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
$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  
  $messageFormButton.setAttribute('disabled','disabled')
  // disable


  const message = e.target.elements.messages.value;
  // console.log(message);
  socket.emit("sendMSG", message , (msg)=>{
  
    $messageFormButton.removeAttribute('disabled')
    $messageFormInput.value =''
    $messageFormInput.focus()
    // enable

    console.log('this message was delivered!', msg);
  });
});
// ********************************

// send my current location *******
$sendLocationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("geolocation is not supported by your browser ");
  }

//   disable
  $sendLocationButton.setAttribute('disabled','disabled')

  navigator.geolocation.getCurrentPosition((position) => {
    //   console.log(position);
    socket.emit("sendLocation", {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    } , ()=>{
        // enable
        $sendLocationButton.removeAttribute('disabled')
        console.log('موقعیت مکانی به اشتراک گذاشته شد');
    });
  });
});
// ********************************
