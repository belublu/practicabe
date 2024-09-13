// Acá importo el dao
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

    // Método para obtener usuario por email
    async getUser(email) {
        return await UserDao.findOne({email})
    }
}

// Agregar método para actualizar y eliminar


export default new UserRepository()