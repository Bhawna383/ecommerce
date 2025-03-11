const express=require("express");
const productRoute= express.Router();
let Product = require("./product.model");
const multer=require("multer");

//save product
productRoute.route("/saveproduct").post((req,res)=>{
    let product = new Product(req.body);
    console.log(product);
    product.save().then(product=>{
        res.send("product added succesfully");
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    });
});


//get product all

productRoute.route("/showproduct").get((req,res)=>{
    Product.find().then(product=>{
        console.log(product);
        res.send(product);
    }).catch((err)=>{
        res.send(err);
        res.status(400).send("data not found something went wrong");
    });
});

//show product status by product id
productRoute.route("/showproductstatus/:pid").get((req,res)=>{
    Product.findOne({"pid":req.params.pid}).then(product=>{
        console.log(product);
        res.send(product);
        res.end();
    }).catch((err)=>{
        res.send("data not found somthing went wrong");
    });
})

//get product count for id
productRoute.route("/getmaxpid").get((req,res)=>{
    Product.find().then(product=>{
        console.log(product);
        res.send(product);
        res.end();
    }).catch((err)=>{
        res.status(400).send("data not found somwthing went wrong");
    });
});


//save product image
const st = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"C:/Users/hp/Desktop/ProjectE/backend/server-app/product/productimages/")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
})

const upload = multer({storage:st});
productRoute.post("/saveproductimage",upload.single('file'),(req,res)=>{
    res.json({});
    console.log("succes");
    
})
//get product image
productRoute.route("/getproductimage/:ppicname").get((req,res)=>{
    res.sendFile("C:/Users/hp/Desktop/ProjectE/backend/server-app/product/productimages/"+req.params.ppicname)
});
//get product by vendor
productRoute.route("/getproductbyvendor/:vid").get((req,res)=>{
    Product.find({"vid":req.params.vid}).then(product=>{
        console.log(product);
        res.send(product);
        res.end();
    }).catch((err)=>{
        res.status(400).send("data not found");
    })
});

//get product by category
productRoute.route("/showproductbycatgid/:pcatgid").get((req,res)=>{
    Product.find({"pcatgid":req.params.pcatgid}).then(product=>{
        console.log(product);
        res.send(product);
        res.end();
    }).catch((err)=>{
        res.send(err);
    });
});

//update state

productRoute.route("/updateproductstatus/:pid/:status").put((req,res)=>{
    Product.updateOne({"pid":req.params.pid},{"status":req.params.status}).then(state=>{
        res.send("product status updated succesfully");
        res.end();
    }).catch((err)=>{
        res.send(err);
        res.end();
    })
});
module.exports=productRoute;