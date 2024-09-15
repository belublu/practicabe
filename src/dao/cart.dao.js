import CartModel from "./models/cart.model.js"
class CartDao {
    // Crear carrito
    async createCart() {
        const newCart = new CartModel({ products: [] })
        return await newCart.save()
    }

    // Obtener los carritos
    async getCarts() {
        return await CartModel.find()
    }

    // Obtener carrito por id
    async getCartById(id) {
        return await CartModel.findById(id)
    }

    // Agregar producto al carrito
    async addProductToCart(cartId, productId, quantity) {
        const cart = await CartModel.findById(cartId)
        if (!cart) {
            throw new Error("No existe un carrito con ese id")
        }
        // Verifico si el producto ya existe en el carrito, sino lo agrego
        const productExist = cart.products.findIndex(p => p.product.toString() === productId)
        if (productExist >= 0) {
            cart.products[productExist].quantity += quantity
        } else {
            cart.products.push({ product: productId, quantity })
        }
        // Guardo el carrito
        await cart.save()
        return cart
    }

    // Actualizar el carrito
    async updateCart(cid, products) {
        const cart = await CartModel.findById(cid)
        if (!cart) {
            return null
        }
        cart.products = products
        await cart.save()
        return cart
    }

    // Actualizar la cantidad de un producto en el carrito
    async updateProdQuantity(cid, pid, quantity) {
        const cart = await CartModel.findById(cid).populate("products.product")
        if (!cart) {
            return null
        }
        const product = cart.products.find(p => p.product.id.toString() === pid)
        if (!product) {
            return null
        }
        product.quantity = quantity
        await cart.save()
        return cart
    }

    // Eliminar producto del carrito
    async deleteProductToCart(cid, pid) {
        const cart = await CartModel.findById(cid)
        if (!cart) {
            throw new Error("No existe un carrito con ese id")
        }
        // Verifico si el producto ya existe en el carrito, sino lo elimino
        const productExist = cart.products.findIndex(p => p.product.toString() === pid)
        if (productExist) {
            cart.products.splice(productExist, 1)
            await cart.save()
            return cart
        }
    }

    // Vaciar carrito
    async emptyCart(cid) {
        const cart = await CartModel.findById(cid)
        cart.products = []
        await cart.save()
        return cart
    }
}

export default new CartDao()