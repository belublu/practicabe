import UserModel from "./models/users.models.js"

class UserDao {
    // Buscar usuario por su id
    async findById(id) {
        return await UserModel.findById(id)
    }

    // Buscar usuario por su email
    async findOne(query) {
        return await UserModel.findOne(query)
    }

    
    async save(userData) {
        const user = new UserModel(userData)
        return await user.save()
    }

    // Buscar usuario por su carrito
    async findOneByCartId(cartId) {
        return await UserModel.findOne({ cart: cartId });
    }
}

export default new UserDao()