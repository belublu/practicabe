import ProductService from "../service/product.service.js"

class ProductController {
    constructor() {
        this.productService = new ProductService()
    }

    // Obtener todos los productos
    async getProducts(req, res) {
        try {
            const { page = 1, sort = "asc", query, limit = 10 } = req.query
            const products = await this.productService.getProducts(query, page, sort, limit)

            const prevLink = products.hasPrevPage ? `/products?limit=${limit}&page=${products.prevPage}&sort=${sort}&query=${query}` : null;
            const nextLink = products.hasNextPage ? `/products?limit=${limit}&page=${products.nextPage}&sort=${sort}&query=${query}` : null;

            res.json({
                status: "sucess",
                payload: products.docs,
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink,
                nextLink
            })
        } catch (error) {
            console.error("Ha ocurrido un error al obtener los productos.", error)
            res.status(500).json({ error: "Error al obtener el producto", details: error.message })
        }
    }

    // Obtener producto por id
    async getProductByid(req, res){
        const id = req.params.pid
        console.log(id)
        try {
            const product = await this.productService.getProductById(id)
            if(!product) {
                res.status(400).send("El producto no ha sido encontrado")
            }
            res.send(product)
        } catch (error) {
            res.status(500).send("Error al obtener el producto")
        }
    }

    // Agregar producto
    async addProduct(req, res) {
        const newProduct = req.body
        console.log("Datos recibidos para agregar el producto:", newProduct)
        try {
            await this.productService.addProduct(newProduct)
            res.status(201).send("Producto agregado correctamente")
        } catch (error) {
            console.error("Error en el controlador al agregar el producto:", error.message)
            res.status(500).send("Error al agregar el producto")
        }
    }

    // Actualizar producto
    async updateProduct(req, res) {
        const id = req.params.pid
        const productUpdated = req.body
        console.log(id)
        console.log(productUpdated)
        if (!id || !productUpdated) {
            return res.status(400).json({ error: "El ID del producto y los datos del producto son obligatorios." })
        }
        try {
            const updatedProduct = await this.productService.updateProduct(id, productUpdated)
            if(updatedProduct){
                res.status(201).json("El producto se ha actualizado correctamente.")
            }else{
                res.status(404).json({error: "Producto no encontrado"})
            }
        } catch (error) {
            console.error("Error al actualizar el producto:", error)
            res.status(500).json({error: "Error al actualizar el producto.", error})
        }
    }

    // Eliminar producto
    async deleteProduct(req, res) {
        const id = req.params.pid
        try {
            const productDelete = await this.productService.deleteproduct(id)
            if(productDelete){
                res.status(200).json({ message: "El producto se ha eliminado correctamente." })
            } else {
                res.status(404).send("Producto no encontrado")
            }
            
        } catch (error) {
            console.error("Error al eliminar el producto", error)
            res.status(500).send("Error del servidor")
        }
    }
}

export default ProductController