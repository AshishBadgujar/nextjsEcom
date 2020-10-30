import initDB from "../../helpers/db"
import Product from "../../models/Product"


initDB()

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getAllProducts(req, res)
            break;
        case "POST":
            await saveProduct(req, res)
            break;

        default:
            break;
    }
}

const getAllProducts = async (req, res) => {
    const products = await Product.find().sort({ timestamp: -1 })
    res.json(products)
}

const saveProduct = async (req, res) => {
    const { name, price, mediaUrl, desc, category } = req.body
    if (!name || !price || !desc || !mediaUrl || !category) {
        return res.json({ err: 'please add all fields !' })
    }
    const product = await new Product({
        name,
        price,
        desc,
        mediaUrl,
        category
    }).save()
    res.json(product)
}
