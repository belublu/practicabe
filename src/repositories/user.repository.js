// Acá importo el dao
import UserModel from "../dao/models/users.models.js"
import UserDao from "../dao/user.dao.js"

class UserRepository {
    // Método para crear usuario
    async createUser(userData) {
        return await UserDao.save(userData)
    }

    // Método para obtener usuario por ID
    async getUserById(id) {
        return await UserDao.findById(id)
    }

    // Método para obtener al usuario por su carrito
    async findUserByCart(cartId){
        return await UserModel.findOne({cart: cartId})
    }

    // Método para obtener usuario por email
    async getUser(email) {
        return await UserDao.findOne({email})
    }
}

// Agregar método para actualizar y eliminar


export default UserRepository