import TicketRepository from "../repositories/ticket.repository.js"
import CartService from './cart.service.js'
import ProductService from "./product.service.js"
import userService from "../service/user.service.js"
import totalPurchase from "../util/checkout.utils.js"

class TicketService {
    constructor() {
        this.ticketRepository = new TicketRepository()
        this.cartService = new CartService()
        this.userService = userService
        this.productService = new ProductService()
    }

    // Finalizar compra
    async purchase(cartId) {
        const cart = await this.cartService.getCartById(cartId)
        const productOutStock = []
        const arrayProducts = cart.products

        for (const item of arrayProducts) {
            const productId = item.product
            const product = await this.productService.getProductById(productId)
            if (product.stock >= item.quantity) {
                product.stock -= item.quantity
                await product.save()
            } else {
                productOutStock.push(productId)
            }
        }

        const userCart = await this.userService.getUserByCartId(cartId)
        if (!userCart) {
            throw new Error("Usuario no encontrado para el carrito proporcionado")
        }

        const ticketData = {
            purchase_datetime: new Date(),
            amount: totalPurchase(cart.products),
            purchaser: `${userCart.first_name} ${userCart.last_name}`,
        };

        const ticket = await this.ticketRepository.createTicket(ticketData)

        // Filtrar productos que no se pudieron comprar por falta de stock
        cart.products = cart.products.filter(item => 
            productOutStock.some(productId => productId.equals(item.product))
        );
        await cart.save()

        return { ticket, productOutStock }
    }
}

export default TicketService