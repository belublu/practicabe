// Acá creo el carrito y se lo asigno al user
import CartDao from "../dao/cart.dao.js"
import ProductDao from "../dao/product.dao.js"
import TicketDao from  "../dao/ticket.dao.js"

class CartRepository {
    
    // Crear carrito
    async createCart(){
        console.log("Creando carrito...")
        return await CartDao.createCart()
        
    }

    // Obtener los carritos
    async getCarts(){
        return await CartDao.getCarts()
    }

    // Obtener carrito por id
    async getCartById(id){
        return await CartDao.getCartById(id)
    }

    // Agregar producto al carrito
    async addProductToCart(cartId, productId, quantity){
        return await CartDao.addProductToCart(cartId, productId, quantity)
    }

    // Actualizar el carrito
    async updateCart(cid, products) {
        return await CartDao.updateCart(cid, products)
    }

    // Actualizar la cantidad de un producto en el carrito
    async updateProdQuantity(cid, pid, quantity) {
        return await CartDao.updateProdQuantity(cid, pid, quantity)
    }

    // Eliminar producto del carrito
    async deleteProductToCart(cid, pid) {
        return await CartDao.deleteProductToCart(cid, pid)
    }
    
    // Vaciar carrito
    async emptyCart(cid){
        return await CartDao.emptyCart(cid)
    }

    

}

export default CartRepository