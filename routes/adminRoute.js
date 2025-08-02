const express=require("express");
const admin_route=express();
const session=require("express-session")
const adminController=require("../controllers/adminController");
const config=require("../configurarions/config")

admin_route.use(session({secret:config.sessionSecret}))
const auth=require('../middleware/auth')

const bodyParser=require("body-parser");
admin_route.use(bodyParser.json());
admin_route.use(bodyParser.urlencoded({extended:true}))

admin_route.set('view engine','ejs');
admin_route.set('views','./views/admin');



admin_route.get('/',adminController.loadLogin);
//admin_route.get('/admin/login',adminController.loadLogin);
admin_route.get('*',function (req,res) {
    res.redirect('/admin')
})

admin_route.post('/',adminController.verifyLogin);

admin_route.get('/dashboard',adminController.loadDash);

module.exports=admin_route;