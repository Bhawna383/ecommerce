//this file is used to define schema structure of database
var mongoose = require("mongoose");//used to connect express  application to mongodb ,it provides schema named clAass to define table structure
// const { search } = require("./productcatg.route");
const Schema = mongoose.Schema;
var State = new Schema({
    stid:{type:Number},
    stname:{type:String},
    status:{type:Number}
},{
    collection:'state'//collection means table ,it will create state named collection or tbale in mongodb database
});
module.exports=mongoose.model("State",State);
