import React, { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import { useRouter } from 'next/router'
import baseUrl from '../helpers/baseUrl'
import { parseCookies } from 'nookies'

export default function Create() {
    const router = useRouter()
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [media, setMedia] = useState("")
    const [desc, setDesc] = useState("")
    const [category, setCategory] = useState('')
    const dropRef = useRef(null)

    useEffect(() => {
        M.FormSelect.init(dropRef.current);
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        const mediaUrl = await imageUpload()
        const res = await Axios.post(`${baseUrl}/api/products`, {
            name,
            price,
            mediaUrl,
            desc,
            category,
        })
        const res2 = res.data
        if (res2.err) {
            M.toast({ html: res2.err, classes: "red" });
        } else {
            M.toast({ html: `Your product is submitted !`, classes: "green" });
            router.push('/')
        }
    }

    const imageUpload = async () => {
        const data = new FormData()
        data.append('file', media)
        data.append('upload_preset', 'myStore')
        data.append('cloud_name', "ashish124")
        const res = await fetch('https://api.cloudinary.com/v1_1/ashish124/image/upload', {
            method: "POST",
            body: data
        })
        const res2 = await res.json()
        return res2.url
    }


    return (
        <>
            <div className="page-top-info">
                <div className="container">
                    <h4>Sell your Product</h4>
                    <div className="site-pagination">
                        <a href="">Home</a> /
				        <a href="">Shop</a> /
			        </div>
                </div>
            </div>
            <section className="creat_box_area z-depth-3">
                <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">

                    <div className="input-field">
                        <i className="material-icons prefix">business_center</i>
                        <input type="text" name="name" className="validate" id="name"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }}
                        />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="input-field dropdown">
                        <i className="material-icons prefix">devices_other</i>
                        <select ref={dropRef} onChange={(e) => setCategory(e.target.value)}>
                            <option value="" disabled selected>Category</option>
                            <option value="Women's fasion">Women's fasion</option>
                            <option value="Men's fasion">Men's fasion</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Footwear">Footwear</option>
                            <option value="Eyewear">Eyewear</option>
                            <option value="Smartphones">Smartphones</option>
                            <option value="Laptops">Laptops</option>
                            <option value="Accessoires">Accessoires</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                    <div className="input-field">
                        <i className="material-icons prefix">attach_money</i>
                        <input type="text" name="price" className="validate" id="price"
                            value={price}
                            onChange={(e) => { setPrice(e.target.value) }}
                        />
                        <label htmlFor="price">Price</label>
                    </div>
                    <div className="file-field input-field">
                        <div className="btn">
                            <span>Browse</span>
                            <input type="file"
                                accept="image/*"
                                onChange={(e) => setMedia(e.target.files[0])} />
                        </div>
                        <div className="file-path-wrapper input-field">
                            <input className="file-path validate" type="text" id="file" placeholder="File" />
                        </div>
                    </div>
                    <img src={media ? URL.createObjectURL(media) : ""} className="responsive-img" />
                    <div className="input-field">
                        <i className="material-icons prefix">create</i>
                        <textarea name="desc" className="materialize-textarea validate" id="desc"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        /> <label htmlFor="desc">Description</label>
                    </div>
                    <button className="btn waves-effect waves-light" type="submit">Submit
            <i className="material-icons right">send</i>
                    </button>
                </form>
            </section>
        </>
    )
}


export async function getServerSideProps(ctx) {
    const cookie = parseCookies(ctx)
    const user = cookie.user ? JSON.parse(cookie.user) : ""
    if (user.role == 'user' || user.role == '') {
        const { res } = ctx
        res.writeHead(302, { Location: '/' })
        res.end()
    }
    return {
        props: {}
    }
}