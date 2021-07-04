import React from 'react'
import Image from 'next/image'

export default function Category({ products, cat }) {
    return (
        <>
            <div className="products">
                {products.map(catProd => {
                    if (catProd.category == cat) {
                        return (
                            <div className="card">
                                <div className="card-image">
                                    <Image src={catProd.mediaUrl} width={200} height={250} alt="category-img" />
                                    <span className="card-title">{catProd.name}</span>
                                    <a className="btn-floating halfway-fab waves-effect waves-light #f50057 pink accent-3"><i className="flaticon-bag"></i></a>
                                </div>
                                <div className="card-content">
                                    <p>₹ {catProd.price}</p>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        </>
    )
}
