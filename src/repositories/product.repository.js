import ProductDao from "../dao/product.dao.js"

class ProductRepository {
    constructor() {
        this.productDao = new ProductDao()
    }
    // Obtener productos
    async getProducts(filter, options) {
        return await this.productDao.getProducts(filter, options)
    }

    // Obtener producto por id
    async getProductById(id) {
        return await this.productDao.getProductById(id)
    }

    // Agregar producto
    async addProduct(productData) {
        return await this.productDao.addProduct(productData)
    }

    // Actualizar producto
    async updateProduct(id, updateProd) {
        return await this.productDao.updateProduct(id, updateProd)
    }

    // Eliminar producto
    async deleteProduct(id){
        return await this.productDao.deleteProduct(id)
    }
}

export default ProductRepository