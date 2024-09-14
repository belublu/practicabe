import ProductService from "../service/product.service.js"

class ProductController {
    constructor() {
        this.productService = new ProductService()
    }

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

    // Agregar producto
    async addProduct(req, res) {
        const newProduct = req.body
        try {
            await this.productService.addProduct(newProduct)
            res.status(201).send("Producto agregado correctamente")
        } catch (error) {
            res.status(500).send("Error al agregar el producto")
        }
    }
}

export default ProductController