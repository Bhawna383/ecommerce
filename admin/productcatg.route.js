const express = require("express");
const productcatgRoute=express.Router();
var ProductCatg = require("./productcatg.model");//databse collection name ProductCatg

productcatgRoute.route("/addproductcatg/:pcatgid/:pcatgname").post((req,res)=>{
    var productcatg = new ProductCatg({pcatgid:req.params.pcatgid, pcatgname:req.params.pcatgname});//new object bnaya jisme pcatg id or name aaega 

    productcatg.save().then(productcatg=>{//jo b nya docment bna hai use save krna hai 
        res.send("product category added succesfully");
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
});

// show all product category

productcatgRoute.route("/showproductcatg").get((req,res)=>{
    ProductCatg.find().then(productcatg=>{
        res.send(productcatg);
        res.end();
    }).catch((err)=>{
        res.send(err);
    })
});

module.exports=productcatgRoute;