//this file is used to define operation like insert update delete search show etc

const express = require("express");
const stateRoute=express.Router("express");//router is used to define route of web page, if we using routing  in web api  it make searching easy and  fast it create index for each web page so  seacrhing will be fast of particular web page

var State= require("./state.model.js");

//function to save state

stateRoute.route("/save").post((req,res)=>{
    var state=new State(req.body);
    state.save().then(state=>{
        res.send("state saved");
        res.end();
    }).catch((err)=>{
        res.send(err);
    })
}); 

//search state by stid
stateRoute.route("/search/:stid").get((req,res)=>{
    State.findOne({"stid":req.params.stid}).then(state=>{
        res.send(state);
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
});

//update state

stateRoute.route("/update").put((req,res)=>{
    State.updateOne({"stid":req.body.stid},{"stid":req.body.stid,"stname":req.body.stname,"status":req.body.status}).then(state=>{
        res.send("state updated succesfully");
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
});

//delete enable or disable
stateRoute.route("/delete/:stid").delete((req,res)=>{
    State.updateOne({"stid":req.params.stid},{"status":0}).then(state=>{
        res.send("state disbaled succesfully");
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });

});

//show all used to get all data from mongodb
stateRoute.route("/show").get((req,res)=>{
    State.find({"status":1}).then(state=>{
        res.send(state);
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
});

////show all
stateRoute.route("/getall").get((req,res)=>{
    State.find().then(state=>{
        res.send(state);
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
});


//seacrh state by name  to avoid duplicat entery

stateRoute.route("/searchbyname/:stname").get((req,res)=>{
    State.findOne({"stname":req.params.stname}).then(state=>{
        res.send(state);
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
});
    
module.exports=stateRoute;