const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const PORT = 9191;
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./DB.js");
const productcatgRoute=require("./admin/productcatg.route.js");
const cityRoute=require("./admin/city.route.js");
const stateRoute=require("./admin/state.route.js");
const vendorRoute=require("./vendor/vendor.route.js");
const customerRoute = require("./customer/customer.route.js");
const productRoute=require("./product/product.route.js");
const emailRoute=require("./emailmgt.js");
const billRoute=require("./admin/bills/bill.route.js");
const paymentDetailsRoute = require("./admin/bills/paymentdetails.route.js");
const paymentRoute=require("./payment.js");
const emailactivationRoute = require("./emailactivation.js");
//middleware
 
app.use(cors()); 
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use("/productcatg",productcatgRoute);
app.use("/city",cityRoute);//route name of path 
app.use("/state",stateRoute);
app.use("/vendor",vendorRoute);
app.use("/customer",customerRoute);
app.use("/product",productRoute);
app.use("/email",emailRoute);
app.use("/bill",billRoute);
app.use("/paymentdetails",paymentDetailsRoute);
app.use("/payment",paymentRoute);
app.use("/emailactivation",emailactivationRoute);
mongoose.connect(config.URL,{useNewUrlParser:true}).then(
    ()=>{console.log("database is connected"+config.URL)},
    err=>{  
        console.log("cant not connected datbase"+err);
    }
);
app.listen(PORT,()=>{
    console.log("server is running on port"+PORT);
});