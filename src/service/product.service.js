import ProductRepository from "../repositories/product.repository.js"
import ProductModel from "../dao/models/product.model.js"

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

    // Obtener producto por id
    async getProductById(id){
        const product = await this.productRepository.getProductById(id)
        if(!product) {
            throw new Error("Producto no encontrado")
        }
        return product
    }

    // Agregar producto
    async addProduct(productData) {
        const {title, description, price, img, code, stock, category, thumbnail} = productData

        if(!title, !description, !price, !img, !code, !stock, !category) {
            console.error("Faltan campos obligatorios", { title, description, price, img, code, stock, category })
            throw new Error("Todos los campos son obligatorios para agregar el producto")
        }
        
        const existProductCode = await ProductModel.findOne({code: code})
        if(existProductCode) {
            console.error("El código del producto ya existe", code)
            throw new Error("El código del producto debe ser único")
        }
        return await this.productRepository.addProduct(productData)
    }

    // Actualizar producto
    async updateProduct(id, updateProd) {
        console.log("ID recibido en ProductService:", id)
        console.log("Producto a actualizar en ProductService:", updateProd)
        if (!id || Object.keys(updateProd).length === 0) { 
            throw new Error("El id del producto y producto son obligatorios")
        }
        const updatedProduct = await this.productRepository.updateProduct(id, updateProd)
        if(!updatedProduct) {
            throw new Error("El producto no ha sido encontrado")
        }
        return updatedProduct
    }

    // Eliminar producto
    async deleteproduct(id) {
        if(!id) {
            throw new Error("Es necesario ingresar el id para poder eliminar el producto")
        }
        const productDelete = await this.productRepository.deleteProduct(id)

        if(!this.deleteproduct) {
            throw new Error("El producto no ha sido encontrado")
        }
        return productDelete
    }
}

export default ProductService