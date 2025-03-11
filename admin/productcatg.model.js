var mongoose = require("mongoose");
const Schema=mongoose.Schema;
var ProductCatg = new Schema ({
    pcatgid:{type:Number},
    pcatgname:{type:String}
},
{
    collection:'productcatg'
}
);
module.exports=mongoose.model('ProductCatg',ProductCatg);
            //use to create model //name of the model,schema definition
            //this line export a mongoose model 