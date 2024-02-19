const express = require("express")
const cors = require('cors')
const socket = require('socket.io')
const http = require('http')

const productRouter = require("./routers/productRouter")
const categoryRouter = require("./routers/categoryRouter")

const app = express()
const server = http.createServer(app)

app.use(cors());

const io = socket(server, {
    cors: {
      origin: '*',
      methods: ["GET", "POST"]
    }
});

const port = 3000

io.on('connection', (socket)=>{
    console.log(socket.id)

    socket.on('chat',(data)=>{
        io.sockets.emit('chat', data); // Broadcast the message to all connected clients
    })
    
    socket.on('disconnect', ()=>{
        console.log(`User disconnected`)
    })
})


app.use(express.json())

app.use("/products", productRouter)
app.use("/categories", categoryRouter)





server.listen(port, () => {
    console.log(`Listening to ${port} port`)
})
