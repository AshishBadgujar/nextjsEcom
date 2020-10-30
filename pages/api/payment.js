import { v4 as uuidv4 } from 'uuid';
import Stripe from 'stripe'
import Cart from '../../models/Cart'
import jwt from 'jsonwebtoken'
import Order from '../../models/Order';

const stripe = Stripe(process.env.STRIPE_SECRET)
export default async (req, res) => {
    const { paymentInfo } = req.body.data
    const { Authorization } = req.body.headers
    if (!Authorization) {
        return res.json({ err: "authorizaion failed login again !" })
    }
    try {
        const { userId } = jwt.verify(Authorization, process.env.JWT_SECRET)
        const cart = await Cart.findOne({ user: userId }).populate('products.product')
        let price = 0
        cart.products.forEach(item => {
            price = price + item.quantity * item.product.price
        })
        const prevCustomer = await stripe.customers.list({
            email: paymentInfo.email
        })

        const isExistingCustomer = prevCustomer.data.lenght > 0
        if (!isExistingCustomer) {
            var newCustomer = await stripe.customers.create({
                email: paymentInfo.email,
                source: paymentInfo.id
            })
        }

        await stripe.charges.create(
            {
                currency: "INR",
                amount: price * 100,
                receipt_email: paymentInfo.email,
                customer: isExistingCustomer ? prevCustomer.data[0].id : newCustomer.id,
                description: `You purchased a product | ${paymentInfo.email}`
            }, {
            idempotencyKey: uuidv4()
        }
        )
        await new Order({
            user: userId,
            products: cart.products,
            email: paymentInfo.email,
            total: price,
        }).save()
        await Cart.findOneAndUpdate(
            { _id: cart._id },
            { $set: { products: [] } }
        )
        res.json({ message: 'payment successfull !' })

    } catch (error) {
        console.log(error)
        return res.json({ err: "payment failed  !" })
    }
}