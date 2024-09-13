import UserRepository from "../repositories/user.repository.js"
import { createHash, isValidPassword } from "../util/hashbcrypt.js"
import CartRepository from "../repositories/cart.repository.js"

// En los servicios podemos hashear contraseñas, hacer el dto


class UserService {
    // Para registrar necesito recibir el userData que lo levanta de los controladores y lo manda a mi
    async registerUser(userData) {
        console.log("Verificando si el usuario ya existe:", userData.email);

        const existUser = await UserRepository.getUser(userData.email)
        if (existUser) throw new Error("El usuario ya existe")

        // Creo el carrito
        const newCart = await CartRepository.createCart()
        
        //  Le asigno el carrito
        userData.cart = newCart._id

        userData.password = createHash(userData.password)
        return await UserRepository.createUser(userData)
    }


    async loginUser(email, password) {

        /*     console.log("Buscando usuario:", email); */


        const user = await UserRepository.getUser(email)
        if (!user || !isValidPassword(password, user)) throw new Error("Credenciales incorrectas")
        return user
    }

}

export default new UserService()