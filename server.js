const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require("cors")   
//config
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

//connect to database
mongoose.connect('mongodb://127.0.0.1:27017/demo', {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err)=>{
    if(err) throw err
    console.log("connected to database")
})
//Route
app.use('/user', require('./routes/UserRouter'))
app.use('/product', require('./routes/ProductRoute'))
app.listen(3000, ()=>{
    console.log('Listen on port 3000')
})