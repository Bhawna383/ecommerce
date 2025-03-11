
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Customer=new Schema({
    Cuserid:{type:String},
    Cuserpass:{type:String},
    CustomerName:{type:String},
    Stid:{type:Number},
    Ctid:{type:Number},
    Caddres:{type:String},
    Ccontact:{type:Number},
    Cemail:{type:String},
    CpicName:{type:String},
    Cid:{type:Number},
    Status:{type:String},
},{
    collection:'Customer'
}
);
module.exports=mongoose.model("Customer",Customer);


























