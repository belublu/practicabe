import { Router } from "express"
import transport from "../util/nodemailer.js"
const router = Router()

// Enviar email
router.get("/mail", async(req, res) => {
    try {
        await transport.sendMail({ 
            from: "Tienda Pepita <blupelusa@gmail.com>",
            to: "belentorress@gmail.com",
            subject: "Bienvenidos a Librería Pepita",
            html: `<h1>Muchas gracias por visitar nuestra tienda!!</h1>
                    <img src="cid:tienda"/>`,
            attachments: [ 
                {
                    filename: "tienda.jpg",
                    path: "src/public/img/tienda.jpg",
                    cid: "tienda"
                }
            ]
        })
        res.send("Email enviado correctamente")
    } catch (error) {
        console.log(error)
        res.status(500).send("Error al enviar el mail")
    }
})

// Enviar mail desde el formulario
router.post("/sendmail", async (req, res) => {
    const {email, mensaje} = req.body

    try {
        await transport.sendMail({
            from: "Tienda Pepita",
            to: email,
            subject: "Formulario de contacto Tienda Pepita", 
            text: mensaje
        })
        res.send("Mensaje exitoso")
    res.status("contacto")  
    } catch (error) {
        res.status(500).send("Error al enviar el mail")
    }
})

// Ruta del formulario de contacto
router.get("/contact", (req, res) => {
    res.render("contact");    
})

export default router