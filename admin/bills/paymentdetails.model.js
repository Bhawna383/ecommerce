const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var PaymentDetails= new Schema({
    oerderCreationId:{type:String},
    razorpayPaymentId:{type:String},
    razaorpayOrderId:{type:String},
    razorpaySignature:{type:String},
    cid:{type:Number},
    billid:{type:Number},
    amount:{type:Number}

},{
   collection:"PaymentDetails"
}
);
module.exports=mongoose.model("PaymentDetails",PaymentDetails);