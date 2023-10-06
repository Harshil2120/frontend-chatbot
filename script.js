import {io} from 'socket.io-client'
// const io=require('socket.io-client');

const messageInput=document.getElementById("message-input")
const form=document.getElementById("form")


const socket=io('http://localhost:3003')
socket.on('connect',()=>{
    console.log("connected")
})

socket.on('receive',message=>{
    displayMessageweb(message)
})


form.addEventListener("submit", e=>{
    e.preventDefault()
    const message=messageInput.value

    if(message=="") return
    displayMessage(message)
    const data = {
        question: message,
      };
      console.log(data);
    fetch('http://localhost:3004/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log('Response from server:', responseData);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

    messageInput.value=""
})

function displayMessage(message){
    const div=document.createElement("div")
    div.style.background="#1a1a1a"
    div.style.color="white"
    div.style.padding="10px"
    div.style.fontSize="20px"
    div.style.margin="5px"
    div.style.borderRadius="5px"
    div.textContent="USER:   "+message
    document.getElementById("message-container").append(div)
}

function displayMessageweb(message){
    const div=document.createElement("div")
    div.style.background="#999999"
    div.style.color="black"
    div.style.padding="10px"
    div.style.fontSize="20px"
    div.style.margin="5px"
    div.style.borderRadius="5px"
    div.textContent="ASSISTANT:   "+message
    document.getElementById("message-container").append(div)
}