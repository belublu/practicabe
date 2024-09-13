import express from "express"
import exphbs from "express-handlebars"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import viewsRouter from "./routes/views.router.js"
import "./database.js"
import ProductManager from "./dao/db/product-manager-db.js"
import { Server } from "socket.io"
import cookieParser from "cookie-parser"
import passport from "passport"
import initializePassport from "./config/passport.config.js"
import sessionRouter from "./routes/sessions.router.js"

const app = express()
const PORT = 8080
const productManager = new ProductManager("src/models/products.json") 

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static("./src/public"))
app.use(cookieParser())
app.use(passport.initialize())
initializePassport()

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/", viewsRouter)
app.use("/api/sessions", sessionRouter)

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")


const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`)
})

const io = new Server(httpServer)
io.on("connection", async (socket) => {
    console.log("Un cliente se conectó.")
    socket.emit("products", await productManager.getProducts())

    socket.on("deleteProduct", async (id) => {
        await productManager.deleteProduct(id)

        io.sockets.emit("products", await productManager.getProducts())
    })

    socket.on("addProduct", async (product) => {
        await productManager.addProduct(product)
        io.sockets.emit("products", await productManager.getProducts())
    })
})

