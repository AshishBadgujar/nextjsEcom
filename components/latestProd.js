import React from 'react'
import Link from 'next/link'
import AliceCarousel from 'react-alice-carousel';
import Image from 'next/image'

export default function LatestProd({ products }) {

    const items = products.slice(0, 5).map(product => {
        return (
            <div className="card" key={product._id}>
                <div className="card-image">
                    <Image src={product.mediaUrl} width={250} height={300} alt="latest-prod" />
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
    })

    return (
        <>
            <section className="top-letest-product-section">
                <div className="section-title">
                    <h2>LATEST PRODUCTS</h2>
                </div>

                <AliceCarousel
                    mouseTracking={true}
                    items={items}
                    autoWidth={true}
                    // autoHeight={true}
                    autoPlay={true}
                    autoPlayInterval={1000}
                    infinite={true}
                    responsive={3}
                    disableButtonsControls={true}
                />
            </section>
        </>
    )
}
