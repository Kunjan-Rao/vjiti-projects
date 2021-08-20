import { Request,Response } from "express";
import { Password } from "../common/setPassword";
import adminModal from "../modals/adminModal";

export default async(req:Request,res:Response)=>{
    try{
        let {username,password}=req.body
        let setPassword=new Password(password)
            password=await setPassword.getPassword()
        let admin:any=new adminModal({
            username,password
        })
        let token=await admin.genrateToken()

        await admin.save()
        res.status(200).send({ok:'admin registered succesfully',
    token})
       

    }catch(err){
      res.status(400).send('Somthing went to wrong with admin')
    }
}
