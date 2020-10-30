import React, { useState } from 'react'
import baseUrl from '../helpers/baseUrl'
import Axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await Axios.post(`${baseUrl}/api/signup`, {
            name,
            email,
            password,
        })
        const res2 = res.data
        if (res2.message) {
            M.toast({ html: res2.message, classes: "green" });
            router.push('/login')
        }
        if (res2.err) {
            M.toast({ html: res2.err, classes: "red" });
        }
    }
    return (
        <section className="login_box_area z-depth-3">
            <div className="login_box_img">
                <div className="hover">
                    <h4>Already member?</h4>
                    <p>There are advances being made in science and technology everyday, and a good example of this
                    is the</p>
                    <Link href="/login"><a className="btn waves-effect waves-light">Login here</a></Link>
                </div>
            </div>
            <div className="login_form_inner">
                <h4>Create Your Account </h4>
                <form action="" onSubmit={(e) => handleSubmit(e)}>
                    <div className="input-field">
                        <i className="material-icons prefix">person</i>
                        <input id="first_name" type="text" onChange={(e) => setName(e.target.value)} className="validate" />
                        <label htmlFor="first_name">Name</label>
                    </div>
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


