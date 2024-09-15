import express from "express"
import CartController from "../controller/cart.controller.js"
import TicketController from "../controller/ticket.controller.js"

const router = express.Router()

const cartController = new CartController()
const ticketController = TicketController

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

// Actualizar la cantidad de un producto en el carrito 
router.put("/:cid/products/:pid", (req, res) => cartController.updateProdQuantity(req, res))

// Eliminar producto del carrito
router.delete("/:cid/products/:pid", (req, res) => cartController.deleteProductToCart(req, res))

// Eliminar carrito
router.delete("/:cid", (req, res) => cartController.emptyCart(req, res))

// Finalizar la compra y crear ticket 
router.get("/:cid/purchase", (req, res) => ticketController.purchase(req, res))

export default router