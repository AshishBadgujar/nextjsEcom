import Cart from '../../models/Cart'
import jwt from 'jsonwebtoken'
import initDB from '../../helpers/db'

initDB()

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await fetchUserCart(req, res)
            break;
        case "PUT":
            await addProduct(req, res)
            break;
        case "DELETE":
            await removeProduct(req, res)
            break;
        default:
            break;
    }
}

const fetchUserCart = async (req, res) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.json({ err: "authorizaion error login again !" })
    }
    try {
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET)
        const cart = await Cart.findOne({ user: userId })
            .populate("products.product")
        res.json(cart.products)
    } catch (error) {
        return res.json({ err: "you must logged in !" })
    }
}

const addProduct = async (req, res) => {
    const { Authorization } = req.body.headers
    const { quantity, productId } = req.body.data
    if (!Authorization) {
        return res.json({ err: "authorizaion error login again !" })
    }
    try {
        const { userId } = jwt.verify(Authorization, process.env.JWT_SECRET)
        const cart = await Cart.findOne({ user: userId })
        if (cart == null) {
            const newProduct = {
                quantity,
                product: productId
            }
            new Cart({
                user: userId,
                products: newProduct
            }).save()
            res.json({ message: 'first Product added to cart !' })
        }
        else {
            const pExists = cart.products.some(pdoc => productId === pdoc.product.toString())
            if (pExists) {
                await Cart.findOneAndUpdate(
                    { _id: cart._id, 'products.product': productId },
                    { $inc: { 'products.$.quantity': quantity } }
                )
            }
            else {
                const newProduct = {
                    quantity,
                    product: productId
                }
                await Cart.findOneAndUpdate(
                    { _id: cart._id },
                    { $push: { products: newProduct } }
                )
            }
            res.json({ message: 'Product added to cart !' })
        }
    } catch (error) {
        console.log(error)
        return res.json({ err: "you must logged in !" })
    }
}

const removeProduct = async (req, res) => {
    const { authorization } = req.headers
    const { productId } = req.body
    if (!authorization) {
        return res.json({ err: "authorizaion error login again !" })
    }
    try {
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET)
        const cart = await Cart.findOneAndUpdate(
            { user: userId },
            { $pull: { products: { product: productId } } },
            { new: true }
        ).populate("products.product")
        res.json(cart.products)
    } catch (error) {
        return res.json({ err: "you must logged in !" })
    }

}