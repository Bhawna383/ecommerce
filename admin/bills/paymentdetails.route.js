const express = require("express");
const paymentDetailsRoute = express.Router();
let PaymentDetails = require("./paymentdetails.model");

//save payment details
paymentDetailsRoute.route("/paymentdetailsave").post((req,res)=>{
    var paymentdetails = new PaymentDetails(req.body);
    paymentdetails.save().then(paymentdetails=>{
    res.send("payment details saved succesfully");
    res.end();
}).catch((err)=>{
    res.send(err);
})
});

//get payment details
paymentDetailsRoute.route("/showpaymentdetails").get((req,res)=>{
    PaymentDetails.find().then(pd=>{
        res.send(pd);
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
});

//get paymentdetails by bill id
paymentDetailsRoute.route("/showpaymentdetailsbybid/:billid").get((req,res)=>{
    PaymentDetails.findOne({"billid":req.params.billid}).then((pd)=>{
        res.send(pd);
        res.end();

    }).catch((err)=>{
        res.send(err);
        res.end();
    })
});

module.exports=paymentDetailsRoute;