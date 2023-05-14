require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { Sockets } = require('./sockets')
const app = express()
const server = require("http").createServer(app)
const io = require('socket.io')(server,{cors:{origin:"*"}});
// const { Sockets } = require('./sockets');


app.use(express.json());
app.use(cors({origin:"*"}))

app.get('/',function(req,res){
  res.send({
    message:"connected to backend"
  })
})
app.get('/getnumusers/:roomid',(req,res)=>{
  let users = io.sockets.adapter.rooms.get(req.params['roomid'])?.size
  console.log("users",users)
  if(users<2 || !users)
    return res.status(200).send({message:"users", users: users})
  else 
    return res.status(404).send({message:"room is full"})
})

server.listen(process.env.SERVER_PORT || 4000,()=>{
  console.log("App running on port : ",process.env.SERVER_PORT || 4000)
})
Sockets(io)
