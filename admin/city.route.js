const express = require("express");
const cityRoute=express.Router();
var City = require("./city.model.js");


//save city
cityRoute.route("/save").post((req,res)=>{
    var city = new City(req.body);
    city.save().then(city=>{
        res.send("city saved");
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
});

//seacrh city 
cityRoute.route("/search/:ctid").get((req,res)=>{
    City.findOne({"ctid":req.params.ctid}).then(city=>{
        res.send(city);
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
});


//update city
cityRoute.route("/update").put((req,res)=>{
    City.updateOne({"ctid":req.body.ctid},{"ctid":req.body.ctid,"ctname":req.body.ctname,"stid":req.body.stid,"status":req.body.statue}).then(city=>{
        res.send("city updated scucesfully");
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
});


//delete enable or disbale
cityRoute.route("/delete/:ctid").delete((req,res)=>{
    City.updateOne({"ctid":req.params.ctid},{"status":0}).then(city=>{
        res.send("city disabled succesfully");
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
});


//show all cities
cityRoute.route("/show").get((req,res)=>{
    City.find({"status":1})
    .then(city=>{
        res.send(city);
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });

});

//show all citiwes by state
cityRoute.route("/showcitybystate/:stid").get((req,res)=>{
    City.find({$and:[{"status":1},{"stid":req.params.stid}]}).then(city=>{
        res.send(city);
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
});

//show all
cityRoute.route("/getall").get((req,res)=>{
    City.find().then(city=>{
        res.send(city);
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();

    });
});

//seacrh state by name to avoid duplicates entery

cityRoute.route("/searchbyname/:ctname").get((req,res)=>{
    City.findOne({"ctname":req.params.ctname}).then(city=>{
        res.send(city);
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
});

module.exports=cityRoute;