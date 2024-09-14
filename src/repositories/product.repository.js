import ProductDao from "../dao/product.dao.js"

class ProductRepository {
    constructor() {
        this.productDao = new ProductDao()
    }
    // Obtener productos
    async getProducts(filter, options) {
        return await this.productDao.getProducts(filter, options)
    }


    // Agregar producto
    async addProduct(productData) {
        const product = await this.productDao.addProduct(productData)
        return product
    }
}

export default ProductRepository