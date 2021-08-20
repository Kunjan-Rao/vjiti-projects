import { Request,Response,NextFunction } from "express";
import * as jwt from 'jsonwebtoken'
import usermodal from "../modals/userModal";

export default async(req:Request,res:Response,next:NextFunction)=>{
    try{
       const barearHeader=req.headers['authorization']
        
       if(barearHeader !== undefined){
           const barearToken=barearHeader.split(' ')[1]
       
         let isVarified=await jwt.verify(barearToken,process.env.JWT_KEY)
           
            if(isVarified){
                let user=await usermodal.findOne({token:barearToken})
                if(typeof user != undefined){
                next()
                }else{
                    res.status(400).send({error:'User not found'})
                }
                
            }
            else{

                res.status(400).send({error:'incorrect token please provide valid token'});
                return;
            }
        
       }else{
           res.status(404).send({token:'Token Must  be provided'})
       }

    }catch(err){
       res.status(400).send({error:'Please login or signup. you have not authorized'})
    }

}