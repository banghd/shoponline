const Users = require('../models/User.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { registerValidate, loginValidation } = require('../utils/validate')

const UserController = {
    index: (req, res) => {
        res.send('home')
    },
    login: async (req, res) => {
        const { error } = await loginValidation(req.body)
        if (error) return res.status(400).json({ msg: error.details[0].message })
        try {
            let { email, password } = req.body
            let user = await Users.findOne({ email })
            //cannot find user
            if (!user) return res.status(400).json({ msg: "User does not exist" })
            //wrong pass
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ msg: "Wrong password" })
            //if Success,create token and refresh token
            const accessToken = createAccessToken({ id: user._id })
            const refreshToken = createRefreshToken({ id: user._id })

            //save cookie refresh token
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: 'user/refreshToken',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days

            })
            //
            res.status(200).json({ accessToken })
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    register: async (req, res) => {
        const { error } = await registerValidate(req.body)
        if (error) return res.status(400).json({ msg: error.details[0].message })
        else
            try {

                let { name, email, password } = req.body
                let user = await Users.findOne({ email })

                if (user) return res.status(400).json({ msg: "Email already has been used" })

                if (password.length < 6) res.status(400).json({ msg: "Password Invalid" })
                //Hash password
                let passWordHashed = await bcrypt.hash(password, 10)

                let newUser = new Users({ name, email, password: passWordHashed })

                await newUser.save()

                res.status(200).json({ msg: "Register successfully" })

            } catch (error) {
                return res.status(500).json({ msg: error.message })
            }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshToken', { path: '/user/refreshToken' })
            return res.json({ msg: "Logged out" })
        } catch (error) { return res.status(500).json({ msg: error.message }) }
    },

    refreshToken: async (req, res) => {
        try {
            const rf_Token = req.cookie.refreshToken
            if (!rf_Token) return res.status(400).json({ msg: "Please Login or Register" }) // Chua co token
            jwt.verify(re_Token, "Refresh Token", (error, user) => {
                if (err) return res.status(400).json({ msg: "Please Login or Register" })
                const accessToken = createAccessToken({ id: user.id }) //Tao moi access token
                res.json({ accessToken })
            })

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    addCart: async (req, res) => {
        let user = await Users.findById(req.body._id)
        if (!user) return res.status(400).json({ msg: "User doesn't exist" })
        await Users.findOneAndUpdate({ _id: req.body._id }, {
            cart: req.body.cart
        })
        return res.json({ msg: "Added to cart" })
    }

}

const createAccessToken = (user) => {
    return jwt.sign(user, "Access Secret Token", { expiresIn: '11m' })
}
const createRefreshToken = (user) => {
    return jwt.sign(user, "Refresh Token", { expiresIn: "7d" })
}
module.exports = UserController