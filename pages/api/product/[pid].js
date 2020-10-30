import Product from '../../../models/Product'
import initDB from '../../../helpers/db';

initDB()

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getProduct(req, res)
            break;
        case "DELETE":
            await deleteProduct(req, res)
            break;
        default:
            break;
    }
}

const getProduct = async (req, res) => {
    const { pid } = req.query
    const product = await Product.findOne({ _id: pid })
    res.json(product)
}
const deleteProduct = async (req, res) => {
    const { pid } = req.query
    await Product.findOneAndDelete({ _id: pid })
    res.json({ message: 'Blog deleted successfully!' })
}

