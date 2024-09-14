import ProductModel from "./models/product.model.js"

class ProductDao {
    // Obtener producto por id
    async getProductById(productId) {
        return await ProductModel.findById(productId)
    }

    // Actualizar el stock de un producto 
    async updateProductStock(product) {
        return await product.save()
    }
}

export default new ProductDao()