// Esta capa del dao es la que se va a conectar con MongoDB, va a interactuar con los métodos de Mongoose

import UserModel from "./models/users.models.js";

class UserDao {
    async findById(id) {
        return await UserModel.findById(id)
    }

    async findOne(query) {
        return await UserModel.findOne(query)
    }
    
    async save(userData) {
        const user = new UserModel(userData)
        return await user.save()
    }
}

export default new UserDao()