import React, { useState } from 'react'
import Axios from "axios"
import baseUrl from '../helpers/baseUrl'
import Category from '../components/category'

export default function Categories({ products }) {
    const [cat, setCat] = useState("")
    const categorySet = (category) => {
        setCat(category)
    }
    return (
        <>
            <div className="page-top-info">
                <div className="container">
                    <h4>CAtegory PAge</h4>
                    <div className="site-pagination">
                        <a href="">Home</a> /
				        <a href="">Shop</a> /
			        </div>
                </div>
            </div>
            <section className="category-section">
                <div className="filter-widget">
                    <h2 className="fw-title">Categories</h2>
                    <ul className="category-menu">
                        <li><a onClick={() => categorySet("Women's fasion")}>Woman's fasion</a></li>
                        <li><a onClick={() => categorySet("Men's fasion")}>Men's fasion</a></li>
                        <li><a onClick={() => categorySet("Electronics")}>Electronics</a></li>
                        <li><a onClick={() => categorySet("Smartphones")}>Smartphones</a></li>
                        <li><a onClick={() => categorySet("Laptops")}>Laptops</a></li>
                        <li><a onClick={() => categorySet("Accessories")}>Accessories</a></li>
                        <li><a onClick={() => categorySet("Eyewear")}>Eyewear</a></li>
                        <li><a onClick={() => categorySet("Footwear")}>Footwear</a></li>
                    </ul>
                </div>
                <Category products={products} cat={cat} />
            </section>
        </>
    )
}

export async function getStaticProps() {
    const res = await Axios.get(`${baseUrl}/api/products`)
    const products = res.data
    return {
        props: {
            products,
        }
    }
}
// export async function getServerSideProps() {
//     const res = await Axios.get(`${baseUrl}/api/products`)
//     const products = res.data
//     return {
//         props: {
//             products,
//         }
//     }
// }