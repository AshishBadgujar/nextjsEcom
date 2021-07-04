import React from 'react'
import Navbar from './nav'
import Link from 'next/link'
import { parseCookies } from 'nookies';
import Image from 'next/image'

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
                                <Image src="http://res.cloudinary.com/ashish124/image/upload/v1604039520/jdwudxonbhbi5vdwkl14.png" alt="logo" width={200} height={60} />
                            </a>
                        </Link>
                    </div>
                    <div className="search">
                        <div className="header-search-form">
                            <input type="text" placeholder="Search on ashCart ...." />
                            <button><i className="flaticon-search"></i></button>
                        </div>
                    </div>

                    <div className="user-panel">
                        {user ?
                            <Link href="/account">
                                <div className="up-item" style={{ cursor: "pointer" }}>
                                    <i className="flaticon-profile"></i>
                                    <a>{user.name}</a>
                                </div>
                            </Link>
                            :
                            <Link href="/login">
                                <div className="up-item" style={{ cursor: "pointer" }}>
                                    <i className="flaticon-profile"></i>
                                    <a>Sign</a> In or <a>Create Account</a>
                                </div>
                            </Link>
                        }
                        <Link href="/cart">
                            <div className="up-item" style={{ cursor: "pointer" }}>
                                <div className="shopping-card">
                                    <i className="flaticon-bag"></i>
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
