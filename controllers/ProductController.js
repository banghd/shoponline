const Product = require('../models/Product.js')
const Products = require('../models/Product.js')
const ProductController = {
    index: async (req,res ) => {
        try {
            let data = await Products.find((err)=>{
                if(err) res.json(err)
                res.json({
                    status: "success",
                    product: data
                })
            })
           
        }
        catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    create: async (req,res ) => {
        try {
            let { id, name, price, category, description, quantities } = req.body
            let newProduct = new Products({ id, name, price, category, description, quantities })
            await newProduct.save((err)=>{
                if(err) res.json(err)
                res.json({msg : "create new product"})
            })
            
        }
        catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    find: async (req,res ) => {
        try {
            let data = req.query
            let result = await Products.find(data, (err)=>{
                if(err) res.json(err)
                res.json({
                    result
                })
            })
           
        }
        catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    delete : async (req,res ) =>{
        try {
            let data = req.body._id
            await Products.deleteOne({_id : data}, (err)=>{
                if(err) res.json(err)
                res.json({msg : "Delete this product !"})
            })
            
        } 
        catch(error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    update : async (req,res)=>{
        try {
            let {_id , name, price,description, quantities, category} = req.body
            await Products.updateOne({_id}, {$set:  {name,price,quantities, category, description} }, (err)=>{
                if(err) res.json(err)
                res.json({msg : "update complete"})
            })
            
        } catch(err)
        {  return res.status(500).json({ msg: error.message })}
    }
}
module.exports = ProductController