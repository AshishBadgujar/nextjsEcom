import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import { parseCookies } from 'nookies'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'

export default function Navbar() {
    const router = useRouter()
    const cookieUser = parseCookies()
    const user = cookieUser.user ? JSON.parse(cookieUser.user) : ""
    const sidenavRef = useRef(null)
    useEffect(() => {
        M.Sidenav.init(sidenavRef.current)
    }, [])
    return (
        <>
            <nav className="main-navbar">
                <a data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                <div className="nav-wrapper">
                    <ul className="hide-on-med-and-down">
                        <li><Link href="/"><a> Home</a></Link></li>
                        <li><Link href="/categories"><a>Categories</a>
                        </Link></li>
                        {
                            (user.role == 'admin' || user.role == 'root') &&
                            <li><Link href="/create"><a>create</a></Link></li>
                        }
                        {user &&
                            <>
                                <li><a onClick={() => {
                                    cookie.remove('token')
                                    cookie.remove('user')
                                    router.push('/login')
                                }}>logout</a></li>
                            </>
                        }
                    </ul>
                </div>
            </nav>
            <ul className="sidenav" id="mobile-demo" ref={sidenavRef}>
                <li><Link href="/"><a> Home</a></Link></li>
                <li><Link href="/categories"><a>Categories</a>
                </Link></li>
                {
                    (user.role == 'admin' || user.role == 'root') &&
                    <li><Link href="/create"><a> create</a></Link></li>
                }
                {user &&
                    <>
                        <li><a onClick={() => {
                            cookie.remove('token')
                            cookie.remove('user')
                            router.push('/login')
                        }}>logout</a></li>
                    </>
                }
            </ul>

        </>
    )
}


