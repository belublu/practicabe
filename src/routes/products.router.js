import express from "express"
import ProductController from "../controller/product.controller.js"

const router = express.Router()

const productController = new ProductController()

// Obtener los productos
router.get("/", (req, res) => productController.getProducts(req, res))
// Obtener producto por id
router.get("/:pid", (req, res) => productController.getProductByid(req, res))
// Agregar producto
router.post("", (req, res) => productController.addProduct(req, res))
// Actualizar producto
router.put("/:pid", (req, res) => productController.updateProduct(req, res))
// Eliminar producto
router.delete("/:pid", (req, res) => productController.deleteProduct(req, res))

export default router