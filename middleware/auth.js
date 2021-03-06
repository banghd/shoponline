const jwt  = require('jsonwebtoken')

const auth = (req,res,next)=>{
    try {
        const token = req.header("Authorization")
        if(!token) return res.status(400).json("Invalid Authentication")
        jwt.verify(token , process.env.ACCESS_SECRET_TOKEN, (err, )=>{
            if(err) return res.status(400).json("Invalid Authentication")
            next()
        })
    } catch (error) {
        return res.status(500).json({msg: error.message})
    }
}
module.exports = auth