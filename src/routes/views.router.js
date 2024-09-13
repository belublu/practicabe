import express from "express"
import { Router } from "express"
import ProductManager from "../dao/db/product-manager-db.js"
import CartManager from "../dao/db/cart-manager-db.js"

const router = express.Router()
const productManager = new ProductManager()
const cartManager = new CartManager()
// Importo los middlewares de auth
import { onlyAdmin, onlyUser } from "../middleware/auth.js"
import passport from "passport"


// Aplico el JWT passport en las rutas products y realtimeproducts:

router.get("/products", passport.authenticate("jwt", {session: false}), onlyUser, async (req, res) => {
    try {
        const { page = 1, limit = 10, sort = "asc", query = "" } = req.query
        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
        }
        const queryObject = query ? { category: query } : {};
        const products = await productManager.getProducts(queryObject, options)

        res.render("products", {
            products: products.docs,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            currentPage: products.page,
            totalPages: products.totalPages,
            prevLink: products.hasPrevPage ? `?limit=${limit}&page=${products.prevPage}&sort=${sort}&query=${query || ''}` : null,
            nextLink: products.hasNextPage ? `?limit=${limit}&page=${products.nextPage}&sort=${sort}&query=${query || ''}` : null
        });
    } catch (error) {
        console.error("Ha ocurrido un error al obtener los productos.", error)
        res.status(500).json({ error: "Error al obtener los productos", details: error.message })
    }
})

    router.get("/carts/:cid", async (req, res) => {
        const cartId = req.params.cid
        console.log("Solicitando carrito con ID:", cartId)
        try {
            const cart = await cartManager.getCartById(cartId)
            console.log("Carrito encontrado:", cart)
    
            if (!cart) {
                return res.status(404).json({ error: "El carrito solicitado no ha sido encontrado" })
            }

            if (cart.products.length === 0) {
                return res.render("carts", {message: "El carrito está vacío"})
            }
    
            const prodsCart = cart.products.map(item => ({
                product: item.product.toObject(),
                quantity: item.quantity
            }));
            console.log("Productos del carrito:", prodsCart)
            res.render("carts", { products: prodsCart })
        } catch (error) {
            console.error("Error en el servidor:", error)
            res.status(500).json({ error: "Error en el servidor" })
        }
    })

router.get("/realtimeproducts", passport.authenticate("jwt", {session: false}), onlyAdmin, async (req, res) => {
    try {
        const products = await productManager.getProducts()
        res.render("realtimeproducts", { products })
    } catch (error) {
        res.status(500).json({ error: "Error al cargar los productos", error })
    }
})

router.get("/login", (req, res) => {
    res.render("login")
})

router.get("/register", (req, res) => {
    res.render("register")
})



export default router

