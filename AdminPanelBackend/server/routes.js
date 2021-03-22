const express=require('express');
const mongoose=require("mongoose");
const {mongourl}=require('./config/keys')
const app=express();

const Wish=mongoose.model("wishes");

const Grade=mongoose.model("grades");
const Shop=mongoose.model("shops");
const Productdetails=mongoose.model("productdetail");
const shopSchema = require('./models/shop')




mongoose.connect(mongourl,{useNewUrlParser:true})
module.exports=(app)=>{
    app.get('/data',(req,res)=>{
        Wish.find({}).then(data=>{
            console.log(data)
          
            res.send(data)
        })
    })

    app.get('/getGrades',(req,res)=>{
        Grade.find({}).then(data=>{
            console.log(data)
           
            res.send(data)
        })
    })


    

    app.post('/addPro',(req,res)=>{
    
        console.log("shopname==============================",req.body.shopname)
        console.log("shopid==============================",req.body._id)

        
        const shopname = req.body.shopname;
        const shopid = req.body._id;
       
console.log("_id",shopid)
console.log("with OBJECT",  mongoose.Types.ObjectId(shopid))
let updateProductdetails={
   "$push": {
   "product_details" : 
        {
            "productname":req.body.productname,
            "productcostprice":req.body.productcostprice,
            "productcategory":req.body.productcategory,
            "productsellingprice":req.body.productsellingprice,
        }
    }
    
}
shopSchema.findOneAndUpdate({"_id" : mongoose.Types.ObjectId(shopid)}, updateProductdetails
 , {new:true}
 ,  (err, prodet) => {
     if (err) console.log("err", err)
     console.log("prodet", prodet)
     res.send({"message" : prodet})} )

})


app.post('/addProduct',(req,res)=>{
    
   
    const Item=new Productdetails({
      shopid : req.body.shopid,
       shopname:req.body.shopname,
       shopaddress:req.body.shopaddress,
      productname:req.body.productname,
     productcostprice:req.body.productcostprice,
   productsellingprice:req.body.productsellingprice,
   category:req.body.category
    })
    Item.save().then(data=>{
        console.log("saved")
        res.send(data)
    }).catch(err=>{
        throw err;
    })
})

    app.post('/addShop',(req,res)=>{
       
        const salonId = req.body._id;
        const Item=new Shop({
            // shopId=req.body._id,
           shopname:req.body.shopname,
           shopaddress:req.body.shopaddress,
        })
        Item.save().then(data=>{
            console.log("saved")
            res.send(data)
        }).catch(err=>{
            throw err;
        })
    })
    
    
    app.get('/getShops',(req,res)=>{
        Shop.find({}).then(data=>{
            console.log(data)
         
            res.send(data)
        })
    })


   



    app.get('/getProducts',(req,res)=>{

        shopSchema.find({}).then(data=>{
            console.log("products details",data)
         
            res.send(data)
        })
    })


   
    


    //delete route
    app.delete('/removeshop/:id',(req,res)=>{
        // const shopid = req.body._id;
        shopSchema.findOneAndRemove({_id:req.params.id}).then(data=>{
            console.log("deleted")
            res.send(data)

        })
        

    })


    app.delete('/remove/:id',(req,res)=>{
        Wish.findOneAndRemove({_id:req.params.id}).then(data=>{
            console.log("deleted")
            res.send(data)

        })
        

    })
    
}
