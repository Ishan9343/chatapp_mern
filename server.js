
// in this app we will be creating two servers one as node js which will be backend server
// and another one which will from client side on which over website wll be hosted .
//port
const express = require('express');
const path= require('path');
const app= express();
const http =require("http");
const server = http.createServer(app);
const io=require("socket.io")(server);
const users={};

//broadcastany html css and js file altogether.
app.use(express.static(__dirname +'/public'));

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'app.html'));
})

io.on("connection",(socket)=>{                    //when user joins io.on will let diff
                                                //users comm ans socket.on will
         //event (user-defined)    
       console.log("new connection"); 
                   //handle each user
    socket.on('new-user-joined',name=>{
       console.log("new user "+name);
       users[socket.id]=name;
    socket.broadcast.emit('user-joined',name); //let others know someone joined.
   })

    socket.on('send',message=>{
    socket.broadcast.emit('receive',{message:message,nameOfUser:users[socket.id]})
  })
})

server.listen(3000,()=>{
    console.log("Server Started");
})