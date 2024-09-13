// Acá armo el esquema del ticket
import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
     // Puedo hacer una funcion en utils que tome algún valor random y lo retorne o en el mismo Schema. // Puedo usar Math.random
    code: {
        type: String,
        unique: true,
        required: true,
        default: function(){
            return `TICKET NRO: -${Math.floor(Math.random() * 1000)}`
        }
    },
    // Acá usar new Date.
    purchase_datetime: {
        type: Date,
        default: Date.now,
        required: true
    }, 
    // Crear una funcion auxiliar que recorra el array y calcule el total de la compra
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
})

const TicketModel = mongoose.model("tickets", ticketSchema)

export default TicketModel