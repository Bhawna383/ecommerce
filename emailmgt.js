// execute npm i nodemailer in cmd

const nodemailer = require("nodemailer");
const express = require("express");
const emailrouter= express.Router();
emailrouter.post("/sendemails/:mailto",async(req,res)=>{
try{
    console.log("mail fun called");
    res.status(200).json({response:"Mail Sent"});
    const transporter= nodemailer.createTransport({
        service:"gmail",
        port:465,
        secure:true,
        auth:{
            user:"bsmernwala@gmail.com",
            pass :"necc umnw wnpi bmzy",
        },
    });
    console.log(req.params.mailto);
    const mailOptions ={
        from:"bsmernwala@gmail.com",
        to:req.params.mailto,
        subject:"Registration success",
        text:"Your registration is successfully done ,wait for admin side activation"
    };
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.error("error sending email:",error);
        }else{
            console.log("Email sent:",info.response);
        }
    });

}
catch(error){
    res.status(500).json({error});
}
});
module.exports=emailrouter;