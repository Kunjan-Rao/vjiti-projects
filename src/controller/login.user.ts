import {Request,Response} from 'express'
import usermodal from '../modals/userModal'
import * as bcrypt from 'bcryptjs'
export default  async(req:Request,res:Response)=>{
    try{
    let {email,password}=req.body
    let user=await usermodal.findOne({email})
     if(user){
         let isValid=await bcrypt.compare(password,user.password)
         if(isValid){
             let token=await user.genrateToken()

             res.status(200).send({success:'Login Successfully ... now you can access our api',token})
         }else{
             res.status(400).send('password incorrect... please enter correct password')
         }
    
     }
     else{
         res.status(400).send('incorret email..please enter valid email address')
     }
    }catch(err){
     console.log({error:"email and password are incorrect"})
    }

}
