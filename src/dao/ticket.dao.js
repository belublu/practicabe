import TicketModel from "./models/ticket.model.js"

class TicketDao {
    // Crear ticket
        async createTicket(data) {
            const newTicket = new TicketModel(data)
            return await newTicket.save()
        }
}

export default TicketDao