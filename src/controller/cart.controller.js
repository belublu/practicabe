import CartService from "../service/cart.service.js"

class CartController {
    constructor() {
        this.cartService = new CartService()
    }

    // Crear carrito
    async createCart(req, res) {
        try {
            const newCart = await this.cartService.createCart()
            res.status(201).send(newCart)
        } catch (error) {
            res.status(500).send("Error al crear el carrito")
        }
    }

    // Obtener los carritos
    async getCarts(req, res) {
        try {
            const carts = await this.cartService.getCarts()
            res.status(201).send(carts)
        } catch (error) {
            res.status(500).send("Error del servidor")
        }
    }

    // Obtener carrito por id
    async getCartById(req, res) {
        const cartId = req.params.cid
        try {
            const cart = await this.cartService.getCartById(cartId)
            if (cart) {
                res.json(cart.products)
            } else {
                res.status(400).send("No ha sido encontrado un carrito con ese id")
            }
        } catch (error) {
            res.status(500).send("Error al obetener el carrito")
        }
    }

    // Agregar producto al carrito
    async addProductToCart(req, res) {
        const cartId = req.params.cid
        const productId = req.params.pid
        const quantity = req.body.quantity || 1

        try {
            const updateCart = await this.cartService.addProductToCart(cartId, productId, quantity)
            res.status(201).send(updateCart.products)
        } catch (error) {
            console.error("Error al agregar el producto al carrito", error)
            res.status(500).send("Error del servidor")
        }
    }

    // Actualizar el carrito
    async updateCart(req, res) {
        const { cid } = req.params
        const { products } = req.body
        try {
            const result = await this.cartService.updateCart(cid, products)
            res.status(200).send("El carrito se ha actualizado con éxito")
        } catch (error) {
            console.error("Error al actualizar el carrito", error)
            res.status(500).send("Error al actualizar el carrito.")
        }
    }

    // Actualizar la cantidad de un producto en el carrito
    async updateProdQuantity(req, res) {
        const { cid, pid } = req.params
        const { quantity } = req.body

        if (!quantity || quantity <= 0) {
            return res.status(400).send("La cantidad debe ser mayor a 0")
        }

        try {
            const result = await this.cartService.updateProdQuantity(cid, pid, quantity)
            if (result) {
                res.status(201).send("Cantidad de producto actualizada con éxito")
            } else {
                res.status(404).send("El carrito o el producto no han sido encontrados")
            }
        } catch (error) {
            res.status(500).send("Error al actualizar la cantidad del producto")
        }
    }

    // Eliminar producto del carrito
    async deleteProductToCart(req, res) {
        const { cid, pid } = req.params
        try {
            const updateCart = await this.cartService.deleteProductToCart(cid, pid)
            res.status(201).send(updateCart.products)
        } catch (error) {
            res.status(500).send("Error del servidor")
        }
    }

    // Vaciar carrito
    async emptyCart(req, res) {
        const { cid } = req.params
        try {
            const cart = await this.cartService.emptyCart(cid)
            res.status(201).send(`El carrito ${cid} se ha vaciado`)
        } catch (error) {
            res.status(500).send("Error del servidor")
        }
    }
}

export default CartController