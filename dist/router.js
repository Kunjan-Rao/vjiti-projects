"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const add_product_1 = require("./controller/add.product");
const get_product_1 = require("./controller/get.product");
const register_user_1 = require("./controller/register.user");
const get_users_1 = require("./controller/get.users");
const login_user_1 = require("./controller/login.user");
const admin_login_1 = require("./controller/admin.login");
const add_admin_1 = require("./controller/add.admin");
const userauth_1 = require("./middalware/userauth");
const adminauth_1 = require("./middalware/adminauth");
class Router {
    route(app) {
        //Routing of users
        app.post('/user/register', register_user_1.default);
        app.post('/user/login', login_user_1.default);
        app.get('/product', userauth_1.default, get_product_1.default);
        app.get('/product/:limit', userauth_1.default, get_product_1.default);
        //routing of admin
        app.post('/admin/admin-login', admin_login_1.default);
        app.get('/users', get_users_1.default);
        //routing of supr admin
        app.post('/super_admin/register', add_admin_1.default);
        //this is admin routes :for add-products in api
        app.post('/admin/add-product', adminauth_1.default, add_product_1.default);
        app.get('*', (req, res) => {
            res.status(404).send('404..page not found');
        });
        // app.patch('/product/update-product')    
    }
}
exports.Router = Router;
