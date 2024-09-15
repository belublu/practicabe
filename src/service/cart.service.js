import CartRepository from "../repositories/cart.repository.js"

class CartService {
    constructor() {
        this.cartRepository = CartRepository
    }

    // Crear carrito
    async createCart() {
        return await this.cartRepository.createCart()
    }

    // Obtener los carritos
    async getCarts() {
        return await this.cartRepository.getCarts()
    }

    // Obtener carrito por id
    async getCartById(id) {
        if (!id) {
            throw new Error("El id es obligatorio para poder buscarlo")
        }
        return await this.cartRepository.getCartById(id)
    }

    // Agregar producto al carrito
    async addProductToCart(cartId, productId, quantity) {
        if (!cartId || !productId) {
            throw new Error("Es necesario ingresar el id del carrito y el id del producto para realizar la operación")
        }
        return await this.cartRepository.addProductToCart(cartId, productId, quantity)
    }

    // Actualizar el carrito
    async updateCart(cid, products) {
        if (!cid || !products) {
            throw new Error("El id del producto y los productos son necesarios")
        }
        const updatedCart = await this.cartRepository.updateCart(cid, products)
        if (!updatedCart) {
            throw new Error("El carrito no ha sido encontrado")
        }
        return updatedCart
    }

    // Actualizar la cantidad de un producto en el carrito
    async updateProdQuantity(cid, pid, quantity) {
        if (!cid || !pid || typeof quantity !== "number" || quantity <= 0) {
            throw new Error("El id del carrito, el id del producto y la cantidad son necesarias. Y la cantidad a agregar debe ser un número positivo")
        }
        const updatedCart = await this.cartRepository.updateProdQuantity(cid, pid, quantity)
        console.log(updatedCart)
        if (!updatedCart) {
            throw new Error("El carrito o el producto no han sido encontrado")
        }
        return updatedCart
    }

    // Eliminar producto del carrito
    async deleteProductToCart(cid, pid) {
        if (!cid || !pid) {
            throw new Error("Es necesario ingresar el id del carrito y el id del producto para realizar la operación")
        }
        return await this.cartRepository.deleteProductToCart(cid, pid)
    }

    // Vaciar carrito
    async emptyCart(cid) {
        if (!cid) {
            throw new Error("En necesario ingresar el id del carrito para poder vaciarlo")
        }
        const cart = await this.cartRepository.emptyCart(cid)
        if (!cart) {
            throw new Error("El carrito no ha sido encontrado")
        }
        return cart
    }
}

export default CartService