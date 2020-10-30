import mongoose from "mongoose"

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    mediaUrl: {
        type: String,
        required: true,
        default: '/images/hp.jpg'
    },
    category: {
        type: String,
        required: true,
        enum: ["Women's fasion", "Men's fasion", "Electronics", "Footwear", "Eyewear", "Smartphones", "Laptops", "Accessoires", "Others"]
    }
}, { timestamps: true })

export default mongoose.models.product || mongoose.model('product', productsSchema)