import React, { useState } from 'react'
import Axios from 'axios'
import { parseCookies } from 'nookies'
import cookie from 'js-cookie'
import baseUrl from '../helpers/baseUrl'
import { useRouter } from 'next/router'
import Link from 'next/link'
import StripeCheckout from 'react-stripe-checkout';

function Cart({ error, products }) {
    const { token } = parseCookies()
    const router = useRouter()
    const [cProducts, setCproducts] = useState(products)
    let price = 0

    if (!token) {
        return (
            <div className="container" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
                <h3>Please Log in to access the cart ! </h3>
                <h4><Link href="/login"><a>Login</a></Link></h4>
            </div>
        )
    }
    if (error) {
        M.toast({ html: error, classes: "red" });
        cookie.remove('user')
        cookie.remove('token')
        router.push('/login')
    }

    const handleRemove = async (productId) => {
        const res = await Axios.delete(`${baseUrl}/api/cart`, {
            headers: {
                "Authorization": token
            },
            data: {
                productId
            }
        })
        const res2 = res.data
        if (res2.err) {
            M.toast({ html: res2.err, classes: "red" })
            cookie2.remove('user')
            cookie2.remove('token')
            router.push('/login')
        } else {
            M.toast({ html: 'product removed from Cart !', classes: "green" })
        }
        setCproducts(res2)
    }
    const CartItems = () => {
        return (
            <>
                {cProducts.map(item => {
                    price = price + item.quantity * item.product.price
                    return (
                        <div className="cart" key={item.product._id}>
                            <img src={item.product.mediaUrl} style={{ width: 200, height: 250 }} />
                            <div style={{ marginLeft: '20px' }}>
                                <h6>{item.product.name}</h6>
                                <h6>{item.quantity} X ₹ {item.product.price} </h6>
                                <button className="btn red" onClick={() => { handleRemove(item.product._id) }}>remove</button>
                            </div>
                        </div>
                    )
                })}
            </>
        )
    }
    const handleCheckout = async (paymentInfo) => {
        const res = await Axios.post(`${baseUrl}/api/payment`, {
            headers: {
                "Authorization": token
            },
            data: {
                paymentInfo
            }
        })
        const res2 = res.data
    }
    const Total = () => {
        return (
            <div className="cart">
                <h5>Total ₹ {price} </h5>
                {products.lenght != 0 &&
                    <StripeCheckout
                        name="E-cart"
                        amount={price * 100}
                        image={products.lenght > 0 ? products[0].product.mediaUrl : ''}
                        currency="INR"
                        shippingAddress={true}
                        billingAddress={true}
                        zipCode={true}
                        stripeKey="pk_test_51HUtVNAeGOpmdGiwjUkACCoXE1vSrttYkWbPdbOTZsLrFMvZGWDnTAaoNGYFM9pChA6Z0XNEqHIrsrWDDo8NVAY100y9VGOuzP"
                        token={(paymentInfo) => handleCheckout(paymentInfo)}
                    >
                        <button className="btn">checkout</button>
                    </StripeCheckout>
                }
            </div>
        )
    }
    return (
        <div className="container">
            <CartItems />
            <Total />
        </div>

    )
}

export async function getServerSideProps(ctx) {
    const { token } = parseCookies(ctx)
    if (!token) {
        return {
            props: { products: [] }
        }
    }
    const res = await Axios.get(`${baseUrl}/api/cart`, {
        headers: {
            "Authorization": token
        }
    })
    const products = await res.data
    if (products.err) {
        return {
            props: { error: products.err }
        }
    }
    return {
        props: { products }
    }
}

export default Cart
