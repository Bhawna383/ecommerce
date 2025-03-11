const express=require("express");
const customerRoute=express.Router();
const bodyparser = require("body-parser");
const fs = require("fs");
const multer= require("multer");
const nodemailer =require("nodemailer");
const Customer = require("./customer.model");

function sendGMail(mailto){
    console.log("mail:"+mailto);
    res.status(200).json({response:"mail sent "});

    const transporter = nodemailer.createTransport({
        service:"gmail",
        port:465,
        secure:true,
        auth:{
            user:"bsmernwala@gmail.com",
            pass:"necc umnw wnpi bmzy",
        }
        });

        //console.log(req.body.email);
        const mailOption={
            from:"bsmernwala@gmail.com",
            to:mailto,
            subject:"Resgistraion Success",
            text:"Dear Customer ,your Registration is succesfully done but it is under admin review after admin confirmaton you can login",
        };
        transporter.sendMail(mailOption,(error,info)=>{
            if(error){
                console.error("Error sending email:",error);

            }else{
                console.log("Email sent:",info.response);
            }
        });

}

//customer registraion code
customerRoute.route("/register").post((req,res)=>{
    var customer=new Customer(req.body);
    customer.save().then(customer=>{
        if(customer!=null){
            //sendGMail(req.body.Cemail);
            res.send("Registration Succesfully");
            res.end();
 
        }else{
            res.send("Registraion failed");
            res.end();
        }
    })
});
//Login
customerRoute.route("/login").post((req,res)=>{
    var id=req.body.Cuserid;
    var pass = req.body.Cuserpass;
    Customer.findOne({$and:[{"Cuserid":id},{"Cuserpass":pass}]}).then(customer=>{
        res.send(customer);
        res.end();
    }).catch(err=>{
        res.send("somthing went wrong");
        res.end();
    })
})

// get iamge route
customerRoute.route("/getimage/:cpicname").get((req,res)=>{
    console.log("picname="+req.params.cpicname)
    res.sendFile("C:/Users/hp/Desktop/ProjectE/backend/server-app/customer/customerimages/"+req.params.cpicname)
});

//image save
const st = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, "C:/Users/hp/Desktop/ProjectE/backend/server-app/customer/customerimages/");
    },
    filename:(req,file,cb)=>{
        cb(null, file.originalname);
    },
})
const upload = multer({storage:st});
customerRoute.post("/savecustomerimage", upload.single('file'),(req,res)=>{
    res.json({});
});

//get customer for count
customerRoute.route("/getcustomercount").get((req,res)=>{
    Customer.find().then(customer=>{
        res.send(customer);
        res.end();
    }).catch((err)=>{
        res.send("something went wrong");
        res.end();
    })
});

//get customer details by id
customerRoute.route("/getcustomerdetails/:cid").get((req,res)=>{
    var id = req.params.cid;
    Customer.findOne({"Cid":id}).then(customer=>{
        console.log(customer);
        res.send(customer);
        res.end();
    }).catch((err)=>{
        res.send("something went wrong");
        res.end();
    })
});

//get customer List
customerRoute.route("/getcustomerlist").get((req,res)=>{
    var id = req.params.cid;
    Customer.find().then(customer=>{
        res.send(customer);
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    })
});

//enable disable vender by admin
customerRoute.route("/customermanage/:cid/:status").put((req,res)=>{
   Customer.updateOne({"Cid":req.params.cid},{"Status":req.params.status}).then(vendor=>{
    res.send("Customer status updated succesfully");
    res.end();
   }).catch((err)=>{
    res.send(err);
    res.end();
   })
});

module.exports=customerRoute;