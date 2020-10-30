import User from '../../models/User'
import jwt from 'jsonwebtoken'
import initDB from '../../helpers/db'

initDB()


export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await fetchUsers(req, res)
            break;
        case "PUT":
            await changeRole(req, res)
            break;

        default:
            break;
    }
}

const fetchUsers = async (req, res) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.json({ err: "authorizaion error login again !" })
    }
    try {
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET)
        const users = await User.find({ _id: { $ne: userId } }).select('-password')
        res.json(users)
    } catch (error) {
        return res.json({ err: "you must logged in !" })
    }
}

const changeRole = async (req, res) => {
    const { Authorization } = req.body.headers
    const { _id, role } = req.body.data
    const newRole = role == "user" ? "admin" : "user"
    if (!Authorization) {
        return res.json({ err: "authorizaion error login again !" })
    }
    try {
        const { userId } = jwt.verify(Authorization, process.env.JWT_SECRET)
        const users = await User.findOneAndUpdate(
            { _id },
            { role: newRole },
            { new: true }
        ).select('-password')
        res.json(users)
    } catch (error) {
        return res.json({ err: "you must logged in !" })
    }
}

