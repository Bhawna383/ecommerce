const express = require("express");
const vendorRoute=express.Router();
const bodyparser = require("body-parser");// used to read data from body to request page
const Vendor = require("./vednor.model");
var fs = require("fs");
const multer = require("multer");

//vendor registration code 


vendorRoute.route("/register").post((req,res)=>{
    var vendor = new Vendor(req.body);
    vendor.save().then(vendor=>{
        if(vendor!=null){
            res.send("registraion succesfully");

        }else{
            res.send("resgistration failed");
        }

    }).catch((err)=>{
        res.status(400).send("registraion failed");
    })
});

//login 

vendorRoute.route("/login").post((req,res)=>{
    var id = req.body.vuid;
    var pass = req.body.vupass;
    console.log("userid="+id+"password"+pass);
    Vendor.findOne({$and:[{"VUserId":id},{"VUserPass":pass}]}).then(vendor=>{
        res.send(vendor);
        res.end();

    }).catch((err)=>{
        res.send("something went wrong");
        res.end();
    })
});

//get image

vendorRoute.route("/getimage/:vpicname").get((req,res)=>{
    res.sendFile("C:/Users/hp/Desktop/ProjectE/backend/server-app/vendor/vendorimages/"+req.params.vpicname);
});

//image save
const st = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,"C:/Users/hp/Desktop/ProjectE/backend/server-app/vendor/vendorimages/");
    },
    filename:(req, file, cb)=>{
        cb(null, file.originalname)
    },
})
const upload = multer({storage:st});

vendorRoute.post("/savevendorimage",upload.single('file'),(req,res)=>{
    res.json({})
});

//get vendor for count

vendorRoute.route("/getvendorcount").get((req,res)=>{
    Vendor.find().then(vendor=>{
        res.send(vendor);
        res.end();
    }).catch(err=>{
        res.send("somthing went wrong");
        res.end();
    })
});

//enable disable vendor by admin
vendorRoute.route("/vendormanage/:vid/:status").put((req,res)=>{
    Vendor.updateOne({"Vid":req.params.vid},{"Status":req.params.status}).then(vendor=>{
        res.send("vendor status updated succesfully");
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    })
})
module.exports=vendorRoute;