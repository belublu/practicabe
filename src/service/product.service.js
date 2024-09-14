import ProductRepository from "../repositories/product.repository.js"

class ProductService {
    constructor() {
        this.productRepository = new ProductRepository()
    }

    // Obtener productos
    async getProducts(query, page = 1, sort = "asc", limit = 10) {
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
            query,
        }

        const filter = query ? {category: query} : {}   
        const products = await this.productRepository.getProducts(filter, options)
        
        return products
    }

    // Agregar producto
    async addProduct(productData) {
        return await productRepository.addProduct(productData)
    }
}

export default ProductService