import react from 'react'
import Carousel from "../components/carousel"
import Axios from "axios"
import baseUrl from '../helpers/baseUrl'
import Services from '../components/services'
import LatestProd from '../components/latestProd'
import TopSellProd from '../components/topSellProd'
import Sale from '../components/sale'

function HomePage({ products }) {
    return (
        <>
            <Carousel />
            <Services />
            <LatestProd products={products} />
            <TopSellProd products={products} />
            <Sale />
        </>
    )
}

export async function getServerSideProps() {
    const res = await Axios.get(`${baseUrl}/api/products`)
    const products = res.data
    return {
        props: {
            products,
        }
    }
}


export default HomePage





