import express from "express"
import CartManager from "../dao/db/cart-manager-db.js"
import CartModel from "../dao/models/cart.model.js"
import ProductModel from "../dao/models/product.model.js"
import UserModel from "../dao/models/users.models.js"
import TicketModel from "../dao/models/ticket.model.js"
import totalPurchase from "../util/checkout.utils.js"
import CartRepository from "../repositories/cart.repository.js"
import CartController from "../controller/cart.controller.js"


const router = express.Router()
const cartManager = new CartManager()
const cartRepository = new CartRepository()
const cartController = new CartController()

// Crear carrito
router.post("/", (req, res) => cartController.createCart(req, res));
// Obtener los carritos
router.get("/", (req, res) => cartController.getCarts(req,res))
// Obtener carrito por id
router.get("/:cid", (req, res) => cartController.getCartById(req,res))
// Agregar producto al carrito
router.post("/:cid/product/:pid", (req, res) => cartController.addProductToCart(req, res))
// Actualizar el carrito
router.put("/:cid", (req, res) => cartController.updateCart(req, res))
// Actualizar la cantidad de un producto en el carrito // 
router.put("/:cid/products/:pid", (req, res) => cartController.updateProdQuantity(req, res))
// Eliminar producto del carrito
router.delete("/:cid/products/:pid", (req, res) => cartController.deleteProductToCart(req, res))
// Eliminar carrito
router.delete("/:cid", (req, res) => cartController.emptyCart(req, res))
// Finalizar la compra y crear ticket // FALTA!!!!!
router.get("/:cid/purchase", (req, res) => cartController.finishCart(req, res))



//Modifico completamente ya que aplico service, controller, repository y dao
/*  router.get("/", async (req, res) => {
    try {
        // Modifico el router utilizando Cart Repository
        const carts = await cartRepository.getCarts()
        res.json(carts)
    } catch (error) {
        res.status(500).json({ error: "Error del servidor" })
    }
})  */

/* router.post("/", async (req, res) => {
    try {
        const newCart = await cartManager.createCart()
        res.status(201).json(newCart)
    } catch (error) {
        res.status(500).json({ error: "Error del servidor.", error })
    }
}) */

/* router.get("/:cid", async (req, res) => {
    const cartId = req.params.cid
    try {
        const cart = await cartRepository.getCartById(cartId)
        if (cart) {
            res.json(cart.products)
        } else {
            res.status(404).json({ error: "El carrito no ha sido encontrado." })
        }
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el carrito." })
    }
}) */

/* router.post("/:cid/product/:pid", async (req, res) => {
    const cartId = req.params.cid
    const product = req.params.pid
    const quantity = req.body.quantity || 1
    try {
        const updatedCart = await cartManager.addProductToCart(cartId, product, quantity)
        res.status(201).json(updatedCart.products)
    } catch (error) {
        console.error("Error al agregar producto al carrito:", error)
        res.status(500).json({ error: "Error del servidor." })
    }
}); */

/* router.put("/:cid/products/:pid", async (req, res) => {
    const {cid, pid} = req.params
    const {quantity} = req.body

    if(typeof quantity !== "number" || quantity <= 0){
        return res.status(400).json({message: "La cantidad a agregar debe ser un número positivo."})
    }

    try {
        const result = await cartManager.updateProdQuantity(cid, pid, quantity)
        if(result){
            res.status(200).json({message: "La cantidad de productos ha sido actualizada con éxito."})
        } else {
            res.status(404).json({message: "Carrito o producto no encontrado."})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error al actualizar la cantidad del producto solicitada.", error})
    }
}) */

/* router.delete('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params
    try {
        const result = await cartManager.deleteProductFromCart(cid, pid)
        if (result) {
            res.status(200).json({ message: 'Producto eliminado del carrito con éxito' })
        } else {
            res.status(404).json({ message: 'Carrito o producto no encontrado' })
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto del carrito', error })
    }
}); */

/* router.put("/:cid", async (req, res) => {
    const {cid} = req.params
    const {products} = req.body
    try {
        const result = await cartManager.updateCart(cid, products)
        if(result) {
            res.status(200).json({message: "El carrito se ha actualizado con éxito."})
        } else {
            res.status(404).json({message: "Carrito no encontrado."})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({message: "Error al actualizar el carrito", error})
    }
}) */

/* router.delete("/:cid", async (req, res) => {
    const {cid} = req.params
    try {
        const result = await cartManager.emptyCart(cid)
        if(result){
            res.status(200).json({message: "El carrito se ha vaciado."})
        } else {
            res.status(400).json({message: "El carrito no se ha encontrado."})
        }
    } catch (error) {
        res.status(500).json({message: "Error al vaciar el carrito", error})
    }
}) */

// Ruta para finalizar compra
/* router.get("/:cid/purchase", async(req, res) => {
    // Primero recupero el carrito id
    const cartId = req.params.cid
    try {
        const cart = await CartModel.findById(cartId)
        console.log("Productos del carrito:", cart.products);

        const arrayProducts = cart.products
        const productOutStock = []

        // Recorro el array de productos seleccionados por el cliente y ver si tengo stock
        for( const item of arrayProducts) {
            const productId = item.product // productId guardará el producto
            const product = await ProductModel.findById(productId) // Busca el producto
            // Valida si el stock del producto es mayor o igual que la cantidad del item, le descuento la cantidad al stock
            if(product.stock >= item.quantity){
                product.stock -= item.quantity
                await product.save()  
            } else {
                productOutStock.push(productId)
            }
        }
        // Ahora debo averiguar a quién pertenece el carrito ya que debo conocer los datos del usuario para hacer el ticket
        const userCart = await UserModel.findOne({cart: cartId}) // Le indico que busque el carrito que tenga el cartId 

        // Ahora creo el ticjet
        const ticket = new TicketModel({
            purchase_datetime: new Date(),
            // Creo en utils un archivo checkoutUtils o utils. la función para poder calcular el total
            amount: totalPurchase(cart.products),
            purchaser: userCart.email
        })

        // Luego guardo el ticket
        await ticket.save()

        // Filtro los productos que no se compraron porque no hay stock
        cart.products = cart.products.filter(item => productOutStock.some(productId => productId.equals(item.product)))
        // Luego lo guardo
        await cart.save()

        // Testeo con Postman
        res.json({
            message: "La compra ha sido exitosa",
            ticket: {
                id: ticket._id,
                amount: ticket.amount,
                purchaser: ticket.purchaser
            },
            productOutStock
        })

    } catch (error) {
        console.error("Error al obtener el carrito o productos:", error);

        
        res.status(500).send("Error al finalizar la compra")
    }
} ) */

export default router