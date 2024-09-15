import UserModel from "../dao/models/users.models.js"
import UserDao from "../dao/user.dao.js"

class UserRepository {
    // Crear usuario
    async createUser(userData) {
        return await UserDao.save(userData)
    }

    // Obtener usuario por su id
    async getUserById(id) {
        return await UserDao.findById(id)
    }

    // Obtener usuario por su carrito
    async findUserByCart(cartId){
        return await UserModel.findOne({cart: cartId})
    }

    // Obtener usuario por su email
    async getUser(email) {
        return await UserDao.findOne({email})
    }
}

export default new UserRepository()