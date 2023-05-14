const Coreutils = require("../Coreutils");

const Sockets = (io) => {
  io.on('connection', function (socket) {
    console.log("user connected",socket.id)
    // socket.on('createRoom',(data)=>{
    
    // })
    // when the client emits 'adduser', this listens and executes
    socket.on('addUser', function(data){
      // store the username in the socket session for this client
      // socket.username = data.username;
      // store the room name in the socket session for this client
      // socket.room = data.room;
      // add the client's username to the global list
      // usernames[username] = username;
      // send client to room 1
      let users = socket.adapter.rooms.get(data.room)?.size
      if(users<2 || !users) {
        socket.join(data.room);
        let obj = {          
          message:"user added successfully",
          useradd:true
        }
        obj = {...data,...obj}
        socket.broadcast.to(data.room).emit('updatechat',obj)
        console.log("added user to ",users,data.room,data)
      }
      else {
        console.log("room is full",users)
  
      }
      // console.log("useradded",data,socket)
      // socket.emit('setusers',{
      //   users: io.sockets.adapter.rooms.get(socket.room).size
      // })
      // echo to client they've connected
      // socket.emit('updatechat', 'SERVER', 'you have connected to '+data.room);
      // echo to room 1 that a person has connected to their room
      // socket.broadcast.to(data.room).emit('updatechat', 'SERVER', data.username + ' has connected to this room');
      // socket.emit('updaterooms', rooms, 'room1');
    });
  
    // when the client emits 'sendchat', this listens and executes
    socket.on('message', function (data) {
      // we tell the client to execute 'updatechat' with 2 parameters
      // socket.room=data.room
      // console.log("sendchat",socket.username,socket.room,data)
      // socket.leave(socket.room);
      // socket.join(data.room)
      // socket.room=data.room
      // console.log("rooms",io.sockets.adapter.rooms)
      // console.log("users",io.sockets.adapter.rooms.get(data.room).size)
      console.log("message",data)
      socket.broadcast.to(data.room).emit('updatechat', {...data,message:true});
    });
  
    socket.on('leaveRoom', function(newroom){
      // leave the current room (stored in session)
      console.log("leave",socket)
      // socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
      socket.leave(socket.room);
      // join new room, received as function parameter
      // socket.join(newroom);
      // socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
      // sent message to OLD room
      // update socket session room title
      // socket.room = newroom;
      // socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
      // socket.emit('updaterooms', rooms, newroom);
    });
  
    // when the user disconnects.. perform this
    socket.on('disconnect', function(){
      // remove the username from global usernames list
      // delete usernames[socket.username];
      // update list of users in chat, client-side
      // io.sockets.emit('updateusers', usernames);
      // echo globally that this client has left
      // socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
      socket.leave(socket.room);
    });
  });  
}
 
module.exports ={ Sockets };