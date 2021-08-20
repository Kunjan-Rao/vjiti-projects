import { Application ,Request,Response} from "express";
import add_product_router from './controller/add.product'
import product from "./controller/get.product";
import register from  "./controller/register.user"
import getUser from  './controller/get.users'
import loginUser from "./controller/login.user";
import adminLogin from './controller/admin.login'
import addAdmin from "./controller/add.admin";
import userauth from "./middalware/userauth";
import adminauth from './middalware/adminauth'


export class  Router{
    public route(app:Application){
        //Routing of users
        app.post('/user/register',register)
        app.post('/user/login',loginUser)
        app.get('/product',userauth,product)
        app.get('/product/:limit',userauth,product)
        //routing of admin
        app.post('/admin/admin-login',adminLogin)
        app.get('/users',getUser)

        //routing of supr admin

        app.post('/super_admin/register',addAdmin)
        //this is admin routes :for add-products in api
        app.post('/admin/add-product',adminauth,add_product_router)
        app.get('*',(req:Request,res:Response)=>{
            res.status(404).send('404..page not found')
        })
        
        
        // app.patch('/product/update-product')    
    }
}