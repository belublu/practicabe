import TicketDao from "../dao/ticket.dao.js"

class TicketRepository {
        constructor() {
            this.ticketDao = new TicketDao();
        }
    
        // Crear ticket
        async createTicket(data) {
            return await this.ticketDao.createTicket(data);
        }
}

export default TicketRepository