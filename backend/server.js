const express = require("express")
const cors = require('cors')

const productRouter = require("./routers/productRouter")
const categoryRouter = require("./routers/categoryRouter")

const api = express()
const port = 3000

api.use(cors()) // Use this after the variable declaration
api.use(express.json())

api.use("/products", productRouter)
api.use("/categories", categoryRouter)

api.listen(port, () => {
    console.log(`Listening to ${port} port`)
})
