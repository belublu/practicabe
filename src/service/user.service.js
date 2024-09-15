import { createHash, isValidPassword } from "../util/hashbcrypt.js"
import CartRepository from "../repositories/cart.repository.js"
import UserRepository from "../repositories/user.repository.js"
import UserModel from "../dao/models/users.models.js"

class UserService {
    // Registro
    async registerUser(userData) {
        console.log("Verificando si el usuario ya existe:", userData.email)
        const existUser = await UserRepository.getUser(userData.email)
        if (existUser) throw new Error("El usuario ya existe")

        // Creo el carrito
        const newCart = await CartRepository.createCart()
        
        // Le asigno el carrito
        userData.cart = newCart._id
        userData.password = createHash(userData.password)
        return await UserRepository.createUser(userData)
    }

        // Obtengo el usuario por el id del carrito
    async getUserByCartId(cartId) {
        return await UserModel.findOne({ cart: cartId })
    }

    // Login
    async loginUser(email, password) {
        const user = await UserRepository.getUser(email)
        console.log("Usuario encontrado:", user)
        if (!user || !isValidPassword(password, user.password)) throw new Error("Credenciales incorrectas")
        return user
    }
}

export default new UserService()