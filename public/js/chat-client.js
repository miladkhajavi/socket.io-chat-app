const socket = io()

socket.on('countUpdate', (count)=>{
    console.log('client on count update' ,count);
})

document.querySelector('#increase').addEventListener('click', ()=>{
    console.log('added');
    socket.emit('increase')
})