import userService from "../service/user.service.js"
import jwt from "jsonwebtoken"
import UserDto from "../dto/user.dto.js"

class UserController {
    // Registro
    async register(req, res) {
        const { user, first_name, last_name, age, email, password } = req.body
        console.log("Datos recibidos del formulario:", { first_name, last_name, age, email, password })
        try {
            const newUser = await userService.registerUser({ user, first_name, last_name, age, email, password })
            console.log("Usuario registrado con éxito:", newUser)

            const token = jwt.sign({
                user: `${newUser.first_name} ${newUser.last_name}`,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                age: newUser.age,
                email: newUser.email,
                role: newUser.role
            }, "pepita", { expiresIn: "1h" })
            res.cookie("pepitaCookieToken", token, { maxAge: 360000, httpOnly: true })
            res.redirect("/api/sessions/current")
        } catch (error) {
            console.log("Error al registrar el usuario:", error.message)
            res.status(500).send("Error del servidor")
        }
    }

    // Login
    async login(req, res) {
        const { email, password } = req.body         

        try {
            console.log("Datos recibidos en login:", { email, password })

            const user = await userService.loginUser(email, password)
            const token = jwt.sign({
                user: `${user.first_name} ${user.last_name}`,
                first_name: user.first_name,
                last_name: user.last_name,
                age: user.age,
                email: user.email,
                role: user.role
            }, "pepita", { expiresIn: "1h" })
            res.cookie("pepitaCookieToken", token, {maxAge: 360000, httpOnly: true})
            res.redirect("/api/sessions/current")
        } catch (error) {
            res.status(500).send("Error del server" + error.message)
        }
    }

    // Current
    async current(req, res) {
        if (req.user) {
            const user = req.user
            const usertDTO = new UserDto(user)
            res.render("home", { user: usertDTO })
        } else {
            res.send("No autorizado")
        }
    }

    // Logout
    logout(req, res) {
        res.clearCookie("pepitaCookieToken")
        res.redirect("/login")
    }
}

export default new UserController()
