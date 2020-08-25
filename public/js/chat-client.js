const socket = io();

// element
const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector("input");
const $messageFormButton = $messageForm.querySelector("button");
const $sendLocationButton = document.querySelector("#send-location");
const $messageBody = document.querySelector("#body-messages");

//

// template

const messageTemplate = document.querySelector("#message-template").innerHTML;
const messageTemplateLocation = document.querySelector(
  "#message-template-location"
).innerHTML;
//
// option
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});
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
  // const search =location.search.substring(1); 
  // const currentUser = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
  // console.log(currentUser,username);
  
  // if(currentUser.username === message.username){
  //   message.own = 'yes'
  // }else{  
  //   message.own = 'no'
  // }
  const html = Mustache.render(messageTemplate, {
    // own:message.own,
    name: message.username,
    messageText: message.txt,
    timeMSG: moment(message.createdAt).format("h:mm:ss A"),
  });
 
  $messageBody.insertAdjacentHTML("beforeend", html);
  

  // let div = document.querySelectorAll('#own')
  // for (let i = 0; i < div.length; i++) {
  //   if(div[i].innerText === 'yes'){
  //     // // console.log('yesssss');
  //     // document.getElementById("message-scop").style.display="flex"
  //     // document.getElementById("message-scop").style.justifySelf="start"
  //   }else{
  //     // document.getElementById("message-scop").style.float ='rtl'

  //   }
  //   // console.log(div[i].innerText);
    
  // }

});

socket.on("messageLocation", (url) => {
  // console.log(url);
  const html = Mustache.render(messageTemplateLocation, {
    name: url.username,
    url: url.loc,
    timeMSG: moment(url.createdAt).format("h:mm:ss A"),
  });
  $messageBody.insertAdjacentHTML("beforeend", html);
});

// send message ******************
$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  $messageFormButton.setAttribute("disabled", "disabled");
  // disable

  const message = e.target.elements.messages.value;
  // console.log(message);
  socket.emit("sendMSG", message, (msg) => {
    $messageFormButton.removeAttribute("disabled");
    $messageFormInput.value = "";
    $messageFormInput.focus();
    // enable

    console.log("this message was delivered!", msg);
  });
});
// ********************************

// send my current location *******
$sendLocationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("geolocation is not supported by your browser ");
  }

  //   disable
  $sendLocationButton.setAttribute("disabled", "disabled");

  navigator.geolocation.getCurrentPosition((position) => {
    //   console.log(position);
    socket.emit(
      "sendLocation",
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
      () => {
        // enable
        $sendLocationButton.removeAttribute("disabled");
        console.log("موقعیت مکانی به اشتراک گذاشته شد");
      }
    );
  });
});
// ********************************
socket.emit("join", { username, room }, (error) => {
  if (error) {
    alert(error);
    location.href = "/";
  }
});
