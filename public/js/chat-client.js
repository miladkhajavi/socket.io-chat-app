const socket = io()


// events************************* 
// socket.on('countUpdate', (count)=>{
//     console.log('client on count update' ,count);
// })

// document.querySelector('#increase').addEventListener('click', ()=>{
//     console.log('added');
//     socket.emit('increase')
// })
// ********************************

socket.on('message', (message)=>{
    console.log(message);
})

document.querySelector('#message-form').addEventListener('submit' , (e) =>{
    e.preventDefault()

    const message = e.target.elements.messages.value
    // console.log(message);
    socket.emit('sendMSG',message)
})