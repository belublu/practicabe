import ProductModel from "./models/product.model.js"

class ProductDao {
    // Obtener productos
    async getProducts(filter = {}, options = {}) {
        try {
            const products = await ProductModel.paginate(filter, options)
            return products
        } catch (error) {
            console.error("Error al obtener los productos de la base de datos", error)
            throw new Error("Error al obtener los productos")
        }
    }

    // Obtener producto por id
    async getProductById(id) {
        return await ProductModel.findById(id)
    }

    // Agregar producto
    async addProduct(productData) {
        try {
            const newProduct = new ProductModel(productData)
            return await newProduct.save()
        } catch (error) {
            console.log("Error al agregar el producto")
            throw new Error("Error al agregar el producto")
        }
    }

    // Actualizar producto
    async updateProduct(id, updateProd) {
        try {
            const update = await ProductModel.findByIdAndUpdate(id, updateProd)
            if (!update) {
                console.log("El producto a actualizar no ha sido encontrado.")
                return null
            } else {
                console.log("El producto ha sido actualizado correctamente.")
                return update
            }
        } catch (error) {
            console.error("Error al actualizar el producto", error)
            throw error
        }
    }

    // Eliminar producto
    async deleteProduct(id) {
        try {
            const productDelete = await ProductModel.findByIdAndDelete(id)
            if(!productDelete) {
                console.log("El producto no ha sido encontrado")
                return null
            } else {
                console.log("El producto ha sido eliminado exitosamente")
                return productDelete
            }
        } catch (error) {
            console.log("Error al eliminar el producto")
            throw new Error("Error al eliminar el producto", error)
        }

    }
    async save(product) {
        return await product.save();
    }
}

export default ProductDao