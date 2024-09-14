import ProductModel from "./models/product.model.js"

class ProductDao {
    // Obtener productos
    async getProducts(filter = {}, options = {}) {
        try {
            const products = await ProductModel.paginate(filter, options)
            return products
        } catch (error) {
            throw new Error("Error al obtener los productos")
        }
    }


    // Agregar producto
    async addProduct(productData) {
        try {
            const newProduct = new ProductModel(productData)
            await newProduct.save()
            return newProduct
        } catch (error) {
            throw new Error("Error al agregar el producto")
        }
    }

   


    // Obtener producto por id
    async getProductById(productId) {
        return await ProductModel.findById(productId)
    }

    // Actualizar producto


    // Eliminar producto


    // Actualizar el stock de un producto 
    async updateProductStock(product) {
        return await product.save()
    }
}

export default ProductDao