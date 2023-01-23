import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const createUser = async (req, res) =>{
     console.log('SingUp')
   try {
        // get the user from req param :
        const data  = req.body  
        // check if the user doesn't exist by the unique email:
        const existedUser = await User.findOne({email : data.email})
        if( existedUser ) return  res.status(404).json({message : "user exist in the data base  ! "})
        //check if the password is well confirmed : 
        const isConfirmed  = data.password === data.confirmPassword
        if(!isConfirmed) return  res.status(404).json({message : 'the password and the confirm pass have to be identic ! '})
        // hash the pass word 
        const hashedPass = await bcrypt.hash(data.password, 12)
        // save the user
        const newUser = await User.create({
                                        name : `${data.firstName} ${data.firstName}`, 
                                        email : data.email, 
                                        password : hashedPass
                                }) 
        const token = jwt.sign({email : newUser.email, id : newUser._id}, 'SECRET')
        // return the userData + token {profile : userData, token : jwtToken } 
        return res.status(200).json({profile : newUser, token})
   } catch (error) {
        console.log(error)
   }
}

export const login = async (req, res) =>{
     console.log('SingIn')
    try {
         // get the user from req param :
         const {email, password}  = req.body  
         // check if the user exist by the unique email:
         const existedUser = await User.findOne({email})
         if( !existedUser ) return  res.status(404).json({message : "user doesn't exist in the data base  ! "})
         //check if the password is well confirmed : 
         const isConfirmed  = bcrypt.compare(password, existedUser.password)
         if(!isConfirmed) return  res.status(404).json({message : 'the password incorrect ! '})
         const token = jwt.sign({email , id : existedUser._id}, 'SECRET')
         // return the userData + token {profile : userData, token : jwtToken } 
         return res.status(200).json({profile : existedUser, token})
    } catch (error) {
         console.log(error)
    }
 }