const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    quantities : {
        type : Number
    },
    description : {
        type : String,
    },
    price : {
        type : Number,
        required : true
    }
}, {
    timestamps : true
})

module.exports = mongoose.model('Products', productSchema)