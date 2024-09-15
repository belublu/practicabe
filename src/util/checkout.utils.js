const totalPurchase = (products) => {
    let total = 0
    
    products.forEach(item => {
        console.log("Producto:", item.product, "Cantidad:", item.quantity)
        total += item.product.price * item.quantity
    })
    return total
}

export default totalPurchase

