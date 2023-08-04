const express=require("express")
const app=express()
// const server=require("http").createServer(app)

const cors=require("cors")
const userRoute=require('./Route/userRoute')
const init=require('./server')
const { Server } = require('socket.io')


app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/',userRoute)
app.use(init)

const server = app.listen(4040,console.log("running"))

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        // method: ['POST', 'GET']
    }
})
io.on("connection", (socket) => {
    console.log("A new connection--", socket.id)

    socket.on("join chat", (userId) => {
        socket.join(userId)
        console.log(userId+"joined")
    })

    socket.on("send-msg",(data)=>
    {
        console.log("object", data)
        socket.to(data.receiverId.toString()).emit("receive-msg",data)
    })
})