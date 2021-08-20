import { Request,Response,NextFunction } from "express"
import * as jwt from 'jsonwebtoken';
import adminModal from "../modals/adminModal";
export default async(req:Request,res:Response,next:NextFunction)=>{
    try{
        let barearToken=req.headers['authorization']
        let token=barearToken.split(' ')[1]
        console.log(token)
        let isAdmin=await jwt.verify(token,process.env.JWT_KEY)
        if(isAdmin){
            let admin=await adminModal.findOne({token})
            if(typeof admin != undefined){
                next()
            }else{
                res.status(400).send({error:'Admin not found'})
            }
            
            
        }else{
            res.status(400).send({error:'admin token is incorrect'})
        }
    }catch(err){
        res.send({error:'Only admin Can access this api.....'})
    }

}