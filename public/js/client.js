var socket=io();

console.log("hello!");

const form =document.getElementById('send-container');
const msgip=document.getElementById('msgip');
const chatsection=document.getElementById('chatsection');
const joincontainer=document.getElementById('joincontainer');

const n=prompt("Enter your name to join");
socket.emit('new-user-joined',n);

const adduser =(message)=>{
    const user=document.createElement('h6');
    user.innerText=message;
  //  msgelement.classList.add('');
   
    joincontainer.append(user);


}
const addmsg =(message,position)=>{
    const msgelement=document.createElement('div');
    msgelement.innerText=message;
    msgelement.classList.add('msg');
    msgelement.classList.add(position);
    chatsection.append(msgelement);


}
form.addEventListener('submit',(e)=>{
e.preventDefault();//for prevent refesh of page on click of send button
const message1=msgip.value;
addmsg(`You:${message1}`,`right`);
socket.emit('send',message1);
//auto clear send space
msgip.value='';

})

//call above function as user joins..

socket.on('user-joined',n=>{
    adduser(`${n} joined the chat`);
  

})

socket.on('receive',data=>{
    addmsg(`${data.nameOfUser}: ${data.message}`,'left')
})
