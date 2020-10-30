import initDB from '../../helpers/db'
import User from '../../models/User'
import bcrypt from 'bcryptjs'
import Cart from '../../models/Cart'

initDB()

export default async(req,res)=>{
    const {name,email,password}=req.body
    try{
        if(!name || !email || !password){
           return res.json({err:'please add all the fields !'})
        }
        const user=await User.findOne({email})
        if(user){
            return res.json({err:'user already exist with login !'})
        }
        const hashedPassword =await bcrypt.hash(password,12)
        const newUser=await new User({
            name,
            email,
            password:hashedPassword
        }).save()
        await new Cart({user:newUser._id}).save()
   
        res.json({message:'signup successfully !'})
    }catch(err){
        console.log(err)
    }
}