import React from 'react'
import Navbar from './nav'
import Link from 'next/link'
import { parseCookies } from 'nookies'

function Header() {
    const cookieUser = parseCookies()
    const user = cookieUser.user ? JSON.parse(cookieUser.user) : ""

    return (
        <>
            <div className="header-section">
                <div className="header-top">
                    <div className="logo">
                        <Link href="/" >
                            <a className="site-logo">
                                <img src="http://res.cloudinary.com/ashish124/image/upload/v1604039520/jdwudxonbhbi5vdwkl14.png" alt="" style={{ height: '60px', width: '200px' }} />
                            </a>
                        </Link>
                    </div>
                    <div className="search">
                        <div className="header-search-form">
                            <input type="text" value={text} placeholder="Search on divisima ...." />
                            <button><i className="flaticon-search"></i></button>
                        </div>
                    </div>

                    <div className="user-panel">
                        {user ?
                            <Link href="/account">
                                <div className="up-item">
                                    <i className="flaticon-profile"></i>
                                    <a>{user.name}</a>
                                </div>
                            </Link>
                            :
                            <Link href="/login">
                                <div className="up-item">
                                    <i className="flaticon-profile"></i>
                                    <a>Sign</a> In or <a>Create Account</a>
                                </div>
                            </Link>
                        }
                        <Link href="/cart">
                            <div className="up-item">
                                <div className="shopping-card">
                                    <i className="flaticon-bag"></i>
                                    <span>0</span>
                                </div>
                                <a>Shopping Cart</a>
                            </div>
                        </Link>
                    </div>

                </div>
                <Navbar />
            </div>
        </>
    )
}

export default Header
