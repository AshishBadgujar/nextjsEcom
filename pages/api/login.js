import initDB from '../../helpers/db'
import User from '../../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

initDB()

export default async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.json({ err: 'please add all the fields !' })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ err: "user don't exist with that email !" })
        }
        const domatch = await bcrypt.compare(password, user.password)
        if (domatch) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
                expiresIn: '7d'
            })
            const { name, role, email } = user
            res.json({ token, user: { name, role, email } })
        } else {
            return res.json({ err: "email or password incorrect !, Please try again " })
        }
    } catch (err) {

        return res.json({ err: "email or password incorrect !, Please try again " })
    }
}