import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: "blupelusa@gmail.com",
        pass: "vlep tflc wljq zplv"
    }
})

export default transport