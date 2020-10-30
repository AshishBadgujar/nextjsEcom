import React, { useState } from 'react'
import baseUrl from '../helpers/baseUrl'
import Axios from 'axios'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await Axios.post(`${baseUrl}/api/login`, {
            email,
            password
        }).then(res => {
            if (res.data.err) {
                M.toast({ html: res.data.err, classes: "red" });
            } else {
                cookie.set('token', res.data.token)
                cookie.set('user', res.data.user)
                M.toast({ html: `you are successfully logged in !`, classes: "green" });
                router.push('/account')
            }
        })
            .catch(error => {
                console.log(error)
                M.toast({ html: `Something went wrong please try again !`, classes: "red" });
            })
    }
    return (
        <section className="login_box_area z-depth-3">
            <div className="login_box_img">
                <div className="hover">
                    <h4>New to our website?</h4>
                    <p>There are advances being made in science and technology everyday, and a good example of this
							is the</p>
                    <Link href="/signup"><a className="btn waves-effect waves-light">Create an Account</a></Link>
                </div>
            </div>
            <div className="login_form_inner">
                <h4>Log in to enter</h4>
                <form action="" onSubmit={(e) => handleSubmit(e)}>
                    <div className="input-field">
                        <i className="material-icons prefix">email</i>
                        <input id="email_inline" type="email" onChange={(e) => setEmail(e.target.value)} className="validate" />
                        <label htmlFor="email_inline">Email</label>
                        <span className="helper-text" data-error="wrong" data-success="right">We will not share your email with anyone!</span>
                    </div>
                    <div className="input-field">
                        <i className="material-icons prefix">vpn_key</i>
                        <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} className="validate" />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button className="btn waves-effect waves-light" type="submit" >submit</button>
                </form>
            </div>
        </section>
    )
}
