import React from 'react'
import Link from 'next/link';
import Image from 'next/image'


export default function TopSellProd({ products }) {
    return (
        <>
            <section className="product-filter-section">
                <div className="section-title">
                    <h2>BROWSE TOP SELLING PRODUCTS</h2>
                </div>
                <ul className="product-filter-menu">
                    <li><a>Women's fasion</a></li>
                    <li><a>Men's fasion</a></li>
                    <li><a>Electronics</a></li>
                    <li><a>Footwear</a></li>
                    <li><a>Eyewear</a></li>
                    <li><a>Smartphones</a></li>
                    <li><a>Laptops</a></li>
                    <li><a>Accessories</a></li>
                    <li><a>Others</a></li>
                </ul>
                <div className="products">
                    {products.map(product => {
                        return (
                            <div className="card">
                                <div className="card-image">
                                    <Image src={product.mediaUrl} width={235} height={275} alt="topsell" />
                                    <span className="card-title">{product.name}</span>
                                    <Link href="/product/[id]" as={`/product/${product._id}`}>
                                        <a className="btn-floating halfway-fab waves-effect waves-light #f50057 pink accent-3"><i className="flaticon-bag"></i></a>
                                    </Link>
                                </div>
                                <div className="card-content">
                                    <p>₹ {product.price}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
        </>
    )
}
