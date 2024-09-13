import bcrypt from "bcrypt"

const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password)


const totalPurchase = (products) => {
    let total = 0
    
    // Como products es un array, lo voy a recorrer
    products.forEach(item => {
        total += item.product.price * item.quantity
    })
    return total
}


export { createHash, isValidPassword, totalPurchase }