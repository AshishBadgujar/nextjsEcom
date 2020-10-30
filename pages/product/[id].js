import React, { useState } from 'react'
import Axios from 'axios'
import { useRouter } from 'next/router'
import baseUrl from '../../helpers/baseUrl'
import { useRef, useEffect } from 'react'
import { parseCookies } from 'nookies'
import cookie2 from 'js-cookie'

const Product = ({ productData }) => {
  const [quantity, setQuantity] = useState(1)
  const router = useRouter()
  const modalRef = useRef(null)
  const cookie = parseCookies()
  const user = cookie.user ? JSON.parse(cookie.user) : ""
  console.log(user)
  useEffect(() => {
    M.Modal.init(modalRef.current)
  }, [])
  if (router.isFallback) {
    return (
      <div className="spinner center-align">
        <div className="preloader-wrapper active">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div><div className="gap-patch">
              <div className="circle"></div>
            </div><div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const getmodal = () => {
    return (
      <div id="modal1" className="modal" ref={modalRef}>
        <div className="modal-content">
          <h4>{productData.name}</h4>
          <p>You really want to delete</p>
        </div>
        <div className="modal-footer">
          <button className="btn modal-close waves-effect waves-green">Cancel</button>
          <button className="btn modal-close waves-effect waves-light #c62828 red darken-3" onClick={() => deleteProduct()}>Yes</button>
        </div>
      </div>
    )
  }
  const deleteProduct = async () => {
    await Axios.delete(`${baseUrl}/api/product/${productData._id}`)
      .then(res => {
        M.toast({ html: res.data.message, classes: "green" })
        router.push('/')
      })
      .catch(err => {
        console.log(err)
      })
  }

  const addToCart = async () => {
    const res = await Axios.put(`${baseUrl}/api/cart`, {
      headers: {
        "Authorization": cookie.token
      },
      data: {
        quantity,
        productId: productData._id
      }
    })
    const res2 = res.data
    console.log(res2)
    if (res2.err) {
      M.toast({ html: res2.err, classes: "red" })
      cookie2.remove('user')
      cookie2.remove('token')
      router.push('/login')
    }
    if (res2.message) {
      M.toast({ html: res2.message, classes: "green" })
    }
  }

  return (
    <>
      <div className="container center-align" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <h3>{productData.name}</h3>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', marginTop: '40px' }}>
          <div>
            <img src={productData.mediaUrl} style={{ width: "300px", height: '300px' }} />
          </div>
          <div>
            <p className="left-align">{productData.desc}</p>
            <h5>Rs.{productData.price}</h5>
            <div className="input-field qty" style={{ display: 'flex' }}>
              <input type="number"
                id="qty"
                value={quantity}
                name="qty"
                placeholder="Quantity"
                onChange={(e) => setQuantity(Number(e.target.value))} />
              {user ?
                <button className="btn waves-effect waves-light"
                  onClick={() => addToCart()}>
                  <i className="material-icons">add</i>
                </button>
                :
                <button className="btn waves-effect waves-light"
                  onClick={() => router.push('/login')}>
                  Login to<i className="material-icons">add</i>
                </button>
              }
            </div>
            {user.role == 'admin' && user.role == 'root' &&
              <button data-target="modal1" className="btn modal-trigger waves-effect waves-light #c62828 red darken-3">Delete
              <i className="material-icons left">delete</i>
              </button>
            }
          </div>
        </div>
        {getmodal()}
      </div>
    </>
  )
}

// export async function getServerSideProps({ params: { id } }) {
//   const res = await Axios.get(`${baseUrl}/api/product/${id}`)
//   const productData = res.data
//   return {
//     props: { productData }
//   }
// }
export async function getStaticProps({ params: { id } }) {
  const res = await Axios.get(`${baseUrl}/api/product/${id}`)
  const productData = res.data
  return {
    props: { productData }
  }
}
export async function getStaticPaths() {
  return {
    paths: [], fallback: true
  }
}

export default Product