import Order from '../../models/Order'
import jwt from 'jsonwebtoken'
import initDB from '../../helpers/db'

initDB()

export default async (req, res) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.json({ err: "authorizaion error login again !" })
    }
    try {
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET)
        const orders = await Order.find({ user: userId })
            .populate("products.product")
        res.json(orders)
    } catch (error) {
        console.log(error)
        return res.json({ err: "you must logged in !" })
    }
}

