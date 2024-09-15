import TicketService from "../service/ticket.service.js"

class TicketController {
    constructor() {
        this.ticketService = new TicketService()
    }

    // Finalizar compra
    async purchase(req, res) {
        const cartId = req.params.cid
        try {
            const { ticket, productOutStock } = await this.ticketService.purchase(cartId)
            res.json({
                message: "La compra ha finalizado correctamente",
                ticket: {
                    id: ticket._id,
                    amount: ticket.amount,
                    purchaser: ticket.purchaser,
                },
                productOutStock,
            });
        } catch (error) {
            console.error("Error al finalizar la compra:", error)
            res.status(500).send("Error al finalizar la compra")
        }
    }
}


export default new TicketController()