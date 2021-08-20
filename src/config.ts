import * as bodyParser from 'body-parser';
import * as express from 'express'
import { Router } from './router';
import * as dotenv from 'dotenv'
dotenv.config()
import './db/db'
class App{
    public app:express.Application
    private router:Router=new Router()
  
    constructor(){
         
        this.app=express();
        this.config();
        this.router.route(this.app)
   }
   private config():void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
   } 
}
export default new App().app;
