const express = require("express")

const productRouter = require("./routers/productRouter")
const categoryRouter = require("./routers/categoryRouter")

const api = express()
const port = 3000

api.use(express.json())

api.use("/products", productRouter)
api.use("/categories", categoryRouter)

api.listen(port, () => {
    console.log(`Listening to ${port} port`)
})
