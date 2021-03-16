import React, { useEffect, useRef } from 'react'
import { parseCookies } from 'nookies'
import baseUrl from '../helpers/baseUrl'
import Axios from 'axios'
import UserRoles from '../components/userRoles'

export default function Account({ orders }) {
    const cookie = parseCookies()
    const user = cookie.user ? JSON.parse(cookie.user) : ''
    const collapsRef = useRef(null)
    useEffect(() => {
        M.Collapsible.init(collapsRef.current);
    }, [])

    return (
        <div className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
            <div className="center-align" style={{ paddingBottom: "40px" }}>
                <h3>{user.name}</h3>
                <h3>{user.email}</h3>
            </div>
            <h4 style={{ paddingBottom: "40px" }}>Order history !</h4>
            {orders.length == 0 ?
                <div className="container">
                    <h5>No orders yet !</h5>
                </div>
                :
                <ul className="collapsible" ref={collapsRef}>
                    {orders.map(item => {
                        return (
                            <li key={item._id}>
                                <div className="collapsible-header"><i className="material-icons">folder</i>{item.createdAt}</div>
                                <div className="collapsible-body">
                                    {
                                        item.products.map(pitem => {
                                            return (
                                                <h5>{pitem.product.name}X {pitem.quantity}</h5>
                                            )
                                        })
                                    }
                                </div>
                            </li>
                        )
                    })}
                </ul>}
            {user.role == "root" && <UserRoles />}
        </div>
    )
}


export async function getStaticProps(ctx) {
    const { token } = parseCookies(ctx)
    if (!token) {
        const { res } = ctx
        res.writeHead(302, { Location: '/login' })
        res.end()
    }
    const res = await Axios.get(`${baseUrl}/api/orders`, {
        headers: {
            "Authorization": token
        }
    })
    const res2 = res.data
    return {
        props: { orders: res2 }
    }
}
